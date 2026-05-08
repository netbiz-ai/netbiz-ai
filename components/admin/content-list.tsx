"use client";

import Link from "next/link";
import type { ContentPiece } from "@/lib/types";

type Props = { pieces: ContentPiece[] };

export function ContentList({ pieces }: Props) {
  if (pieces.length === 0) {
    return (
      <div className="admin-card p-10 text-center">
        <p className="text-[var(--admin-muted)] text-sm mb-4">
          No pieces yet. Create your first one.
        </p>
        <Link href="/admin" className="admin-btn-primary inline-flex">
          New piece
        </Link>
      </div>
    );
  }

  return (
    <ul className="space-y-2">
      {pieces.map((p) => {
        const label = p.title || p.source_input.slice(0, 100);
        const date = new Date(p.created_at).toISOString().slice(0, 10);
        return (
          <li key={p.id}>
            <Link
              href={`/admin/content/${p.id}`}
              className="admin-card flex items-start gap-4 px-5 py-4 transition-colors hover:border-[var(--admin-accent)]"
            >
              <div className="admin-marker-muted text-[10px] pt-1 w-20 shrink-0">
                {date}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[var(--admin-text)] text-[15px] line-clamp-2 break-words">
                  {label}
                </div>
                <div className="flex items-center gap-3 mt-1.5">
                  <span className="admin-marker-muted text-[10px]">
                    {p.source_type.toUpperCase()}
                  </span>
                  {p.posts?.slug && (
                    <span className="admin-marker text-[10px]">LIVE</span>
                  )}
                </div>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
