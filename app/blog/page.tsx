import Link from "next/link";
import { getSupabase } from "@/lib/supabase";

export const revalidate = 60;

type PostRow = {
  slug: string;
  title: string;
  excerpt: string | null;
  published_at: string;
};

export const metadata = {
  title: "Blog — Netbiz AI",
  description:
    "Notes on AI agents, automation, and operating systems for small businesses.",
};

export default async function BlogIndexPage() {
  const supabase = getSupabase();
  let posts: PostRow[] = [];
  if (supabase) {
    const { data } = await supabase
      .from("posts")
      .select("slug, title, excerpt, published_at")
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .limit(100);
    posts = (data as PostRow[]) ?? [];
  }

  return (
    <main className="min-h-screen bg-[var(--ink)] text-[var(--paper)]">
      <div className="max-w-[1200px] mx-auto px-6 py-24">
        <div className="marker text-[var(--accent)] mb-4">[ BLOG ]</div>
        <h1 className="display text-5xl mb-12">Notes from the field.</h1>

        {posts.length === 0 && (
          <p className="font-mono text-sm text-[var(--muted)]">Nothing published yet.</p>
        )}

        <ul className="border-t border-[var(--hairline)]">
          {posts.map((p) => (
            <li
              key={p.slug}
              className="border-b border-[var(--hairline)] py-6"
            >
              <Link
                href={`/blog/${p.slug}`}
                className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-4 group"
              >
                <div className="marker-muted">
                  {new Date(p.published_at).toISOString().slice(0, 10)}
                </div>
                <div>
                  <h2 className="display text-2xl mb-1 group-hover:text-[var(--accent)] transition-colors">
                    {p.title}
                  </h2>
                  {p.excerpt && (
                    <p className="font-mono text-[13px] text-[var(--paper-2)]">
                      {p.excerpt}
                    </p>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
