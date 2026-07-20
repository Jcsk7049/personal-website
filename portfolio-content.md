# 江嘉元 個人作品集內容整理
> 供新 Claude Code session 網站重設計使用。所有資料來源：cvData.json / cvData.en.json（2026-05-31）

---

## 個人基本資料

**姓名**：江嘉元  
**Email**：johnjia9491@gmail.com  
**電話**：+886 928 530 700  
**地點**：台北市, 台灣  
**GitHub**：Jcsk7049  
**LinkedIn**：江嘉元-662764344  

**Bio（中）**：
我是電機系三年級，高職讀機電整合，所以機構、電路、韌體我都碰過。現在多加了 AI 這塊，跨這幾個領域的好處是，跟不同背景的人合作時比較容易對焦——知道每個人在說什麼，比較不會雞同鴨講。

---

## 學歷

| 學校 | 科系 | 期間 |
|------|------|------|
| 元智大學 | 電機工程學系學士 | 2024.09 – 2027.09 |
| 明志科技大學 | 電機工程學系學士 | 2023.09 – 2024.06 |
| 南港高工 | 電子科 | 2020.09 – 2023.06 |

---

## 經歷

### 1. 實驗室專題生 — 元智大學 林書彥教授實驗室
**期間**：2025.05 – 現在

主導 ICU VAP 早期預警研究：設計 Stay-Level 5-Fold 交叉驗證消除公開基準中的 Patient-Level Data Leakage，以 Integrated Gradients 特徵歸因縮減至 4 項非侵入指標，LSTM 達 72h AUROC 0.98–0.99。論文投稿 IEEE GCCE 2026。

---

### 2. Engineering Advisor & Systems Integrator — FRC TEAM 7645
**期間**：2023 – 現在

主導機器人系統架構設計，涵蓋多感測器融合、PID 馬達閉迴路控制調校與軟硬體介面規範制定；引入 AI 輔助工具加速韌體原型迭代週期，在競賽 deadline 壓力下確保系統整合如期交付。

---

### 3. 競賽選手 — 南港高工 NK-MTC 7645
**期間**：2020.06 – 2023.09

負責機器人配線、程式設計與小型機械零件加工，參與多次國際區域賽與技能競賽。

---

## 技術能力

### 技能矩陣（Tags）

**數據分析 (Data Analysis)**：TensorFlow / Keras、PyTorch、LSTM · Time-Series、Feature Engineering、Signal Processing、TinyML、SHAP / XAI

**程式開發 (Programming)**：C / C++ (STM32 / Cortex-M)、QMK / ChibiOS HAL、UART/SPI/I2C、FreeRTOS（基礎）、Python、Arduino / ESP32、LabVIEW

**電路設計 (EDA)**：Altium Designer、EasyEDA Pro (立創EDA)、KiCAD、OrCAD

**機構加工 (Manufacturing)**：CNC 銑床、Mastercam、3D 列印、金屬焊接、雷射切割、基礎機械加工、Autodesk Inventor、AutoCAD、Fusion 360

---

### 技能詳情

#### 數據分析

概述：以生醫訊號與臨床數據為主要應用場景，從原始資料清洗、特徵工程到模型訓練與評估，建立端對端的機器學習管線。

| 技能 | 程度 | 說明 |
|------|------|------|
| 深度學習 | 進階 | 熟悉 LSTM、CNN 時序模型架構，具備完整的資料前處理、模型訓練與超參數調整流程，應用於生醫訊號的序列預測任務。|
| 機器學習 | 進階 | LightGBM 用於 BitOGuard 的不平衡二元分類與 SHAP 可解釋性；XGBoost 用於 DSP／訊號分類課程與實驗。|
| 特徵工程 | 進階 | 萃取時域（均值、峰值）與頻域（FFT 功率譜）特徵；對電子病歷進行時序聚合與 One-Hot 編碼，處理高缺失率醫療數據。|
| 訊號過濾 | 熟悉 | 帶通濾波、Z-score 標準化與缺失值插補，確保生理訊號輸入品質，降低模型對雜訊的敏感度。|
| 數據結構化 | 熟悉 | 電子病歷 ETL 清洗、AWS Glue 圖形化多跳分析管線，將非結構化原始資料轉為可訓練的特徵矩陣。|

#### 程式開發

概述：橫跨嵌入式韌體、科學計算與機器學習管線，依場景選用最合適的語言與框架。

