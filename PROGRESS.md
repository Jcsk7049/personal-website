# PROGRESS.md — 工作進度日誌

> **本檔案是跨 session 的工作記憶。**
> 規則（寫給 Claude，也寫給未來的自己）：
> 1. **每次 session 開始工作前，必須先完整閱讀本檔案**，確認目前進度、待辦與關鍵決策，再動手。
> 2. **每天工作結束前，必須在「工作日誌」新增當天的紀錄**（日期 + 做了什麼 + 決策 + 未完事項），然後 commit + push。
> 3. 「當前狀態」與「待辦清單」區塊要隨進度即時更新，不要只堆日誌。
> 4. 日誌由新到舊排列（最新的在最上面）。

---

## 📌 當前狀態快照（最後更新：2026-09-26）

- **🟢 09-26 技能區壓縮成單屏雙欄矩形**：五類技能排成兩欄三列，第五類 Vibe Coding 跨兩欄；首頁每類展示兩項代表能力與其餘項目數量，完整清單仍可由卡片進入詳情頁查看。縮小標題、卡片內距與技能格；本機 1280×720 瀏覽器確認技能區高度 640px、完整落在同一視窗內。`npm.cmd run build` 與 `git diff --check` 通過；待 commit/push。

- **🟢 09-26 新增第五類技能「Vibe Coding 設計」**：根據 Job Radar、NKHS 樹木量測、TeamMatch、Analog Studio、Virtual Office 與 FRC 網站／韌體經驗，整理 LLM 協作、需求拆解、服務整合、迭代除錯及部署同步五項能力；新增雙語技能卡、詳情頁和管理介面分類。Build 與本機瀏覽確認通過；migration 0027 已同步 D1 且保留原四類資料；commit `29c86f6` 已部署至 Production，正式詳情頁可見五項技能。待更新本檔並推送。

- **🟢 09-25 新增 NKHS 校園樹木量測 PWA、補實際專案截圖**：新增中英文專案資料、sitemap 與 migration 0026；NKHS、Job Radar、Analog Studio、Virtual Office 封面改成真實瀏覽器畫面。`npm.cmd run build` 通過，migration 0026 遠端成功，commit `5e744cf` 已推 main；正式 API 已回傳 NKHS，四張 PNG 正式資源均 HTTP 200 且為 `image/png`。教師地圖需教師 Google 帳號；TeamMatch 本機缺 Firebase 設定，仍標示示意封面，待可用測試環境。

- **🟡 09-25 經歷／學歷／獲獎改為三欄並排**：獲獎列表調整成與經歷、學歷相同的黑底時間軸文字列，三欄同列呈現；保留 `#awards` 錨點，內容容器加寬以支援桌面三欄。待 build、push 與部署確認。

- **🟡 09-25 移除首頁幾何漸層、技能等級改用灰階填色**：首頁背景改為一致淺灰；技能方塊依基礎／熟悉／進階以淺、中、深鈦灰填色，文字按底色採深色或白色以維持對比。待 build、push 與正式部署確認。

- **🟡 09-25 獎項併入經歷區、白黑白黑區段**：獎項移入經歷／學歷的黑底區塊，保留 `#awards` 導覽錨點；專案區及卡片改白底，留言與頁尾接續黑底，形成白、黑、白、黑節奏。`npm.cmd run build` 與 `git diff --check` 通過；待 commit/push、正式部署確認。

- **🟡 09-25 全站鈦灰配色與背景混色**：介面強調色統一為鈦金屬灰 `#737C84`，文字／表面沿用黑白灰；技能、專案、獎項、按鈕、導覽與圖表移除分類彩色。多色只保留在首頁左側幾何漸層（低彩度砂色、霧藍、淡薰衣草色）。待 build、commit/push 與 Cloudflare 部署確認。

- **🟡 09-25 技能區滿版高度**：桌機技能欄延展至 Hero 可用的整個高度，四張卡等高填滿；標題與描述緊接，技能方塊增高並填滿卡片剩餘空間，格距固定；手機自然堆疊。待 build、commit/push、部署確認。

- **🟡 09-25 首頁技能區整合（本輪）**：依最新回饋改為左右雙欄：左側個人介紹與照片，右側技能分類；取消 Hero 與技能之間的全寬水平分隔。導覽與區塊標題統一稱「技能」，四分類直達詳情頁。按鈕、圖片與專案卡統一 8px 圓角。`npm.cmd run build`、`git diff --check` 通過；待 commit/push 與正式部署確認。

- **🟢 09-25 專案補齊與封面（前版紀錄）**：先前以示意圖暫補 Virtual Office、Job Radar、Analog IC Studio、TeamMatch 封面；本輪已將前三個可啟動專案換成實際截圖，TeamMatch 仍受缺少 Firebase 測試設定限制。

- **🟡 09-25 經歷／學歷左右留白**：再依最新參考圖將 Experience 內容限制在置中的 `max-w-[1024px]`，保留響應式內距；待 build 與部署確認。

- **🟡 09-25 個人網站全站 UI 與專案文案**：依本人回饋改成滿版、經歷／學歷下方放四列技術清單、其後以等寬網格滿版呈現 12 個專案；移除 Bento 跨欄與明顯圓角。中英文 12 個專案摘要及詳情重寫，調整 VAP、AWS、Job Radar、Analog 等舊敘述，migration 0025 已重產。再調整導覽區段：技能矩陣獨立滿版；經歷、技能、專案、獎項、留言各自至少佔滿導覽列以下一個視窗，錨點頂端與導覽列底端對齊。專案卡片 gap 28px、圓角 8px。最新視覺回饋：經歷／學歷與專案區恢復黑底，專案卡保留 8px 圓角；四個技術詳情頁改為有技能分類導覽、程度分布、索引與專案連結的深色技術目錄。`npm run build` 成功；此前瀏覽器已核對滿版錨點和卡片間距，本次只完成 build，未部署、未同步遠端 D1。

- **🟡 09-24 個人網站專案文案重寫**：本機中英文 12 個專案摘要已按可檢視來源整理；更新 VAP 研究定位、Job Radar 三來源描述、PCB 指標（mAP 82%），並隱藏目前無法啟動的 Analog IC Studio Demo。補查後以 `C:\find job agent` 確認 Job Radar 來源，以 TeamMatch 原始碼確認登入是 demo 身分切換；讀取 `C:\team7645-website-master\team7645-website-master` 的未提交版本後移除無法證實的 FRC 貢獻比例與效能數字。migration 0025 已產生，**尚未執行遠端 D1 或 push**。

- **🟢 09-12 VAP 紅線解除**：本人已與教授談過 GCCE，**教授定調「當作環境狀況過度理想化」**。
  履歷（6 份 .tex ＋ HTML）、網站 cvData、數位名片全部改成「獲 IEEE GCCE 2026 接受（poster）」，
  並附上視窗層 vs 病人層的兩組數字對照（AUROC 0.98–0.99 → 0.61–0.67）。已推 main。
  **文案一律用「評估條件過度理想化」這個框架**，跟教授的說法一致——不要寫成「論文錯了」。
- **⚠️ 09-12 更正 n=109 → 107（VAP 52／非 VAP 55）**：109 是論文與舊文件的錯誤，
  6 份履歷與網站全部寫錯，已一併改掉。（`C:\WORK SPACE\vap-research.md` 有記載。）
- **⚠️ 09-12 拿掉三項站不住的宣稱**：「杜絕 Data Leakage」、「顯著優於 LR/RF/SVM」、
  「突破 24 小時限制達成 72 小時超前預警」——都是在有洩漏的評估設定下才成立的。
  成果表的 Sensitivity/Specificity 兩欄也拿掉（複查後沒有對應新值）。
- **🟢 09-12 HTML 一頁履歷已可直接使用**（`public/resume-zh.html`，本人主用那份，已推 main 431ac3a）——
  含 GCCE poster、n=107、FRC 7645 官網，**專案 7 → 8**。就業博覽會用這份：Chrome 開啟 → Ctrl+P → 另存 PDF。
  **實測 294.2mm / A4 297mm，一頁內餘 2.8mm**（用瀏覽器實際渲染量的，不是估的）。
  ⚠️ 為了壓回一頁，FRC 這條**沒有技術標籤列**（那一列固定佔 4mm，加回去必爆），描述也砍短；
  線上網站連結改放標題列（標題列高度 17px 與其他 7 個一致，未換行）。
  想讓 FRC 這條也有標籤，就得拿掉 Swerve 騰空間。
  **本人 09-12 指定：履歷不要 emoji、不要顏色。** 9 個藍色宣告已全部換成灰階（連結／entry-org／proj-link／
  stag-a／stag-b／dl-btn），聯絡列的地點電話圖示與 5 個連結箭頭已移除；AWS 管線的 → 保留（語意需要）。
  **日後改這份履歷不要再加回彩色或 emoji。**
  同時補正兩處與公開 repo 對不上的事實：AWS 31 → 32 項行為特徵＋補上 LightGBM+XGBoost 0.6/0.4、
  獎項「黑客松完賽」→「進入決賽並完賽（無名次）」，與 migration 0021/0022 定案一致。
  ⚠️ 這兩處在 6 份 .tex 裡可能也還是舊的，之後要一起對。
- **🟡 09-12 FRC 官網已加進「中文一頁履歷」**（`resume-zh.tex`），**其餘 5 份 .tex 與 HTML 履歷還沒動**。
  **刻意不寫貢獻百分比**——本人主張 79–96% 但依據始終沒給，本機那份 repo 也證明不了。
  改為只寫追得到 commit 的具體成果：CMS.jsx 4,161 → 283 行拆成 12 個面板、
  hero preload 修正（慢速 4G LCP 改善 42%）、package-lock 不同步的 CI 修復、維修模式＋畢業生標記＋firestore.rules。
  同時把經歷段那條空泛的「重建團隊網站，減少重複的招商/外部詢問」整條移除（內容已升級進專案段，也省一行版面）。
  ⚠️ **版面風險未驗證**：本機無 xelatex，無法確認一頁是否放得下（淨增 5 行）。本人 Overleaf 重編時要確認；
  真的爆頁，最該拿掉的是 Swerve（2020–2023，最舊，且經歷段的「南港高工競賽選手」已涵蓋）。
  本機 `C:\Users\user\team7645-website-master\team7645-website-master` 只有 40 個 commit、
  全是本人、全在 08-07~08-18，**證明不了 196 筆或 79–96%**。`Jcsk7049/team7645-website` 對外 404。
