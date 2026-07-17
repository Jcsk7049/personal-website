# QMK 鍵盤延遲量測 SOP（零額外硬體）

> 目的：拿到可以誠實寫上網站/履歷的實測數字，取代已移除的「< 5ms」。
> 前提：只需要你既有的 QMK build 環境。不需要邏輯分析儀、示波器、光耦或任何採購。
> 產出：`矩陣首次偵測到邊緣 → key event 產生` 的實測分布（n≥100，median + IQR + min/max）。
>
> **本 SOP 的 code 未經編譯驗證**（撰寫環境沒有 QMK 工具鏈）。每一節都標了為什麼這樣寫，
> 編不過時照著註記自己判斷。經三輪對抗式審查修正，但仍請以你自己樹上的原始碼為準。

---

## 0. 這個方法量的是哪一段（先講清楚，這決定文案能寫什麼）

| # | 區段 | 本方法 | 說明 |
|---|------|--------|------|
| 1 | 手指移動 → 金屬接點導通 | ❌ 量不到 | 需高速攝影或螺線管 |
| 2 | 接點導通 → **被掃描迴圈看到** | ❌ 量不到 | 0 ~ 1 個掃描週期。**韌體對此完全無知** |
| 3 | **首次偵測到邊緣 → key event 產生** | ✅ **實測** | **本 SOP 的目標**。含彈跳造成的 debounce 延長 |
| 4 | key event → report 組裝完 | ⚠️ 未計入 | µs 級 |
| 5 | report 排入佇列 → 上 USB 匯流排 | ❌ 量不到 | 0 ~ 1ms，由 host 的 IN token 決定 |
| 6 | 主機收到 → 應用程式看到 | ❌ 量不到 | OS HID stack，也不是你的貢獻 |

> ⚠️ **最重要的一句話**：t0 是「**矩陣掃描第一次看到這個邊緣**」，**不是**「手指接觸的瞬間」。
> `debounce()` 收到的 `changed` 旗標由 `matrix_scan()` 產生，只可能在掃描取樣點上發生——
> 第 2 段在 t0 之前就結束了，韌體永遠看不到它。
> **文案絕對不可以寫「首次接觸」/「from first contact」**，那是把量不到的第 2 段偷渡進宣稱裡。

> ⚠️ **為什麼不用線上鍵盤測試網站**：那些網站的計時起點是 `event.timeStamp`，MDN 定義為「事件被建立的時刻」
> ——那時第 1~6 段全部已經走完。它們只有終點沒有起點。
> 但網站可以當**輸出目的地**（§3）——碼錶在鍵盤裡，網站只負責顯示。

---

## 1. 為什麼掛在 `debounce()` 上

`sym_defer_g`（QMK 預設，`builddefs/common_features.mk`: `DEBOUNCE_TYPE ?= sym_defer_g`）的核心：

```c
if (changed) {
    debouncing      = true;
    debouncing_time = timer_read_fast();     // ← 每次彈跳都重設計時器
} else if (debouncing && timer_elapsed_fast(debouncing_time) >= DEBOUNCE) {
    if (memcmp(cooked, raw, matrix_size) != 0) {
        memcpy(cooked, raw, matrix_size);
        cooked_changed = true;                // ← key event 在這裡誕生
    }
    debouncing = false;
}
```

- `changed` 首次為真 → t0（首次偵測到邊緣）
- `cooked_changed` 為真 → t1（key event 產生）

掛這裡的好處：**演算法一行不改**，只加時間戳。受測系統行為不變。

### ⚠️ 關於「5ms 是下限」——這句話是錯的，別寫上網站

`timer_read_fast()` 在 ChibiOS 上回傳**毫秒**（`platforms/timer.h`: `timer_read_fast() { return timer_read32(); }`），
而 `timer_read32()` 用 `TIME_I2MS()` 轉換，那個巨集是**無條件進位**：

```c
// ChibiOS os/rt/include/chtime.h
#define TIME_I2MS(interval) (time_msecs_t)((((time_conv_t)(interval) * 1000) + CH_CFG_ST_FREQUENCY - 1) / CH_CFG_ST_FREQUENCY)
//                                                                            ^^^^^^^^^^^^^^^^^^^^^^^ 這就是 ceil
```

