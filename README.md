# 個人互動式履歷網站

React + Tailwind CSS 打造的 Apple 風格個人履歷 SPA，所有個人資料集中在單一 JSON 檔，修改內容只需編輯 JSON，push 後 Netlify 自動部署上線。

**線上網址：** https://candid-cat-accf5c.netlify.app

---

## 快速開始

```bash
# 安裝依賴
npm install

# 本地開發（熱重載）
npm run dev
# 開啟 http://localhost:5173

# 打包確認（可選）
npm run build
```

---

## 修改個人資料

**所有內容只在這一個檔案：**

```
src/data/cvData.json
```

### 欄位說明

```jsonc
{
  "profile": {
    "name": "姓名",
    "title": "Hero 打字動畫顯示的職稱",
    "contact": {
      "email": "信箱",
      "phone": "電話",
      "location": "地點（顯示在姓名上方）"
    },
    "links": {
      "github": "GitHub 帳號（只填帳號名）",
      "linkedin": "LinkedIn profile ID（URL encode 過的中文也可以）"
    }
  },

  "education": [
    // 學歷卡片，兩欄並排
    { "school": "學校", "degree": "學位", "period": "期間" }
  ],

  "experience": [
    // 垂直時間軸，由上到下排列
    {
      "role": "職稱",
      "organization": "組織",
      "period": "期間",
      "description": "描述"
    }
  ],

  "skills_matrix": {
    // 四象限技術卡片，data_analysis 有藍色強調樣式
    "data_analysis": ["技能1", "技能2"],
    "programming":   ["技能1", "技能2"],
    "eda":           ["技能1", "技能2"],
    "manufacturing": ["技能1", "技能2"]
  },

  "projects": [
    // 專案卡片，metric 欄位（可選）會顯示藍色 badge
    {
      "id": "唯一識別碼",
      "title": "專案名稱",
      "period": "期間",
      "metric": "AUROC 0.97+",   // 選填，有填才顯示 badge
      "description": "描述",
      "tags": ["標籤1", "標籤2"]
    }
  ],

  "awards": [
    // 獲獎列表，由新到舊排列
    { "title": "獎項名稱", "year": "年份" }
  ]
}
```

---

## 部署

專案已連結 GitHub → Netlify 自動 CI/CD，push 到 `main` 就會自動部署。

```bash
# 方法一：快速儲存（自動帶時間戳 commit message）
npm run save

# 方法二：自訂 commit message
./deploy.sh "update: 新增 VAP 專案說明"

# 方法三：手動 git
git add .
git commit -m "你的說明"
git push
```

---

## 專案結構

```
personal-website/
├── src/
│   ├── data/
│   │   └── cvData.json          # ← 唯一需要編輯的資料檔
│   ├── components/
│   │   ├── Hero.jsx             # 打字動畫 + 聯絡連結
│   │   ├── Education.jsx        # 學歷卡片
│   │   ├── Experience.jsx       # 垂直時間軸
│   │   ├── SkillGrid.jsx        # 四象限技術矩陣
│   │   ├── ProjectShowcase.jsx  # 專案卡片
│   │   ├── AwardList.jsx        # 獲獎列表
│   │   └── SectionHeader.jsx    # 共用標題元件
│   ├── App.jsx                  # 組裝所有 section
│   └── index.jsx                # 入口
├── netlify.toml                 # Netlify 建置設定
├── deploy.sh                   # 一鍵部署腳本
├── tailwind.config.js
└── vite.config.js
```

---

## 技術棧

| 工具 | 版本 | 用途 |
|------|------|------|
| React | 18 | UI 框架 |
| Vite | 5 | 建置工具 |
| Tailwind CSS | 3 | 樣式 |
| Netlify | — | 自動部署 |