- **🔴 09-12 六份履歷 PDF 尚未重編**：`.tex` 已改完，PDF 還是舊的（本機無 xelatex，要本人上 Overleaf）。
- **🔴 四個 migration 仍未上線**（09-02 就卡著）：`Authentication error [code: 10000]`。
  ⚠️ PowerShell 擋 `npm.ps1` → 用 **`npm.cmd run ...`**；wrangler 是全域裝的，不用 `npm install`。
  重試 → `wrangler.cmd login` → Dashboard 的 D1 Console 貼 SQL，三個層級依序試。


- **🟢 09-02 全部改完、已推 main（3ff5821），只差本人跑 4 個 migration**——依序：
  ```
  npm run db:migrate:bitoguard-ensemble:remote   # 0021（已修索引 bug，並補上線上缺的 pipeline）
  npm run db:migrate:aws-finalist:remote         # 0022
  npm run db:migrate:qmk-f103:remote             # 0023（新，F072 → F103）
  npm run db:migrate:skills-vap:remote           # 0024（新，skills_detail 整包 + vap 去「首個」）
  ```
  跑完線上 D1 就會與 repo 的 cvData 完全一致（已用線上實況快照 + node:sqlite 驗過，見日誌 09-02 §2）。
- **⚠️ 09-02 新增的協作事實：本人用 admin 改過 `skills_detail` 的 manufacturing 熟練度**——
  CNC 銑床 進階→基礎、Mastercam 熟悉→基礎、AutoCAD 熟悉→進階、金屬焊接 熟悉→基礎、雷射切割 熟悉→進階。
  **只改了中文、英文版沒跟著改**（線上中英不一致）。0024 已採「線上 zh 值為準」並補齊英文，
  repo 的 cvData 也已對齊。→ 再次驗證「sections 的真相在 D1，不是 repo」這條規則。

- **08-11 兩個 D1 migration 已寫好、已推 main、但「還沒上線」**——**指令已被上面 09-02 那條取代**
  （0021 當時的版本有索引 bug，別再照這條的兩行跑，要跑 09-02 列的四行）。
- **🔴 08-11 推翻 07-21 的「BitOGuard 沒有 Ensemble」定案**：公開 repo 的 `cv_report_lgb.json` 寫
  `"model": "LGB(0.60) + XGB(0.40)"`、`xgb_oof_auc 0.8265`——**最終提交就是 ensemble**（本人確認）。
  cvData 已改（migration 0021），特徵數同時 31→32。**教訓：履歷/網站的宣稱要跟公開 repo 對得上，面試官會點連結。**
- **🔴 08-11 FRC 官網分工比例懸而未決**：本人主張自己佔 79–96%（三個算法），但**全機掃不到那 196 筆 commit 的 repo**
  （唯一本機 repo 只有 34 commits、起於 08-07，且 commit 訊息自陳「08-07 前本 repo 不是 git 倉庫」；
  GitHub `Jcsk7049/team7645-website` 回 404）。`CMS.jsx = 283 行` 已驗 ✓。
  **cvData 維持 35% 未改，等本人給出那個 repo 的實際路徑。**
- **08-11 履歷【專案經歷】已重寫成「每一行追得到來源」版**，六條定稿全文在下方工作日誌 2026-08-11 §5。
  拿掉七項無來源宣稱（16 名學生／兩個完整賽季／兩屆已畢業／多語系架構／SEO／N-Key Rollover／會員認證系統）。
- **08-11 bitoguard-aml 的 README 已寫好但未 push**（本機無該 repo clone），檔案已交付本人。

- **~~🔴 08-11 VAP 論文獲 IEEE GCCE 2026 錄取（poster），但網站刻意「不」更新~~ → 已於 2026-09-12 解除**（教授已談，定調「環境狀況過度理想化」；履歷與網站都已更新）。以下保留當時的判斷脈絡：
  原因：`C:\WORK SPACEap-research.md` 記載本人已於 2026-07-13 自行推翻論文核心結果
  （索引 bug + stay-level 切分後 AUROC 0.98–0.99 → **0.61–0.67**、AUPRC 0.81–0.93 → **0.033–0.143**）。
  網站 outcome 段目前顯示的仍是**已被推翻的那組數字**（這狀態自 7/13 起就存在，非本次造成）。
  本 session 一度把狀態改成「已接受」並推 main（7c8700e），發現後已 **revert（be0a239）**、D1 migration 未執行、線上維持原狀。
  ⚠️ ~~在本人與林淑檀教授談完之前，不要再更新 VAP 的發表狀態~~（**已解除，見 09-12**）——「已接受」配上已知不成立的數字，比原本更糟。
  ⚠️ 審稿人 Reviewer 2 獨立問到「AUROC/AUPRC 是 per-window 還是 per-patient 算」——正是 7/13 找到的那個洞。

- **🆕 07-24 新增第 12 個專案 TeamMatch**（OpenAI Build Week 社群黑客松，2026-07-19，三人一天）。
  中英文 cvData、designTokens accent、sitemap、migration 0020 全數完成，**已推 main（3865a d2）**。
  ⚠️ 還卡兩件本人要做的事：① repo `CHU-BO-YU/teamder` 目前仍是 **PRIVATE**，
  網站的「在 GitHub 查看」現在對訪客是 404，要設 public（repo 不是本人開的，要先問過隊友）；
  ② `npm run db:migrate:teammatch:remote` 沒跑之前，線上 D1 還沒有這筆，網站看不到 TeamMatch。
- **07-24 決定不收錄**：AI 課程期中專案（水果分類 KNN/SVM）評估後不進作品集，理由見當日日誌。
- **✅ 07-24 完成**：Hero 底部捲動標示接上語言鍵（中文「往下更多」／英文 Scroll for more，
  `uiText.scrollHint`，**不碰 D1、不需 migration**），已推 main（792e5f2，乾淨 ff）；
  PROGRESS 待辦重複的 QMK 條目已去重；產出**面試模擬追問題庫**（VAP+QMK）。
- **⚠️ 面試題庫存在 `C:\WORK SPACE\面試模擬追問-VAP-QMK.md`，刻意不進 repo**——
  本 repo 是 **PUBLIC**（已用 `gh repo view` 確認），該文件含「哪裡容易講過頭」的地雷筆記，
  進 repo 等於公開自己的弱點。日後同類坦白筆記一律走 WORK SPACE，不要放 repo。

- **✅ 本 session 完成（07-21，Claude + Codex 雙線）**：① Hero 重設計（名字最大版：巨大「江嘉元」+ 墨黑主張「硬體到軟體，中間那段我來。」+ 名字揭開動畫）已上線 main；heroLine 在 uiText 非 D1。② 英文履歷三份 Claude 本機 TinyTeX 重編為 F103（純 LaTeX 無 CJK，`resume-en*.pdf` 不再 F072，commit a11cfb2）。③ BitOGuard 全站 XGBoost→LightGBM；技能拆成 LightGBM(BitOGuard)/XGBoost(DSP訊號課)、無 Ensemble。④ migration **0018/0019 已跑進遠端 D1**。⑤ profile.title 閃現雙重根治（Hero 移除副標 + 0018 補 D1 title）。
- **剩下（皆非急、備給 2026 秋冬校徵）**：中文履歷字型可選 Overleaf 升級（內容已 F103、僅 Arial→Latin Modern+Noto Sans CJK TC 外觀差異）；QMK 延遲量測（`QMK_LATENCY_SOP.md`，零硬體，純興趣）。
- **⚠️ 投實習的「時機」不歸本 session**：是 job-radar（求職時機權威）的事。job-radar 判定 7 月是暑修/鋪路期，2027 春實習主場、申請在 2026 秋冬校徵——現在投沒缺可接。personal-website session 只負責把網站+履歷備好，**不要再給投遞時機建議**（本 session 曾越權指揮、已被 job-radar 糾正）。

- QMK 的 STM32F103 為韌體目標推斷（F103 建置的韌體能運作），不是 `dfu-util`／讀晶片實測；可寫 STM32F103，但不得稱實測確認或 verified。

- **⚠️ 上面這條已於 2026-08-11 推翻，勿再依據**：原記載「BitOGuard 一直使用 LightGBM…沒有 Ensemble」。
  實際查公開 repo `github.com/Jcsk7049/bitoguard-aml` 的 `cv_report_lgb.json`：`"model": "LGB(0.60) + XGB(0.40)"`、
  `blend_weight_lgb: 0.6`、`xgb_oof_auc: 0.8265`——**最終提交就是 ensemble**（本人 2026-08-11 確認）。
  0019 依錯誤定案把 XGBoost 的 `projects` 清空，已由 **migration 0021** 更正；特徵數同時由 31 修正為 32（features 陣列實際長度）。
  **教訓：網站/履歷的宣稱要跟公開 repo 對得上——履歷連結面試官會點。**

- profile：本人已確認**未用 admin 改過** → migration 0018 已用 repo profile 覆蓋 D1（title 已寫入）；DataContext 也對物件型 section 做 fallback 合併。

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