兩個 ceil 值相減，`elapsed >= 5` 成立時真實時間可以低到約 **4.0ms**。
所以**量到 < 5000µs 的樣本是預期內的，不是量錯**。

（這也表示：我先前說「`<5ms` 在數學上不可能」講得太滿。正確的說法是——原本那句話的問題不在數字大小，
在於**「實測」二字宣稱了一個從未發生的實驗**，而且它宣稱的是端到端延遲，那必然還要加上第 5 段的 USB polling。）

---

## 2. 建立量測用 keymap

在 `keyboards/morempty/w17/keymaps/` 開一個 `latency/`，**不要動 default/via/vial**。

### 2-0 ⚠️ 先確認你要在哪棵樹編譯

你有 vial keymap（`VIAL_ENABLE = yes`），代表你可能有 **vial-qmk** 和 **qmk_firmware** 兩棵樹。
**兩棵樹的 `debounce()` 簽名不一樣**（QMK 在 2025-10 的 #25632 把 `num_rows` 拿掉，vial-qmk 還沒跟上）：

```bash
# 在你要編譯的那棵樹的根目錄跑：
grep -n 'bool debounce' quantum/debounce.h
```

- 有 `uint8_t num_rows` → 舊介面（vial-qmk 屬此）
- 沒有 → 新介面（QMK master）

**所以：不要照抄下面任何 code 片段的簽名。** 正確做法是——

```bash
cp quantum/debounce/sym_defer_g.c keyboards/morempty/w17/keymaps/latency/debounce.c
```

**從你自己的樹複製**，簽名一定對，然後只加下面標 `+++` 的行。這樣版本問題全部消失。

### 2-1 `keymaps/latency/rules.mk`

```mk
DEBOUNCE_TYPE = custom
SRC += debounce.c
```

> ⚠️ **不要關 VIA/VIAL、不要關 RGB。** 量測韌體與出貨韌體差越多，量到的越不是同一台機器。
> 尤其 RGB：真正影響延遲的**不是** WS2812 的 DMA 傳輸（`WS2812_DRIVER = pwm` 走 DMA 循環模式，不關中斷），
> 而是 `rgb_matrix_task()` 跟 `matrix_task()` **在同一個 `keyboard_task()` 主迴圈裡**——
> 特效運算會直接推遲下一次 `debounce()` 呼叫，灌水到你的 t1。這是真實行為，要留著。
> 若 flash 爆了才考慮關 VIAL，並在文案標明。

### 2-2 在複製來的 `debounce.c` 上加這些行

```c
// 檔案開頭（既有 include 之後）
#include <ch.h>                                        // +++
#include <hal.h>                                       // +++

#define LAT_SAMPLES 128                                // +++ 留餘裕，別剛好 100
volatile uint32_t lat_us[LAT_SAMPLES];                 // +++ 延遲樣本（µs）
volatile uint8_t  lat_row[LAT_SAMPLES];                // +++ 觸發的 row
volatile uint8_t  lat_col[LAT_SAMPLES];                // +++ 觸發的 col
volatile uint8_t  lat_n = 0;                           // +++
volatile uint32_t scan_gap_us[LAT_SAMPLES];            // +++ 掃描間隔（見 §4）
static rtcnt_t    t_first_edge, t_last_call;           // +++
static bool       measuring = false;                   // +++
```

在 `debounce()` **函式體開頭**：

```c
    // +++ 掃描間隔＝debounce() 相鄰呼叫的間距（與延遲樣本同一版韌體、同一次量測）
    rtcnt_t now = chSysGetRealtimeCounterX();
    if (lat_n < LAT_SAMPLES) scan_gap_us[lat_n] = (now - t_last_call) / (STM32_HCLK / 1000000UL);
    t_last_call = now;
```

在 `if (changed) {` 區塊內、`debouncing = true;` **之前**：

```c
        if (!debouncing) {                              // +++ 只抓第一個邊緣，
            t_first_edge = now;                         // +++ 後續彈跳不覆蓋
            measuring    = true;                        // +++
        }
```

在 `memcmp(...) != 0` 區塊內、`memcpy` **之前**（一定要在 memcpy 前，否則 cooked 已被覆蓋）：

