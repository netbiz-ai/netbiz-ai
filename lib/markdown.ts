import "server-only";
import { marked } from "marked";
import DOMPurify from "isomorphic-dompurify";

marked.setOptions({ gfm: true, breaks: false });

export function renderMarkdown(md: string): string {
  const html = marked.parse(md, { async: false }) as string;
  return DOMPurify.sanitize(html);
}

export function stripMarkdown(md: string): string {
  return md
    .replace(/^#+\s+/gm, "")
    .replace(/[*_`>~\[\]()!#-]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function autoExcerpt(md: string, maxChars = 160): string {
  const stripped = stripMarkdown(md);
  if (stripped.length <= maxChars) return stripped;
  return stripped.slice(0, maxChars).replace(/\s+\S*$/, "") + "...";
}
