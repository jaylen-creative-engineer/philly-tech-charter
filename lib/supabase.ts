import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Lazy so the app builds and runs without Supabase configured —
// API routes return errors and the client falls back to seed data.
let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (client) return client;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseAnonKey) return null;
  client = createClient(supabaseUrl, supabaseAnonKey);
  return client;
}
