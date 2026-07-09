# CLAUDE.md — 江嘉元個人網站

## 專案架構

React + Vite + Tailwind CSS 單頁應用，部署於 Cloudflare Pages。

```
src/
  data/
    cvData.json          # 所有內容（中文）
    cvData.en.json       # 所有內容（英文）
    uiText.js            # UI 標籤、按鈕文字
  components/            # 各區塊元件
  pages/
    ProjectDetail.jsx    # 專案詳情頁
    SkillDetail.jsx      # 技術詳情頁
  context/
    LanguageContext.jsx
    ActiveSectionContext.jsx
public/
  images/                # 各專案封面與圖片
```

**內容的唯一來源是 `cvData.json` 和 `cvData.en.json`，改內容只動這兩個檔案，不改元件。**

---

## Workflows

### W1：修改文字內容
1. 確認要改的是哪個欄位（`title` / `description` / `detail.purpose` 等）
2. 用 `Read` 讀取對應段落，找到精確字串
3. 用 `Edit` 做最小範圍的替換，不動周邊結構
4. 中英文同步修改（`cvData.json` + `cvData.en.json`）
5. `git add` → `git commit` → `git push`

### W2：新增專案
1. 在 `cvData.json` 的 `projects` 陣列中，找到正確位置（依時序或分類）
2. 照現有結構新增一個完整的 project 物件
3. `cover` 圖放 `public/images/<id>/cover.png`
4. 同步新增英文版到 `cvData.en.json`
5. Push

### W3：調整 UI / 樣式
1. 找到對應元件（`src/components/` 或 `src/pages/`）
2. 只改需要改的 className 或 JSX，不動資料邏輯
3. 維持現有設計規範（見下方「設計規範」）

---

## 寫作規則（最重要）

這個網站的所有文字必須**聽起來像人寫的，不像 AI 生成的**。

### 禁止用語
- 任何形容詞堆疊：「創新的」「突破性的」「強大的」「全面的」「無縫的」
- 模糊動詞：「利用」「運用」「賦能」「推動」「實現」
- 空話結尾：「以確保最佳效能」「提升使用者體驗」「實現卓越成果」
- 自我吹捧：「熱情的」「充滿熱忱」「對 X 充滿熱情」

### 寫作原則
- **具體 > 抽象**：寫「n=109，單中心」，不寫「小樣本醫療數據」
- **動作 > 狀態**：寫「設計了 Stay-Level CV 消除洩漏」，不寫「採用嚴謹的驗證方法」
- **數字 > 形容詞**：寫「AUROC 從 0.99 降至真實的 0.58」，不寫「顯著改善了準確性」
- **承認限制**：有邊界就寫出來，這比過度包裝更有說服力
- **第一人稱要自然**：「我負責」可以，「本人主導了」太正式
- **一句話說一件事**：不要在同一句話裡塞三個成就

### 測試方法
改完之後問自己：「這句話如果是朋友跟我說，聽起來自然嗎？」  
如果聽起來像 LinkedIn 貼文，重寫。

---

## 設計規範（Apple 官網實測數據，2026-07 對齊）

- 字型：`-apple-system / SF Pro`（Apple system font stack）
- 主色：`#1D1D1F`（深）、`#3F3F46`（內文）、`#6E6E73`（次要說明）、`#86868B`（弱化）、`#0071E3`（accent）
- 背景：`#F5F5F7`（淺）、`#1D1D1F`（深色區塊）
- 動畫：UI 互動 `duration-[240ms]`、內容 reveal `0.32s`，easing 一律 `cubic-bezier(0.4,0,0.6,1)`
- 標題字重：`font-semibold`（600，不用 bold），letter-spacing `-0.02em`
- 區塊標題：Apple 商店式「粗體開頭。灰色補述。」（SectionHeader 的 label + sub）
- 圓角：`rounded-[18px]`（卡片）、`rounded-[980px]`（CTA pill）、`rounded-full`（badge）
- 卡片：白底無邊框，hover 才出現陰影 `shadow-[rgba(0,0,0,0.08)_2px_4px_12px_0px]`
- Nav 高度：`h-12`（48px），frosted glass：`rgba(245,245,247,0.85) + blur(20px)`
- 內容寬度：`max-w-[980px]`（詳情頁）、`max-w-7xl`（首頁）

---

## Git 規範

- Branch：`main`（直接推，這是 Cloudflare Pages 的部署分支）
- Commit message：一行說清楚做了什麼，不需要列點
- 每次 push 前確認中英文都同步修改

---

## 常見任務對照

| 任務 | 要改的檔案 |
|------|-----------|
| 改專案描述 | `cvData.json` + `cvData.en.json` |
| 改 UI 文字（按鈕、標題） | `uiText.js` |
| 加新專案 | `cvData.json` + `cvData.en.json` + `public/images/<id>/` |
| 改樣式 | 對應的 `.jsx` 元件 |
| 改個人簡介 | `cvData.json` → `profile.bio` |
| 改履歷連結 | `public/resume-zh.html` |
