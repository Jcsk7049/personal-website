-- 0024: 兩件事——
--   ① skills_detail 整包同步成 repo 版。b7421ee（2026-06-10）把四個分類的 overview 與 24 項描述
--      改寫成口語版，但只改了 repo、沒產 migration，線上至今仍是舊的正式書面版。
--      同一次整包也把 0021 原本想做的 LightGBM/XGBoost 0.6/0.4 混合敘述帶上線，
--      並把 XGBoost 移回 data_analysis 的第 3 位（0019 當初是附加在陣列尾端）。
--      ⚠️ manufacturing 的熟練度以「線上 D1」為準，不用 repo 值——本人曾用 admin 後台調整過：
--         CNC 銑床: 進階 -> 基礎、Mastercam: 熟悉 -> 基礎、AutoCAD: 熟悉 -> 進階、金屬焊接: 熟悉 -> 基礎、雷射切割: 熟悉 -> 進階
--         （線上英文版沒跟著改，這裡一併補上，讓中英文一致）
--   ② vap 的成果段拿掉「首個」：repo 已於先前拿掉，線上還留著「首個以台灣 ICU 真實資料驗證」，
--      這是查不到來源的第一宣稱。只覆寫 $.detail.outcome，不動 VAP 的發表狀態。
-- 冪等：整包 UPDATE / json_set 就地改值。

