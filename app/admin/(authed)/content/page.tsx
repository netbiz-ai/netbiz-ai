import { getSupabase } from "@/lib/supabase";
import { ContentList } from "@/components/admin/content-list";
import type { ContentPiece } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function AdminContentPage() {
  const supabase = getSupabase();
  let pieces: ContentPiece[] = [];

  if (supabase) {
    const { data } = await supabase
      .from("content_pieces")
      .select("*, posts:published_post_id(slug)")
      .order("created_at", { ascending: false })
      .limit(100);
    pieces = (data as ContentPiece[]) ?? [];
  }

  return (
    <div className="px-6 lg:px-12 py-12 max-w-[920px] mx-auto">
      <div className="admin-marker mb-3">CONTENT</div>
      <h1 className="admin-display text-4xl mb-2">Your pieces</h1>
      <p className="text-[var(--admin-muted)] text-sm mb-10">
        Open one to edit drafts and publish.
      </p>
      <ContentList pieces={pieces} />
    </div>
  );
}
