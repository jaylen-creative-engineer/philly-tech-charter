import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "../../../lib/supabase";
import { Contribution } from "../../../lib/types";

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

  // Map snake_case DB columns to camelCase TS interface
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

  const body: Contribution = await req.json();

  const { error } = await supabase.from("contributions").insert({
    id: body.id,
    name: body.name,
    context: body.context,
    type: body.type,
    text: body.text,
    principle_title: body.principleTitle ?? null,
    created_at: body.createdAt,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
