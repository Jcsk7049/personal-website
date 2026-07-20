# PROGRESS.md — 工作進度日誌

> **本檔案是跨 session 的工作記憶。**
> 規則（寫給 Claude，也寫給未來的自己）：
> 1. **每次 session 開始工作前，必須先完整閱讀本檔案**，確認目前進度、待辦與關鍵決策，再動手。
> 2. **每天工作結束前，必須在「工作日誌」新增當天的紀錄**（日期 + 做了什麼 + 決策 + 未完事項），然後 commit + push。
> 3. 「當前狀態」與「待辦清單」區塊要隨進度即時更新，不要只堆日誌。
> 4. 日誌由新到舊排列（最新的在最上面）。

---

## 📌 當前狀態快照（最後更新：2026-07-21）

- 待本人確認：QMK 的 STM32F103 是讀晶片/DFU 實測還是從 `rules.mk` 推斷；未確認前不得寫成實測或 verified。

- 待本人確認：BitOGuard 的 XGBoost / LightGBM 關係；儀表板顯示 LightGBM，但網站內文仍有 XGBoost 與其超參數，不能自行猜測改寫。

- 待本人確認：是否曾用 admin 編輯 profile。確認後才能以 repo 的 profile 產 D1 migration；目前 DataContext 已讓 D1 缺少的物件欄位（包含 `title`）回退至本機資料，避免 Hero 副標閃現後消失。

- 首頁效能：留言板的 Utterances 改為接近 Guestbook 區塊時才載入；專案卡片的聚光 hover 不再隨滑鼠移動觸發 React re-render。

- 英文履歷的正式網址是 `resume-en*.pdf`，須由本人以 Overleaf 重新輸出後覆蓋；誤建的 `public/resume*.pdf` 已刪除。三份中文 `.tex` 已恢復 Overleaf 字型設定：Latin Modern Roman + Noto Sans CJK TC。

### 這個 repo 是什麼
江嘉元（元智電機大三，2027 年中畢業）的個人作品集網站。React + Vite + Tailwind，
部署 Cloudflare Pages（`main` 分支 = Production，網址 personal-website-1kf.pages.dev）。
求職定位：**嵌入式韌體 / FAE / 軟硬整合**。

### ⚠️ 最重要的架構事實（每個 session 都要記得）
- **線上內容來自 Cloudflare D1 資料庫，`cvData.json` / `cvData.en.json` 只是 fallback**。
  改 JSON 後必須產 migration 並由本人在自己電腦跑
  `npm run db:migrate:xxx:remote` 才會真正上線（sandbox 無 CLOUDFLARE_API_TOKEN）。
  Schema：`projects (id, zh, en, sort_order)`，zh/en 為整包 JSON 字串，INSERT OR REPLACE。
- 內容修改必須**中英文同步**（cvData.json + cvData.en.json）。
- 設計規範 = Apple 官網實測數據，見 CLAUDE.md「設計規範」段（18px 卡片、240ms/0.32s、
  cubic-bezier(0.4,0,0.6,1)、font-semibold 標題、SectionHeader「粗體。灰補述。」）。
- 中文履歷在 Overleaf 使用 `Noto Sans CJK TC`（真 Bold）與 `Latin Modern Roman`；不使用為
  本機 TinyTeX 相容而加的 Arial / `AutoFakeBold` 設定。

