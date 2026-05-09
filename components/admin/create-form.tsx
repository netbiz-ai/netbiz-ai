"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Film, Mic as MicIcon } from "lucide-react";
import { MicButton } from "./mic-button";

export function CreateForm() {
  const router = useRouter();
  const [mode, setMode] = useState<"youtube" | "text">("text");
  const [input, setInput] = useState("");
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const wordCount =
    mode === "text"
      ? input.trim().split(/\s+/).filter(Boolean).length
      : 0;

  function appendFromMic(text: string) {
    setInput((prev) => (prev ? prev + " " + text.trim() : text.trim()));
  }

  async function generate() {
    if (!input.trim()) return;
    setGenerating(true);
    setError(null);
    try {
      const res = await fetch("/api/content/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sourceType: mode, input }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error || "Generation failed");
        return;
      }
      router.push(`/admin/content/${data.piece.id}`);
    } catch {
      setError("Network error");
    } finally {
      setGenerating(false);
    }
  }

  return (
    <div className="px-6 lg:px-12 py-12 max-w-[760px] mx-auto">
      <header className="text-center mb-10">
        <h1 className="admin-display text-5xl mb-3">Create Content</h1>
        <p className="text-[var(--admin-muted)] text-[17px]">
          Transform your ideas into LinkedIn posts, blog articles, and Twitter threads.
        </p>
      </header>

      {/* Mode toggle */}
      <div className="flex justify-center gap-3 mb-8">
        <button
          type="button"
          onClick={() => setMode("youtube")}
          data-active={mode === "youtube"}
          className="admin-pill"
        >
          <Film className="h-3.5 w-3.5" strokeWidth={1.5} />
          <span>YouTube</span>
        </button>
        <button
          type="button"
          onClick={() => setMode("text")}
          data-active={mode === "text"}
          className="admin-pill"
        >
          <MicIcon className="h-3.5 w-3.5" strokeWidth={1.5} />
          <span>Brain Dump</span>
        </button>
      </div>

      {/* Input card */}
      <div className="admin-card overflow-hidden">
        <div className="flex items-center justify-between px-5 pt-4 pb-2">
          <span className="admin-marker">
            {mode === "youtube" ? "PASTE YOUTUBE URL" : "TYPE OR SPEAK YOUR IDEAS"}
          </span>
          {mode === "text" && <MicButton onTranscript={appendFromMic} />}
        </div>

        {mode === "youtube" ? (
          <input
            type="url"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="https://youtube.com/watch?v=..."
            className="admin-input-bare w-full px-5 py-4"
          />
        ) : (
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="What do you want to talk about?"
            rows={10}
            spellCheck={true}
            className="admin-input-bare w-full px-5 py-4 resize-y"
          />
        )}

        <div className="px-5 py-2.5 border-t border-[var(--admin-hairline)] text-[14px] text-[var(--admin-muted)]">
          {mode === "text"
            ? `${wordCount} ${wordCount === 1 ? "word" : "words"}`
            : input ? "URL ready" : "Awaiting URL"}
        </div>
      </div>

      {error && (
        <div className="mt-6 admin-card border-[#E85A4F] px-4 py-3 text-sm text-[#E85A4F]">
          {error}
        </div>
      )}

      <div className="mt-8 flex justify-center">
        <button
          type="button"
          onClick={generate}
          disabled={generating || !input.trim()}
          className="admin-btn-primary"
        >
          {generating ? "Generating..." : "Generate drafts"}
        </button>
      </div>
    </div>
  );
}
