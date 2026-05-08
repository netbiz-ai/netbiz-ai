import { notFound } from "next/navigation";
import { getSupabase } from "@/lib/supabase";
import { PieceEditor } from "@/components/admin/piece-editor";
import type { ContentPiece } from "@/lib/types";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ id: string }> };

export default async function AdminContentDetailPage({ params }: Ctx) {
  const { id } = await params;
  const supabase = getSupabase();
  if (!supabase) notFound();

  const { data } = await supabase
    .from("content_pieces")
    .select("*, posts:published_post_id(slug)")
    .eq("id", id)
    .single();

  if (!data) notFound();
  const piece = data as ContentPiece;

  return (
    <div className="px-6 lg:px-12 py-12 max-w-[920px] mx-auto">
      <PieceEditor piece={piece} />
    </div>
  );
}