### 🔴 08-11 新增（本人動手）
- [x] **0021 的索引 bug 已修**（09-02，commit 3ff5821）：那段 skills_detail UPDATE 直接移除，改由 0024 整包同步。
- [x] **0023_qmk_f103.sql 已開**（09-02）：F072 → F103，整包覆寫該列。
- [x] **0024_sync_skills_detail_and_vap.sql 已開**（09-02）：skills_detail 整包 + vap 去「首個」。
- [ ] **🔴 跑四個既有 migration 讓舊改動上線**（0021–0024）：`cd "C:\Users\User\personal-website"` 然後照順序：
      `npm run db:migrate:bitoguard-ensemble:remote` → `npm run db:migrate:aws-finalist:remote`
      → `npm run db:migrate:qmk-f103:remote` → `npm run db:migrate:skills-vap:remote`
      跑完可用 `curl "https://personal-website-1kf.pages.dev/api/projects?lang=zh"` 抽驗（不該再看到 `\n` 字面、F072、31 項）。
- [ ] **執行專案文案同步 migration 0025**：四個既有 migration 0021–0024 跑完後，再執行 `npm run db:migrate:project-copy:remote`。
- [ ] **給出 FRC 官網那 196 筆 commit 的 repo 路徑**（本人稱在本機非 Desktop），否則 cvData 的 35% 改不了
- [ ] **把 README 加進 `bitoguard-aml` repo 根目錄**（檔案已交付本人）
- [ ] **開 `bitoguard-aml` 的 `.kiro/steering/` 自己看一眼**——Kiro 的 steering 放專案指示，最可能有坦白筆記
- [ ] `bitoguard-aml` 的 `.claude/settings.local.json` 加進 .gitignore 並移除（含 `/c/AWS/*.py` 本機路徑）
- [ ] **08-12 與林書彥教授談 GCCE**——談完才決定 VAP 在履歷/網站怎麼寫；談完再去問 job-radar「這篇對路徑的價值」
- [ ] AWS 的 Streamlit 儀表板若還活著，把網址填進 repo 的 homepage 欄位（「已部署上線」已因無佐證而拿掉）
- [ ] 確認七項無來源宣稱哪些是真的（16 名學生／兩個完整賽季／兩屆已畢業／多語系架構／SEO／N-Key Rollover／會員認證系統），真的就補進 cvData

### 需要本人動手（Claude 無法代做）
- [x] **profile/LightGBM migration 0018 + 梯度提升技能 migration 0019** 已跑進遠端 D1（07-21）。
      ⚠️ **migration 0017（`qmk-aws`）不要跑**——它是 XGBoost 舊版，已被 0018（LightGBM）取代；
      若要確認 QMK F103 內容是否已在 D1，跟 Codex 對一下 0016/0017 的狀態。
- [x] 英文履歷三份已 F103（`resume-en*.pdf`，Claude 本機重編，commit a11cfb2）。
- [ ] **TeamMatch 上線前的兩件事**：① 把 `CHU-BO-YU/teamder` 設為 public（要先問過學長與另一位隊友，
      repo 不是你開的）；② 跑 `npm run db:migrate:teammatch:remote`（migration 0020，已用記憶體
      SQLite 驗過順序＋冪等）。順序建議：先設 public，再推 main，再跑 migration。
- [ ] 中文履歷字型升級（可選、非 correctness）：內容已 F103，僅 Arial→Latin Modern+Noto Sans CJK TC，
      需本人 Overleaf 重編三份 `resume-zh*.pdf`。
- [ ] QMK 延遲量測：照 `QMK_LATENCY_SOP.md` 做（**零硬體，不需邏輯分析儀**——
      原本「買邏輯分析儀」的計畫已作廢：QMK 圈權威數字(Stapelberg)全是韌體自我計時量的，
      且 24MHz 的 Saleae clone 對 USB FS 只有 2 samples/bit 根本解不出封包）
- [x] PCB 瑕疵檢測：公開 GitHub repo 已建立；2026-09-24 重新核對公開 README 指標（Precision 100%、mAP 82%）
- [ ] VAP：依 2026-09-19 稽核結論整理方法學展示，納入索引/時區/欄位問題與 metadata-only 負對照；不要再主張現有亞東資料可證明預測效能
- [ ] analog-ic-studio：用已交付的 prompt 實作電路識別 API（做完通知 Claude 同步網站）
- [ ] 定期喚醒 Streamlit（BitOGuard）與 HF Space（analog-ic）demo；確認 QMK YouTube 影片公開
- [ ] 多益（目標 850+）
- [ ] 確認 swerve 2022/2020 獎項的官方英文名稱無誤

### Claude 可代做（等指示）
- [x] 首頁效能優化：留言板延後載入、專案卡片 hover 移除 mousemove re-render（2026-07-21）
- [x] QMK CI workflow 已交付 build.yml（2026-07-19，待本人放入 qmk repo）
- [x] aws-hackathon 指標以 BitOGuard 儀表板版本重寫（2026-07-21，待本人跑 migration 0017）
- [x] whack-a-mole 除錯故事改寫成敘事（2026-07-19，待本人跑 migration 0012）
- [x] VAP/QMK 面試模擬追問題庫（2026-07-24）→ `C:\WORK SPACE\面試模擬追問-VAP-QMK.md`
      （每案 6 題追問樹 + 答題框架 + 地雷卡；**未做「實戰對練」**——本人想練再開一輪，
      由 Claude 扮面試官連續追問、抓踩線）
- [ ] TeamMatch：提供可用的 Firebase 測試設定或公開展示網址，才能截取完整運作畫面並取代示意封面（不要提供 production 私鑰）
- [ ] per-route og meta（需 prerender 架構，工程量大，暫緩）
- [ ] VAP/QMK 面試模擬追問練習

---

## 📓 工作日誌（新→舊）

### 2026-09-26（技能區壓縮與 Vibe Coding 排版）

- 技能首頁調整成兩欄三列，Vibe Coding 卡跨兩欄；每類保留兩項代表能力，其餘以數量提示，完整項目由詳情頁檢視。
- 縮小技能標題、卡片間距與技能小格；本機 1280×720 確認技能區高 640px，未超出首屏。`npm.cmd run build` 與 `git diff --check` 通過；待 commit/push。

### 2026-09-26（新增 Vibe Coding 技能分類）

- 依已完成專案整理 Vibe Coding 技能內容：LLM 協作開發、需求拆解與垂直切片、前後端與服務整合、迭代除錯／瀏覽器檢視、自動化部署與資料同步；描述保持具體並連回相關作品。
- 首頁技能網格加入第 05 類，更新中英文標題與副標、技能詳情分類導覽、管理介面類別名稱和鈦灰設計 token。
- 新增 migration 0027；先讀取正式 D1 現有技能資料再合併新分類，避免覆蓋後台已調整的熟練度或文字。
- 本機預覽確認第五卡與 `/skills/vibecoding` 詳情、五項能力和相關專案連結正常；`npm.cmd run build`、`git diff --check` 通過。D1 migration 0027 已更新四類既有區段並新增第五類，API 核對中英文資料；commit `29c86f6` 已推 main，Cloudflare Pages Production deployment `0e8e0ccd-f1e1-4aeb-8490-647f000bb2db` 已部署，正式詳情頁實機瀏覽可見完整內容。

### 2026-09-25（新增 NKHS 校園樹木量測並改用實際運動畫面）

- 依 `C:\NKHS tree map` README／交接資料新增 PWA 專案中英文介紹，加入 GitHub 與 GitHub Pages 連結、詳情及 sitemap；新增 migration 0026 與 remote 命令。
- 以瀏覽器擷取 GitHub Pages 樹木量測入口、Job Radar 正式儀表板、Analog Studio 本機 Flask 介面，以及 Virtual Office 每日模擬執行畫面；已更新中英文圖片來源、說明與 migration 0026。Analog 截圖只展示介面，沒有執行電路最佳化。
- 樹木教師地圖受 Google 帳號保護，未嘗試繞過登入。TeamMatch 本機缺 Firebase 設定，仍保留明確標成示意圖的封面；等待可用測試設定或公開展示環境。
- `npm.cmd run build`、`git diff --check` 通過；遠端 migration 0026 成功，commit `5e744cf` 已推 main。正式 API 可查到 NKHS 專案，四張新封面均以正確 PNG content-type 回應 HTTP 200。

### 2026-09-25（經歷、學歷、獲獎三欄並排）

- 依最新版面回饋，把獲獎欄從經歷區下方移到經歷與學歷旁邊；三欄共用黑底、欄標題和時間軸列樣式。
- 獲獎內容不再使用白色卡片；容器加寬並保留 `#awards` 導覽錨點。
- 待 build、差異檢查、push 與 Cloudflare Production 部署確認。

### 2026-09-25（移除背景漸層、技能方塊依熟練度填色）

- 移除首頁左側幾何漸層片，保留一致淺灰背景。
- 技能方塊依基礎／熟悉／進階改用淺、中、深鈦灰填色；深色方塊配白字，較淺方塊配深字。
- 待 build、差異檢查、push 與 Cloudflare Production 部署確認。

### 2026-09-25（獎項歸入經歷區、專案改白底）

- 將獎項內容放在經歷／學歷下方的黑底區塊，獨立導覽仍可跳至 `#awards`。
- 專案區與卡片改白底，調整篩選按鈕與文字為黑灰配色；留言區和頁尾改為黑底，串起白、黑、白、黑版面節奏。
- `npm.cmd run build` 與 `git diff --check` 通過；待推送並確認 Cloudflare Production 部署。

### 2026-09-25（全站配色統一為鈦灰）

- 依本人說明將鈦金屬灰 `#737C84` 套用於導覽、按鈕、技能、專案、獎項、履歷互動與圖表；分類色與藍色重點改為灰階，表面維持黑白灰。
- 首頁左側幾何背景採低彩度混色漸層（砂色、霧藍、淡薰衣草色），其他區塊背景改回中性灰階。
- 待 build、差異檢查與 Cloudflare 部署確認。

### 2026-09-25（技能卡減少文案周邊留白）