### 專案現況（11 個，auto-sanitizer 已移除）
| 專案 | 狀態 | 備註 |
|------|------|------|
| （學歷）| 明志已從網站移除 | 網站+履歷皆無明志；南港高工保留 |
| vap | 內容已對齊投稿論文 | TensorFlow/Keras + IG（**不是** PyTorch/SHAP）；0.58 只屬 MIMIC-IV 探索實驗、**不在論文裡**，不得寫進履歷主張 |
| qmk-stm32-keyboard | ⚠️ 待確認證據／同步 D1 | `rules.mk` 指向 STM32F103 + stm32duino，但需本人確認是否為晶片/DFU 實測；正式英文履歷 PDF 待 Overleaf 輸出，migration 0016/0017 待跑 |
| pcb-defect-detection | 待開 repo | 內容詳實但零 code 連結；圖片已精選至 11 張 |
| job-radar | OK | 已補 github 連結；定位=「精準判斷/每日 Top 6」；AI 輔助已標註 |
| analog-ic-studio | 待本人升級 | 已交付「電路識別 API + 自動量測」prompt 給本人執行 |
| aws-hackathon | ⚠️ 待確認演算法／同步 D1 | 儀表板數據已採 AUC 83.2%、Precision 27.5%、Recall 33.2%、F1 30.1%、Accuracy 95.0%；但 LightGBM 儀表板與 XGBoost 內文矛盾，待本人定案後才改 migration |
| team7645-cms | OK | demo=nkhs.team7645.com；35%/65% 貢獻切分清楚 |
| audio-amplifier | OK | 分工已更正：隊友只做麵包板+PSpice，其餘全是本人 |
| swerve | OK | 獎名已統一英文（Innovation in Control Award / Excellence in Engineering Award） |
| whack-a-mole | OK | 除錯敘事已升級（反電動勢/7805 功耗）；migration 0012 待本人執行 |
| team-robot | OK | 角色已更正：**本人=電路（設計→拉線→製作），學弟=機構車銑加工** |

### 履歷檔案（resume/ 與 public/）
- 6 份 LaTeX：`resume(.zh)(-full)(-intern).tex` → PDF 同步放 public/
- HTML 一頁版：`public/resume-zh.html`（本人主用，雙欄 Apple 風，7 專案）
- 全部已移除：明志科大、西門子 SMSCP 證照（未正式核發）
- Hero 有四顆按鈕：email/GitHub/LinkedIn + 一頁履歷/完整履歷

### 事實紅線（不得違反）
- 學校是**元智大學**（不是中央）；明志科大已從履歷移除
- 西門子 SMSCP 證照**不存在**（班導未送審），任何地方都不能再出現
- VAP 框架 = TensorFlow/Keras，歸因 = Integrated Gradients；AUROC 0.99→0.58 是
  MIMIC-IV 復刻實驗、非論文內容
- AI 輔助開發要誠實標註，政策要全站一致

### ⚠️ 本人會用 admin 直接改 D1（重要協作規則）
- 本人**會透過網站 admin 後台直接編輯 sections（profile/education/experience/skills）→ 寫入 D1**。
  代表 **D1 才是這些欄位的最新真相，repo 的 cvData.json 可能落後**。
- Claude 要改這些 section 前：先問本人「你有沒有用 admin 改過這段」，避免用 repo 舊版
  產 migration 蓋掉本人的 admin 編輯。
- projects 目前仍以 repo→migration 為主；未來若本人也用 admin 改 projects，同樣規則適用。

---

## ✅ 待辦清單

### 需要本人動手（Claude 無法代做）
- [ ] **開始投實習**（目標先投 20 家，嵌入式/FAE）— 最高優先
- [ ] **QMK / BitOGuard 跑 migration**：依序執行 `npm run db:migrate:qmk-latency:remote` 與
      `npm run db:migrate:qmk-aws:remote`，否則線上 D1 仍是舊文案與舊數據。
- [ ] 從 Overleaf 匯出三份英文 PDF，覆蓋 `public/resume-en.pdf`、`resume-en-full.pdf`、
      `resume-en-intern.pdf`；確認 F103 文案與頁數後再上線。
- [ ] QMK 延遲量測：照 `QMK_LATENCY_SOP.md` 做（**零硬體，不需邏輯分析儀**——
      原本「買邏輯分析儀」的計畫已作廢：QMK 圈權威數字(Stapelberg)全是韌體自我計時量的，
      且 24MHz 的 Saleae clone 對 USB FS 只有 2 samples/bit 根本解不出封包）
- [ ] PCB 瑕疵檢測：開 GitHub repo（tiling/NMS/Flask 工具 code）
- [ ] VAP：做「MIMIC-IV 0.99→0.58 洩漏 demo」公開 notebook
- [ ] analog-ic-studio：用已交付的 prompt 實作電路識別 API（做完通知 Claude 同步網站）
- [ ] 定期喚醒 Streamlit（BitOGuard）與 HF Space（analog-ic）demo；確認 QMK YouTube 影片公開
- [ ] 多益（目標 850+）
- [ ] 確認 swerve 2022/2020 獎項的官方英文名稱無誤

