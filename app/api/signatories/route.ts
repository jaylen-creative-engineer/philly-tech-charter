import { NextRequest, NextResponse } from "next/server";
import {
  getSupabase,
  isDuplicateSignatoryError,
  isValidEmail,
  normalizeSignatoryName,
  saveContributorEmail,
} from "../../../lib/supabase";
import { Signatory, SubmissionPayload } from "../../../lib/types";

const DUPLICATE_SIGNATURE_MESSAGE =
  "This name is already on the signatory record. Each person may sign once.";

function dedupeSignatories(signatories: Signatory[]) {
  const seen = new Set<string>();

  return signatories.filter((signatory) => {
    const key = normalizeSignatoryName(signatory.name);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export async function GET() {
  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });
  }

  const { data, error } = await supabase
    .from("signatories")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const signatories: Signatory[] = dedupeSignatories(
    (data ?? []).map((row) => ({
      id: row.id,
      name: row.name,
      context: row.context,
      createdAt: row.created_at,
    })),
  );

  return NextResponse.json(signatories);
}

export async function POST(req: NextRequest) {
  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });
  }

  const body: Signatory & SubmissionPayload = await req.json();
  const { email, ...signatory } = body;
  const trimmedName = signatory.name.trim();

  if (!trimmedName) {
    return NextResponse.json({ error: "Please enter your name to sign the charter." }, { status: 400 });
  }

  if (email?.trim() && !isValidEmail(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const nameKey = normalizeSignatoryName(trimmedName);

  const { data: existing } = await supabase
    .from("signatories")
    .select("id")
    .eq("name_key", nameKey)
    .maybeSingle();

  if (existing) {
    return NextResponse.json({ error: DUPLICATE_SIGNATURE_MESSAGE }, { status: 409 });
  }

  const { error } = await supabase.from("signatories").insert({
    id: signatory.id,
    name: trimmedName,
    name_key: nameKey,
    context: signatory.context.trim(),
    created_at: signatory.createdAt,
  });

  if (error) {
    if (isDuplicateSignatoryError(error)) {
      return NextResponse.json({ error: DUPLICATE_SIGNATURE_MESSAGE }, { status: 409 });
    }

    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const emailError = await saveContributorEmail(
    supabase,
    signatory.id,
    "signatory",
    email,
  );

  if (emailError) {
    return NextResponse.json({ error: emailError.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
