# PROGRESS.md — 工作進度日誌

> **本檔案是跨 session 的工作記憶。**
> 規則（寫給 Claude，也寫給未來的自己）：
> 1. **每次 session 開始工作前，必須先完整閱讀本檔案**，確認目前進度、待辦與關鍵決策，再動手。
> 2. **每天工作結束前，必須在「工作日誌」新增當天的紀錄**（日期 + 做了什麼 + 決策 + 未完事項），然後 commit + push。
> 3. 「當前狀態」與「待辦清單」區塊要隨進度即時更新，不要只堆日誌。
> 4. 日誌由新到舊排列（最新的在最上面）。

---

## 📌 當前狀態快照（最後更新：2026-07-21）

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
- 中文履歷字體 = Noto Sans TC；LaTeX 編譯需 texlive-xetex + 抽出的 TC OTF
  （sandbox 重啟後要重裝：`apt-get install texlive-latex-recommended texlive-latex-extra
  texlive-xetex texlive-lang-chinese fonts-noto-cjk`，並用 fonttools 從 TTC 抽 TC 面，
  路徑 /usr/local/share/fonts/noto-tc/）。

### 專案現況（11 個，auto-sanitizer 已移除）
| 專案 | 狀態 | 備註 |
|------|------|------|
| （學歷）| 明志已從網站移除 | 網站+履歷皆無明志；南港高工保留 |
| vap | 內容已對齊投稿論文 | TensorFlow/Keras + IG（**不是** PyTorch/SHAP）；0.58 只屬 MIMIC-IV 探索實驗、**不在論文裡**，不得寫進履歷主張 |
| qmk-stm32-keyboard | 待補實測證據 | 「<5ms」與 5ms debounce 自相矛盾，等本人邏輯分析儀實測後改寫 |
| pcb-defect-detection | 待開 repo | 內容詳實但零 code 連結；圖片已精選至 11 張 |
| job-radar | OK | 已補 github 連結；定位=「精準判斷/每日 Top 6」；AI 輔助已標註 |
| analog-ic-studio | 待本人升級 | 已交付「電路識別 API + 自動量測」prompt 給本人執行 |
| aws-hackathon | ⚠️ 指標矛盾未修 | 頁面同時存在 P=9.83%/R=0.43% 與截圖 27.5%/33.2% 兩套數字，需寫成「競賽版→賽後版」敘事；缺 AI 標註 |
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
- [ ] QMK：邏輯分析儀實測「按鍵→HID report」延遲，波形截圖給 Claude 更新網站與履歷
- [ ] PCB 瑕疵檢測：開 GitHub repo（tiling/NMS/Flask 工具 code）
- [ ] VAP：做「MIMIC-IV 0.99→0.58 洩漏 demo」公開 notebook
- [ ] analog-ic-studio：用已交付的 prompt 實作電路識別 API（做完通知 Claude 同步網站）
- [ ] 定期喚醒 Streamlit（BitOGuard）與 HF Space（analog-ic）demo；確認 QMK YouTube 影片公開
- [ ] 多益（目標 850+）
- [ ] 確認 swerve 2022/2020 獎項的官方英文名稱無誤

### Claude 可代做（等指示）
- [x] QMK CI workflow 已交付 build.yml（2026-07-19，待本人放入 qmk repo）
- [ ] aws-hackathon 指標敘事重寫（需本人先確認兩套數字各屬哪個版本）
- [x] whack-a-mole 除錯故事改寫成敘事（2026-07-19，待本人跑 migration 0012）
- [ ] job-radar / analog-ic-studio 補 cover 與截圖（需本人提供截圖）
- [ ] per-route og meta（需 prerender 架構，工程量大，暫緩）
- [ ] VAP/QMK 面試模擬追問練習

---

## 📓 工作日誌（新→舊）

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
