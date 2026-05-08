import { NextResponse } from "next/server";
import { GenerateSchema } from "@/lib/schemas";
import { requireAdmin } from "@/lib/admin-auth";
import { rateLimit } from "@/lib/rate-limit";
import { getSupabase } from "@/lib/supabase";
import { generateDrafts } from "@/lib/anthropic";
import { getTranscript, NoTranscriptError, InvalidUrlError } from "@/lib/youtube";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const auth = await requireAdmin();
  if (!auth) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";
  const rl = rateLimit(`generate:${ip}`);
  if (!rl.ok) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Try again shortly." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfter ?? 60) } }
    );
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = GenerateSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Invalid input", issues: parsed.error.issues },
      { status: 400 }
    );
  }

  const { sourceType, input } = parsed.data;
  let sourceText: string;
  let transcript: string | null = null;

  if (sourceType === "youtube") {
    try {
      transcript = await getTranscript(input);
      sourceText = transcript;
    } catch (err) {
      if (err instanceof InvalidUrlError) {
        return NextResponse.json({ ok: false, error: err.message }, { status: 400 });
      }
      if (err instanceof NoTranscriptError) {
        return NextResponse.json({ ok: false, error: err.message }, { status: 422 });
      }
      throw err;
    }
  } else {
    sourceText = input;
  }

  let drafts;
  try {
    drafts = await generateDrafts(sourceText);
  } catch (err) {
    console.error("[generate] anthropic call failed", err);
    return NextResponse.json(
      { ok: false, error: "Generation failed. Please try again." },
      { status: 500 }
    );
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
    .insert({
      source_type: sourceType,
      source_input: input,
      source_transcript: transcript,
      blog_draft: drafts.blog,
      linkedin_draft: drafts.linkedin,
      twitter_draft: drafts.twitter,
    })
    .select()
    .single();

  if (error) {
    console.error("[generate] insert failed", error);
    return NextResponse.json(
      { ok: false, error: "Could not save draft" },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, piece: data });
}
