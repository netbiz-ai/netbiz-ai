"use client";

import { useEffect, useState } from "react";

type Props = {
  tweets: string[];
  onSave: (tweets: string[]) => Promise<void>;
};

export function TwitterEditor({ tweets, onSave }: Props) {
  const [draft, setDraft] = useState<string[]>(tweets);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setDraft(tweets);
  }, [tweets]);

  function update(i: number, value: string) {
    setDraft((prev) => prev.map((t, idx) => (idx === i ? value : t)));
  }
  function add() {
    setDraft((prev) => [...prev, ""]);
  }
  function remove(i: number) {
    setDraft((prev) => prev.filter((_, idx) => idx !== i));
  }

  async function handleSave() {
    setSaving(true);
    try {
      await onSave(draft);
      setSavedAt(Date.now());
    } finally {
      setSaving(false);
    }
  }

  async function handleCopy() {
    const text = draft.map((t, i) => `${i + 1}/ ${t}`).join("\n\n---\n\n");
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  const dirty = JSON.stringify(draft) !== JSON.stringify(tweets);

  return (
    <div className="admin-card overflow-hidden">
      <div className="flex items-center justify-between border-b border-[var(--admin-hairline)] px-5 py-3">
        <span className="admin-marker">TWITTER THREAD</span>
        <div className="flex items-center gap-3">
          {savedAt && !dirty && (
            <span className="admin-marker-muted">Saved</span>
          )}
          <button
            type="button"
            onClick={handleCopy}
            className="admin-btn-ghost text-[14px]"
          >
            {copied ? "Copied" : "Copy thread"}
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={!dirty || saving}
            className="admin-btn-ghost text-[14px] disabled:opacity-30"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>

      <div className="px-5 py-4 space-y-3">
        {draft.map((tweet, i) => {
          const len = tweet.length;
          const over = len > 280;
          return (
            <div
              key={i}
              className="border border-[var(--admin-hairline)] rounded-[var(--admin-radius-sm)] overflow-hidden"
            >
              <div className="flex items-center justify-between border-b border-[var(--admin-hairline)] px-3 py-1.5">
                <span className="admin-marker-muted">{i + 1}/</span>
                <div className="flex items-center gap-3">
                  <span
                    className="admin-marker-muted"
                    style={{
                      color: over
                        ? "#E85A4F"
                        : len > 260
                        ? "var(--admin-accent)"
                        : undefined,
                    }}
                  >
                    {len}/280
                  </span>
                  <button
                    type="button"
                    onClick={() => remove(i)}
                    className="admin-marker-muted hover:text-[#E85A4F]"
                  >
                    Drop
                  </button>
                </div>
              </div>
              <textarea
                value={tweet}
                onChange={(e) => update(i, e.target.value)}
                rows={3}
                spellCheck={false}
                className="admin-input-bare w-full px-3 py-2 font-mono text-[15px] resize-y"
              />
            </div>
          );
        })}

        <button
          type="button"
          onClick={add}
          className="admin-btn-ghost text-[14px]"
        >
          + Add tweet
        </button>
      </div>
    </div>
  );
}
