-- 0021: VAP 論文由「投稿中」更新為 IEEE GCCE 2026 已接受（poster，神戶）。
-- 來源：2026-08-11 EDAS 錄取通知，paper #1571300279。
-- 冪等：全部用 json_set 就地改值，重跑結果相同；不整包覆蓋，不會清掉 admin 在 D1 上的其他編輯。
-- 註：experience 區段的 JSON 根是陣列，路徑為 $[0].description（VAP 研究是第 0 筆）。

UPDATE sections
SET zh = json_set(zh, '$.bio', '機電整合科班出身，軟硬韌全鏈路都親手走過：機構設計、CNC 加工、PCB、嵌入式韌體，到資料分析與 AI 模型。電機系三年級，高職讀機電整合，所以每一層都實際碰過、也知道彼此怎麼銜接——跨背景合作時比較容易對焦。最近的 ICU VAP 時序預測研究已獲 IEEE GCCE 2026 接受（poster）。'),
    en = json_set(en, '$.bio', 'Trained in mechatronics from the ground up — mechanical design, CNC machining, PCB, embedded firmware, through to data analysis and AI models. Third-year EE student with a vocational mechatronics background, so I''ve worked hands-on at every layer and know how they connect — which makes it easier to stay aligned when collaborating across disciplines. My latest research, on time-series prediction of ICU VAP, has been accepted to IEEE GCCE 2026 (poster).'),
    updated_at = datetime('now')
WHERE key = 'profile';

UPDATE sections
SET zh = json_set(zh, '$[0].description', '主導 ICU VAP 早期預警研究：設計 Stay-Level 5-Fold 交叉驗證消除公開基準中的 Patient-Level Data Leakage，以 Integrated Gradients 特徵歸因縮減至 4 項非侵入指標，LSTM 達 72h AUROC 0.98–0.99。論文獲 IEEE GCCE 2026 接受（poster）。'),
    en = json_set(en, '$[0].description', 'Leading ICU VAP early-warning research: designed Stay-Level 5-Fold CV to eliminate patient-level data leakage in public baselines, and used Integrated Gradients to distill 14 features to 4 non-invasive metrics; LSTM achieves 72h AUROC 0.98–0.99. Paper accepted to IEEE GCCE 2026 (poster).'),
    updated_at = datetime('now')
WHERE key = 'experience';

UPDATE projects
SET zh = json_set(zh, '$.badge', 'IEEE GCCE 2026 · Accepted (Poster)', '$.detail.outcome', '【模型效能（亞東紀念醫院，Stay-level 5-fold CV）】

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

📄 論文題目：LSTM-Based Early Prediction of Ventilator-Associated Pneumonia Using Stay-Level Cross-Validation and an Extended Prediction Window
論文完稿 2026.05，2026.08 獲 IEEE GCCE 2026 接受，以 poster 形式在神戶發表。審稿意見指出兩項待補：VAP 診斷定義與 onset 時間的判定方式、以及 AUROC/AUPRC 以 window 還是以 patient 為單位計算——後者關係到本研究主打的 leakage 修正是否完整，camera-ready 需交代清楚。'),
    en = json_set(en, '$.badge', 'IEEE GCCE 2026 · Accepted (Poster)', '$.detail.outcome', '[Model Performance — Far Eastern ICU, Stay-level 5-fold CV]

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

📄 Paper: "LSTM-Based Early Prediction of Ventilator-Associated Pneumonia Using Stay-Level Cross-Validation and an Extended Prediction Window"
Manuscript completed 2026.05; accepted to IEEE GCCE 2026 in 2026.08 as a poster presentation (Kobe). Reviewers asked for two clarifications in the camera-ready: how the VAP diagnosis and onset time were determined, and whether AUROC/AUPRC are computed per time window or per patient — the latter bears directly on whether this work''s leakage correction is complete.'),
    updated_at = datetime('now')
WHERE id = 'vap';