```c
            // +++ 找出是哪一顆鍵按下（0→1 的那個 bit）
            int8_t pr = -1, pc = -1;                                   // +++
            for (uint8_t r = 0; r < num_rows; r++) {                   // +++ ← 舊介面用 num_rows
                matrix_row_t pressed = raw[r] & ~cooked[r];            // +++    新介面用 MATRIX_ROWS
                if (pressed) {                                         // +++
                    pr = r;                                            // +++
                    for (uint8_t c = 0; c < MATRIX_COLS; c++)          // +++
                        if (pressed & (((matrix_row_t)1) << c)) { pc = c; break; }  // +++
                    break;                                             // +++
                }                                                      // +++
            }                                                          // +++
```

在 `cooked_changed = true;` **之後**：

```c
            if (pr >= 0 && measuring && lat_n < LAT_SAMPLES) {         // +++ pr>=0 ⇒ 是「按下」不是「放開」
                lat_us[lat_n]  = (chSysGetRealtimeCounterX() - t_first_edge) / (STM32_HCLK / 1000000UL);
                lat_row[lat_n] = (uint8_t)pr;                          // +++
                lat_col[lat_n] = (uint8_t)pc;                          // +++
                lat_n++;                                               // +++
            }                                                          // +++
            measuring = false;                                         // +++
```

**三個容易錯的點**：

1. `matrix_size` 那行：舊介面（有 `num_rows`）**不要用 `MATRIX_ROWS_PER_HAND`**——那個巨集在舊樹根本不存在
   （舊樹叫 `ROWS_PER_HAND`，而且寫死在 `quantum/matrix_common.c` 內部，keymap 看不到）。
   直接用參數 `num_rows`。非 split 時 `num_rows == MATRIX_ROWS == 5`，語意等價。
2. **`STM32_HCLK` 不是 `STM32_SYSCLK`**：DWT CYCCNT 數的是 HCLK。你這塊板剛好 `STM32_HPRE = DIV1`（兩者相等），
   但寫 SYSCLK 是語意錯，換板會靜默偏差整數倍。
3. `chSysGetRealtimeCounterX()` 需要 Cortex-M3 以上（用 DWT）。ARMv7-M port 的 `port_init()` 會**無條件**啟用
   CYCCNT，不需要接除錯器。**但這個測試無法用來判別你的實體 MCU**——見 §7。

### 2-3 `keymaps/latency/keymap.c`

複製你的 default keymap，Layer **0** 找一顆閒置鍵（**不要用 Layer 1**，理由見下）改成 `LAT_DUMP`：

```c
#include QMK_KEYBOARD_H
#include <stdio.h>                       // snprintf 需要，QMK_KEYBOARD_H 不保證帶進來

extern volatile uint32_t lat_us[], scan_gap_us[];
extern volatile uint8_t  lat_row[], lat_col[], lat_n;

enum custom_keycodes { LAT_DUMP = SAFE_RANGE };

bool process_record_user(uint16_t keycode, keyrecord_t *record) {
    if (keycode == LAT_DUMP && record->event.pressed) {
        char buf[32];
        send_string("row,col,latency_us,scan_gap_us\n");
        for (uint8_t i = 0; i < lat_n; i++) {
            snprintf(buf, sizeof(buf), "%u,%u,%lu,%lu\n",
                     lat_row[i], lat_col[i],
                     (unsigned long)lat_us[i], (unsigned long)scan_gap_us[i]);
            send_string(buf);
        }
        lat_n = 0;
        return false;
    }
    return true;
}
```

**為什麼 LAT_DUMP 要放 Layer 0**：你 default keymap 的 Layer 0 第一顆是 `LT(1, KC_NUM)`。
如果 LAT_DUMP 放 Layer 1，你得先按住 `LT(1)` 才按得到它——那個 `LT(1)` 按下**本身就是一次矩陣 press**，
會被記成一筆樣本，接著 LAT_DUMP 又記一筆。**污染兩筆**。放 Layer 0 只污染 LAT_DUMP 自己那一筆，
而且因為現在有 row/col 欄位，你在後處理時直接過濾掉就好——不必靠「丟最後一筆」這種脆弱的位置假設。

---

## 3. 取樣

```bash
qmk compile -kb morempty/w17 -km latency
qmk flash   -kb morempty/w17 -km latency
```

1. **開一個純文字輸入框**——記事本、任何網頁的 `textarea`。
   **這就是你要的「用網站測鍵盤」**：碼錶在鍵盤裡，網站只是顯示器。