- 依本人截圖把分類卡內容改為由上往下排列，標題、說明和技能方塊靠近；技能方塊加高並在桌機填滿卡片剩餘高度，保留卡片內外固定間距。
- 手機仍依內容自然增高。待 build、部署確認。

### 2026-09-25（技能欄滿版並保留間距）

- 依本人截圖回饋，桌機 Hero 內技能欄取消多餘上下留白，利用整個可用高度；四張分類面板平均延展，面板間距及技能小方塊間距保留。
- 手機維持內容自然高度和上下排列，不強行拉高；待 build 與部署確認。

### 2026-09-25（技能方塊與首頁幾何漸變）

- 依本人提供的兩張參考圖，技能卡保留四分類與詳情連結，改成方塊式分類面板，並將各項技能拆成灰階小方塊；全部採黑白與鈦灰，無彩色分類。
- 在 Hero 左側背景加入低對比鈦灰幾何漸變色面，桌機集中於左側、手機延展為柔和背景；取代 Hero 原本藍紫色暈染。
- `npm.cmd run build`、`git diff --check` 通過；目前環境沒有 Playwright 套件，未做瀏覽器截圖檢視。待 commit/push 與部署確認。

### 2026-09-25（首頁標語換為 develop.ing）

- 依本人確認將首頁主張「硬體到軟體，中間那段我來。」替換為 `develop.ing`，中英文共用；字色套用鈦金屬灰 `#737C84`。
- 技能組視覺仍待本人選風格；本次不改技能分類設計。Build 與部署待確認。

### 2026-09-25（技能矩陣移入首頁 Hero）

- 依本人截圖把技能分類區整合到 Hero 內容下方，保留四個分類與原本技能詳情連結；導覽與標題改稱「技能」，副標換成較直接的描述。
- 所有按鈕、圖片、技能卡和專案卡統一 8px 圓角；桌機瀏覽器確認 Hero 含技能區、分類卡未重複，按鈕與圖片 computed radius 均為 8px。
- `npm.cmd run build` 與 `git diff --check` 通過；尚待同步 main 與正式部署確認，未改 D1 或內容資料。

### 2026-09-25（首頁改為左右雙欄）

- 依本人截圖回饋，移除 Hero 介紹與技能之間的全寬水平分隔，桌機改為左側個人介紹＋照片、右側技能分類；小螢幕改為上下堆疊。
- 保留技能分類卡與原詳情連結，技能錨點直接指向右側欄位。production build 與 `git diff --check` 通過；目前瀏覽器預覽 session 無法存取，未以瀏覽器驗收；待 commit/push 與部署。

### 2026-09-25（經歷／學歷左右留白微調）

- 依本人提供的參考圖，Experience 內容限制最大寬度 1024px 並置中，保留 `px-6 md:px-10` 內距；經歷與學歷共用容器。
- `npm.cmd run build` 與 `git diff --check` 通過；commit/push 待辦。

### 2026-09-25（技能詳情與深色區塊）

- 四個技術詳情頁改成深色技術目錄：分類導覽、技能程度分布、索引卡片與回連專案；保留原有中英文資料、返回行為與專案連結配對。
- 依本人最新說明，經歷／學歷恢復黑底，專案整區同步深色背景，卡片保留 8px 圓角和卡片間距，並提高文字與篩選器在深色底上的對比。
- 依截圖為首頁技術矩陣補上與其他區塊一致的左右內距（手機 24px、桌機 40px），標題、分類名稱和技能文字一起對齊。
- `npm run build` 通過。未跑測試套件；本次未部署、未執行遠端 D1。

### 2026-09-25（新增 Virtual Office 與專案封面）

- 確認此前列出的 12 個專案都已在網站，本次新增 Virtual Office（Pygame Windows 桌面程式，7 個工作室、16 個角色）；內容取自專案規格，不讀取或公開 `C:\WORK SPACE` 私人規劃紀錄。
- 為無封面的 Job Radar、Analog IC Studio、TeamMatch 補概念 SVG；Analog 封面依本人選擇製作電路示意，四張圖及詳情圖說都註明非實際畫面或模擬輸出。更新中英文 cvData、Virtual Office 顏色 token、sitemap 與 migration 0025。
- 遠端先確認 D1 原有 12 筆，再依序執行 0021 BitOGuard、0022 AWS、0023 QMK、0024 技能/VAP、0025 專案同步；五個 migration 成功。正式 `/api/projects?lang=zh` 回傳 Virtual Office 及新封面路徑，D1 現有 13 個專案。
- `npm.cmd run build` 成功；未跑測試套件。尚未 push，靜態封面仍待部署。

### 2026-09-25（滿版 UI 與專案文案改寫）

- 按本人指定將技術矩陣移入經歷／學歷區下方，以無卡片列式清單呈現；專案區接續其後，取消 Bento 跨欄，改成隨螢幕寬度填滿的等寬網格。首頁、專案詳情和技能詳情改用全寬內容區，移除明顯圓角。
- 重寫中英文 12 個專案摘要、目的、做法與成果；修正 BitOGuard 約 95% 貢獻比例、Job Radar 來源說明、VAP 方法描述等舊 copy，保留圖片、連結及專案資料結構。sections/profile/education/experience 未改，避免覆寫由 admin 維護的 D1 內容。
- 依本人補充釐清「顏色沒對齊」是點右上方導覽後，上方露出白色空帶。定位到 `scroll-padding-top: 4.25rem` 與區塊 `scroll-margin-top: 3rem` 疊加；改為只預留 48px 導覽高度。瀏覽器點「經歷」後量得 section top = nav bottom = 48px，區塊背景直接接續導覽列。
- 本輪再按本人意見調整各導覽目的區：技能矩陣移出經歷區獨立呈現；經歷、技能、專案、獎項、留言設定至少一個可視高度，點選後不露出相鄰區域。專案網格改 20/28px gap，卡片圓角 8px。瀏覽器桌機 1280×720 核對各區頂端對齊導覽列底端 48px，專案 radius 8px、gap 28px。
- 重產 migration 0025；中英文 project IDs 順序一致，共 12 筆。`npm.cmd run build` 成功。未跑測試、未部署、未執行遠端 D1，未 commit/push。

### 2026-09-25（個人網站 UI 全站重設計）

- 09-25 視覺回饋修正：依本人截圖將 Experience 從深色漸層區改為淺灰底＋深色文字，時間軸改中性灰，右側學歷使用獨立清單並以細分隔線建立層次。全站背景 washes 改純色，移除 DotNav、滑鼠追蹤光暈、相片旋轉框與 Hero parallax，卡片取消位移／縮放；保留單一藍色作為互動重點。production build 再次通過；檢查經歷背景 computed color 為 rgb(245, 245, 247)、390px 寬無水平溢出。

- 調整 Nav、Hero、ProjectShowcase，建立清楚的編輯型作品集層級；重整經歷、技能、獎項、留言區留白與互動視覺。
- 更新 ProjectDetail 標題比例、段落寬度和技術清單；新增全域色彩／排版 token、卡片狀態、手機斷點與 reduced-motion 規則。未改內容資料與 D1。
- 依 package-lock 執行 npm.cmd ci --ignore-scripts --no-audit --no-fund（260 packages；lockfile 未變），production build 通過。瀏覽器確認桌機首頁、390px 手機無水平溢出、英文類別過濾、TeamMatch 詳情四區正常，console 無錯誤。
- 未跑測試套件，未 commit/push，未部署；本機預覽可先供本人檢視。

### 2026-09-24（補查新增來源並修作文案）

- 閱讀 Job Radar 本機 README、Git 狀態及工作日誌；README 描述四來源，但與目前線上頁面及履歷草稿不一致，網站維持已確認的 104、Cake、LinkedIn 三來源，不寫每日筆數、公司數或 Top 6。
- 閱讀 TeamMatch SPEC 與原始碼：確認三人介面契約、活動報名與互按配對流程；本人部分為 demo profile 選取、個人檔案、導覽與整合配對頁時的 Firestore 長輪詢修正。明確註明沒有 Firebase Auth、尚未部署，公開前需正式驗證及安全規則。
- 檢視 FRC 新路徑之 Git 狀態與 CMS 修改；工作目錄有多項未提交變更，故未動來源檔，也不再沿用舊快照的 35% 和缺乏現況依據的效能數字。補上使用者指定 repo 連結，成果以目前可核對的功能描述。
- 重產 migration 0025；靜態檢查確認中英文 12 筆 ID 順序一致、JSON 可解析，SQL 含更新列。未跑測試套件、未執行遠端 D1、未 commit/push。

### 2026-09-24（專案文案依來源重寫；準備 D1 同步 migration）

- 檢視本機 Analog IC Studio、VAP、PCB 資料夾，公開 GitHub 上 BitOGuard、QMK、PCB 與可讀的 FRC7645website repo，以及 Job Radar/FRC 線上頁面。
- 中英文 12 個專案摘要重新撰寫；改寫 Job Radar 詳情以符合線上三個來源，重寫 VAP 研究目的、方法、結果、技術描述、經歷與 profile bio，並註明舊圖屬視窗層評估；PCB 詳情與圖說對齊公開 README 的 mAP 82%。
- Analog IC Studio Hugging Face Space 回報 RUNTIME_ERROR，網站資料的 demo URL 暫設為 null。
- 新增 migration 0025 及 npm script，預備整批同步所有 projects。未執行遠端 D1，未 push。
- 補查來源：Job Radar 工作目錄 `C:\find job agent`（README 與 Git 日誌數字版本不一，因此網站只保留可由 demo 確認的 104/Cake/LinkedIn 三來源）；TeamMatch `C:\Users\user\Downloads\teamder-main\teamder-main`（登入為 profiles 選取器，非 Firebase Auth，未部署且尚無正式安全規則）；FRC `C:\team7645-website-master\team7645-website-master`（有未提交修改，保留來源不動，移除無法從目前 repo 驗證的比例與效能宣稱，補上指定 GitHub URL）。`C:\WORK SPACE` 文件作為旁證，沒有改動。打地鼠／競賽機器人／Swerve 仍只有網站現有圖片，缺少原始工程或報告。


