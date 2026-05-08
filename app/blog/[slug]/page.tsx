import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getSupabase } from "@/lib/supabase";
import { renderMarkdown } from "@/lib/markdown";

export const revalidate = 60;

type Ctx = { params: Promise<{ slug: string }> };

type Post = {
  id: string;
  slug: string;
  title: string;
  body_md: string;
  excerpt: string | null;
  published_at: string;
};

async function fetchPost(slug: string): Promise<Post | null> {
  const supabase = getSupabase();
  if (!supabase) return null;
  const { data } = await supabase
    .from("posts")
    .select("id, slug, title, body_md, excerpt, published_at")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();
  return (data as Post) ?? null;
}

export async function generateMetadata({ params }: Ctx): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchPost(slug);
  if (!post) return { title: "Not found" };
  return {
    title: `${post.title} — Netbiz AI`,
    description: post.excerpt ?? undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt ?? undefined,
      type: "article",
      publishedTime: post.published_at,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt ?? undefined,
    },
  };
}

export default async function BlogPostPage({ params }: Ctx) {
  const { slug } = await params;
  const post = await fetchPost(slug);
  if (!post) notFound();

  const html = renderMarkdown(post.body_md);

  return (
    <main className="min-h-screen bg-[var(--ink)] text-[var(--paper)]">
      <div className="max-w-[760px] mx-auto px-6 py-24">
        <Link
          href="/blog"
          className="marker hover:text-[var(--accent)] transition-colors"
        >
          [ ← BLOG ]
        </Link>
        <div className="marker-muted mt-12 mb-4">
          {new Date(post.published_at).toISOString().slice(0, 10)}
        </div>
        <h1 className="display text-4xl md:text-5xl mb-10">{post.title}</h1>
        <article
          className="prose-brutalist"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </main>
  );
}