2. **選一顆純鍵當量測目標**（建議 `KC_P5`，正中央）。
   ❌ **不要選 NumLock**——那顆是 `LT(1, KC_NUM)`，tap-hold 決策會讓時序複雜化。
3. **用真手指按它 100 次**。
   - ✅ **一定要用真手指**：機械彈跳會讓計時器重啟，這是真實延遲的一部分。短接注入沒有彈跳，會系統性低估。
   - ✅ **間隔要不規則**：掃描迴圈和 USB polling 都是週期性的，固定節奏會 aliasing，
     你會系統性地只量到最好或最壞那一格。**不要打節拍器**，手動按本來就不規則。
4. 按 `LAT_DUMP` → CSV 自己打進輸入框。**dump 期間（約 1~2 秒）不要按任何鍵**——
   `send_string` 會在 `process_record_user` 裡阻塞主迴圈，那段時間的按鍵會漏掃。
5. **另外量一組 RGB 全關的對照**（`RGB_MATRIX_TOGGLE` 關掉再按 100 次）。
   兩組的差就是 RGB 對延遲的真實貢獻——**這反而是文案裡最有料的一句**。

---

## 4. 掃描週期（已整合進 §2-2，不必另外編一版）

`scan_gap_us` 欄位就是 `debounce()` 相鄰呼叫的間隔＝掃描週期，**跟延遲樣本來自同一版韌體、同一次量測**。

> 為什麼不用 `DEBUG_MATRIX_SCAN_RATE`：那個需要 `CONSOLE_ENABLE = yes`，而 console 輸出會拖慢
> 它要量的那個掃描率——你為了量掃描率而改變了掃描率。用它量出來的數字**沒有資格**跟 §3 的延遲混用，
> 更不該填進文案。

第 2 段（接點導通 → 被掃到）的上界 = 1 個掃描週期 = `scan_gap_us` 的 max。

---

## 5. 算數字

```python
import csv, statistics as st

TARGET = (2, 1)   # ← 換成你量的那顆鍵的 (row, col)，從 CSV 裡看
rows = [r for r in csv.DictReader(open("samples.csv")) if r["row"].isdigit()]
xs = sorted(int(r["latency_us"]) for r in rows if (int(r["row"]), int(r["col"])) == TARGET)
gaps = sorted(int(r["scan_gap_us"]) for r in rows)

q1, q3 = xs[len(xs)//4], xs[3*len(xs)//4]
print(f"n={len(xs)}  median={st.median(xs)/1000:.2f}ms  IQR=[{q1/1000:.2f}, {q3/1000:.2f}]")
print(f"min={xs[0]/1000:.2f}  max={xs[-1]/1000:.2f}")
print(f"掃描週期 median={st.median(gaps)}µs  max={max(gaps)}µs")
```

**報 median + IQR + min/max，不要只報 median ± SD。**
你的分布會是**離散多峰**的（1ms tick 量化 + 掃描週期量化疊在一起），SD 隱含單峰對稱假設，
對量化分布沒有物理意義。畫個直方圖看一眼，你會直接看到那些階梯。

Dan Luu 量鍵盤延遲時刻意四捨五入到最近的 5ms「以免給出虛假的精確感」；LagBox 報 median ± SD；
Stapelberg 全部標 ±%。**不要只報一個漂亮數字。**

---

## 6. 文案模板（等你有數字再填）

**網站** `cvData.json` → `detail.outcome`（中英同步 + 產 migration）：

```
・以 custom debounce 掛 DWT cycle counter 實測「矩陣首次偵測到邊緣 → key event 產生」：
  中位數 X.XX ms，IQR [X.XX, X.XX]，n=100（量測鍵 KC_P5，RGB 開啟）。
  關閉 RGB 對照組中位數 Y.YY ms——差值即 rgb_matrix_task 對掃描迴圈的排擠。
  量測不含「接點導通→被掃到」（≤ 1 掃描週期，實測 max ZZZ µs）與 USB FS polling（≤ 1 ms）。
```