### 2026-09-12（GCCE poster 寫進履歷與網站；VAP 紅線解除；n=109 更正為 107）

**本人指示**：① 履歷加上 GCCE 投稿上 poster；② 新增作品集「團隊網站 team7645-website」。
問了三題後定案：VAP 選「兩件事一起改」（加 poster ＋ 同時處理被推翻的數字）。

#### 🔴 VAP 紅線解除
**本人已與教授談過，教授的定調是「當作環境狀況過度理想化」。** 08-11 立的那條
「談完之前不要更新 VAP 發表狀態」到此為止。文案一律依這個框架寫——講的是**評估條件過度理想**
（視窗層切分），不是造假、也不是「論文錯了」。這個用詞要跟教授一致，面試被追問時兩邊才對得上。

#### 改了什麼
| 檔案 | 內容 |
|------|------|
| `resume/*.tex`（6 份） | 經歷段與專案段的 VAP 全部改寫：加 poster、n=109→107、兩組數字對照 |
| `public/resume-zh.html` | 經歷列與專案卡兩處 |
| `src/data/cvData.json` / `.en.json` | vap 的 badge / description / purpose / concept / outcome / tech |
| `src/pages/Card.jsx` | 數位名片「GCCE 2026 投稿中 / Under Review」→ 接受（poster） |
| `src/pages/admin/ResumeTab.jsx` | 後台 seed 的 VAP 兩處；**順便刪掉漏網的「明志科技大學」** |
| `migrations/0024_*.sql` | 重新產生：vap 那段由「只拿掉首個」擴大為整列覆寫 |

#### 拿掉的三項宣稱（都是在有洩漏的評估下才成立的）
1. **「嚴謹驗證設計：Stay-level CV…杜絕 Data Leakage」**——`vap-research.md` 判定這個核心賣點並未兌現。
2. **「LSTM 在所有窗口皆顯著優於 LR、RF、SVM」**——同一套切分下算的，沒重跑就不能當效能主張。
3. **「突破文獻常見的 24 小時限制，達成 72 小時超前預警」**——建立在 0.98-0.99 上。

成果表改成「視窗層 vs 病人層」兩欄對照（6h 0.980/0.814 → 0.646/0.033；72h 0.987/0.921 → 0.614/0.143），
並註明只有 72h 跑滿 5 fold。**Sensitivity/Specificity 兩欄整個拿掉**——複查後沒有對應的新值，舊值同樣不可信。

#### 順帶抓到的兩個錯誤
- **n=109 是錯的，正確 107（VAP 52／非 VAP 55）**。6 份履歷 + 網站全部寫 109，已一併更正。
  （`vap-research.md` 的待辦「只改 README 與 CLAUDE.md、論文正本不動」是指 MIMIC try 專案，履歷網站不受該限制。）
- **`ResumeTab.jsx` 的 seed 還留著「明志科技大學」**——事實紅線說明志已從履歷移除，這個檔案是漏網的。
  它是 `api.get('resume')` 取不到資料時的 fallback（線上 `/api/resume` 目前回 `{"html":""}`，所以確實會用到 seed），
  不影響對外頁面（對外是 `public/resume-zh.html` 靜態檔），但 repo 是 public，原始碼看得到。已刪。

#### 驗證
- **LaTeX 結構**：本機沒有 xelatex（TinyTeX 已不在），改用「整檔括號/數學模式平衡 + 與 git HEAD 對照」。
  檢查器先自我測試（故意多塞一個 `{`，確認抓得到）再驗：6 份的括號淨值 0→0、`$` 數量、`resumeItem` 次數全部與改動前一致。
  ⚠️ **沒有實際編譯**，PDF 仍要本人到 Overleaf 重編。
- **D1**：重抓線上快照（12:24）灌進 `node:sqlite`，先確認測試不是空跑（線上仍是 Under Review / n=109 / F072 / 52 處字面 `\n`），
  再依序套 0021→0022→0023→0024：12 個專案 zh/en 全等於 repo、sections 全等、
  profile/education/experience/skills_matrix 未被動到、字面 `\n` 歸零、冪等通過。

#### 未完
- **FRC 官網作品集：中文一頁版已完成**（`resume-zh.tex`，專案段新增一條、經歷段移除一條，淨 +5 行）。
  素材來源是本機 `team7645-website-master` 的 40 個 commit，**每一句都對得回某個 commit**：
  ・CMS.jsx 4,161 → 283 行、拆成 CmsContext 共用層 + 12 個 panel（commit 12–31）
  ・hero preload 指到不顯示的圖 → 慢 4G LCP -42%（commit 5）
  ・package-lock 與 package.json 不同步害 `npm ci` 死在第一步 → Relock workflow（commit 7–10）
  ・維修模式全站閘門、畢業生標記、firestore.rules 權限防護（commit 38–40）
  **沒有寫任何百分比**——本人主張的 79–96% 依據未到，而 40 個 commit 只涵蓋 08-07~08-18，撐不起那個數字。
  尚未同步：`resume.tex`（英文一頁）、`resume-zh-full` / `resume-zh-intern` / `resume-full` / `resume-intern`、
  `public/resume-zh.html`（本人主用的 HTML 一頁版）。
  本機那份 `C:\Users\user\team7645-website-master\team7645-website-master` 只有 **40 個 commit、全是本人、
  全在 2026-08-07~08-18**，第一筆自陳「初始提交：固定上線前現況」，**證明不了 196 筆 commit 或 79–96%**。
  另外本人給的 `https://github.com/Jcsk7049/team7645-website` **對外是 404**，作品集連結先放
  `https://nkhs.team7645.com/`（本人指定）。
- **四個 migration 仍未上線**：09-02 那次跑 `npm run db:migrate:bitoguard-ensemble:remote` 撞到
  `Authentication error [code: 10000]`（D1 的 `/import` 端點；`wrangler whoami` 顯示 d1 write 權限正常）。
  已知是間歇性問題，建議重試 → 不行就 `wrangler.cmd login` 重新授權 → 再不行走 Dashboard 的 D1 Console 貼 SQL。
  ⚠️ PowerShell 擋 `npm.ps1`，要用 **`npm.cmd run ...`**；wrangler 是全域安裝的，不必 `npm install`。
- 六份 PDF 要本人在 Overleaf 重編（.tex 已改，PDF 還是舊的）。

---

### 2026-09-02（線上 vs repo 全面對源檢查：D1 落後三類差異＋發現 0021 會寫壞資料）

**做了什麼**：把線上（`personal-website-1kf.pages.dev` 的 `/api/projects`、`/api/sections/*`）
整包抓下來，跟 repo 的 `cvData.json` / `cvData.en.json` 做逐欄位 deep diff。工具腳本在
scratchpad（`diff.cjs` / `secdiff.cjs` / `scan.cjs`），非 repo 檔案。

#### 一致 ✓
- **前端 bundle 是最新 main**：線上 `index-kfYG3HYG.js` 含「往下更多」/「Scroll for more」（792e5f2）、
  TeamMatch（3865ad2）、Hero 主張「硬體到軟體…」（07-21）。Pages 部署沒落後。
- **12 個專案 id 完全相同**（TeamMatch 已在線上 → migration 0020 確定已跑）。
- **profile / education / experience / skills_matrix 完全一致**。
- 0016（QMK 移除延遲宣稱）確定已跑：線上 qmk 全文 0 處「延遲」。

#### 不一致（三類）
1. **0021 + 0022 未跑**（與待辦一致）：線上 aws-hackathon 仍是「LightGBM 單模 / 31 特徵 / 完賽」，
   缺「進入決賽並完賽（無名次）」與「三人團隊 95%」；awards[0] 標題也還是舊的；
   skills_detail 的 LightGBM/XGBoost 混合敘述也還沒上線。
2. **QMK F103 卡死**：線上整包仍是 **STM32F072 + DFU**（7 處 F072），repo 已是 F103 + stm32duino。
   唯一能修的是 **0017**，但 0017 被標記「不要跑」（含 XGBoost 舊版 aws 內容）。
   → **必須新開一個只做 F103 的 migration**，否則這個更正永遠上不了線。
3. **skills_detail 文風從未同步**：b7421ee（2026-06-10）把四個分類的 overview 與 24 項技能描述
   改成口語版，但只改 repo、沒產 migration → **線上至今顯示的是舊的正式書面版**（正好是 CLAUDE.md
   寫作規則要避免的那種語氣）。另 vap 線上仍寫「**首個**以台灣 ICU 真實資料驗證」，repo 已拿掉「首個」。

#### 🔴 兩個新發現（都需要動手，不是純落後）
- **A. 線上 aws-hackathon 的內文排版是壞的**：`detail.purpose/concept/outcome` 中英文合計 **105 處
  `\n` 是字面印在頁面上**（瀏覽器實地確認：「…資料集：\n・用戶資料：63,770 筆帳戶\n・…」整段擠成一團）。
  全站只有這個專案有此問題。**跑 0021 會順便修好**——0021 覆寫的正是這三個欄位（zh+en）且用真換行。
- **B. 🔴 0021 的 skills_detail 索引錯位，照現況跑會寫壞資料**：
  0021 假設 `$.data_analysis.skills[2]` 是 XGBoost，但**線上 D1 的排序是**
  `0 深度學習 / 1 LightGBM / 2 特徵工程 / 3 訊號過濾 / 4 數據結構化 / 5 XGBoost`
  （0019 把 XGBoost 附加在尾端；repo 的 cvData 才是 XGBoost 在 index 2）。
  直接跑 `db:migrate:bitoguard-ensemble:remote` 會把「**特徵工程**」的 desc 覆寫成
  「在 BitOGuard 與 LightGBM 以 0.4 權重加權混合…」、projects 砍成只剩黑客松，
  而真正的 XGBoost（index 5）仍是舊描述。**跑之前要先把 0021 的 `skills[2]` 改成 `skills[5]`**
  （或改成用 json 路徑以 name 定位）。projects 表與 awards 的路徑則對得上，沒問題。

