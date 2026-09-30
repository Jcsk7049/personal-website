-- 0030: 將 VAP 經歷改為呈現稽核與反覆驗證的過程；只更新第一筆經歷描述。

UPDATE sections
SET zh = json_set(zh, '$[0].description', '參與 ICU VAP 早期預警研究，負責資料整理、模型比較與驗證。初版驗證的 AUROC 為 0.98–0.99。研究 poster 獲 IEEE GCCE 2026 接受後，我持續回查資料索引、時間對齊與病人切分，每次修正後都重新跑驗證。改用病人層切分後，最終 AUROC 為 0.61；我也將研究重點轉為釐清評估設定與收案差異如何影響結果。'),
    en = json_set(en, '$[0].description', 'I worked on an ICU VAP early-warning study, handling data preparation, model comparisons, and evaluation. The initial evaluation reported an AUROC of 0.98–0.99. After the study was accepted as a poster at IEEE GCCE 2026, I kept checking the data indices, time alignment, and patient split, rerunning the evaluation after each correction. With a patient-level split, the final AUROC was 0.61. I then focused the work on understanding how evaluation choices and cohort differences affected the result.'),
    updated_at = datetime('now')
WHERE key = 'experience'
  AND json_extract(zh, '$[0].role') = '實驗室專題生'
  AND json_extract(en, '$[0].role') = 'Research Intern';
