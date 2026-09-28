-- 0028: Altium Designer 技能誠實化（User 2026-09-28 核定）
-- 原：「進階・多層 PCB 主力工具・對應 QMK」→ 實際：高職設計過一塊板，QMK 是 EasyEDA 改開源設計
-- 只改 skills_detail 裡 name='Altium Designer' 那一筆（以名稱定位，不依賴陣列位置），
-- 不動其他技能——D1 可能含本人用 admin 改過、repo 沒有的內容。

UPDATE sections
SET zh = json_set(
      zh,
      '$.eda.skills[' || (SELECT j.key FROM json_each(sections.zh, '$.eda.skills') AS j
                          WHERE json_extract(j.value, '$.name') = 'Altium Designer') || ']',
      json('{"name":"Altium Designer","level":"熟悉","desc":"高職時期用它設計並完成一塊電路板，從原理圖到 PCB Layout 走過完整流程。操作邏輯和 KiCAD 相近，需要時可以很快重新上手。","projects":[]}')
    ),
    updated_at = datetime('now')
WHERE key = 'skills_detail'
  AND EXISTS (SELECT 1 FROM json_each(sections.zh, '$.eda.skills') AS j
              WHERE json_extract(j.value, '$.name') = 'Altium Designer');

UPDATE sections
SET en = json_set(
      en,
      '$.eda.skills[' || (SELECT j.key FROM json_each(sections.en, '$.eda.skills') AS j
                          WHERE json_extract(j.value, '$.name') = 'Altium Designer') || ']',
      json('{"name":"Altium Designer","level":"熟悉","desc":"Used it in vocational high school to design and complete a PCB, covering the full flow from schematic to layout. Its workflow is close to KiCAD, so I can pick it back up quickly when needed.","projects":[]}')
    ),
    updated_at = datetime('now')
WHERE key = 'skills_detail'
  AND EXISTS (SELECT 1 FROM json_each(sections.en, '$.eda.skills') AS j
              WHERE json_extract(j.value, '$.name') = 'Altium Designer');