#### 其他順帶確認
- `CHU-BO-YU/teamder` 仍 **404（private）** → TeamMatch 卡片的「在 GitHub 查看」對訪客還是壞連結（待辦①未動）。
- `Jcsk7049/bitoguard-aml` 200（public）✓。

#### §2 同日下半場：本人說「全改」→ 四項全部修完並推 main（3ff5821）

**改了什麼**
| 檔案 | 內容 |
|------|------|
| `migrations/0021_bitoguard_ensemble.sql` | 移除會寫壞「特徵工程」的 `skills_detail` UPDATE（改由 0024 整包做）；補上線上缺的 `$.detail.pipeline`（zh+en，八格 AWS 管線圖資料） |
| `migrations/0023_qmk_f103.sql`（新） | QMK 專案 F072 → F103，`INSERT OR REPLACE` 整列。**先驗過線上該列 === 0016 寫入的內容**（bit-for-bit），確認沒有 admin 手改才敢整包覆寫 |
| `migrations/0024_sync_skills_detail_and_vap.sql`（新） | `skills_detail` 整包同步（b7421ee 口語版終於上線、XGBoost 移回 index 2、0.6/0.4 混合敘述一併帶上）＋ vap 拿掉「首個」 |
| `src/data/cvData.json` / `.en.json` | manufacturing 五項熟練度對齊線上 admin 值 |
| `package.json` | 新增 `db:migrate:qmk-f103:remote`、`db:migrate:skills-vap:remote` |

**過程中查出的第三件事（原本沒發現）**：`skills_detail.manufacturing` 有五項熟練度**線上與 repo 不同**，
且**只有中文被改、英文沒改**。用 `git show b7421ee^:src/data/cvData.json` 三方比對確認：repo 從頭到尾都是舊值，
線上的新值是**本人用 admin 後台改的**（CNC 銑床 進階→基礎、Mastercam 熟悉→基礎、AutoCAD 熟悉→進階、
金屬焊接 熟悉→基礎、雷射切割 熟悉→進階，方向上是誠實下修）。依「D1 是 sections 的真相」規則，
0024 採線上 zh 值、補齊英文，repo 也回寫對齊。

**驗證方式（可重現）**：`node:sqlite`（Node 24 內建，不用裝 better-sqlite3）建記憶體庫，
把當天抓下來的線上 API 回應原樣灌成 `projects` / `sections` 兩張表，當作「線上實況快照」，再套 migration。
- **紅**：用**修改前**的 0021 跑 → 「特徵工程」的 desc 被 XGBoost 內容覆蓋、projects 被砍成只剩黑客松，
  而真正的 XGBoost（index 5）還是舊描述。**bug 從推論升級為實測**。
- **綠**：0021→0022→0023→0024 依序套完 → 12 個專案 zh/en 全等於 repo cvData（物件鍵序不計，
  vap 的 `featured` 位置是 0015 留下的舊鍵序，不影響前端）、skills_detail/awards 全等、
  profile/education/experience/skills_matrix 未被動到、字面 `\n` 由 **105 → 0**、連跑兩輪結果相同（冪等）。
- 驗證腳本留在 scratchpad（`harness.cjs` / `red.cjs` / `green.cjs`），**沒進 repo**——它依賴當天的線上快照，
  放進 repo 會變成會過期的假測試。要重驗就重抓一次 API 再跑。

**還沒做的**：四個 migration 要本人在自己電腦跑（sandbox 無 `CLOUDFLARE_API_TOKEN`）；
`CHU-BO-YU/teamder` 仍 private（這件事 Claude 無法代做）。

---

### 2026-08-11（VAP 獲 GCCE 錄取但網站不更新；BitOGuard 推翻無-Ensemble 定案；履歷全面對源）

#### 1. VAP 獲 IEEE GCCE 2026 錄取（poster）——**網站刻意不更新**

- paper #1571300279，題目 `LSTM-Based Early Prediction of VAP Using Stay-Level Cross-Validation and an Extended Prediction Window`，神戶，poster（通知明言部分 oral 因場地改 poster，與品質無關）。
- 依 W1 更新中英文 cvData 共 8 處 + migration 0021，本地 D1 fail-then-pass 全過，推上 main（7c8700e）。
- **隨後讀 `C:\WORK SPACE\vap-research.md` 才發現論文核心結果已被本人於 2026-07-13 推翻**
  （索引修正 + stay-level 切分後 AUROC 0.98–0.99 → **0.61–0.67**、AUPRC 0.81–0.93 → **0.033–0.143**）。
  立即 **revert（be0a239）** 並推上線，**D1 migration 從未執行**，線上維持「Under Review」。
- **審稿人 Reviewer 2 獨立問到「AUROC/AUPRC 是 per-window 還是 per-patient 算」——正是 7/13 找到的那個洞。**
- 在本人與林書彥教授談完（2026-08-12）之前，**不要再更新 VAP 的發表狀態**。
- vault 卡片把教授寫成「林淑檀」是錯的；cvData 的 **林書彥** 才對（錄取信署名 Prof. Shu-Yen Lin）。
- 網站 outcome 段的效能表仍是已被推翻的數字（此狀態自 7/13 起就存在），需單獨一輪處理。

**教訓**：改任何跟某專案有關的網站內容前，先讀該專案在 `C:\WORK SPACE\` 的卡片。
這次技術驗證很紮實（本地 D1 fail-then-pass），但**驗的是「改對了嗎」不是「該不該改」**。

#### 2. BitOGuard 推翻 2026-07-21 的「沒有 Ensemble」定案（migration 0021）

查公開 repo `github.com/Jcsk7049/bitoguard-aml` 的 `cv_report_lgb.json`：

- `"model": "LGB(0.60) + XGB(0.40)"`、`blend_weight_lgb: 0.6`、`xgb_oof_auc: 0.8265`
- **最終提交就是 ensemble**（本人 2026-08-11 確認）。0019 依錯誤定案把 XGBoost 的 `projects` 清空，已由 0021 更正。
- 特徵數同時 **31 → 32**（`features` 陣列實際長度）。
- 5-fold AUC **0.819–0.849**、F1 0.27–0.32、正例率 3.21%（訓練集 51,017 人／人頭戶 1,640）。
- 履歷的 63,770 帳戶 ✓、413,235 筆交易 ✓（195,601 台幣 + 217,634 USDT/TWD，加起來剛好）。

**教訓：網站/履歷的宣稱要跟公開 repo 對得上——履歷連結面試官會點。**

#### 3. AWS 黑客松事實補正（migration 0022）

本人確認：**AWS 是今年（2026）**、**進入決賽並完賽、無名次**、**三人團隊本人技術貢獻約 95%**。
獎項標題與專案描述已改；本地 D1 fail-then-pass 已驗（獎項總數 5 不變）。

#### 4. 兩個 migration 都還沒上線

```
cd "C:\Users\User\personal-website"
npm run db:migrate:bitoguard-ensemble:remote
npm run db:migrate:aws-finalist:remote
```

#### 5. 履歷【專案經歷】重寫為「每一行都追得到來源」版

以 cvData 為準核出 10 處對不上。**拿掉且尚無來源**：`16 名學生`、`兩個完整賽季`、`兩屆已畢業`、
`多語系架構`、`SEO`、`N-Key Rollover`、`會員認證系統`（後者依 cvData 的 35%/65% 分工判為學長所做，
但該分工比例本身已受質疑，見 §6）。**修正**：FRC 技術指導 2025→**2023**（本人少寫兩年）、
AWS 2025/03→**2026**、Swerve 2021-2022→**2020-2023**、QMK 的 GitHub 連結 cvData 早就有。

定稿六條：

```
FRC Team 7645 官網與後台 CMS｜前端開發                    2025
https://nkhs.team7645.com
· 35% 程式碼貢獻（學長主導核心架構與 Auth 系統）  <- 此比例待重驗，見 §6
· 首頁改版、留言系統端對端（Contact → Firestore → CMS 管理）、組別身分系統
· Code Splitting 把 JS bundle 從 2.7MB 降到 820KB；Cloudflare Pages 部署、TBA API 30 天快取

FRC Team 7645｜Engineering Advisor & Systems Integrator   2023–迄今
· 過往負責機器人系統架構：多感測器融合、PID 馬達閉迴路控制調校、軟硬體介面定義
· 現轉營運指導：引入 LLM 輔助除錯，把反覆試錯的韌體除錯流程縮短約一週
· 把根因分析的除錯思路教給後進

ICU VAP 早期預測：試驗性方法論驗證研究                     2025.05–迄今
元智大學 林書彥教授實驗室｜實驗室專題生
· 識別 PREDICT 2025 基準採 Window-level CV 造成的 Patient-Level Data Leakage
· 改以 Stay-Level 5-Fold Stratified CV 建立無洩漏評估
· Integrated Gradients 消除數學共線冗餘特徵（mv≡Vt×RR），14 項篩至 4 項非侵入指標
· 單中心試驗性驗證（亞東紀念醫院 ICU），定位為方法論驗證，非臨床部署產品
  <- 刻意不寫 GCCE、不寫 AUROC，等 08-12 談完再決定

QMK × STM32 數字鍵盤｜開源硬體整合                        2026
https://github.com/Jcsk7049/qmk-stm32-keyboard
· 逆向工程 ChibiOS HAL 三件組（chconf/halconf/mcuconf），重構設定檔解決編譯衝突與時序問題
· 實現 USB HID 穩定識別、WS2812B RGB Matrix、VIA/VIAL 即時改鍵
· PCB 設計（EasyEDA Pro）→ 韌體 → 實體成品

