-- Projects: 每個專案獨立一列，支援 CRUD
CREATE TABLE IF NOT EXISTS projects (
  id          TEXT PRIMARY KEY,
  zh          TEXT NOT NULL,
  en          TEXT NOT NULL,
  sort_order  INTEGER DEFAULT 0,
  updated_at  TEXT DEFAULT (datetime('now'))
);

-- Sections: profile / experience / skills_matrix / skills_detail / awards
CREATE TABLE IF NOT EXISTS sections (
  key        TEXT PRIMARY KEY,
  zh         TEXT NOT NULL,
  en         TEXT NOT NULL,
  updated_at TEXT DEFAULT (datetime('now'))
);

-- Resume HTML
CREATE TABLE IF NOT EXISTS resume (
  lang       TEXT PRIMARY KEY,
  html       TEXT NOT NULL,
  updated_at TEXT DEFAULT (datetime('now'))
);
