import { NextRequest, NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase";
import { Signatory } from "../../../lib/types";

export async function GET() {
  const { data, error } = await supabase
    .from("signatories")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const signatories: Signatory[] = (data ?? []).map((row) => ({
    id: row.id,
    name: row.name,
    context: row.context,
    createdAt: row.created_at,
  }));

  return NextResponse.json(signatories);
}

export async function POST(req: NextRequest) {
  const body: Signatory = await req.json();

  const { error } = await supabase.from("signatories").insert({
    id: body.id,
    name: body.name,
    context: body.context,
    created_at: body.createdAt,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
