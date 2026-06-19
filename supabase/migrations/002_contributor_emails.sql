-- Private follow-up emails (insert-only for public; no SELECT policy)
CREATE TABLE IF NOT EXISTS contributor_emails (
  submission_id   TEXT PRIMARY KEY,
  submission_type TEXT NOT NULL CHECK (submission_type IN ('contribution', 'signatory')),
  email           TEXT NOT NULL,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

GRANT INSERT ON contributor_emails TO anon, authenticated;

ALTER TABLE contributor_emails ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anon_insert_emails"
  ON contributor_emails FOR INSERT TO anon, authenticated
  WITH CHECK (email ~* '^[^@]+@[^@]+\.[^@]+$');
