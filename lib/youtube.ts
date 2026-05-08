import { YoutubeTranscript } from "youtube-transcript";

export class InvalidUrlError extends Error {
  constructor() {
    super("That doesn't look like a YouTube URL");
    this.name = "InvalidUrlError";
  }
}

export class NoTranscriptError extends Error {
  constructor() {
    super("No captions found for this video. Paste the transcript as text instead.");
    this.name = "NoTranscriptError";
  }
}

const YOUTUBE_ID_RE =
  /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/|v\/))([A-Za-z0-9_-]{11})/;

export function extractVideoId(url: string): string {
  const match = url.match(YOUTUBE_ID_RE);
  if (!match) throw new InvalidUrlError();
  return match[1];
}

export async function getTranscript(url: string): Promise<string> {
  const id = extractVideoId(url);
  try {
    const segments = await YoutubeTranscript.fetchTranscript(id);
    if (!segments || segments.length === 0) throw new NoTranscriptError();
    return segments.map((s) => s.text).join(" ").replace(/\s+/g, " ").trim();
  } catch (err) {
    if (err instanceof NoTranscriptError) throw err;
    throw new NoTranscriptError();
  }
}
