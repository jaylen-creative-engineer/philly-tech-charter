import { createClient, SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

function getSupabaseKey() {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

export function getSupabase(): SupabaseClient | null {
  if (client) return client;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = getSupabaseKey();
  if (!supabaseUrl || !supabaseKey) return null;

  client = createClient(supabaseUrl, supabaseKey);
  return client;
}

export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function normalizeSignatoryName(name: string) {
  return name.trim().replace(/\s+/g, " ").toLowerCase();
}

export function isDuplicateSignatoryError(error: { code?: string; message?: string }) {
  return error.code === "23505" || error.message?.includes("signatories_name_key_unique") === true;
}

async function saveContributorEmail(
  supabase: SupabaseClient,
  submissionId: string,
  submissionType: "contribution" | "signatory",
  email: string | undefined,
) {
  const trimmed = email?.trim().toLowerCase();
  if (!trimmed || !isValidEmail(trimmed)) return null;

  const { error } = await supabase.from("contributor_emails").insert({
    submission_id: submissionId,
    submission_type: submissionType,
    email: trimmed,
  });

  return error;
}

export { saveContributorEmail };
