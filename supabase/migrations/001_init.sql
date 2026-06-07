-- ============================================================
-- Philly Tech Charter — initial schema
-- Run this in your Supabase project: SQL Editor → New query
-- ============================================================

-- Contributions
CREATE TABLE IF NOT EXISTS contributions (
  id            TEXT PRIMARY KEY,
  name          TEXT NOT NULL DEFAULT 'Anonymous',
  context       TEXT NOT NULL DEFAULT '',
  type          TEXT NOT NULL,
  text          TEXT NOT NULL,
  principle_title TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Signatories
CREATE TABLE IF NOT EXISTS signatories (
  id          TEXT PRIMARY KEY,
  name        TEXT NOT NULL,
  context     TEXT NOT NULL DEFAULT '',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE contributions ENABLE ROW LEVEL SECURITY;
ALTER TABLE signatories   ENABLE ROW LEVEL SECURITY;

-- Public can read all contributions
CREATE POLICY "public_read_contributions"
  ON contributions FOR SELECT USING (true);

-- Public can insert contributions
CREATE POLICY "public_insert_contributions"
  ON contributions FOR INSERT WITH CHECK (true);

-- Public can read all signatories
CREATE POLICY "public_read_signatories"
  ON signatories FOR SELECT USING (true);

-- Public can insert signatories
CREATE POLICY "public_insert_signatories"
  ON signatories FOR INSERT WITH CHECK (true);
