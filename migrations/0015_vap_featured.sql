-- 0015: vap 專案標記為 featured，供 ProjectShowcase 全部分類檢視下做重點卡片（大膽化改版）

UPDATE projects SET zh = json_set(zh, '$.featured', json('true')) WHERE id = 'vap';
UPDATE projects SET en = json_set(en, '$.featured', json('true')) WHERE id = 'vap';
