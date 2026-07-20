# Codex 任務交接 — 內容 / 履歷 / D1（Hero 由 Claude 負責）

你（Codex）負責這個個人作品集網站的**內容正確性、履歷、D1 同步**。
Claude 同時在做 **Hero 重新設計**，只碰 `src/components/Hero.jsx`、`src/data/uiText.js`、
`src/index.css`（Hero 動畫區塊）。**請避開這三個檔以免衝突**——你的工作不需要動它們。

最高原則（跟 Claude 這幾天做的一致）：**沒有實據不寫上網站/履歷**。這批任務有幾個是
「修正未經證實或自相矛盾的宣稱」，請維持這條紅線，不確定的先問本人、不要臆測。

---

## 任務 1（🐞 已確認 bug）：英文履歷 PDF 命名錯誤，線上還是舊版 F072

**證據**：
- 你在 commit `626fbaa` 把英文履歷重建成 `public/resume.pdf` / `resume-full.pdf` /
  `resume-intern.pdf`（**孤兒檔，網站沒有任何地方連它們**）。
- 網站實際連的是 `resume-en.pdf` / `resume-en-full.pdf`（Hero 用 `/resume-en.pdf`、
  `/resume-en-full.pdf`），這幾個**沒被重建**，最後更新是 Claude 的 `240c6d5`＝**還寫 STM32F072**。
- 結果：招募官下載的英文一頁履歷還是 F072，跟中文履歷、網站內容、英文 `.tex`（已 F103）全部打架。

**要做**：讓 F103 版英文內容正確落到 `resume-en.pdf` / `resume-en-full.pdf` /
`resume-en-intern.pdf`（網站連的名字），並刪掉孤兒 `resume.pdf` / `resume-full.pdf` /
`resume-intern.pdf`。⚠️ 注意本人是用 **Overleaf** 編譯（見任務 2），最終 PDF 應以本人
Overleaf 產出為準——你可以把 `.tex` 與命名對映修對，PDF 產出跟本人確認流程。

## 任務 2（本人用 Overleaf → 字型設定要對 Overleaf）：還原 Arial、CJK 用 Overleaf 名

**背景**：本人履歷是 **LaTeX → Overleaf 編譯**（不是本機 TinyTeX）。
- 你在 `626fbaa` 把 `\setmainfont{Latin Modern Roman}` 改成 `\setmainfont{Arial}`，
  註解理由「TinyTeX 沒有 Latin Modern」——**但 Overleaf 內建就有 Latin Modern**，
  這個改動對本人工作流是不必要的降級。**還原成 `\setmainfont{Latin Modern Roman}`。**
- CJK 字型現在是 `\setCJKmainfont{Noto Sans TC}[AutoFakeBold=2.5]`（Claude 為本機 Windows 設的）。
  Overleaf 上正確的是 **`\setCJKmainfont{Noto Sans CJK TC}`**——它有**真正的 Bold 面**，
  所以 `AutoFakeBold` 這個 workaround 不需要了，拿掉。

**要做**：三份 `resume-zh*.tex` 的兩行字型改成 ↓（英文三份不吃 CJK，只需 Latin Modern）：
```latex
\setCJKmainfont{Noto Sans CJK TC}
\setmainfont{Latin Modern Roman}
```
改完請本人在 Overleaf 重編、覆蓋 `public/*.pdf`（含任務 1 的英文命名）。

## 任務 3（⚠️ 事實矛盾，需本人定真相）：AWS 演算法 XGBoost vs LightGBM

**證據**：
- BitoGuard 儀表板截圖 MODEL INFO 寫 **LightGBM**；本人確認「指標照著當前網站（儀表板）」
  ——AUC 83.2 / P 27.5 / R 33.2 / F1 30.1 / Acc 95.0（這些你已更新，**指標是對的**）。
- 但 `cvData.json` 的 aws-hackathon 內文寫「選用 **XGBoost** 而非深度學習」**出現 11 次**，
  附 XGBoost 專屬超參數（max_depth=8, lr=0.05, scale_pos_weight…）；tags 兩個都列。