| 技能 | 程度 | 說明 |
|------|------|------|
| C / C++ | 進階 | 嵌入式韌體主力語言。掌握 GPIO 控制、中斷處理與記憶體管理，熟悉 ChibiOS HAL 外設配置與 QMK Firmware 架構，能在資源受限的 STM32 環境下撰寫穩定的底層驅動程式。|
| Python | 進階 | 取得 ITS Python 國際認證。應用於 ML 管線（PyTorch、scikit-learn、pandas）、數據視覺化（Matplotlib）與 AWS SDK 雲端整合。|
| LabVIEW | 熟悉 | 圖形化程式設計，實作向量合成運動學演算法與 PID 閉迴路控制，應用於競賽機器人即時控制，獲 2022 FRC 控制創新獎肯定。|
| Arduino | 熟悉 | 快速原型開發平台，整合 ESP32 無線通訊、感測器讀值與繼電器驅動，適合在短時間內完成硬體功能驗證。|
| MATLAB | 基礎 | 用於訊號處理分析與演算法原型驗證，方便在實作前以視覺化方式確認濾波效果與模型邏輯。|

#### 電路設計

概述：具備從電路圖設計到 PCB Layout 的完整流程能力，熟悉電源管理、MCU 外圍電路與保護電路設計。

| 技能 | 程度 | 說明 |
|------|------|------|
| Altium Designer | 進階 | 多層 PCB 設計主力工具，涵蓋電源規劃、阻抗匹配與 DFM 原則，能獨立完成從原理圖到 Gerber 輸出的完整流程。|
| EasyEDA Pro（立創EDA） | 熟悉 | 雲端原生 EDA 工具，整合立創商城元件庫，可直接調用廠商封裝並一鍵下單打樣。用於 QMK 數字鍵盤 PCB 設計。|
| KiCAD | 熟悉 | 開源 EDA 工具，用於個人專案快速出板，熟悉元件庫管理與 3D 封裝預覽。|
| OrCAD | 基礎 | 電路圖繪製與 SPICE 模擬基礎應用，用於驗證被動元件選型與電源電路行為。|

#### 機構加工

概述：從概念設計到實體製作的完整製程能力，熟悉減法加工、積層製造與連接工藝，具備 CNC 數值加工與 3D 建模實戰經驗。

| 技能 | 程度 | 說明 |
|------|------|------|
| CNC 銑床 | 進階 | 操作 CNC 銑床進行鋁合金精密加工，熟悉刀具路徑規劃與夾具設計，相較手工銑床大幅提升加工精度與重現性。|
| Mastercam | 熟悉 | CNC 加工 CAM 軟體，規劃多種刀具路徑（鑽孔、2D/3D 挖槽、輪廓銑削、動態銑削、倒角），輸出 NC 程式。|
| 3D 列印 | 進階 | FDM 快速原型製作，用於機構干涉驗證與客製化非承力件，在不影響結構強度的前提下降低重量與加工成本。|
| Autodesk Inventor | 進階 | 三維機構建模主力工具，進行組件干涉分析與動態模擬，確保設計在實際組裝前已消除衝突與公差問題。|
| AutoCAD | 熟悉 | 二維工程圖繪製與加工圖面輸出，提供給 CNC 操作員或外包廠商清晰的尺寸標註與公差規格。|
| Fusion 360 | 熟悉 | 快速概念建模與 CAM 整合，適合初期設計探索，能直接從 3D 模型生成加工路徑進行小批量製作。|
| 金屬焊接 | 熟悉 | MIG / TIG 基礎焊接技術，用於 FRC 機器人底盤鋼管結構的連接，注重焊道均勻性與結構強度。|
| 雷射切割 | 熟悉 | 板金件與壓克力結構件的精密裁切，配合 CAD 圖面快速製作自訂尺寸的薄板結構與標示面板。|
| 基礎機械加工 | 熟悉 | 手工銑床、車床基礎操作，具備量具使用與工件夾持概念。|

---

## 獎項

| 年份 | 獎項 |
|------|------|
| 2026 | AWS x BitoPro 黑客松：AI 詐騙偵測專案完賽 |
| 2022 | 2022 FRC 台灣鴻海區域賽：亞軍聯盟 (Finalist) & 控制創新獎 |
| 2022 | 111 學年度工業類學生技藝競賽 (工科賽)：數位電子職類代表 |
| 2022 | 第 52 屆全國技能競賽 (技能技藝競賽)：集體創作職類代表 |
| 2020 | 2020 FRC 中科 5G 區域賽：最佳工業設計獎 |

