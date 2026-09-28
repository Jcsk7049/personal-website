-- 0029: 技能等級依作品證據校準（User 2026-09-28 核定，參考 Codex 評估）

-- 只改 skills_detail 內指定技能的 level 欄位；以名稱定位；desc/projects 與其他技能一律不動。

UPDATE sections
SET zh = json_set(zh, '$.data_analysis.skills[' || (SELECT j.key FROM json_each(sections.zh, '$.data_analysis.skills') AS j WHERE json_extract(j.value, '$.name') = '深度學習') || '].level', '熟悉'),
    updated_at = datetime('now')
WHERE key = 'skills_detail'
  AND EXISTS (SELECT 1 FROM json_each(sections.zh, '$.data_analysis.skills') AS j WHERE json_extract(j.value, '$.name') = '深度學習');

UPDATE sections
SET en = json_set(en, '$.data_analysis.skills[' || (SELECT j.key FROM json_each(sections.en, '$.data_analysis.skills') AS j WHERE json_extract(j.value, '$.name') = 'Deep Learning') || '].level', '熟悉'),
    updated_at = datetime('now')
WHERE key = 'skills_detail'
  AND EXISTS (SELECT 1 FROM json_each(sections.en, '$.data_analysis.skills') AS j WHERE json_extract(j.value, '$.name') = 'Deep Learning');

UPDATE sections
SET zh = json_set(zh, '$.data_analysis.skills[' || (SELECT j.key FROM json_each(sections.zh, '$.data_analysis.skills') AS j WHERE json_extract(j.value, '$.name') = 'LightGBM') || '].level', '熟悉'),
    updated_at = datetime('now')
WHERE key = 'skills_detail'
  AND EXISTS (SELECT 1 FROM json_each(sections.zh, '$.data_analysis.skills') AS j WHERE json_extract(j.value, '$.name') = 'LightGBM');

UPDATE sections
SET en = json_set(en, '$.data_analysis.skills[' || (SELECT j.key FROM json_each(sections.en, '$.data_analysis.skills') AS j WHERE json_extract(j.value, '$.name') = 'LightGBM') || '].level', '熟悉'),
    updated_at = datetime('now')
WHERE key = 'skills_detail'
  AND EXISTS (SELECT 1 FROM json_each(sections.en, '$.data_analysis.skills') AS j WHERE json_extract(j.value, '$.name') = 'LightGBM');

UPDATE sections
SET zh = json_set(zh, '$.data_analysis.skills[' || (SELECT j.key FROM json_each(sections.zh, '$.data_analysis.skills') AS j WHERE json_extract(j.value, '$.name') = '特徵工程') || '].level', '熟悉'),
    updated_at = datetime('now')
WHERE key = 'skills_detail'
  AND EXISTS (SELECT 1 FROM json_each(sections.zh, '$.data_analysis.skills') AS j WHERE json_extract(j.value, '$.name') = '特徵工程');

UPDATE sections
SET en = json_set(en, '$.data_analysis.skills[' || (SELECT j.key FROM json_each(sections.en, '$.data_analysis.skills') AS j WHERE json_extract(j.value, '$.name') = 'Feature Engineering') || '].level', '熟悉'),
    updated_at = datetime('now')
WHERE key = 'skills_detail'
  AND EXISTS (SELECT 1 FROM json_each(sections.en, '$.data_analysis.skills') AS j WHERE json_extract(j.value, '$.name') = 'Feature Engineering');

UPDATE sections
SET zh = json_set(zh, '$.programming.skills[' || (SELECT j.key FROM json_each(sections.zh, '$.programming.skills') AS j WHERE json_extract(j.value, '$.name') = 'C / C++') || '].level', '熟悉'),
    updated_at = datetime('now')
WHERE key = 'skills_detail'
  AND EXISTS (SELECT 1 FROM json_each(sections.zh, '$.programming.skills') AS j WHERE json_extract(j.value, '$.name') = 'C / C++');

UPDATE sections
SET en = json_set(en, '$.programming.skills[' || (SELECT j.key FROM json_each(sections.en, '$.programming.skills') AS j WHERE json_extract(j.value, '$.name') = 'C / C++') || '].level', '熟悉'),
    updated_at = datetime('now')
WHERE key = 'skills_detail'
  AND EXISTS (SELECT 1 FROM json_each(sections.en, '$.programming.skills') AS j WHERE json_extract(j.value, '$.name') = 'C / C++');

UPDATE sections
SET zh = json_set(zh, '$.programming.skills[' || (SELECT j.key FROM json_each(sections.zh, '$.programming.skills') AS j WHERE json_extract(j.value, '$.name') = 'Python') || '].level', '熟悉'),
    updated_at = datetime('now')
WHERE key = 'skills_detail'
  AND EXISTS (SELECT 1 FROM json_each(sections.zh, '$.programming.skills') AS j WHERE json_extract(j.value, '$.name') = 'Python');

UPDATE sections
SET en = json_set(en, '$.programming.skills[' || (SELECT j.key FROM json_each(sections.en, '$.programming.skills') AS j WHERE json_extract(j.value, '$.name') = 'Python') || '].level', '熟悉'),
    updated_at = datetime('now')
WHERE key = 'skills_detail'
  AND EXISTS (SELECT 1 FROM json_each(sections.en, '$.programming.skills') AS j WHERE json_extract(j.value, '$.name') = 'Python');