- **矛盾**：部署跑 LightGBM，內文講 XGBoost + XGBoost 參數。招募官打開 dashboard 就穿幫。

**要做**：先問本人真相——(a) 競賽用 XGBoost、部署換 LightGBM？(b) 一直是 LightGBM、XGBoost 內文錯？
(c) 兩個都做了對比？依答案對齊 `cvData.json`/`cvData.en.json` 內文與超參數（中英同步）+ 產 migration。
**不要自己猜哪個對。**

## 任務 4（閃現 bug + D1 過期）：D1 profile 是六月舊版、缺 title

**證據**（本人剛用 wrangler 查證）：
- `SELECT json_extract(zh,'$.title') FROM sections WHERE key='profile'` → **空的**（D1 profile 無 title 欄位）
- `updated_at` = **2026-06-09**（D1 profile 從六月沒更新過）
- 現象：首頁副標「閃一下又消失」。機制：`DataContext.jsx` 先用程式碼 fallback 畫
  （profile.title=「軟硬整合 · 從 PCB 到韌體到資料」），再抓 D1（**無 title**）整包蓋掉 → 副標變 undefined 消失。
- 待查：本人手上有一條搜尋 query（找 `%軟體到韌體%` 在哪個 section/project），若有回傳代表
  某欄位真的有這串，一併對症；若空則閃現純粹是上述「程式碼副標被空 D1 蓋掉」。

**要做**（二擇一或都做）：
1. **內容修**：把現行 `cvData.json` 的 profile（含 title）同步進 D1（migration，`INSERT OR REPLACE
   INTO sections ... key='profile'`），讓 D1 不再是六月舊版。⚠️ 本人會用 admin 改 profile，
   動前先問本人「這段你有沒有用 admin 改過」，別蓋掉本人編輯。
2. **結構修（更根治）**：`fetchCV` 目前是「D1 section 存在就整包用、只有整段 null 才 fallback」，
   所以缺欄位（title）不會補。改成**物件型 section 以 `{...fallback[k], ...v}` 合併**
   （缺的欄位回退程式碼），**陣列型 section（education/experience/awards）維持整包替換**
   （不可對陣列做物件 spread，會壞）。這樣任何過期/部分 D1 section 都不再閃。

## 任務 5（履歷 MCU 宣稱的依據）：F103 是實測還是推斷？

你在 `d080400`（commit「Sync verified project facts」）把 QMK 專案 F072→F103 改遍全站，
並誠實重寫了選型故事（很好，這正是 Claude 在 PROGRESS 標記要做的）。但 commit 說 "verified"——
**請跟本人確認 F103 是用 `dfu-util -l` / 讀晶片 ID 實測確認，還是從 rules.mk 推斷的**。
履歷宣稱要站得住；若只是推斷，措辭要留餘地（Claude 的分析是「韌體以 F103 建置且能跑→幾乎確定 F1 系」，
方向支持 F103，但「幾乎確定」≠「實測」）。

## 任務 6（清理）
- 刪孤兒 `public/resume.pdf` / `resume-full.pdf` / `resume-intern.pdf`（任務 1 已涵蓋）。
- 未追蹤的 `AGENTS.md`、`tmp/`：確認是否要進 repo，不要則加 `.gitignore` 或刪。

---

## 分工邊界（避免跟 Claude 撞車）
- **Claude 只動**：`src/components/Hero.jsx`、`src/data/uiText.js`、`src/index.css`（Hero 動畫區塊）。**你別碰這三個。**
- **你動的**：`resume/*.tex`、`public/*.pdf`、`src/data/cvData*.json`、`src/context/DataContext.jsx`、`migrations/`、`src/pages/admin/*`。這些 Claude 不碰。
- `index.css`：你之前加的 `.spotlight-*` 在檔案中段，Claude 的 hero 動畫加在 Hero 區塊，兩者不同段落——若你不需再動 index.css 就最乾淨。
- 各自在自己的 commit/分支上做，合併時檔案集幾乎不重疊。
