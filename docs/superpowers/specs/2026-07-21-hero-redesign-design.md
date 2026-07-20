# Hero 重新設計 — 設計文件

日期：2026-07-21
狀態：待本人審查
範圍：只動首頁 Hero（`src/components/Hero.jsx`）、`src/index.css`、`src/data/uiText.js`。不動其他區塊、不動 D1、不需 migration。

---

## 1. 動機

現在的 Hero「太平、沒視覺衝擊」（本人原話）。內容都對，但第一眼不夠抓人。
目標：在**不破壞 Apple 設計語言、不換色系、不加深色主題、不加 AI slop** 的前提下，
做出更有記憶點的第一印象。

## 2. 方向決策（已定案）

衝擊載體＝**排版**（文字本身放大），不是動效堆疊或裝飾圖。
版面＝**D · 名字最大**：本人的名字是最大的字（身分優先），一句銳利的主張當強力副標。

決策過程：先試「主字（那句話）最大、名字縮小」三版 → 本人反饋「名字太小」→
改成名字最大的三版 → 本人選 D。

## 3. 內容

**巨大主字（名字）**：`江嘉元` / `Chiang Jia Yuan`
（中文三字可放到最大很穩；英文較長，會排成兩行、字級略收。）

**銳利副標（新文案，本設計新增）**：
- 中文：`硬體到軟體，中間那段我來。`
- 英文：`Hardware to software — the part in between is mine.`

角度＝佔住「軟硬整合 / FAE」的利基：多數人只做一邊，本人做中間那段接縫。
通過 CLAUDE.md 寫作規則（具體、動作導向、無形容詞堆疊、聽起來像人講的）。

**Eyebrow（名字上方小字）**：簡短身分脈絡（如 `元智電機 · 嵌入式韌體` 或羅馬拼音）。
確切字句實作時定，屬 polish。

**副標顏色**：墨黑 `#1D1D1F`（**不用藍**）。
理由：藍字放到副標尺寸會「像連結」，且 Apple 慣例把藍色留給可點擊元素；
名字夠大，層次靠尺寸就夠，不必靠顏色。

## 4. 版面結構

```
┌─────────────────────────────────────────────┐
│ [eyebrow 小字]                    ┌────────┐ │
│                                   │        │ │
│ 江嘉元            (巨大)          │  照片   │ │
│                                   │ 圓角方  │ │
│ 硬體到軟體，中間那段我來。 (副標)  │        │ │
│                                   └────────┘ │
│ [Email] [GitHub] [LinkedIn]                  │
│ [一頁履歷] [完整履歷]                         │
└─────────────────────────────────────────────┘
```

左欄：eyebrow → 巨大名字 → 墨黑副標 → 按鈕列。
右欄：照片（維持現有圓角方形 `rounded-[2rem]` + 陰影 + 已實作的捲動視差）。

- 五顆按鈕全留（Email 主鈕填藍 pill，其餘 ghost pill）——功能都有用，不砍。
- `profile.title`（軟硬整合…）與 `profile.bio` 不再出現在 Hero
  （bio 仍在 footer，title 仍用於 `<title>`/meta，內容不遺失）。

## 5. 字級（守 impeccable 上限）

| 元素 | 尺寸 | 備註 |
|------|------|------|
| 名字（zh） | `clamp(3.5rem, 9vw, 6rem)` | 上限 96px＝impeccable 天花板；三字很穩 |
| 名字（en） | `clamp(2.5rem, 6vw, 4rem)` | "Chiang Jia Yuan" 較長，允許排成兩行 |
| 副標 | `clamp(1.25rem, 3vw, 1.75rem)` | semibold，墨黑 |
| eyebrow | 現有小字級 | letter-spacing 現制 |

- 名字字距 `-0.03em`（不破 impeccable 的 `-0.04em` 底線）。
- 名字 `font-semibold`（600，符合現制，不用 bold）。
- `text-wrap: balance` 於名字與副標。

## 6. 動態（衝擊的關鍵）

**招牌時刻＝名字遮罩上掀（unveil）**：
- 名字用 `clip-path: inset(100% 0 0 0)` → `inset(0 0 0 0)`，由下往上揭開，
  約 0.6s，easing `cubic-bezier(0.16, 1, 0.3, 1)`（ease-out-expo，Apple 決斷感）。
- 接續：副標淡入上移（delay ~0.15s）、按鈕列級聯進場（delay ~0.3s 起）。
- 捲動視差**保留**（名字/照片不同速率位移＋淡出，已於前一輪實作）。

**無障礙**：`@media (prefers-reduced-motion: reduce)` → 名字直接顯示（無 clip 動畫）、
副標/按鈕直接顯示、視差停用。這是硬要求，不可省。

## 7. 響應式

- 手機（≤640px）：名字用 `clamp` 縮到 min 3.5rem（三字仍清楚）；
  照片堆到名字/副標/按鈕**下方**（維持有臉，求職需要）；實測 375px 無橫向溢出。
- 桌機寬螢幕：沿用現有 `max-w-7xl xl:max-w-[1400px]`，兩側由 `wash-hero` 色暈填。

## 8. 中英同步（i18n）

新文案放 **`src/data/uiText.js`** 的 `zh.heroLine` / `en.heroLine`
（與現有 hero 相關字串同層，如 `resumeBtnOnePage`）。
**不放 cvData、不動 D1、不需 migration**——因為它是設計字串，且 `profile` section
是本人用 admin 管的 D1 內容，動它有蓋掉 admin 編輯的風險，避開。

名字本身沿用 `profile.name`（cvData，已存在）。

## 9. 要改的檔案

| 檔案 | 改動 |
|------|------|
| `src/data/uiText.js` | 新增 `heroLine`（zh + en） |
| `src/components/Hero.jsx` | 重構 JSX 成 D 版面；名字遮罩揭開；渲染 `t.heroLine`；保留視差；移除 title/bio 呈現 |
| `src/index.css` | 新增名字 unveil keyframes（clip-path）+ reduced-motion 對應 |

## 10. 設計規範遵循（自我約束）

- 不換色系（沿用 `#1D1D1F` / `#F5F5F7` / `#0071E3`）、不加深色主題。
- 無 slop：不加 eyebrow 濫用、不加 hero-metric 模板、不加漸層文字、不加裝飾格線。
- 字級/字距/easing 守 CLAUDE.md 設計規範與 impeccable 上限。

## 11. 驗證方式

- `npx vite build` + `npx vitest run` 綠。
- 本 session 瀏覽器截圖工具逾時 → 沿用 DOM/computed-style 量測驗證
  （名字 clip 動畫有跑、reduced-motion 有停、手機無溢出）。
- 真實進場動畫由本人在 Cloudflare **preview 分支**親眼確認後才合 main
  （沿用 2026-07-14 起的規矩：設計改動走 feature 分支）。

## 12. 明確不做（YAGNI）

- 不做 minimalist-hero 那類 framer-motion / shadcn 整包（技術棧不合、內容不對、撞 slop）。
- 不加照片濾鏡/滿版/去背等處理（照片維持現制）。
- 不動其他區塊、導覽、footer。