---

## 專案

### 1. ICU VAP 早期預測（大學專題）
**ID**: vap  
**期間**: 2025 – 現在  
**Badge**: IEEE GCCE 2026 · Under Review  
**Tags**: LSTM · Time-Series、Integrated Gradients、Stay-Level CV、SMOTE、Medical AI

**一句話描述**：
單中心試驗性方法論驗證（亞東紀念醫院 ICU，n=109）。核心貢獻：設計 Stay-Level 5-Fold Stratified CV，識別並修正 PREDICT 2025 基準中的 Patient-Level Data Leakage（AUROC 虛高 0.99 → 真實 0.58）；Integrated Gradients 消除數學共線冗餘特徵，從 14 項篩選至 4 項非侵入指標。研究定位：試驗性方法論驗證，非臨床部署產品。

**研究背景**：
VAP 發生率約 5–15%（機械通氣病患），死亡率 20–50%，臨床診斷通常滯後 48 小時以上。本研究以亞東紀念醫院 ICU 2019–2023 年資料（n=109：VAP 54 例、非VAP 55 例），建立 LSTM 時序分類管線，以 4 項常規生命徵象提前 6–72 小時預警 VAP。

**核心技術**：
- 3 層 LSTM（各 50 units）+ Dropout，24 小時滑動視窗 × 4 特徵
- Stay-Level 5-Fold CV（以病患為單位切分，消除 Data Leakage）
- Integrated Gradients XAI，設計 Ablation Study 驗證 mv_total 冗餘特徵
- Per-fold 正規化，各折獨立計算 mean/std
- PyTorch + NVIDIA RTX 4080 Laptop

**模型效能**（亞東紀念醫院，Stay-level 5-fold CV）：

| 預警時間 | AUROC | AUPRC | Sensitivity | Specificity |
|----------|-------|-------|-------------|-------------|
| 提前 6h  | 0.9800 | 0.8136 | 78.95% | 99.83% |
| 提前 12h | 0.9817 | 0.8565 | 81.06% | 99.71% |
| 提前 24h | 0.9919 | 0.9325 | 88.72% | 99.64% |
| 提前 48h | 0.9908 | 0.9352 | 87.46% | 99.18% |
| 提前 72h | 0.9865 | 0.9210 | 86.34% | 98.67% |

**研究限制**：單中心資料，小樣本（n=109），需多中心外部驗證後才能考慮臨床應用。

---

### 2. AWS x BitoPro 黑客松：BitOGuard（大學校外）
**ID**: aws-hackathon  
**期間**: 2026  
**Tags**: LightGBM、AWS SageMaker、AWS Glue、SHAP、Streamlit
**GitHub**: https://github.com/Jcsk7049/bitoguard-aml  
**Demo**: https://bitoguard-aml-kykw6kfawalbeq8vjy6yv8.streamlit.app/

**一句話描述**：
LightGBM × S3 → Glue → Athena → SageMaker → Lambda → Bedrock 六服務端對端 AML 管線；63,770 帳戶 / 413,235 筆交易，31 項行為特徵（含圖論黑名單鄰居）+ SHAP 合規報告識別人頭帳戶，Streamlit 儀表板已部署上線。

**資料集規模**：
- 用戶資料：63,770 筆帳戶
- 台幣轉帳紀錄：195,601 筆
- USDT 交易紀錄：217,634 筆
- 標記人頭帳戶：1,640 筆（訓練集 3.21%）

**技術架構**：
S3 → Glue ETL → Athena SQL → SageMaker（LightGBM 訓練與調參）→ Lambda（事件驅動推論）→ Bedrock（SHAP 可解釋性報告）→ Streamlit 儀表板

**特徵工程**：31 項行為指標，重要性前三：total_volume、age（帳戶年齡）、swap_twd_volume

**模型效能**（已部署儀表板）：
- AUC：83.2%；Precision：27.5%；Recall：33.2%；F1 Score：30.1%；Accuracy：95.0%
- 12,753 位使用者中標記 501 位為風險帳戶；Accuracy 受類別不平衡影響，需和 Precision、Recall 一起看。

