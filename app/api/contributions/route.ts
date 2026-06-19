import { NextRequest, NextResponse } from "next/server";
import {
  getSupabase,
  isValidEmail,
  saveContributorEmail,
} from "../../../lib/supabase";
import { Contribution, SubmissionPayload } from "../../../lib/types";

async function resolveContributionAttribution(
  supabase: NonNullable<ReturnType<typeof getSupabase>>,
  name: string,
  context: string,
  signatoryNameKey?: string,
) {
  let resolvedName = name.trim();
  let resolvedContext = context.trim();

  if ((!resolvedName || resolvedName === "Anonymous") && signatoryNameKey) {
    const { data: signatory } = await supabase
      .from("signatories")
      .select("name, context")
      .eq("name_key", signatoryNameKey)
      .maybeSingle();

    if (signatory) {
      resolvedName = signatory.name;
      if (!resolvedContext) {
        resolvedContext = signatory.context ?? "";
      }
    }
  }

  return {
    name: resolvedName || "Anonymous",
    context: resolvedContext,
  };
}

export async function GET() {
  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });
  }

  const { data, error } = await supabase
    .from("contributions")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const contributions: Contribution[] = (data ?? []).map((row) => ({
    id: row.id,
    name: row.name,
    context: row.context,
    type: row.type,
    text: row.text,
    principleTitle: row.principle_title ?? undefined,
    createdAt: row.created_at,
  }));

  return NextResponse.json(contributions);
}

export async function POST(req: NextRequest) {
  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });
  }

  const body: Contribution & SubmissionPayload = await req.json();
  const { email, signatoryNameKey, ...contribution } = body;

  if (email?.trim() && !isValidEmail(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const { name, context } = await resolveContributionAttribution(
    supabase,
    contribution.name,
    contribution.context,
    signatoryNameKey,
  );

  if (!name.trim() || name === "Anonymous") {
    return NextResponse.json({ error: "Your name is required." }, { status: 400 });
  }

  const { error } = await supabase.from("contributions").insert({
    id: contribution.id,
    name,
    context,
    type: contribution.type,
    text: contribution.text,
    principle_title: contribution.principleTitle ?? null,
    created_at: contribution.createdAt,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const emailError = await saveContributorEmail(
    supabase,
    contribution.id,
    "contribution",
    email,
  );

  if (emailError) {
    return NextResponse.json({ error: emailError.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
