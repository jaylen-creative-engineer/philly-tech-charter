-- ============================================================
-- Philly Tech Charter — initial schema
-- ============================================================

CREATE TABLE IF NOT EXISTS contributions (
  id              TEXT PRIMARY KEY,
  name            TEXT NOT NULL DEFAULT 'Anonymous',
  context         TEXT NOT NULL DEFAULT '',
  type            TEXT NOT NULL,
  text            TEXT NOT NULL,
  principle_title TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS signatories (
  id          TEXT PRIMARY KEY,
  name        TEXT NOT NULL,
  context     TEXT NOT NULL DEFAULT '',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

GRANT SELECT, INSERT ON contributions TO anon, authenticated;
GRANT SELECT, INSERT ON signatories TO anon, authenticated;

ALTER TABLE contributions ENABLE ROW LEVEL SECURITY;
ALTER TABLE signatories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anon_read_contributions"
  ON contributions FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "anon_insert_contributions"
  ON contributions FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "anon_read_signatories"
  ON signatories FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "anon_insert_signatories"
  ON signatories FOR INSERT TO anon, authenticated WITH CHECK (true);
