CREATE TABLE IF NOT EXISTS login_attempts (
  ip          TEXT PRIMARY KEY,
  count       INTEGER NOT NULL DEFAULT 0,
  first_at    INTEGER NOT NULL,
  locked_until INTEGER
);
