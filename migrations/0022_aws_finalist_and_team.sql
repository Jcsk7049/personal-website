-- 0022: 補 AWS 黑客松的兩項事實（本人 2026-08-11 確認）：
--   ① 是「進入決賽並完賽、無名次」，不是單純「完賽」——原記載少講了進決賽
--   ② 三人團隊、本人技術貢獻約 95%（與 team7645-cms 記 35% 的體例一致）
-- 冪等：json_set 就地改值。awards 是陣列型 section，路徑 $[n].title。

UPDATE projects
SET zh = json_set(zh, '$.description', '三人團隊，我負責約 95% 的技術開發。LightGBM + XGBoost 加權混合（0.6/0.4）× S3 → Glue → Athena → SageMaker → Lambda → Bedrock 六服務端對端 AML 管線；63,770 帳戶 / 413,235 筆交易，32 項行為特徵（含圖論黑名單鄰居）+ SHAP 合規報告識別人頭帳戶，Streamlit 儀表板已部署上線。', '$.detail.outcome', '【競賽成果】
・進入決賽並完賽（無名次），端對端雲端架構設計獲評審正面評價
・81 commits，完整實作從 API 資料擷取到模型預測的全管線

【技術成果】
・成功串接六項 AWS 服務：SageMaker、Glue、Athena、Lambda、S3、Bedrock
・特徵工程從競賽初版 3 項擴充至 32 項行為指標
・SHAP 可解釋性模組讓模型判斷具備合規說明能力
・Streamlit 儀表板支援帳戶風險互動審查，已部署上線

【模型效能（儀表板版本）】
・AUC：83.2%
・Precision：27.5%
・Recall：33.2%
・F1 Score：30.1%
・Accuracy：95.0%
・標記為風險帳戶：501 / 12,753

這組數字來自已部署的 BitoGuard 儀表板；Accuracy 受資料不平衡影響，不單獨作為模型好壞的判斷。Precision 與 Recall 一起呈現，讓誤報成本和找出風險帳戶的能力都能被看見。'),
    en = json_set(en, '$.description', 'Three-person team; I built ~95% of the technical work. LightGBM + XGBoost blend (0.6/0.4) × S3→Glue→Athena→SageMaker→Lambda→Bedrock end-to-end AML pipeline; 63,770 accounts / 413,235 transactions; 32 behavioral features (incl. graph-theory blacklist neighbors) + SHAP compliance reports to identify money mule accounts. Streamlit dashboard live.', '$.detail.outcome', '[Competition Result]
- Reached the final and completed it (no placing); end-to-end cloud architecture received positive feedback from judges
- 81 commits, fully implementing the pipeline from API data ingestion to model prediction

[Technical Achievements]
- Successfully chained 6 AWS services: SageMaker, Glue, Athena, Lambda, S3, Bedrock
- Feature engineering expanded from 3 competition features to 31 behavioral indicators
- SHAP interpretability module provides AML-compliant explanations
- Streamlit dashboard supports interactive account risk review — deployed live

[Model Performance — Dashboard Version]
- AUC: 83.2%
- Precision: 27.5%
- Recall: 33.2%
- F1 Score: 30.1%
- Accuracy: 95.0%
- Accounts flagged as risky: 501 / 12,753

These figures come from the deployed BitoGuard dashboard. Accuracy is affected by class imbalance, so it is not used alone to judge the model; precision and recall are presented together to show both false-positive cost and risk-account coverage.'),
    updated_at = datetime('now')
WHERE id = 'aws-hackathon';

UPDATE sections SET zh = json_set(zh, '$[0].title', 'AWS x BitoPro 黑客松：AI 詐騙偵測 — 進入決賽並完賽（無名次）'), updated_at = datetime('now') WHERE key = 'awards';

UPDATE sections SET en = json_set(en, '$[0].title', 'AWS × BitoPro Hackathon: AI Fraud Detection — Finalist (no placing)'), updated_at = datetime('now') WHERE key = 'awards';