**⚠️ 不要寫的三件事**：
1. ❌「首次接觸」/「from first contact」——你量的是首次**被掃到**，第 2 段量不到
2. ❌「5ms 是下限」——`TIME_I2MS` 進位讓真實 elapsed 可低至 ~4.0ms，你自己的 min 值就會打臉
3. ❌「超出 5ms 的部分是機械彈跳」——超出量 = 彈跳 + 掃描週期量化 + 1ms tick 量化 + RGB task 排擠，
   **四項混在一起，你沒有任何實驗能分離它們**。面試官一句「你怎麼知道那是彈跳不是量化誤差？」就破了。
   （唯一你能分離的是 RGB，因為有對照組——所以那句才敢寫。）

**履歷**（六份 .tex + HTML，字數要壓）：

```
Instrumented QMK's debounce path with a DWT cycle counter; measured median
X.XX ms (n=100, IQR X.XX–X.XX) from first detected matrix edge to key event,
and isolated the RGB task's contribution with an LED-off control group.
```

**為什麼這樣寫比「< 5ms」強**：它讓面試官看到你知道延遲**由什麼組成**、知道自己量的是哪一段、
知道哪幾段量不到、還做了對照組。一個孤立的「4.8ms」只會換來一句「你怎麼量的？」然後就沒了。

---

## 7. ⚠️ 這個 SOP **無法**幫你判別實體 MCU

**不要試圖用編譯結果判斷你的晶片是 F103 還是 F072。** 那是循環論證：

```
rules.mk 寫 MCU = STM32F103
  → platforms/chibios/mcu_selection.mk 選 cortex-m3 / ARMV = 7
  → 編入 ARMv7-M port → chcore.h 無條件 #define PORT_SUPPORTS_RT TRUE
```

整條鏈的輸入是 **rules.mk 的字串**，不是矽晶片。編譯只會把你早就知道的那行唸回來。

**真正的判別法（三選一）**：

| 方法 | 做法 | 判讀 |
|------|------|------|
| 目視 | 看 IC 絲印 | 最直接 |
| USB | BOOT 進燒錄模式 → `dfu-util -l` | `1eaf:0003`(Maple) = stm32duino/F103<br>`0483:df11` = ST 原廠 DFU/F072 |
| 讀 ID | `st-info --probe` 讀 DBGMCU_IDCODE | `0x410` = F103<br>`0x448` = F072 |

**但其實你現在就有一個很強的證據**：你目前燒的韌體是用 `MCU = STM32F103` 建置的
——ARMv7-M 的 Thumb-2 指令集 + F1 專屬的 RCC/AFIO 暫存器映射。
**Cortex-M0 執行 M3 的 code 會直接 HardFault，連開機都不可能。**
而你的 RGB、USB、VIAL 全都正常運作。

→ 所以晶片幾乎確定是 **F1 系**，要改的是**網站/履歷上的「STM32F072」那一方**，
   以及那整段「F072 內建 USB FS、BOOT0 進 DFU、免燒錄器」的選型故事
   （F103 沒有內建 USB DFU，它原廠的 bootloader 只吃 UART；`BOOTLOADER = stm32duino` 是燒在 flash 裡的第三方 bootloader）。

**MCU 型號比照延遲數字辦理：未經一手確認，不得寫上網站。**

---

## 8. 收尾檢查表

- [ ] 量測 keymap 沒有覆蓋 default/via/vial
- [ ] `debounce.c` 是從**自己的樹**複製的（簽名對得上）
- [ ] LAT_DUMP 在 Layer 0，量測目標是純鍵（非 `LT()` 鍵）
- [ ] n ≥ 100，真手指，間隔不規則
- [ ] 有 RGB 開 / RGB 關兩組
- [ ] 記錄量測當下的 RGB 效果、亮度、速度（不記就不可重現）
- [ ] 報 median + IQR + min/max，畫過直方圖確認分布形狀
- [ ] 文案沒有「首次接觸」、沒有「5ms 下限」、沒有把超出量歸因給彈跳
- [ ] 中英同步 + 產 migration + 六份履歷 .tex + `public/resume-zh.html` + `src/pages/admin/ResumeTab.jsx`
- [ ] **重編六份 PDF**（`public/*.pdf`，這台機器沒有 LaTeX 工具鏈）
- [ ] 全 repo grep 確認無殘留：`rg -i '<\s*5\s*ms|5ms'`（排除 node_modules，PROGRESS/本 SOP 的敘述除外）
