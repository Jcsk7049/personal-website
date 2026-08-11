-- 0021: 更正 BitOGuard 的模型敘述——最終提交是 LightGBM + XGBoost 0.6/0.4 加權混合，不是純 LightGBM。
-- 來源：公開 repo github.com/Jcsk7049/bitoguard-aml 的 cv_report_lgb.json
--   （"model": "LGB(0.60) + XGB(0.40)"、blend_weight_lgb 0.6、xgb_oof_auc 0.8265、features 陣列 32 項）
-- ⚠️ 本 migration 推翻 2026-07-21 的「BitOGuard 沒有 Ensemble」定案（0019 依該定案把 XGBoost 的 projects 清空）。
--    推翻理由：該定案與本人放在履歷上的公開程式碼矛盾，面試官點連結即可看到。
-- 同時更正特徵數 31 -> 32。冪等：全部 json_set 就地改值。

UPDATE projects
SET zh = json_set(zh, '$.tags', json('["LightGBM", "XGBoost", "AWS SageMaker", "AWS Glue", "SHAP", "Streamlit"]'), '$.description', 'LightGBM + XGBoost 加權混合（0.6/0.4）× S3 → Glue → Athena → SageMaker → Lambda → Bedrock 六服務端對端 AML 管線；63,770 帳戶 / 413,235 筆交易，32 項行為特徵（含圖論黑名單鄰居）+ SHAP 合規報告識別人頭帳戶，Streamlit 儀表板已部署上線。',
      '$.detail.purpose', 'BitoPro 加密貨幣交易所 AML 合規競賽資料集：
・用戶資料：63,770 筆帳戶
・台幣轉帳紀錄：195,601 筆（56,111 用戶）
・USDT 交易紀錄：217,634 筆（33,587 用戶）
・標記人頭帳戶：1,640 筆（訓練集 3.21%）

目標是對每個帳戶輸出風險分數，識別高風險可疑帳戶，同時滿足監管機構對 AML 合規說明的可解釋性要求（不接受黑盒輸出）。

選用 LightGBM 而非深度學習的理由：AML 合規場景要求對每筆標記帳戶提供特徵層級的判斷依據，LightGBM 搭配 SHAP 可直接輸出個別帳戶的特徵貢獻值；在 <65K 結構化資料規模下，樹模型適合處理這類表格資料，也能配合類別權重處理不平衡。', '$.detail.concept', '【為何選用 LightGBM，而非深度學習？】
AML 合規系統的核心需求是可解釋性：監管機構要求對每筆標記帳戶提供「哪些特徵觸發高風險」的具體依據，而非黑盒分數。LightGBM 配合 SHAP 值分析可直接輸出每個特徵對單一帳戶預測的貢獻量，滿足合規說明義務。對這類結構化交易資料，樹模型也能以類別權重處理 1:30 的不平衡。

【資料管線（AWS 端對端架構）】
① BitoPro API 抓取交易紀錄 → ingest_to_s3.py 存入 AWS S3（原始資料層）
② AWS Glue 執行 ETL 清洗 + glue_graph_hops.py 進行圖形化多跳關聯分析
③ Amazon Athena 以 SQL 查詢聚合特徵結果（athena_graph_hops.sql）
④ Amazon SageMaker 執行 LightGBM 與 XGBoost 訓練、調參與部署（最終提交為 0.6/0.4 加權混合）
⑤ AWS Lambda + lambda_diagnosis.py 處理即時推論與事件觸發邏輯
⑥ Amazon Bedrock 整合 SHAP + XAI，為每筆高風險帳戶自動產生可解釋性報告
⑦ Streamlit 儀表板（app.py）提供互動式風險審查介面
⑧ CloudFormation template.yaml 定義全套 IaC（基礎設施即程式碼）

【特徵工程（32 項行為指標）】
競賽提交版以三項核心特徵起步（台幣存提次數、深夜交易比例），競賽後持續擴充至 32 項，涵蓋：
・交易行為：total_volume、tx_per_day、avg_twd_amount、swap_twd_volume
・時序特徵：min_retention_minutes（最短持幣時間）、night_tx_ratio
・圖論特徵：blacklist_neighbor_count（黑名單鄰居數）、is_direct_neighbor
・風險旗標：high_speed_risk、ip_anomaly、deposit_only_flag
特徵重要性最高的前三名依序為：total_volume（交易總量）、age（帳戶年齡）、swap_twd_volume（換匯金額）

【模型設計】
・LightGBM 與 XGBoost 梯度提升分類器，以 0.6/0.4 加權混合（5-fold AUC 0.819–0.849，XGBoost 單獨 OOF AUC 0.827）
・以 max_depth、learning_rate、num_iterations 與類別權重控制模型複雜度與不平衡
・5-fold Stratified CV，確保每折正負樣本比例一致
・決策閾值掃描，依 Precision 與 Recall 的取捨選擇工作點
・SHAP 值分析呈現每個特徵對個別帳戶預測的貢獻度',
      '$.detail.outcome', '【競賽成果】
・完賽 AWS x BitoPro 黑客松，端對端雲端架構設計獲評審正面評價
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
    en = json_set(en, '$.tags', json('["LightGBM", "XGBoost", "AWS SageMaker", "AWS Glue", "SHAP", "Streamlit"]'), '$.description', 'LightGBM + XGBoost blend (0.6/0.4) × S3→Glue→Athena→SageMaker→Lambda→Bedrock end-to-end AML pipeline; 63,770 accounts / 413,235 transactions; 32 behavioral features (incl. graph-theory blacklist neighbors) + SHAP compliance reports to identify money mule accounts. Streamlit dashboard live.',
      '$.detail.purpose', 'BitoPro cryptocurrency exchange AML compliance competition dataset:
- User records: 63,770 accounts
- TWD transfer records: 195,601 (56,111 users)
- USDT transaction records: 217,634 (33,587 users)
- Labeled money mule accounts: 1,640 (3.21% of training set)

Goal: output a risk score per account to identify high-risk suspicious accounts while satisfying regulators'' demand for explainability in AML compliance (black-box outputs not accepted).

Why LightGBM over deep learning:
AML compliance requires feature-level justification for every flagged account. LightGBM with SHAP directly outputs each feature''s contribution per account. For structured data at this scale, a tree model also supports class weighting for the imbalanced labels.', '$.detail.concept', '[Why LightGBM, Not Deep Learning?]
AML compliance systems require explainability: regulators demand "which features triggered high risk" for every flagged account. LightGBM with SHAP values directly outputs per-feature contributions for individual accounts, meeting compliance reporting requirements. For structured transactional data, a tree model can also use class weighting for the 1:30 imbalance.

[Data Pipeline — AWS End-to-End Architecture]
① BitoPro API ingestion → ingest_to_s3.py → AWS S3 (raw data layer)
② AWS Glue ETL + glue_graph_hops.py for graph-based multi-hop association analysis
③ Amazon Athena SQL queries to aggregate feature results (athena_graph_hops.sql)
④ Amazon SageMaker for LightGBM and XGBoost training, tuning, and deployment (final submission is a 0.6/0.4 weighted blend)
⑤ AWS Lambda + lambda_diagnosis.py for real-time inference and event-driven logic
⑥ Amazon Bedrock integrates SHAP + XAI to auto-generate explainability reports per high-risk account
⑦ Streamlit dashboard (app.py) for interactive risk review
⑧ CloudFormation template.yaml defines full IaC

[Feature Engineering — 31 Behavioral Indicators]
Competition version started with 3 core features (TWD deposit/withdrawal count, late-night transaction ratio), expanded post-competition to 31 indicators:
- Transaction behavior: total_volume, tx_per_day, avg_twd_amount, swap_twd_volume
- Temporal features: min_retention_minutes, night_tx_ratio
- Graph features: blacklist_neighbor_count, is_direct_neighbor
- Risk flags: high_speed_risk, ip_anomaly, deposit_only_flag
Top 3 by importance: total_volume, account age, swap_twd_volume

[Model Design]
- LightGBM and XGBoost gradient-boosting classifiers, blended 0.6/0.4 (5-fold AUC 0.819-0.849; XGBoost alone OOF AUC 0.827)
- max_depth, learning_rate, num_iterations, and class weighting control model complexity and imbalance
- 5-fold Stratified CV with consistent positive/negative ratios per fold
- Decision-threshold sweeps compare the precision/recall trade-off
- SHAP analysis shows per-feature contribution for individual accounts',
      '$.detail.outcome', '[Competition Result]
- Completed AWS × BitoPro Hackathon; end-to-end cloud architecture received positive feedback from judges
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

UPDATE sections
SET zh = json_set(zh, '$.data_analysis.skills[1].desc', '用於 BitOGuard 的不平衡二元分類，與 XGBoost 以 0.6/0.4 加權混合，搭配 SHAP 檢視每個特徵對帳戶風險分數的貢獻，並比較不同決策閾值下的 Precision 與 Recall。',
      '$.data_analysis.skills[2].desc', '在 BitOGuard 與 LightGBM 以 0.4 權重加權混合（單獨 OOF AUC 0.827）；另用在 DSP／訊號分類課程與實驗。',
      '$.data_analysis.skills[2].projects', json('["AWS x BitoPro 黑客松"]')),
    en = json_set(en, '$.data_analysis.skills[1].desc', 'Used in BitOGuard for imbalanced binary classification, blended 0.6/0.4 with XGBoost, with SHAP to inspect each feature''s contribution to account-risk scores and threshold comparisons for precision and recall.',
      '$.data_analysis.skills[2].desc', 'Blended with LightGBM at 0.4 weight in BitOGuard (alone: OOF AUC 0.827); also used in DSP and signal-classification coursework.',
      '$.data_analysis.skills[2].projects', json('["AWS × BitoPro Hackathon"]')),
    updated_at = datetime('now')
WHERE key = 'skills_detail';
