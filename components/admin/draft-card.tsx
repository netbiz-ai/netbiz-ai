"use client";

import { useEffect, useState } from "react";

type Props = {
  label: string;
  value: string;
  onSave: (value: string) => Promise<void>;
  rightSlot?: React.ReactNode;
  rows?: number;
};

export function DraftCard({ label, value, onSave, rightSlot, rows = 18 }: Props) {
  const [draft, setDraft] = useState(value);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<number | null>(null);

  useEffect(() => {
    setDraft(value);
  }, [value]);

  async function handleSave() {
    setSaving(true);
    try {
      await onSave(draft);
      setSavedAt(Date.now());
    } finally {
      setSaving(false);
    }
  }

  const dirty = draft !== value;

  return (
    <div className="admin-card overflow-hidden">
      <div className="flex items-center justify-between border-b border-[var(--admin-hairline)] px-5 py-3">
        <span className="admin-marker">{label}</span>
        <div className="flex items-center gap-3">
          {savedAt && !dirty && (
            <span className="admin-marker-muted">Saved</span>
          )}
          <button
            type="button"
            onClick={handleSave}
            disabled={!dirty || saving}
            className="admin-btn-ghost text-[12px] disabled:opacity-30"
          >
            {saving ? "Saving..." : "Save"}
          </button>
          {rightSlot}
        </div>
      </div>
      <textarea
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        rows={rows}
        spellCheck={false}
        className="admin-input-bare w-full px-5 py-4 font-mono text-[13px] resize-y"
      />
    </div>
  );
}
