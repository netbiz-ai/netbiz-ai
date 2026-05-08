"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import type { ContentPiece } from "@/lib/types";
import { DraftCard } from "./draft-card";
import { TwitterEditor } from "./twitter-editor";
import { PublishButton } from "./publish-button";

type Props = { piece: ContentPiece };

export function PieceEditor({ piece: initialPiece }: Props) {
  const [piece, setPiece] = useState<ContentPiece>(initialPiece);

  async function patch(patch: Partial<ContentPiece>) {
    const res = await fetch(`/api/content/${piece.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    });
    const data = await res.json();
    if (data.ok) {
      setPiece((prev) => ({ ...prev, ...data.piece }));
    }
  }

  function onPublished(slug: string) {
    setPiece((prev) => ({
      ...prev,
      posts: { slug },
      published_post_id: prev.published_post_id || "set",
    }));
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link
          href="/admin/content"
          className="admin-btn-ghost text-[12px]"
        >
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
          <span>All pieces</span>
        </Link>
        <div className="admin-marker-muted">
          {new Date(piece.created_at).toLocaleString()}
        </div>
      </div>

      <div>
        <div className="admin-marker mb-2">
          {piece.source_type.toUpperCase()} SOURCE
        </div>
        <div className="admin-card px-5 py-3 text-sm text-[var(--admin-muted)] break-words">
          {piece.source_input.slice(0, 280)}
          {piece.source_input.length > 280 && "..."}
        </div>
      </div>

      <DraftCard
        label="BLOG / MARKDOWN"
        value={piece.blog_draft}
        onSave={(v) => patch({ blog_draft: v })}
        rows={20}
        rightSlot={
          <PublishButton
            pieceId={piece.id}
            initialTitle={piece.title ?? deriveTitle(piece.blog_draft)}
            publishedSlug={piece.posts?.slug ?? null}
            onPublished={onPublished}
          />
        }
      />

      <DraftCard
        label="LINKEDIN"
        value={piece.linkedin_draft}
        onSave={(v) => patch({ linkedin_draft: v })}
        rows={10}
        copyable
        copyLabel="Copy & open LinkedIn"
        openUrlAfterCopy="https://www.linkedin.com/feed/?shareActive=true"
      />

      <TwitterEditor
        tweets={piece.twitter_draft}
        onSave={(tweets) => patch({ twitter_draft: tweets })}
      />
    </div>
  );
}

function deriveTitle(md: string): string {
  const m = md.match(/^#\s+(.+)$/m);
  return m ? m[1].trim() : "";
}