---

### 3. 類比電路實作：音訊放大器 PCB 設計（大學課程）
**ID**: audio-amplifier  
**期間**: 2024  
**Tags**: BJT 放大電路、PCB Layout、感光板製作、電路模擬、SPICE

**一句話描述**：
大二課程專案，建立基礎硬體素養：兩級 BJT 音訊放大電路（CE + CC 架構），完成感光板蝕刻製程，歷經兩次系統性除錯（殘銅短路 & 元件腳位鏡像），最終順利驅動 8Ω 喇叭。

**電路架構**：CE 共射極放大（Q1，主要電壓增益）+ CC 射極隨耦器（低輸出阻抗）

**PCB 製程**：感光 FR4 雙面板 109.2 × 45.7 mm，曝光→顯影→酸洗蝕刻→鑽孔→焊接

---

### 4. QMK x STM32 數字鍵盤（大學校外）
**ID**: qmk-stm32-keyboard  
**期間**: 2026  
**Tags**: STM32 / Cortex-M、QMK / ChibiOS HAL、SPI · UART · I2C、EasyEDA Pro PCB、FreeRTOS (進行中)  
**GitHub**: https://github.com/Jcsk7049/qmk-stm32-keyboard  
**Video**: UQ_tA-CO8Yw（YouTube）

**一句話描述**：
整合開源鍵盤 PCB 設計與 QMK/ChibiOS 韌體框架（STM32F103）。識別開源框架與硬體間的編譯衝突及時序問題，以 LLM 輔助偵錯工具逆向工程 ChibiOS HAL 三件組（chconf/halconf/mcuconf），成功重構設定檔——USB HID 穩定識別、RGB Matrix 正常、VIA/VIAL 即時改鍵驗證完成。

**硬體規格**：STM32F103（QMK 設定使用 stm32duino bootloader）、WS2812B RGB Matrix、5×4 ROW2COL 鍵盤矩陣、EasyEDA Pro 設計→立創商城打板

**Layer 設計**：
- Layer 0：標準數字鍵盤輸入
- Layer 1：RGB Matrix 控制（LT() 長按切層、短按輸入）

**驗證結果**：RGB Matrix 各動畫模式正常，VIA/VIAL 無需重新編譯即可改鍵

---

### 5. FRC 7645 官網與後台 CMS（大學校外）
**ID**: team7645-cms  
**期間**: 2025  
**Tags**: React、Firebase、Vite、Cloudflare Pages、Code Splitting、localStorage 快取  
**Demo**: https://nkhs.team7645.com/

**一句話描述（含貢獻說明）**：
35% 程式碼貢獻者。學長（65%）主導 React/Firebase/Vite 核心架構、Auth 系統、Three.js 3D 展覽廳與 Firestore 安全規則。我接手後負責：首頁大改版、留言系統（Contact 表單 → Firestore → CMS 管理 Tab 端對端）、組別身分系統、Code Splitting（JS bundle 2.7MB → 820KB）、Cloudflare Pages 部署與 TBA API 30 天快取。

**我的 35% 貢獻範疇**：

1. **效能優化 — Code Splitting & Lazy Loading**：Vite 動態 import 拆分路由層級 chunk，React.lazy + Suspense 按需載入。bundle 從 2.7MB 降至 820KB（約 70%）。

2. **TBA API 快取 — 30 天 localStorage 層**：以端點 + 查詢字串為 key，每次請求驗證新鮮度，消除比賽日重複 fetch 與限流風險。

3. **留言系統 — 端對端實作**：Contact 表單 → Firestore `messages` collection；CMS 新增 MessagesPanel Tab，管理員直接查看/刪除，不需開 Firebase Console。Firestore 安全規則：`allow create: if true`（訪客可送出）、`allow read, delete` 限定 admin/teacher、`allow update: if false`（防竄改）。

4. **組別身分系統**：Admin 多選 pill UI 設定 `showInDivision`；TeamGroup 組件自動過濾並渲染對應成員，取代手動維護靜態名單。

5. **首頁大改版**：CSS keyframe animation 浮動贊助商泡泡（取代 marquee）、TeamTimeline.jsx、Competition.jsx（消費 TBA 快取，獨立處理 loading/error/empty）。

6. **CI/CD 部署 — Cloudflare Pages**：PR 預覽 + main 合併觸發正式部署，nkhs.team7645.com 自訂域名，邊緣快取 TTFB 在 100ms 以下。

