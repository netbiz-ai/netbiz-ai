import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { getSupabase } from "@/lib/supabase";
import { ContentPatchSchema } from "@/lib/schemas";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Ctx) {
  const auth = await requireAdmin();
  if (!auth) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("content_pieces")
    .select("*, posts:published_post_id(slug)")
    .eq("id", id)
    .single();
  if (error || !data) {
    return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ ok: true, piece: data });
}

export async function PATCH(req: Request, { params }: Ctx) {
  const auth = await requireAdmin();
  if (!auth) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = ContentPatchSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Invalid input", issues: parsed.error.issues },
      { status: 400 }
    );
  }

  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("content_pieces")
    .update(parsed.data)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("[content/patch] failed", error);
    return NextResponse.json({ ok: false, error: "Update failed" }, { status: 500 });
  }
  return NextResponse.json({ ok: true, piece: data });
}

export async function DELETE(_req: Request, { params }: Ctx) {
  const auth = await requireAdmin();
  if (!auth) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const supabase = getSupabase();
  const { error } = await supabase.from("content_pieces").delete().eq("id", id);
  if (error) {
    return NextResponse.json({ ok: false, error: "Delete failed" }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