UPDATE sections
SET zh = json_set(zh, '$.manufacturing.skills[' || (SELECT j.key FROM json_each(sections.zh, '$.manufacturing.skills') AS j WHERE json_extract(j.value, '$.name') = '3D 列印') || '].level', '熟悉'),
    updated_at = datetime('now')
WHERE key = 'skills_detail'
  AND EXISTS (SELECT 1 FROM json_each(sections.zh, '$.manufacturing.skills') AS j WHERE json_extract(j.value, '$.name') = '3D 列印');

UPDATE sections
SET en = json_set(en, '$.manufacturing.skills[' || (SELECT j.key FROM json_each(sections.en, '$.manufacturing.skills') AS j WHERE json_extract(j.value, '$.name') = '3D Printing') || '].level', '熟悉'),
    updated_at = datetime('now')
WHERE key = 'skills_detail'
  AND EXISTS (SELECT 1 FROM json_each(sections.en, '$.manufacturing.skills') AS j WHERE json_extract(j.value, '$.name') = '3D Printing');

UPDATE sections
SET zh = json_set(zh, '$.manufacturing.skills[' || (SELECT j.key FROM json_each(sections.zh, '$.manufacturing.skills') AS j WHERE json_extract(j.value, '$.name') = 'Autodesk Inventor') || '].level', '熟悉'),
    updated_at = datetime('now')
WHERE key = 'skills_detail'
  AND EXISTS (SELECT 1 FROM json_each(sections.zh, '$.manufacturing.skills') AS j WHERE json_extract(j.value, '$.name') = 'Autodesk Inventor');

UPDATE sections
SET en = json_set(en, '$.manufacturing.skills[' || (SELECT j.key FROM json_each(sections.en, '$.manufacturing.skills') AS j WHERE json_extract(j.value, '$.name') = 'Autodesk Inventor') || '].level', '熟悉'),
    updated_at = datetime('now')
WHERE key = 'skills_detail'
  AND EXISTS (SELECT 1 FROM json_each(sections.en, '$.manufacturing.skills') AS j WHERE json_extract(j.value, '$.name') = 'Autodesk Inventor');

UPDATE sections
SET zh = json_set(zh, '$.manufacturing.skills[' || (SELECT j.key FROM json_each(sections.zh, '$.manufacturing.skills') AS j WHERE json_extract(j.value, '$.name') = 'AutoCAD') || '].level', '熟悉'),
    updated_at = datetime('now')
WHERE key = 'skills_detail'
  AND EXISTS (SELECT 1 FROM json_each(sections.zh, '$.manufacturing.skills') AS j WHERE json_extract(j.value, '$.name') = 'AutoCAD');

UPDATE sections
SET en = json_set(en, '$.manufacturing.skills[' || (SELECT j.key FROM json_each(sections.en, '$.manufacturing.skills') AS j WHERE json_extract(j.value, '$.name') = 'AutoCAD') || '].level', '熟悉'),
    updated_at = datetime('now')
WHERE key = 'skills_detail'
  AND EXISTS (SELECT 1 FROM json_each(sections.en, '$.manufacturing.skills') AS j WHERE json_extract(j.value, '$.name') = 'AutoCAD');

UPDATE sections
SET zh = json_set(zh, '$.manufacturing.skills[' || (SELECT j.key FROM json_each(sections.zh, '$.manufacturing.skills') AS j WHERE json_extract(j.value, '$.name') = '雷射切割') || '].level', '基礎'),
    updated_at = datetime('now')
WHERE key = 'skills_detail'
  AND EXISTS (SELECT 1 FROM json_each(sections.zh, '$.manufacturing.skills') AS j WHERE json_extract(j.value, '$.name') = '雷射切割');

UPDATE sections
SET en = json_set(en, '$.manufacturing.skills[' || (SELECT j.key FROM json_each(sections.en, '$.manufacturing.skills') AS j WHERE json_extract(j.value, '$.name') = 'Laser Cutting') || '].level', '基礎'),
    updated_at = datetime('now')
WHERE key = 'skills_detail'
  AND EXISTS (SELECT 1 FROM json_each(sections.en, '$.manufacturing.skills') AS j WHERE json_extract(j.value, '$.name') = 'Laser Cutting');

UPDATE sections
SET zh = json_set(zh, '$.manufacturing.skills[' || (SELECT j.key FROM json_each(sections.zh, '$.manufacturing.skills') AS j WHERE json_extract(j.value, '$.name') = 'Fusion 360') || '].level', '基礎'),
    updated_at = datetime('now')
WHERE key = 'skills_detail'
  AND EXISTS (SELECT 1 FROM json_each(sections.zh, '$.manufacturing.skills') AS j WHERE json_extract(j.value, '$.name') = 'Fusion 360');

UPDATE sections
SET en = json_set(en, '$.manufacturing.skills[' || (SELECT j.key FROM json_each(sections.en, '$.manufacturing.skills') AS j WHERE json_extract(j.value, '$.name') = 'Fusion 360') || '].level', '基礎'),
    updated_at = datetime('now')
WHERE key = 'skills_detail'
  AND EXISTS (SELECT 1 FROM json_each(sections.en, '$.manufacturing.skills') AS j WHERE json_extract(j.value, '$.name') = 'Fusion 360');