### Claude 可代做（等指示）
- [x] 首頁效能優化：留言板延後載入、專案卡片 hover 移除 mousemove re-render（2026-07-21）
- [x] QMK CI workflow 已交付 build.yml（2026-07-19，待本人放入 qmk repo）
- [x] aws-hackathon 指標以 BitOGuard 儀表板版本重寫（2026-07-21，待本人跑 migration 0017）
- [x] whack-a-mole 除錯故事改寫成敘事（2026-07-19，待本人跑 migration 0012）
- [ ] job-radar / analog-ic-studio 補 cover 與截圖（需本人提供截圖）
- [ ] per-route og meta（需 prerender 架構，工程量大，暫緩）
- [ ] VAP/QMK 面試模擬追問練習

---

## 📓 工作日誌（新→舊）

### 2026-07-21（履歷命名與 D1 fallback 修正）

- 找到 626fbaa 的履歷命名錯誤：Hero 實際連結 `resume-en*.pdf`，而誤建的 `public/resume*.pdf` 沒有任何連結；已刪除三個孤兒檔。正式英文 PDF 仍待本人用 Overleaf 產出後覆蓋正確檔名。
- 三份中文履歷 `.tex` 改回 Overleaf 的 `Latin Modern Roman` + `Noto Sans CJK TC`，移除本機 Windows 相容用的 Arial / `AutoFakeBold`。
- `DataContext` 對 profile、skills_matrix、skills_detail 等物件型 D1 section 採 fallback + D1 合併；陣列 section 維持整包替換，修復舊 D1 profile 缺 `title` 時的 Hero 副標閃現。
- 清除本次 PDF QA 暫存目錄；將 `AGENTS.md` 納入版本控制。`npm run build` 成功。完整 Vitest 會掃進 Claude 的隔離 worktree，造成 3 個 Hero 測試因雙 React instance 失敗；本 repo 自身 7 個測試檔通過。
- 待本人回答：profile 是否曾用 admin 改過、F103 是實測還是規則檔推斷、BitOGuard XGBoost/LightGBM 的實際關係。

### 2026-07-21（六份履歷 PDF 重編）

- 使用本機 TinyTeX 的 XeLaTeX，六份 `.tex` 各跑兩輪，輸出已同步至 `resume/` 與 `public/`。
- bundled TinyTeX 無法解析 `Latin Modern Roman` 為 Windows 系統字型；三份中文履歷的西文字型改為 Arial，中文維持 Noto Sans TC + `AutoFakeBold=2.5`。
- 驗證：頁數維持英文/中文 base=1、full=2、intern=1；以 Poppler 渲染檢視英文一頁、中文一頁與中文完整版第 2 頁，沒有截斷。PDF 文字確認為 `STM32F103`／`stm32duino`，且不含 `STM32F072` 或 `<5ms`。

### 2026-07-21（內容與首頁效能修正）

- 本人確認 QMK MCU 為 STM32F103；網站資料、履歷來源與 admin seed 改為 `STM32F103 + stm32duino bootloader`，移除 F072 內建 DFU／BOOT0 敘述。
- BitOGuard 採儀表板版本：AUC 83.2%、Precision 27.5%、Recall 33.2%、F1 30.1%、Accuracy 95.0%。新增 migration 0017 同步兩項 D1 內容。
- sitemap 移除 auto-sanitizer，加入 job-radar 與 analog-ic-studio；首頁只取得目前語言資料，初始 D1 request 從 14 降至 7。
- 手機導覽觸控目標擴至 44px；專案分類新增 aria-pressed。

### 2026-07-21（Codex 網站效能優化）

- 將首頁留言板的第三方 Utterances script 延後到 Guestbook 距離視窗 400px 內才載入，避免首頁初始載入就建立外部 iframe。
- 專案卡片 hover 改用 CSS 變數更新聚光位置，保留原有視覺效果，移除每次 `mousemove` 的 React state 更新。
- 驗證：`vite build` 成功；Vitest 6 個測試檔、18 項測試全數通過。
- 未完事項：依既有待辦持續補齊專案素材與 per-route OG/prerender；本次未更動 D1、履歷內容或中英文資料。