7. **CMS 重整**：Carousel + Cards → Homepage Management；Contact + Socials → 聯絡模組；補回 Advisor Tab；新增留言管理 Tab。

8. **CLAUDE.md 工作記憶框架**：紀錄專案架構、命名規範與禁止修改範圍，確保跨 session LLM 上下文一致。

---

### 6. 無線打地鼠機（高職選手作品）
**ID**: whack-a-mole  
**期間**: 2021 – 2022  
**Tags**: ESP32、ESP-NOW、電路設計、3D列印、Arduino

**一句話描述**：
南港高工特教組委託專案，以 ESP32 + ESP-NOW 串聯一主四從五台機台，搭配電晶體繼電器驅動電路與 3D 列印機構，為特教生打造可室內外通用的無線互動教具，獲特教組正式感謝狀。

**系統架構**：一主四從，ESP-NOW 點對點（無需 WiFi/路由器），斷線重啟自動重連

**電路設計**：11.1V（三顆 18650）→ 7805 降壓 5V → ESP32 GPIO → 9013 電晶體放大 → 繼電器 → LED；1N4001 飛輪二極體保護，104 陶瓷電容去耦

**分工**：機構設計（江嘉元）+ 電路 & 程式（江嘉元 + 杜權祐）

---

### 7. 自動酒精機（高職選手作品）
**ID**: auto-sanitizer  
**期間**: 2021  
**Tags**: Arduino、HC-SR04、繼電器、雷射切割、18650 電池

**一句話描述**：
受邀參加 2021 教育部科普列車，以 Arduino + HC-SR04 超聲波感測器製作感應式自動噴灑酒精機，歷經桌上型展示版與 FRC 機器人整合版兩代迭代。

**電路設計**：HC-SR04 → 觸發 10–15 cm → Arduino GPIO → 繼電器 → 抽水馬達；2 顆 18650 串聯（7.6V）→ 7805 → 5V

---

### 8. 集體創作競賽機器人（高職選手作品）
**ID**: team-robot  
**期間**: 2022  
**Tags**: 競賽機器人、繼電器控制、機構設計、三人團隊

**一句話描述**：
代表南港高工參加第 52 屆全國技能競賽集體創作職類，三人團隊聯合設計競賽用夾取機器人，以 24V 鉛酸電池驅動，繼電器 H 橋控制膠輪馬達方向，可夾取圓柱體與正方體物件。

**分工**：機構設計與加工（江嘉元）、電路設計與配線（團隊成員）、程式控制邏輯（團隊成員）

---

### 9. Swerve Drive 全向輪控制研究（高職選手作品）
**ID**: swerve  
**期間**: 2020 – 2023  
**Tags**: LabVIEW、PID Control、CNC 加工、線切割、Robotics、3D 列印

**一句話描述**：
從零自行開發三代 FRC 競賽全向輪底盤，涵蓋運動學演算法、齒輪傳動設計、CNC 精密加工與 LabVIEW PID 控制，獲 2022 FRC 台灣區控制創新獎。

**三代演進**：
- 第一代（2020）：驗證基本可行性，中科 5G 區域賽
- 第二代（2022）：實際參賽，獲台灣鴻海區域賽控制創新獎
- 第三代（2022 後）：輕量化 + 模組化持續改良

**運動學算法**（LabVIEW 實作）：向量 X∠θ 表示輪子方向與力道，疊加平移 + 迴旋 + 弧形三種模式，取最大力道輪正規化輸出

**減速比**：驅動 Falcon 500（6380 rpm）→ 1:7 → 911 rpm；轉向 NEO 550 → 行星 1:28.1 × 齒輪 1:2 → 總比 1:56.2

**精密加工**：M1.25/T15 & M1.5/T24 正齒輪（線切割）、傳動心軸六角柱 & 方槽截面（CNC 4 爪夾盤）

**競賽成果**：
- 2022 FRC 台灣鴻海區域賽：亞軍聯盟 + 控制創新獎
- 2020 FRC 中科 5G 區域賽：最佳工業設計獎

---

## 技術程度說明

- **進階**：能獨立完成生產級實作，有具體專案驗證
- **熟悉**：理解核心原理並有實際應用，部分場景仍需查文件
- **基礎**：掌握基本概念與操作，實際應用有限