AWS × BitoPro 黑客松：BitOGuard｜反洗錢偵測              2026
https://github.com/Jcsk7049/bitoguard-aml
· 三人團隊，負責約 95% 技術開發；進入決賽並完賽（無名次）
· S3 → Glue → Athena → SageMaker → Lambda → Bedrock 六服務端對端管線
· 63,770 帳戶 / 413,235 筆交易，32 項行為特徵（含圖論黑名單鄰居）
· LightGBM + XGBoost 0.6/0.4 加權混合，5-fold AUC 0.82–0.85
· SHAP 合規報告識別人頭帳戶，Streamlit 儀表板

Swerve Drive 全向輪控制研究                              2020–2023
· 從零自行開發三代 FRC 競賽全向輪底盤
· 運動學演算法、齒輪傳動設計、CNC 精密加工、LabVIEW PID 控制
· 2022 FRC 台灣鴻海區域賽：Innovation in Control Award、亞軍聯盟 (Finalist)
```

「95%」會被追問「另外兩人做什麼」，先想好答案。「已部署上線」已從 AWS 那條拿掉——repo 的
`homepage` 欄位是空的、無公開網址佐證；還活著就把網址填進 repo homepage，再加回來。

#### 6. FRC 官網分工比例：本人主張 79–96%，但**證據找不到**，cvData 維持 35% 未改

本人提出三個算法：commit 數 21%/79%、存活程式碼 ~11%/~89%、時間跨度 ~4%/~96%
（基準：全 196 筆 commit、學長 81 筆為共做那週對半分、起手週留下 36 檔／今天 169 檔、
共做 7 天 vs 獨作 73 天 05-31～08-11、`CMS.jsx 4161→283`）。

**獨立查證結果**：
- 已驗：`CMS.jsx` 現為 **283 行**，與主張的後半吻合
- 未找到：全機 maxdepth 6 掃過所有 git repo，**沒有任何一個是 FRC 網站的 196 筆歷史**
  （>40 commits 的只有 flutter 87676／qmk_firmware 29261／token-optimizer 612／
  personal-website 354／_pw_tmp 262／find job agent 183）
- 無 D/E/F 磁碟；`C:\FRC7645website` 不存在（只剩 stale session 目錄）
- GitHub `Jcsk7049/team7645-website` 回 **404**
- 唯一本機 repo `Desktop\team7645-website-master\team7645-website-master` 只有 **34 commits、起於 2026-08-07**，
  且第二個 commit 訊息是「WORKLOG：更新『**本 repo 不是 git 倉庫**』的過時註記」
  → **08-07 之前這專案沒進版控**，196 筆不可能是這份 repo 的歷史

**最合理解釋**：那 196 筆是**學長原本那個 repo** 的歷史（含他的 81 筆），本人取用程式碼後本機無版控做了兩個多月，8/07 才 git init。

**下一步**：本人堅稱在本機非 Desktop 路徑，**需本人直接給路徑**，才能驗完三個算法並改 cvData。
這與 VAP 是同一個失效模式：**數字很可能是真的，但證據不在手上，被追問會答不出來。**

**附帶判斷**：學長每月出 300 元網域費當贊助、支持本人日後賣掉網站（優先賣港工，賣其他隊要先移除港工專屬內容做成通用模板）
→ 學長是贊助者兼支持者，不是共同所有人，**寫高貢獻度沒有人際衝突風險，問題純粹是舉證**。
「日後賣掉／通用模板」現在不寫進履歷（是計畫不是成果）；真的成交才是強項。

#### 7. bitoguard-aml 的 README 已寫好但**未 push**

本機沒有該 repo 的 clone，不擅自 clone。檔案已傳給本人，內容全部取自 repo 內的
`cv_report_lgb.json` 與 `COMPLETE_DATA_FLOW_REPORT.md`，無編造數字。

#### 8. GCCE 對未來路徑的價值 → 不在本 session 回答

求職規劃判斷權威在 `C:\find job agent`（job-radar）。已給本人「問 job-radar 時該帶的事實表」：
poster 非 oral、Reviewer 1 (4/3/4/3)、Reviewer 2 (4/3/3/**2**)、兩位都給 Novelty **Incremental (3)**、
成本含註冊費。**關鍵：價值取決於 08-12 談出什麼**——「有一篇 IEEE 論文」與
「有一篇 IEEE 論文且自己找出核心結果不成立並主動處理」是兩種資產。

#### 9. 三個 GitHub 待辦

- `CHU-BO-YU/teamder` 實測仍 **404**，TeamMatch 的「在 GitHub 查看」對訪客是死連結
- `bitoguard-aml` 的 `.kiro/steering/` 未查——Kiro 的 steering 放專案指示，最可能有坦白筆記，本人自己開來看
- `bitoguard-aml` 的 `.claude/settings.local.json` 被 commit，含 `/c/AWS/*.py` 本機路徑，建議 gitignore + 移除

### 2026-07-24（AI 課程期中專案評估 → 決定不進網站）
- **標的**：`C:\AI_classes_midtermproject--main\AI_classes_midtermproject--main`
  ＝ 水果影像分類（KNN / SVM），AI 課程期中專題，2026-05。
- **本人原以為還沒推 GitHub，實際上早就推了且是 PUBLIC**：
  `https://github.com/Jcsk7049/AI_classes_midtermproject-`（結尾有個 `-`），2026-05-09/10 推的。
  ⚠️ **本地反而落後 origin 一個 commit**（`Rewrite README with accurate technical explanations`
  只在遠端），且本地 `fruit_classification_colab.ipynb` 有未提交修改（+49/−38）。
  要同步是 `git pull` 不是 push——本人自行決定要不要處理，本 session 沒動那個 repo。
- **實際成果（從 notebook output 抽，README 沒寫）**：KNN 測試 Accuracy 99.29%（最佳 K=1）、
  SVM **100.00%**（linear, C=0.01，CV 也 1.0000），測試集 140 張。
  特徵 = HOG + RGB/HSV 直方圖約 1910 維；另有 OOD 偵測（信心門檻 52%）。
- **決定：不放進網站專案列表**（本人拍板，採納 Claude 建議）。理由：
  ① 100% + K=1 最佳 + CV 1.0 是**資料集太乾淨**的徵兆（Fruits-360 白背景、旋轉台、單顆水果、
  四類顏色分得開），不是模型強——寫「100% 準確率」進作品集反而扣分；
  ② 課程級 scikit-learn 分類，與 VAP／AWS／analog-ic-studio 同列會稀釋密度；
  ③ 核心程式碼的 commit 作者是 `Claude <noreply@anthropic.com>`，誠實標註後說服力更弱。
  **本人自述當時就知道這題太簡單**（非事後補的認知），所以這條敘事本身站得住，
  日後若要用，走「我不信好到不真實的數字」那條線（與 VAP 的 0.99 洩漏呼應），而不是誇準確率。
- **未來 session 注意**：看到這個資料夾不用再評估一次，結論在此。

### 2026-07-24（新增專案 TeamMatch，已推 main）
- **來源**：本人 07-19（週日）跟 FRC 學長＋其同學三人打 OpenAI Build Week 社群黑客松的作品，
  repo `CHU-BO-YU/teamder`（**PRIVATE**，WebFetch 抓不到，全程用 `gh api` 讀）。
- **查證到的事實**（都有一手依據，不是聽轉述）：
  - 25 個 commit 全落在 2026-07-19 UTC 04:02–06:37（台北 12:02–14:37）；三位作者
    CHU-BO-YU / Alexchen93 / **Jcsk7049（本人 15 個，最多）**。
  - 本人＝Person A（`app/login/`、`app/profile/`、`components/Navbar.tsx`、`lib/firebase.ts`）
    ＋**整合者**（`codex/integrator` 分支、三個 `chore: integrate ...` 收尾 commit）。**本人已確認**。
  - Next.js 16 App Router + TypeScript + Tailwind + Firebase Firestore；README 說要部署 Vercel
    但 repo 沒填 homepage、**沒有 demo 網址**。
  - `SPEC.md`＝開工前凍結的介面契約（5 個 collection、camelCase、複合 Document ID、API 簽名、
    路由）——這是這個專案最值得寫的地方，不是「用了 Firebase」。
  - 除錯點：`lib/firebase.ts` 有 `experimentalForceLongPolling: true`，配上 commit
    `fix: use Firestore long polling` 與前一則 `...before Firestore network fix`
    → 「Firestore 連不上、改長輪詢才通」為實。**「預設 WebChannel 串流建不起來」是我的推斷**
    （改了就好＝原路不通），本人若記得現場實況可再修文案。
- **本人拍板**（AskUserQuestion）：repo 會設 public → 寫 github 連結；角色＝Person A ＋整合者；
  **沒名次**（不給 badge、不寫成績）；AI 輔助工具＝**Codex**（依紅線標註，格式同 job-radar）。
- **改了什麼**：`cvData.json` / `cvData.en.json` 新增 `teammatch`（插在 aws-hackathon 之後、
  category 大學校外作品、無 cover／無 demo／無 badge）、`designTokens.js` 補 accent
  （pink→fuchsia，原本沒登記會 fallback 成灰）、`sitemap.xml` 補一條、
  **`migrations/0020_add_teammatch.sql`** ＋ `db:migrate:teammatch:remote`。
- **驗證**：① migration 用 `node:sqlite` 記憶體庫種入現行 11 筆跑過——before 無 teammatch →
  after 正確插在 aws-hackathon 之後且其餘相對順序不變 → **重跑一次順序不變（冪等）**，
  zh/en 反解回 JSON 與 cvData 逐欄相等（單引號 escape 正確）。migration 用
  `sort_order > (SELECT ... 'aws-hackathon')` 而非寫死數字，不依賴 D1 現值。
  ② `vite build` 過、`vitest` 5 檔 14 測全綠。③ dev server 實跑：首頁 12 張卡順序正確、
  中英文詳情頁都完整渲染、「在 GitHub 查看／View on GitHub」指向正確網址、console 零 error。
  ⚠️ **瀏覽器 screenshot 又逾時**（07-14/07-18/07-21/07-24 第五次），改文字擷取驗證。
- **刻意沒做**：`portfolio-content.md` 沒同步——它的專案清單早就落後（只有 9 個、缺 job-radar／
  analog-ic-studio／pcb，還留著已移除的 auto-sanitizer）。補一節只會讓它看起來是同步的。
  要嘛整份重建，要嘛別碰。
- **未 push**：等本人把 repo 設 public 再推，否則線上會出現 404 的 GitHub 連結。

### 2026-07-24（Hero 捲動標示 + 面試題庫，session 於此清空）
- **Hero 底部捲動標示語言化**（commit 792e5f2，已上 main）：原本寫死英文 `Scroll`，中文版也顯示
  英文。改為 `uiText.scrollHint`（zh「往下更多」／en「Scroll for more」），字級 10→11px、
  字距 0.2→0.15em 讓中文好讀。位置/細線/捲動 80px 後淡出全部沿用。
  **不碰 D1、不需 migration**（同 heroLine 前例）。
- **驗證**：dev server 實跑，`get_page_text` 從真實頁面抓到「往下更多」已渲染、console 零 error。
  ⚠️ 瀏覽器 **screenshot 工具再次全逾時**（07-14/07-18/07-21 同症狀，已是慣性問題）→
  改用頁面文字擷取驗證。純文案/樣式改動無邏輯分支，未加自動化測試（已向本人說明並放行）。
- **推送方式**：本 worktree 在 `claude/personal-website-optimization-fbca13`，但發現
  **local `main` ref 是舊的（2d02b5f），origin/main 早已在 308e0a8** ＝ 本分支 HEAD。
  故 `git push origin HEAD:main` 是**單 commit 乾淨 fast-forward**，沒夾帶其他東西。
  （教訓：worktree 裡判斷「會推上什麼」要看 **origin/main**，不能看 local main。）
- **PROGRESS 去重**：待辦清單裡 QMK 延遲量測重複貼了兩份，併回一份。
- **面試模擬追問題庫**（VAP+QMK）：每案 6 題追問樹＋答題框架＋地雷卡，全部以 repo/論文
  查證事實為底。**刻意不進 repo**——`gh repo view` 確認本 repo 是 PUBLIC，該文件含
  「哪裡容易講過頭」的自我弱點筆記，公開等於自曝。存 `C:\WORK SPACE\`。
  收錄的關鍵地雷：VAP=TensorFlow/Keras 非 PyTorch、IG 非 SHAP、0.58 屬 MIMIC-IV 復刻不在論文、
  n=109 單中心；QMK=PCB 是開源改版送廠非從零設計、F103 是 build-target 推斷不稱 verified、
  不得再講「實測 <5ms」、PCB 工具是 EasyEDA Pro（README 誤寫 KiCAD/Altium）。
- **未做**：面試實戰對練（本人想練再開）；其餘待辦全卡在本人（截圖／Overleaf／硬體／帳號）
  或 Codex（migration／履歷內容／cvData），非本線能推進。
- 投遞「時機」仍不歸本 session（job-radar 權威），本輪未越權。

### 2026-07-21（session 收尾：英文 PDF + 雙線協作總結）
- **英文履歷三份補齊 F103**（commit a11cfb2）：Codex 之前把 F103 英文版誤建成孤兒檔名、線上 `resume-en*.pdf` 還停在 F072。發現後由 Claude 本機 TinyTeX 直接重編（英文純 LaTeX、無 CJK 依賴，不必 Overleaf）→ 正確覆蓋 `resume-en*.pdf`。驗證：byte-grep 對 Computer Modern PDF 無效，改用「三份 .tex 源 F103×3/F072=0/5ms=0 → 決定性渲染即乾淨」保證；本人可部署後開一份目視確認。
- **雙線協作模式**：Claude 只碰 `Hero.jsx`/`uiText.js`/`index.css(hero)`；Codex 管 `cvData`/`resume`/`DataContext`/`migrations`/`admin`。互相 rebase、檔案集不重疊、零衝突（PROGRESS.md 例外，手動解過一次）。**重要教訓**：投實習「時機」被 Claude 誤當 personal-website 待辦、越權指揮，被 job-radar session 糾正——時機/策略歸 job-radar，本 session 只做網站+履歷。
- 至此網站+履歷「正確性」全數收工，剩中文字型（可選）與求職鋪路（歸 job-radar）。

### 2026-07-21（XGBoost 技能歸位）

- 本人確認 XGBoost 是 DSP／AC LAB 課程與實驗的真實技能，保留但不再綁定 BitOGuard；BitOGuard 只使用 LightGBM，未做兩模型 Ensemble。
- 中英文 `skills_detail` 將原本混合的「Machine Learning」拆成 LightGBM（連至 BitOGuard）與 XGBoost（無 BitOGuard 專案連結），`portfolio-content.md` 同步說明用途。新增 migration 0019 與 `npm run db:migrate:gradient-skills:remote`。
- migration 已用舊版 D1 skills_detail 結構在記憶體 SQLite 驗證；`npm run build` 成功。

### 2026-07-21（LightGBM 定案與 profile D1 同步）

- 本人確認 BitOGuard 一直使用 LightGBM，所有 AWS 專案內文的 XGBoost 皆為錯誤。同步更新中英文專案資料、BitOGuard 圖表、中文 HTML 履歷、admin resume seed 與 `portfolio-content.md`；移除不存在的 XGBoost 超參數數值，改為 LightGBM 的設定面向與類別權重／閾值取捨。
- 新增 migration 0018 與 `npm run db:migrate:profile-lightgbm:remote`：以現行 `cvData` profile 覆蓋 D1 六月過期 seed（含 title），並同步 BitOGuard 的 LightGBM 內容與儀表板指標。已在記憶體 SQLite 執行 migration 驗證。
- 本人確認從未用 admin 改 profile；DataContext 的 fallback 合併仍保留，作為 D1 缺欄位時的防線。本人確認 F103 是韌體目標推斷，非硬體實測，文案不得聲稱 verified。
- 後續以 0019 同步技能資料，保留 XGBoost 課程技能並移除 Ensemble 敘事。

### 2026-07-21（履歷命名與 D1 fallback 修正）

- 找到 626fbaa 的履歷命名錯誤：Hero 實際連結 `resume-en*.pdf`，而誤建的 `public/resume*.pdf` 沒有任何連結；已刪除三個孤兒檔。正式英文 PDF 仍待本人用 Overleaf 產出後覆蓋正確檔名。
- 三份中文履歷 `.tex` 改回 Overleaf 的 `Latin Modern Roman` + `Noto Sans CJK TC`，移除本機 Windows 相容用的 Arial / `AutoFakeBold`。
- `DataContext` 對 profile、skills_matrix、skills_detail 等物件型 D1 section 採 fallback + D1 合併；陣列 section 維持整包替換，修復舊 D1 profile 缺 `title` 時的 Hero 副標閃現。
- 清除本次 PDF QA 暫存目錄；將 `AGENTS.md` 納入版本控制。`npm run build` 成功。完整 Vitest 會掃進 Claude 的隔離 worktree，造成 3 個 Hero 測試因雙 React instance 失敗；本 repo 自身 7 個測試檔通過。
- 待本人回答：profile 是否曾用 admin 改過、F103 是實測還是規則檔推斷、BitOGuard XGBoost/LightGBM 的實際關係。
  （本人已答：LightGBM 一直是、admin 未改過 profile、F103 為推斷——見下方 Hero 那則後續。）

### 2026-07-21（Hero 重設計，✅ 本人核准，合 main）
- 分支 `claude/personal-website-optimization-fbca13`，經 brainstorming→writing-plans 流程產出
  spec + plan（`docs/superpowers/`），本人核准設計後實作。**待本人 Cloudflare preview 親眼看
  進場動畫再合 main**（截圖工具本 session 全逾時，只能量 DOM/build）。
- 版面「D · 名字最大」：巨大「江嘉元」當主角、墨黑主張「硬體到軟體，中間那段我來。」當副標、
  右照片維持＋視差；`profile.title`/`bio` 退出 hero（bio 仍在 footer）。
- 新文案進 `uiText.js` 的 `heroLine`（zh/en，**不碰 D1、不需 migration**）。
- 招牌動態：名字 clip-path 由上往下揭開（heroUnveil 0.62s ease-out-expo）→ eyebrow/副標/按鈕級聯；
  reduced-motion 全對應。
- **實作前已量測修正兩個既有缺陷**：① LCP 元素是**照片**非名字（實測 avatar 320²>名字）→
  照片進場改 transform-only 不淡 opacity（heroPhotoRise），避免拖 LCP；② eyebrow #86868B 12px
  對比只 3.04:1 未過 AA → 改 #636366（5.03:1）。
- **修 bug**：Hero 的 `matchMedia` 呼叫沒防護，headless/測試環境會炸 → 加 optional chaining。
- **修計畫誤判**：原以為 `.hero-fade-left` 是 Hero 獨用，實際 ProjectDetail/SkillDetail 也用 →
  保留該 class，只刪 Hero 獨用的 hero-fade-right/subtitle/bio。
- 驗證：`vite build` 過、vitest 14 全綠（新增 heroLine×2 + Hero 渲染×3）、新 CSS 確認編進 dist。
- 分工：本次同時把**內容/履歷/D1** 交接給 Codex（見 `docs/superpowers/reviews/2026-07-21-codex-handoff-*`），
  Claude 只碰 Hero.jsx/uiText.js/index.css(hero)。

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