### 2026-07-18（六份履歷 PDF 重編，✅ 已上 main）
- **`<5ms` 下架完成最後一哩**：先前只改了 `.tex`，`public/`＋`resume/` 的 PDF 還是舊的
  （＝本人投出去的履歷仍含假宣稱）。這次全部重編、已 push main（commit 240c6d5）。
- **本機裝了 TinyTeX**（`%APPDATA%\TinyTeX`，winget 那台）——以後改履歷可本機直接
  `xelatex`，不必再上 Overleaf。用法：PATH 加 `$env:APPDATA\TinyTeX\bin\windows`，
  `xelatex -interaction=nonstopmode <file>.tex`，跑兩遍出書籤。宏包已裝齊
  （preprint/titlesec/marvosym/enumitem/fancyhdr/xcolor/tabularx/babel-english/
  fontspec/xecjk）。
- **中文字型改動（3 份 resume-zh*.tex）**：`Noto Sans CJK TC` → `Noto Sans TC`
  （本機 Windows 實裝的是後者）＋ `[AutoFakeBold=2.5]`。**關鍵坑**：Windows 版
  Noto Sans TC 沒有獨立 Bold 面，不加 AutoFakeBold 的話中文 `\textbf`/姓名/標題會
  **默默退回一般字重**（log: `Could not resolve Noto Sans TC/B` → `/b/n undefined
  → using /m/n`）。加了之後 fontspec 記錄 `embolden=2.5`，粗體恢復。
  ⚠️ 換 Overleaf 編要把字型名改回 `Noto Sans CJK TC`（各檔註解已寫）。
- 驗證：六份缺字 0、頁數 1/2/1（base/full/intern，與舊版一致）、`.tex` 源 grep 無
  `<5ms`（PDF 由源決定＝乾淨）。**視覺無法驗**——這 session 瀏覽器截圖工具全逾時
  （同 07-14），dev server 又把 PDF 當下載檔。本人請自己開一份中文 PDF 眼睛掃一下
  漢字與粗體。
- **剩下的 QMK 舊債**：MCU 型號仍未確認（`dfu-util -l` / `Get-PnpDevice`）、
  QMK 延遲量測（`QMK_LATENCY_SOP.md`，想做再做）。

### 2026-07-18（設計改造，✅ 本人 preview 核准後已合 main）
- **分支 `claude/personal-website-optimization-fbca13`（commit 7452f35）待本人在 Cloudflare
  preview 確認後才合 main**（07-14 規矩）。內容：
  - 環境色暈：五區各自的 accent 色相 radial 暈錨定左右 gutter（4–7% alpha），治「兩側死白」；
    手機 media query 降為單層小暈
  - Hero 捲動視差：文字/照片不同速率位移＋淡出（rAF、transform/opacity、雙層 wrapper
    避開 hero-fade-* forwards keyframes 蓋 transform）
  - SectionHeader 大標→副標 60/140ms 級聯（打破全區單一淡入）
  - Hero+Projects 容器 xl 加寬至 1400px；卡片/CTA 加 active 按壓態（觸控回饋）
  - **修 bug**：專案卡 spotlight 原是綠色 rgba(34,160,74)（Apple 藍系統異物）→ 品牌藍
  - 全部新動畫有 prefers-reduced-motion 對應
- 驗證：build＋vitest 9 全過；本輪瀏覽器截圖/rAF/事件派發全凍結（同 07-14 症狀），
  改 DOM/computed-style 量測：色暈五區生效、wrapper transform 不被 keyframes 蓋（手動注入驗證）、
  手機 375 無溢出、1600 寬容器 1400。**真實捲動動畫需本人在 preview 親眼驗**。
- 尚未清完的舊債：六份 PDF 已於 2026-07-18 重編；MCU 型號仍未確認。

### 2026-07-17（QMK 延遲 session）

**起點**：本人問「不是有網站可以測試鍵盤嗎」，想用線上鍵盤測試站取代邏輯分析儀量延遲。

