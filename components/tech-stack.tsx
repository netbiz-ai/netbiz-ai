type Group = {
  label: string;
  code: string;
  items: string[];
};

const GROUPS: Group[] = [
  { label: "Foundation models", code: "STK-A.MDL", items: ["Claude", "OpenAI", "Gemini"] },
  { label: "Automation", code: "STK-B.AUT", items: ["n8n", "Make", "Zapier"] },
  { label: "Data & RAG", code: "STK-C.DAT", items: ["Pinecone", "Supabase", "Postgres"] },
];

export function TechStack() {
  return (
    <section id="stack" className="relative border-b border-[var(--hairline)]">
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32">
        {/* section header */}
        <div className="grid grid-cols-12 gap-x-6">
          <div className="col-span-12 md:col-span-1">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
              02 / Stack
            </span>
          </div>
          <header className="col-span-12 md:col-span-8">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--accent)]">
              [ TECH STACK ]
            </span>
            <h2 className="display mt-4 text-[clamp(2.25rem,5.5vw,4.25rem)]">
              Model-agnostic.
              <br />
              <span className="text-[var(--muted)]">Stack-agnostic.</span>
            </h2>
          </header>
          <p className="col-span-12 mt-6 max-w-md text-[14.5px] leading-relaxed text-[var(--paper-2)] md:col-span-3 md:col-start-10 md:mt-3">
            No vendor lock-in. No preferred-partner incentives. We pick the
            tools that fit the problem.
          </p>
        </div>

        {/* stack table — hard borders, no rounded/glass */}
        <div className="mt-16 border-t border-[var(--hairline)] md:grid md:grid-cols-3 md:divide-x md:divide-[var(--hairline)]">
          {GROUPS.map((g) => (
            <div key={g.label} className="border-b border-[var(--hairline)] md:border-b-0">
              {/* group header */}
              <div className="flex items-center justify-between border-b border-[var(--hairline)] px-4 py-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
                  {g.label}
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--hairline)] transition hover:text-[var(--muted)]">
                  {g.code}
                </span>
              </div>
              {/* items */}
              <ul className="divide-y divide-[var(--hairline)]">
                {g.items.map((item) => (
                  <li
                    key={item}
                    className="group flex items-center gap-3 px-4 py-4 transition hover:bg-[var(--accent)]/[0.03]"
                  >
                    <span className="font-mono text-[10px] text-[var(--accent)]">↳</span>
                    <span className="text-[14px] text-[var(--paper-2)] transition group-hover:text-[var(--paper)]">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* footer note */}
        <div className="mt-6 font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--muted)]">
          STACK IS PROBLEM-DEPENDENT · NOT EXHAUSTIVE · UPDATED 2026.05
        </div>
      </div>
    </section>
  );
}
