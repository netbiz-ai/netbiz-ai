import { NextResponse } from "next/server";
import slugify from "slugify";
import { requireAdmin } from "@/lib/admin-auth";
import { getSupabase } from "@/lib/supabase";
import { PublishSchema } from "@/lib/schemas";
import { autoExcerpt } from "@/lib/markdown";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ id: string }> };

export async function POST(req: Request, { params }: Ctx) {
  const auth = await requireAdmin();
  if (!auth) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;

  let json: unknown = {};
  try {
    json = await req.json();
  } catch {
    /* empty body is fine */
  }

  const parsed = PublishSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Invalid input", issues: parsed.error.issues },
      { status: 400 }
    );
  }

  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json(
      { ok: false, error: "Database not configured" },
      { status: 500 }
    );
  }

  const { data: piece, error: pieceErr } = await supabase
    .from("content_pieces")
    .select("*")
    .eq("id", id)
    .single();

  if (pieceErr || !piece) {
    return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
  }

  const title =
    parsed.data.title || piece.title || deriveTitleFromMarkdown(piece.blog_draft);

  if (!title) {
    return NextResponse.json(
      { ok: false, error: "Title is required (or add an H1 to the blog draft)" },
      { status: 400 }
    );
  }

  const body_md: string = piece.blog_draft;
  if (!body_md.trim()) {
    return NextResponse.json(
      { ok: false, error: "Blog draft is empty" },
      { status: 400 }
    );
  }

  const excerpt = autoExcerpt(body_md);
  const now = new Date().toISOString();

  // Republish in place if already linked to a post
  if (piece.published_post_id) {
    const { data: existing, error: updErr } = await supabase
      .from("posts")
      .update({ title, body_md, excerpt, status: "published", published_at: now })
      .eq("id", piece.published_post_id)
      .select("slug")
      .single();
    if (updErr || !existing) {
      console.error("[publish] update failed", updErr);
      return NextResponse.json(
        { ok: false, error: "Republish failed" },
        { status: 500 }
      );
    }
    await supabase
      .from("content_pieces")
      .update({ title })
      .eq("id", piece.id);
    return NextResponse.json({ ok: true, slug: existing.slug });
  }

  // New publish — find a unique slug
  const baseSlug =
    parsed.data.slug || slugify(title, { lower: true, strict: true });
  const slug = await findUniqueSlug(supabase, baseSlug);

  const { data: post, error: insErr } = await supabase
    .from("posts")
    .insert({
      slug,
      title,
      body_md,
      excerpt,
      status: "published",
      published_at: now,
    })
    .select()
    .single();

  if (insErr || !post) {
    console.error("[publish] insert failed", insErr);
    return NextResponse.json(
      { ok: false, error: "Publish failed" },
      { status: 500 }
    );
  }

  await supabase
    .from("content_pieces")
    .update({ published_post_id: post.id, title })
    .eq("id", piece.id);

  return NextResponse.json({ ok: true, slug });
}

function deriveTitleFromMarkdown(md: string): string {
  const m = md.match(/^#\s+(.+)$/m);
  return m ? m[1].trim() : "";
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function findUniqueSlug(supabase: any, base: string): Promise<string> {
  let candidate = base;
  let n = 2;
  // Try up to 50 collisions before giving up
  while (n < 52) {
    const { data } = await supabase
      .from("posts")
      .select("id")
      .eq("slug", candidate)
      .maybeSingle();
    if (!data) return candidate;
    candidate = `${base}-${n++}`;
  }
  return `${base}-${Date.now()}`;
}
