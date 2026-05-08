type Group = {
  label: string;
  items: string[];
};

const GROUPS: Group[] = [
  { label: "Foundation models", items: ["Claude", "OpenAI", "Gemini"] },
  { label: "Automation", items: ["n8n", "Make", "Zapier"] },
  { label: "Data & RAG", items: ["Pinecone", "Supabase", "Postgres"] },
];

export function TechStack() {
  return (
    <section id="stack" className="relative mx-auto max-w-6xl px-6 pb-28">
      <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-8 md:p-12">
        <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="section-eyebrow">Stack</span>
            <h2 className="mt-3 text-2xl font-medium tracking-tight sm:text-3xl">
              Built on the tools that matter.
            </h2>
          </div>
          <p className="max-w-md text-sm text-white/55">
            We&apos;re model- and platform-agnostic. We pick the stack that fits the
            problem, not the other way around.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {GROUPS.map((g) => (
            <div key={g.label} className="flex flex-col gap-4">
              <span className="text-xs uppercase tracking-[0.2em] text-white/40">
                {g.label}
              </span>
              <div className="flex flex-wrap gap-2">
                {g.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white/85 transition hover:border-white/25 hover:bg-white/[0.06]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