**Claude 的初判被抗辯推翻了兩次，記下來免得重蹈**：
1. 初判「網站測不到，因為瀏覽器拿不到 t=0」→ **歸因錯**。拿不到 t=0 的是**手指**；
   邏輯分析儀看到的也只是電氣接點邊緣。LagBox（CHI'18）終點用純軟體 Linux evdev
   照樣做到 median 3.9ms ±0.7。**且本人的鍵盤有 VIA/VIAL＝已有 raw HID 通道**，
   網站可以當**讀數器**（碼錶在韌體裡）——`usevia.app` 就是這種網站。
   正解：公開的 keydown 測試站不行（只有終點沒起點）；網站當輸出目的地可以。
2. 初判「唯一誠實量法是邏輯分析儀」→ **錯**。QMK 圈權威延遲數字（Stapelberg）
   **全部是韌體用 ARM cycle counter 自測的，一把 LA 都沒用**。且 24MHz Saleae clone
   對 USB FS（12Mbps）只有 2 samples/bit，需 ~48MHz，本人若照原計畫買會解不出封包。
   → **PROGRESS 舊待辦「邏輯分析儀實測」已作廢**，改為零硬體韌體自測。

**已完成（commit 8814108 + 本次）**：
- `<5ms` 從 **11 處**移除：cvData.json/en、portfolio-content.md、6 份 resume/*.tex、
  public/resume-zh.html、**src/pages/admin/ResumeTab.jsx:22**（← 第一輪 grep 漏掉，
  因為 `--include` 沒帶 `.jsx`；抗辯抓到。那是 admin 履歷產生器的 seed，
  不修的話本人用 admin 重產履歷會把 `<5ms` 寫回 D1，migration 0016 白做）
- migration 0016（已驗證可反解）、npm script `db:migrate:qmk-latency:remote`
- `QMK_LATENCY_SOP.md`（零硬體量測 SOP，經三鏡頭抗辯修正六個 fatal）
- vite build + vitest 9 全過

**技術事實（一手原始碼查證，寫文案時別忘）**：
- `builddefs/common_features.mk`: `DEBOUNCE_TYPE ?= sym_defer_g` → 本人 config.h 沒設，
  所以就是預設 defer（等 5ms 無變化才回報）
- ⚠️ **但「5ms 是下限」是錯的**：`timer_read_fast()` 回傳毫秒，`TIME_I2MS` 無條件進位
  （`+ CH_CFG_ST_FREQUENCY - 1`），兩個 ceil 值相減，`elapsed >= 5` 時真實時間可低至 ~4.0ms
  → **量到 <5ms 是預期內**。原本那句話的問題不在數字，在「實測」二字宣稱了不存在的實驗。
- t0 只能是「矩陣**首次偵測到**邊緣」，不是「首次接觸」——`changed` 由 matrix_scan() 產生，
  只在掃描取樣點發生。文案不得寫 "from first contact"。

**⚠️ 新發現的事實矛盾（待本人確認 / 處理）**：
1. **MCU 型號**：`rules.mk` 寫 `MCU = STM32F103` + `BOOTLOADER = stm32duino`，
   但網站/履歷全寫 STM32F072，且有一整段「F072 內建 USB FS、BOOT0 進 DFU、免燒錄器」選型故事。
   **F103 沒有內建 USB DFU**（原廠 bootloader 只吃 UART），stm32duino 是燒在 flash 的第三方 bootloader。
   強證據：現行韌體用 F103 建置（ARMv7-M）且運作正常——M0 跑 M3 code 會直接 HardFault。
   **判別法：`dfu-util -l` → `1eaf:0003`=F103 / `0483:df11`=F072。編譯結果不能拿來判（循環論證）。**
2. **GitHub repo README:129 寫「PCB: designed in KiCAD / Altium Designer」**，但網站寫 EasyEDA Pro
   （且 repo 裡就躺著 `.epro2` = EasyEDA Pro 工程檔）→ **錯的是 README**，要修 qmk repo 那邊。
3. **`src/pages/admin/ResumeTab.jsx` 是紅線重災區**（本次只依範圍改了 `<5ms`，其餘未動）：
   - :17 「出賽 **3 場** FRC」← 2026-07-20 日誌已更正為 2 場，此處未同步
   - :20 VAP tags 有 **PyTorch** ← 紅線：框架是 TensorFlow/Keras
   - :20 「AUROC 0.99→0.58」← 紅線：0.58 屬 MIMIC-IV 探索、不在論文，不得當履歷主張
   - :22 STM32F072 ← 待 MCU 定案

### 2026-07-14
借鏡 impeccable.dev 做了一輪較大幅的**編輯風改造**（全程只推 feature 分支給本人在
Cloudflare preview 親眼確認、核准後才合 main；因為本 session 瀏覽器截圖工具全壞，
改用 DOM/computed-style 量測驗證，不盲做）。已全部合上 main：

- **impeccable 三手法（內容重呈現，不新增技術宣稱）**：
  - `TerminalCard.jsx`（新）：macOS 風終端機卡，中性灰圓點（不用紅黃綠，維持不換色）。
    用在 BitOGuard 頁，把 `detail.concept` 裡現成的 ①-⑧ AWS 管線拆成結構化 `pipeline` 陣列。
  - `BrowserFrame.jsx`（新）：瀏覽器外框包 BitOGuard 的 Streamlit demo 截圖（真網址列）。
  - VAP 頁編號步驟橫排（複用現有 fig-pipeline 圖說，不新增宣稱）。
  - 跳過 job-radar/analog-ic（無真截圖）、qmk（延遲數字未驗證）。
- **首頁大膽化 + featured 層級**（先前）：AwardList 挑 2022 FRC 鴻海賽做 featured 大卡、
  ProjectShowcase 把 VAP 做 2 欄 featured 卡（`grid-auto-flow:dense` 補洞成長方形）、
  GuestbookContact 右欄改單一 email 主 CTA。**awards.featured / vap.featured 是 D1 欄位**，
  已附 migration 0014/0015，本人需跑 `npm run db:migrate:awards-featured:remote` +
  `:vap-featured:remote` 才會在正式站生效。
- **編輯風型級**：Hero 首度顯示 `profile.title`（"軟硬整合 · 從 PCB 到韌體到資料"，原本只在
  `<title>`）當第二層主標；SectionHeader 從 2rem 放大到 clamp ~3.25rem 編輯級並改成
  **大標 + 下方灰色副標堆疊**（原內聯「粗體。灰補述。」在大字級會斷半句）；專案詳情頁區塊標題
  同步放大；修好 no-op 的 `text-wrap-pretty` → 真 `text-pretty/balance`。
- **技能詳情頁改緊湊規格清單**：卡片格 → 兩欄 divide-y 清單；拿掉「假的 + 鈕」（aria-hidden
  裝飾、無點擊）、等級不再標兩次、應用專案 pill 改**真連結**（LCS 資料驅動比對標籤→專案 id，
  中英文全解析，對不上退化純文字）。
- **大理石紋理：試過又撤除**。feTurbulence 程序化紋理做出來是煙霧/污漬感（像素量測抓到第一版
  整片糊白的 bug），本人看了覺得怪 → `git revert` 撤掉。結論：那種質感要真實大理石貼圖，
  非 CSS 能算，先不做。
- 設計原則沿用：不換色系、不加深色主題、不引入 impeccable skill 列的 slop（編號 eyebrow、
  hero-metric 模板等）。全部 `npx vite build` + `npx vitest run`（9 全過）驗證。

### 2026-07-13
- 用 impeccable 美化 skill 跑一輪站內設計 detector，抓到一個真的 bug：技能區塊
  （`#skills`）四個分類卡片的 SVG 圖示因為套了 `bg-clip-text + text-transparent`
  漸層文字技巧，`currentColor` 被繼承成 transparent，圖示線條完全不會畫出來
  （已用瀏覽器量測 computed style 驗證：修前 `color: rgba(0,0,0,0)` → 修後對應分類實色）。
- 順手清掉其餘漸層文字（AI 感標記，也不在專案 Apple 純色 token 系統內）：
  SkillDetail.jsx 的分類 eyebrow / 技能卡片等級標籤、ProjectDetail.jsx 的 metric 數字，
  改用 designTokens.js 新增的 `PROJECT_ACCENT_SOLID` / `SKILL_CAT_ACCENT_SOLID` 純色版。
- 順便修掉 ProjectDetail.jsx 裡重複定義、沒接 designTokens.js 的本地 `PROJECT_ACCENTS`
  （原本是兩份會各自走鐘的顏色來源，統一改回 import）。
- Nav.jsx 手機版下拉選單改用 `grid-template-rows` 展開/收合，取代會造成版面重排的
  `max-height` transition。
- 純元件/樣式改動、不動 cvData 內容，`npx vite build` + `npx vitest run`（9 全過）驗證後
  推 main，Cloudflare 自動部署，**不需 migration**。

### 2026-07-21
- 修 admin 換行不顯示的 bug：experience/education 描述加 `whitespace-pre-line`
  （Experience.jsx ExpCell + EduCell），本人 admin 打的「過往:/現在:」換行才會正確呈現。
  純元件改動、推 main、Cloudflare 自動部署，**不需 migration**。
- 釐清誤會：本人擔心又推到 preview；確認換行修正在 main（正式站），非 preview 分支
  （右面板日文 session 是舊的、改別的 bug、commit 在 claude/determined-sagan-B9vU4）。
- 工作目錄一度停在舊分支 claude/determined-sagan-B9vU4，已切回 main。
- ⚠️ 待本人執行的 migration（累積）：0012 whack-a-mole、0013 edu-exp。
  （0013 本人已跑；0012 whack-a-mole 需確認是否跑過——若打地鼠專案還是舊列點就補跑
  `npm run db:migrate:whackamole:remote`）
- Session 於此清空。

### 2026-07-20
- 本人用 admin 改了 experience（Advisor 加「過往/現在」framing、競賽選手改寫），
  D1 已更新但 repo 落後 → 本人貼回最終文字，同步進 cvData.json/en。
- 移除明志科大（website education，zh+en）——先前只移了履歷，這次移網站。
- 事實更正：FRC 出賽「3 場」→「2 場」（本人確認 2020 中科 5G + 2022 台灣鴻海），
  同步改 4 份 LaTeX 履歷 + cvData。
- 產 migration 0013（education + experience sections），**待本人跑
  `npm run db:migrate:edu-exp:remote`**。
- 新增協作規則到「架構事實」：本人會用 admin 直接改 D1 的 sections，Claude 動這些欄位前要先問。

### 2026-07-19
- whack-a-mole outcome 改寫：把「ESP32 無故燒毀→反電動勢→加 1N4001 飛輪二極體」和
  「7805 線性穩壓功耗過熱」兩段從列點升級成完整除錯敘事（zh+en）；產 migration 0012，
  **待本人跑 `npm run db:migrate:whackamole:remote`**。
- 交付 QMK CI workflow（build.yml）：keyboard-only repo，qmk_cli 容器 + checkout qmk_firmware
  + `make morempty/w17:default`，產 .bin artifact。本人需放到 qmk repo 的
  `.github/workflows/build.yml`。備忘：qmk repo README 有 typo（moremory→morempty）。

### 2026-07-18
- PCB 瑕疵檢測圖片精選：111 → 11 張（5 張核心圖 + 每類缺陷 09/11 板各 1 張）。
- 技術誠實化盤點（AskUserQuestion 確認）：
  - QMK tags 移除「SPI · UART · I2C」「FreeRTOS (進行中)」（repo 查證：無 UART/I2C，WS2812 單腳位）
  - 履歷 QMK 首句「設計 17 鍵 PCB」→「開源 PCB 改版後送廠打樣」（本人自述：送洗/焊接/除錯/灌韌體）
  - skills_matrix 與 6 份履歷移除 PyTorch、TinyML；UART/SPI/I2C → UART（誠實標註）
  - 本人確認保留：Signal Processing、LightGBM、Altium/KiCAD/OrCAD、Mastercam/Inventor/Fusion360/MATLAB
- 產 migration 0011（projects 全量 + skills_matrix section），本人已於本機執行
  `npm run db:migrate:honest-tech:remote`（12 queries、24 rows written，成功）。
  → 網站、6 份履歷 PDF、D1 三邊技術宣稱一致。
- 待辦提醒：LightGBM 保留在 aws-hackathon tags，但內文未提及對比結果——之後補一句。
- Session 於此清空（context clear）；下個 session 從本檔案接續。

### 2026-07-17
- 建立本檔案（PROGRESS.md），並在 CLAUDE.md 加入「session 開始先讀本檔、每日收工必寫日誌」規則。
- 12 專案深度稽核（三路平行代理：核心技術/軟體雲端/高職舊作），產出逐案改進報告。
- 依本人指示修正專案資料並產 migration 0010（本人已於本機跑 remote，12 queries 成功）：
  - team-robot 角色更正（本人=電路全流程，學弟=機構加工）
  - audio-amplifier 分工更正（隊友僅麵包板+PSpice）
  - 移除 auto-sanitizer（11 專案）
  - job-radar 補 github 連結；team7645-cms demo 確認
  - swerve 獎名英文化並統一 zh/en（Excellence in Engineering Award）
- 修正真 bug：EN 模式 Coursework 篩選會讓 pcb 專案消失（category 字串未對齊）；EN/ZH 專案排序不一致。
- 交付 analog-ic-studio 升級 prompt（電路識別 API + 自動量測 + Flask 端點 + pytest）。
- 交付 QMK 詳細改進計畫（邏輯分析儀量測法、I2C OLED、CI、補圖，含優先序）。

### 2026-07-16
- 網站設計全面對齊 Apple 官網實測規格（apple-design skill）：
  SectionHeader 改「粗體。灰色補述。」、卡片 18px + hover-only 陰影、
  ghost pill 篩選鈕、240ms/0.32s + cubic-bezier(0.4,0,0.6,1)、標題 font-semibold。
  CLAUDE.md 設計規範同步更新。
- 網站優化（Lighthouse 0.94/0.93/0.96/1.0）：路由 lazy 化（首頁 JS 210→194KB、
  chart.js 不再進首頁）、html lang/title 隨語言切換、JSON-LD Person、真 favicon、
  燈箱無障礙（Esc/方向鍵/dialog role）、PCB 大圖壓縮 -2.2MB、刪死代碼
  （Education.jsx、_data/、design-draft-abyss.html、uiText 死 key）。
- 合併 PR #9（profile.title「軟硬整合 · 從 PCB 到韌體到資料」+ bio 機電整合開頭），
  解衝突（index.html 留 JSON-LD、job-radar 描述留新版）。
- 履歷：移除明志科大（5 份）；中文字體 WenQuanYi → Noto Sans TC（HTML + 3 份 LaTeX，
  解 XeTeX 抓 TTC JP 面問題：用 fonttools 抽 TC OTF）。

### 2026-07-15 以前（摘要）
- 履歷體系建立：Jake's Resume 模板中英文（一頁/完整/實習版共 6 份）+ HTML 一頁版
  （本人主用）；歷經：中央→元智更正、專案換成 VAP/QMK/Swerve、加 Job Radar、
  移除西門子證照、VAP 對齊投稿論文（去 0.58、PyTorch/SHAP→TensorFlow/IG）。
- 讀取本人上傳的 IEEE GCCE 2026 投稿論文全文，發現並修正履歷與論文的三處不一致
  （0.58 不在論文、框架、歸因方法）。
- Job Radar 依 repo 現況更新（覆蓋→精準判斷、每日 Top 6、AI 標註、四來源）。
- 就業諮詢系列：HR/RD 嚴厲評估（junior 池 63/100）、電機學士市場分析、FAE 職涯
  路線（3-5 年後轉 PM/業務/回RD）、性格分析（bounded-risk builder，適合 PM 線）、
  家業定位（10% 機率接、當資本緩衝不當職涯）、規劃 = 先工作→海外碩士
  （新加坡/德國優先）。
- 面試準備：14 題考古題 + VAP「復刻發現洩漏、AI 代勞 coding、判斷是我的」答法框架。
- 早期：ProjectShowcase 卡片留空 bug 修復、PCB gallery D1 圖片路徑 migration 0009、
  Cloudflare Production/Preview 說明、資安 headers。
