-- 0019: 保留 XGBoost 與 LightGBM 兩項技能，但僅將 LightGBM 連結至 BitOGuard。

UPDATE sections
SET zh = json_insert(
  json_set(
    zh,
    '$.data_analysis.skills[1].name', 'LightGBM',
    '$.data_analysis.skills[1].level', '進階',
    '$.data_analysis.skills[1].desc', '用於 BitOGuard 的不平衡二元分類，搭配 SHAP 檢視每個特徵對帳戶風險分數的貢獻，並比較不同決策閾值下的 Precision 與 Recall。',
    '$.data_analysis.skills[1].projects', json('["AWS x BitoPro 黑客松"]')
  ),
  '$.data_analysis.skills[#]',
  json('{"name":"XGBoost","level":"熟悉","desc":"用在 DSP／訊號分類課程與實驗，練習以梯度提升樹處理二元分類問題與解讀特徵重要性。","projects":[]}')
),
en = json_insert(
  json_set(
    en,
    '$.data_analysis.skills[1].name', 'LightGBM',
    '$.data_analysis.skills[1].level', '進階',
    '$.data_analysis.skills[1].desc', 'Used in BitOGuard for imbalanced binary classification, with SHAP to inspect each feature''s contribution to account-risk scores and threshold comparisons for precision and recall.',
    '$.data_analysis.skills[1].projects', json('["AWS × BitoPro Hackathon"]')
  ),
  '$.data_analysis.skills[#]',
  json('{"name":"XGBoost","level":"熟悉","desc":"Used in DSP and signal-classification coursework and labs to practice gradient-boosted binary classification and interpret feature importance.","projects":[]}')
)
WHERE key = 'skills_detail';