UPDATE sections
SET zh = '{"data_analysis":{"title":"數據分析","en":"Data Analysis","overview":"主要做生醫訊號跟臨床數據，從清資料、做特徵到訓練模型、看結果，整個流程都自己跑過。","skills":[{"name":"深度學習","level":"進階","desc":"玩過 LSTM、CNN 這類時序模型，前處理到調超參數都自己來，主要拿來做生醫訊號的序列預測。","projects":["VAP 深度學習預測系統"]},{"name":"LightGBM","level":"進階","desc":"用於 BitOGuard 的不平衡二元分類，與 XGBoost 以 0.6/0.4 加權混合，搭配 SHAP 檢視每個特徵對帳戶風險分數的貢獻，並比較不同決策閾值下的 Precision 與 Recall。","projects":["AWS x BitoPro 黑客松"]},{"name":"XGBoost","level":"熟悉","desc":"在 BitOGuard 與 LightGBM 以 0.4 權重加權混合（單獨 OOF AUC 0.827）；另用在 DSP／訊號分類課程與實驗。","projects":["AWS x BitoPro 黑客松"]},{"name":"特徵工程","level":"進階","desc":"抓時域（均值、峰值）跟頻域（FFT 功率譜）特徵；電子病歷的部分用時序聚合跟 One-Hot 編碼處理，這些醫療數據缺失率都不低。","projects":["VAP 深度學習預測系統","AWS x BitoPro 黑客松"]},{"name":"訊號過濾","level":"熟悉","desc":"帶通濾波、Z-score 標準化、缺失值補值，把生理訊號的輸入品質顧好，模型才不會對雜訊太敏感。","projects":["VAP 深度學習預測系統"]},{"name":"數據結構化","level":"熟悉","desc":"電子病歷的 ETL 清洗、用 AWS Glue 做圖形化多跳分析，把原始的非結構化資料整理成可以丟進模型訓練的特徵矩陣。","projects":["VAP 深度學習預測系統","AWS x BitoPro 黑客松"]}]},"programming":{"title":"程式開發","en":"Programming","overview":"從嵌入式韌體寫到 ML 管線都碰過，硬體這邊用 C/C++，資料跟模型那邊用 Python。","skills":[{"name":"C / C++","level":"進階","desc":"寫嵌入式韌體最常用的語言。GPIO 控制、中斷處理、記憶體管理都算熟，ChibiOS HAL 的設定（chconf / halconf / mcuconf）跟 QMK Firmware 架構也碰過，在資源有限的 STM32 上寫底層驅動沒問題。","projects":["FRC Swerve Drive 全向輪控制系統","QMK x STM32 客製鍵盤"]},{"name":"Python","level":"進階","desc":"考過 ITS Python 國際認證。平常拿來寫 ML 管線（PyTorch、scikit-learn、pandas）、畫圖（Matplotlib），也用 AWS SDK 接雲端服務。","projects":["VAP 深度學習預測系統","AWS x BitoPro 黑客松"]},{"name":"LabVIEW","level":"熟悉","desc":"用圖形化介面寫過向量合成運動學演算法跟 PID 閉迴路控制，裝在競賽機器人上即時跑，那年拿到 2022 FRC 控制創新獎。","projects":["FRC Swerve Drive 全向輪控制系統"]},{"name":"Arduino","level":"熟悉","desc":"拿來做快速原型，接過 ESP32 無線通訊、讀感測器、控制繼電器，方便在短時間內把硬體功能跑起來驗證。","projects":["ESP32 無線打地鼠機"]},{"name":"MATLAB","level":"基礎","desc":"拿來做訊號處理分析跟演算法驗證，寫程式前先用它把濾波效果、模型邏輯畫出來確認一遍。","projects":[]}]},"eda":{"title":"電路設計","en":"Electronic Design Automation","overview":"電路圖到 PCB Layout 都自己做，用過 Altium、EasyEDA Pro、KiCAD，電源管理跟 MCU 外圍電路比較熟。","skills":[{"name":"Altium Designer","level":"進階","desc":"做多層 PCB 設計的主力工具。電源規劃、阻抗匹配、DFM（可製造性設計）原則都會考慮，原理圖到 Gerber 輸出整個流程自己一個人就能搞定。","projects":["QMK x STM32 客製鍵盤"]},{"name":"EasyEDA Pro（立創EDA）","level":"熟悉","desc":"雲端版 EDA 工具，直接接立創商城的元件庫，封裝拿來就能用，打樣也能一鍵下單。QMK 數字鍵盤的 PCB 就是用它畫的，原理圖、Layout、Gerber 匯出都包了。","projects":["QMK x STM32 數字鍵盤"]},{"name":"KiCAD","level":"熟悉","desc":"開源 EDA 工具，個人專案想快速出板就會用它，元件庫管理跟 3D 封裝預覽都用得上手，概念驗證階段很方便。","projects":[]},{"name":"OrCAD","level":"基礎","desc":"畫電路圖、跑基本的 SPICE 模擬，拿來確認被動元件選型跟電源電路的行為對不對。","projects":[]}]},"manufacturing":{"title":"機構加工","en":"Manufacturing","overview":"設計到實體都做過：CNC 銑床、3D 列印、金屬焊接、雷射切割，建模用 Inventor，刀具路徑用 Mastercam。","skills":[{"name":"CNC 銑床","level":"基礎","desc":"用 CNC 銑床做鋁合金精密加工，刀具路徑規劃跟夾具設計都會自己弄，比手工銑床穩定很多，精度跟重現性都好控制。","projects":["FRC Swerve Drive 全向輪控制系統"]},{"name":"Mastercam","level":"基礎","desc":"CNC 加工的 CAM 軟體，把 3D 模型丟進去規劃刀具路徑（鑽孔、深孔啄鑽、2D/3D 挖槽、輪廓銑削、動態銑削、倒角），模擬沒問題再輸出 NC 程式。Swerve Drive 的全向輪鋁板跟傳動心軸就是這樣加工出來的。","projects":["FRC Swerve Drive 全向輪控制系統"]},{"name":"3D 列印","level":"進階","desc":"FDM 快速成型，拿來驗證機構會不會干涉，或是做一些不承重的客製零件，重量跟加工成本都能壓下來，又不影響結構強度。","projects":["FRC Swerve Drive 全向輪控制系統","ESP32 無線打地鼠機"]},{"name":"Autodesk Inventor","level":"進階","desc":"做 3D 機構建模的主力工具，組件干涉分析跟動態模擬都會跑，在實際組裝前先把零件碰撞跟公差問題抓出來。","projects":["FRC Swerve Drive 全向輪控制系統"]},{"name":"AutoCAD","level":"進階","desc":"畫 2D 工程圖、輸出加工圖面，把尺寸標註跟公差規格標清楚，讓 CNC 操作員或外包廠商照著做就對了。","projects":["FRC Swerve Drive 全向輪控制系統"]},{"name":"Fusion 360","level":"熟悉","desc":"快速建概念模型，CAM 整合也在裡面，初期設計想法用它試很方便，直接從 3D 模型生成加工路徑，小批量自己做。","projects":[]},{"name":"金屬焊接","level":"基礎","desc":"MIG / TIG 基礎焊接，用在 FRC 機器人底盤的鋼管結構上，焊道均不均勻、結構夠不夠強都要顧。","projects":["FRC Swerve Drive 全向輪控制系統"]},{"name":"雷射切割","level":"進階","desc":"板金跟壓克力結構件的精密裁切，照著 CAD 圖面就能快速做出自訂尺寸的薄板結構跟標示面板。","projects":[]},{"name":"基礎機械加工","level":"熟悉","desc":"手工銑床、車床的基本操作，量具怎麼用、工件怎麼夾都會，這些底子讓我後來學 CNC 進階加工上手得快一點。","projects":[]}]}}',
    en = '{"data_analysis":{"title":"Data Analysis","en":"Data Analysis","overview":"Mostly working with biomedical signals and clinical data — I go through the whole loop myself, from cleaning raw data and building features to training models and checking the results.","skills":[{"name":"Deep Learning","level":"進階","desc":"I''ve worked with LSTM and CNN time-series models — preprocessing, hyperparameter tuning, all of it — mainly for predicting biomedical signal sequences.","projects":["ICU VAP Early-Warning System"]},{"name":"LightGBM","level":"進階","desc":"Used in BitOGuard for imbalanced binary classification, blended 0.6/0.4 with XGBoost, with SHAP to inspect each feature''s contribution to account-risk scores and threshold comparisons for precision and recall.","projects":["AWS × BitoPro Hackathon"]},{"name":"XGBoost","level":"熟悉","desc":"Blended with LightGBM at 0.4 weight in BitOGuard (alone: OOF AUC 0.827); also used in DSP and signal-classification coursework.","projects":["AWS × BitoPro Hackathon"]},{"name":"Feature Engineering","level":"進階","desc":"Pulled out time-domain (mean, peak) and frequency-domain (FFT power spectrum) features, and handled EHR data — time-series aggregation, one-hot encoding, plenty of missing values to deal with.","projects":["ICU VAP Early-Warning System","AWS × BitoPro Hackathon"]},{"name":"Signal Filtering","level":"熟悉","desc":"Band-pass filtering, Z-score normalization, missing-value imputation — basically cleaning up physiological signals so the model isn''t thrown off by noise.","projects":["ICU VAP Early-Warning System"]},{"name":"Data Structuring","level":"熟悉","desc":"EHR ETL cleaning and AWS Glue graph-based multi-hop analysis — turning messy unstructured data into feature matrices the model can actually train on.","projects":["ICU VAP Early-Warning System","AWS × BitoPro Hackathon"]}]},"programming":{"title":"Programming","en":"Programming","overview":"I''ve touched everything from embedded firmware to ML pipelines — C/C++ for the hardware side, Python for data and models.","skills":[{"name":"C / C++","level":"進階","desc":"My go-to language for embedded firmware. Comfortable with GPIO control, interrupt handling, and memory management; also worked with ChibiOS HAL config (chconf/halconf/mcuconf) and the QMK firmware codebase on resource-constrained STM32 boards.","projects":["FRC Swerve Drive Research","QMK × STM32 Custom Numpad"]},{"name":"Python","level":"進階","desc":"Hold the ITS Python international certification. Use it daily for ML pipelines (PyTorch, scikit-learn, pandas), plotting (Matplotlib), and wiring up AWS services with the SDK.","projects":["ICU VAP Early-Warning System","AWS × BitoPro Hackathon"]},{"name":"LabVIEW","level":"熟悉","desc":"Used graphical programming to build vector-composition kinematics and PID closed-loop control, running live on a competition robot — that project won the 2022 FRC Innovation in Control Award.","projects":["FRC Swerve Drive Research"]},{"name":"Arduino","level":"熟悉","desc":"My go-to for quick prototypes — wired up ESP32 wireless, sensor readings, and relay control to validate hardware ideas fast.","projects":["Wireless Whack-a-Mole"]},{"name":"MATLAB","level":"基礎","desc":"Used for signal processing analysis and quick algorithm checks — plotting things out to sanity-check filter behavior and model logic before writing the real implementation.","projects":[]}]},"eda":{"title":"Electronic Design","en":"Electronic Design Automation","overview":"I''ve done the full flow from schematic to PCB layout with Altium, EasyEDA Pro, and KiCAD — most comfortable with power management and MCU peripheral circuits.","skills":[{"name":"Altium Designer","level":"進階","desc":"My main tool for multi-layer PCB design — power planning, impedance matching, DFM principles, all the way from schematic to Gerber output, on my own.","projects":["QMK × STM32 Custom Numpad"]},{"name":"EasyEDA Pro (LCEDA)","level":"熟悉","desc":"A browser-based EDA tool hooked into the LCSC parts library — footprints are ready to use and you can order a prototype in one click. Used it for the QMK numpad PCB, from schematic to layout to Gerber export.","projects":["QMK × STM32 Custom Numpad"]},{"name":"KiCAD","level":"熟悉","desc":"Open-source EDA I reach for on personal projects when I need a board fast — comfortable with library management and 3D footprint preview, good for early-stage concept checks.","projects":[]},{"name":"OrCAD","level":"基礎","desc":"Basic schematic drawing and SPICE simulation — used it to check passive component choices and power circuit behavior.","projects":[]}]},"manufacturing":{"title":"Manufacturing","en":"Manufacturing","overview":"From design to physical parts — CNC milling, 3D printing, metal welding, laser cutting. Modeling in Inventor, toolpaths in Mastercam.","skills":[{"name":"CNC Milling","level":"基礎","desc":"Precision aluminum machining on CNC mills — I plan toolpaths and design fixtures myself, and it''s noticeably more accurate and repeatable than manual milling.","projects":["FRC Swerve Drive Research"]},{"name":"Mastercam","level":"基礎","desc":"CAM software for CNC — import a 3D model, plan toolpaths (drilling, 2D/3D pocketing, contour milling, dynamic milling, chamfering), simulate it, then output the NC program. Used it for the Swerve Drive''s aluminum wheel plates and drive shafts.","projects":["FRC Swerve Drive Research"]},{"name":"3D Printing","level":"進階","desc":"FDM printing for checking mechanical interference and making custom non-structural parts — cuts weight and machining cost without touching structural integrity.","projects":["FRC Swerve Drive Research","Wireless Whack-a-Mole"]},{"name":"Autodesk Inventor","level":"進階","desc":"My main tool for 3D mechanism modeling — assembly interference checks and dynamic simulation to catch part collisions and tolerance issues before anything gets built.","projects":["FRC Swerve Drive Research"]},{"name":"AutoCAD","level":"進階","desc":"2D engineering drawings for machining — dimensions and tolerances spelled out clearly enough for CNC operators or outside vendors to just follow.","projects":["FRC Swerve Drive Research"]},{"name":"Fusion 360","level":"熟悉","desc":"Quick concept modeling with built-in CAM — good for early design exploration, and you can go straight from the 3D model to a machining path for small-batch parts.","projects":[]},{"name":"Metal Welding","level":"基礎","desc":"Basic MIG/TIG welding for the FRC robot''s steel tube chassis — paying attention to bead uniformity and structural strength.","projects":["FRC Swerve Drive Research"]},{"name":"Laser Cutting","level":"進階","desc":"Precision cutting of sheet metal and acrylic from CAD drawings — a quick way to make custom thin-plate parts and label panels.","projects":[]},{"name":"Basic Machining","level":"熟悉","desc":"Manual mill and lathe basics — measuring tools, workpiece clamping — the groundwork that made picking up advanced CNC machining easier.","projects":[]}]}}',
    updated_at = datetime('now')
