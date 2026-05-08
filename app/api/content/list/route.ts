import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { getSupabase } from "@/lib/supabase";

export const runtime = "nodejs";

export async function GET() {
  const auth = await requireAdmin();
  if (!auth) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json(
      { ok: false, error: "Database not configured" },
      { status: 500 }
    );
  }

  const { data, error } = await supabase
    .from("content_pieces")
    .select("id, title, source_type, source_input, created_at, published_post_id, posts:published_post_id(slug)")
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) {
    console.error("[content/list] failed", error);
    return NextResponse.json(
      { ok: false, error: "Could not load content" },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, pieces: data });
}
