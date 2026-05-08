"use client";

import { useState } from "react";
import slugify from "slugify";

type Props = {
  pieceId: string;
  initialTitle: string | null;
  publishedSlug: string | null;
  onPublished: (slug: string) => void;
};

export function PublishButton({
  pieceId,
  initialTitle,
  publishedSlug,
  onPublished,
}: Props) {
  const [title, setTitle] = useState(initialTitle ?? "");
  const [showInput, setShowInput] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const slugPreview = slugify(title || "", { lower: true, strict: true });

  async function publish() {
    if (!title.trim()) {
      setErr("Title is required");
      return;
    }
    setBusy(true);
    setErr(null);
    try {
      const res = await fetch(`/api/content/${pieceId}/publish`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setErr(data.error || "Publish failed");
        return;
      }
      onPublished(data.slug);
      window.open(`/blog/${data.slug}`, "_blank");
      setShowInput(false);
    } finally {
      setBusy(false);
    }
  }

  if (!showInput) {
    return (
      <button
        type="button"
        onClick={() => setShowInput(true)}
        className="admin-btn-ghost text-[12px]"
      >
        {publishedSlug ? "Republish" : "Publish"}
      </button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <input
        autoFocus
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Post title"
        className="admin-input-bare border border-[var(--admin-hairline-strong)] rounded-[var(--admin-radius-sm)] px-2 py-1 text-[12px] w-56"
      />
      <span className="admin-marker-muted text-[10px]">
        /{slugPreview || "..."}
      </span>
      <button
        type="button"
        onClick={publish}
        disabled={busy}
        className="admin-btn-primary text-[12px] py-1.5 px-3 disabled:opacity-30"
      >
        {busy ? "..." : publishedSlug ? "Republish" : "Go"}
      </button>
      <button
        type="button"
        onClick={() => setShowInput(false)}
        className="admin-btn-ghost text-[12px]"
      >
        Cancel
      </button>
      {err && <span className="text-[12px] text-[#E85A4F]">{err}</span>}
    </div>
  );
}