WHERE key = 'skills_detail';

UPDATE projects
SET zh = json_set(zh, '$.detail.outcome', '【模型效能（亞東紀念醫院，Stay-level 5-fold CV）】

預警時間　　　AUROC　 AUPRC　 Sensitivity　Specificity
提前  6 小時　0.9800　0.8136　78.95%　　　99.83%
提前 12 小時　0.9817　0.8565　81.06%　　　99.71%
提前 24 小時　0.9919　0.9325　88.72%　　　99.64%
提前 48 小時　0.9908　0.9352　87.46%　　　99.18%
提前 72 小時　0.9865　0.9210　86.34%　　　98.67%

模型在 24 小時預測窗口達到最佳平衡（AUROC=0.99），提前一天警示臨床人員採取防護措施。同樣設定下，LSTM 在所有窗口皆顯著優於 LR、RF、SVM 等傳統模型。

【核心特徵（Top 4，IG 分析）】
・MAP（平均動脈壓）
・Vent Rate（呼吸器設定頻率）
・Tidal Volume（潮氣容積）
・SpO₂（血氧飽和度）

【研究貢獻】
・台灣本土化資料：以台灣 ICU 真實資料驗證的 VAP 預測模型
・延長預測窗口：突破文獻常見的 24 小時限制，達成 72 小時超前預警
・嚴謹驗證設計：Stay-level CV + Per-fold 正規化，確保泛化能力，杜絕 Data Leakage
・輕量化特徵組合：僅 4 個常規監測指標，無需額外侵入性檢查
・臨床可解釋性：IG 分析呈現模型判斷依據，提升醫師信任度

【消融實驗：mv_total 排除驗證】
mv_total（分鐘通氣量）IG 歸因排名第一（0.00989），但因 mv≡Vt×RR 為數學冗餘特徵，移除後 24 小時 AUROC 反升 +0.004、AUPRC 升 +0.014，確認冗餘特徵應以模型行為驗證，而非單憑歸因分數決定取捨。

📄 論文題目：基於 Stay-Level 交叉驗證與延長預測窗口之 LSTM 呼吸器相關肺炎早期預測研究
論文完稿（2026.05），已投稿 IEEE GCCE 2026'),
    en = json_set(en, '$.detail.outcome', '[Model Performance — Far Eastern ICU, Stay-level 5-fold CV]

Horizon      AUROC    AUPRC    Sensitivity  Specificity
6 hours      0.9800   0.8136   78.95%       99.83%
12 hours     0.9817   0.8565   81.06%       99.71%
24 hours     0.9919   0.9325   88.72%       99.64%
48 hours     0.9908   0.9352   87.46%       99.18%
72 hours     0.9865   0.9210   86.34%       98.67%

The model achieves its best balance at the 24-hour prediction window (AUROC=0.99), alerting clinicians one full day in advance. LSTM significantly outperforms LR, RF, and SVM across all windows.

[Core Features — Top 4, IG Analysis]
- MAP (Mean Arterial Pressure)
- Vent Rate (Ventilator Set Rate)
- Tidal Volume
- SpO₂ (Oxygen Saturation)

[Research Contributions]
- Taiwan-localized data: VAP prediction model validated on real Taiwan ICU data
- Extended prediction window: beyond the 24h literature limit, achieving 72h early warning
- Rigorous validation: Stay-level CV + per-fold normalization to prevent data leakage
- Lightweight feature set: only 4 routine monitoring indicators, no invasive procedures
- Clinical interpretability: IG analysis surfaces model reasoning to build physician trust

[Ablation Study: mv_total exclusion]
mv_total (minute ventilation) ranked #1 in IG attribution (0.00989) but is mathematically redundant (mv≡Vt×RR). Removing it actually improved 24h AUROC by +0.004 and AUPRC by +0.014, confirming that feature importance should be validated by model behavior, not attribution scores alone.

📄 Paper: "LSTM-Based Early Prediction of Ventilator-Associated Pneumonia Using Stay-Level Cross-Validation and Extended Prediction Windows"
Manuscript submitted to IEEE GCCE 2026 (2026.05)'),
    updated_at = datetime('now')
WHERE id = 'vap';
