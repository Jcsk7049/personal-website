CREATE TABLE IF NOT EXISTS images (
  name      TEXT PRIMARY KEY,
  data      TEXT NOT NULL,
  mime      TEXT NOT NULL DEFAULT 'image/jpeg',
  created_at TEXT DEFAULT (datetime('now'))
);
