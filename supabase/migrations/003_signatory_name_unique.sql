-- Prevent duplicate signatures by normalized name (case/whitespace insensitive)
ALTER TABLE signatories ADD COLUMN IF NOT EXISTS name_key TEXT;

UPDATE signatories
SET name_key = lower(regexp_replace(trim(name), '\s+', ' ', 'g'))
WHERE name_key IS NULL;

DELETE FROM signatories older
USING signatories keeper
WHERE lower(regexp_replace(trim(older.name), '\s+', ' ', 'g'))
    = lower(regexp_replace(trim(keeper.name), '\s+', ' ', 'g'))
  AND older.created_at > keeper.created_at;

UPDATE signatories
SET name_key = lower(regexp_replace(trim(name), '\s+', ' ', 'g'))
WHERE name_key IS NULL;

ALTER TABLE signatories ALTER COLUMN name_key SET NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS signatories_name_key_unique ON signatories (name_key);
