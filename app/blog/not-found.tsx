import Link from "next/link";

export default function BlogNotFound() {
  return (
    <main className="min-h-screen bg-[var(--ink)] text-[var(--paper)] flex items-center justify-center px-6">
      <div className="text-center">
        <div className="marker text-[var(--accent)] mb-4">[ 404 ]</div>
        <h1 className="display text-4xl mb-6">No such post.</h1>
        <Link
          href="/blog"
          className="btn-acid"
        >
          <span>[ BACK TO BLOG ]</span>
        </Link>
      </div>
    </main>
  );
}
