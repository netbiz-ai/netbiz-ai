type Principle = {
  number: string;
  title: string;
  body: string;
};

const PRINCIPLES: Principle[] = [
  {
    number: "01",
    title: "Ship, don't demo.",
    body: "Models change weekly. Execution is the moat. We measure success in things running in production, not screenshots in pitch decks.",
  },
  {
    number: "02",
    title: "Pragmatic by default.",
    body: "Not every problem needs an agent. We'll tell you when an SQL query, a script, or a smarter form beats a model — and build that instead.",
  },
  {
    number: "03",
    title: "Measured, not magical.",
    body: "Every system we deliver ships with metrics — accuracy, latency, cost, business outcome. If it can't be measured, we don't claim it works.",
  },
];

export function Philosophy() {
  return (
    <section id="philosophy" className="relative border-b border-[var(--hairline)]">
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32">
        {/* section header */}
        <div className="grid grid-cols-12 gap-x-6">
          <div className="col-span-12 md:col-span-1">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
              03 / Rules
            </span>
          </div>
          <header className="col-span-12 md:col-span-8">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--accent)]">
              [ HOW WE WORK ]
            </span>
            <h2 className="display mt-4 text-[clamp(2.25rem,5.5vw,4.25rem)]">
              Three rules we{" "}
              <span className="font-serif italic font-normal text-[var(--muted)]">
                actually
              </span>{" "}
              keep.
            </h2>
          </header>
        </div>

        {/* principles — editorial asymmetric layout */}
        <div className="mt-20">
          {PRINCIPLES.map((p, i) => (
            <div
              key={p.number}
              className="group grid grid-cols-12 gap-x-6 gap-y-4 border-t border-[var(--hairline)] py-10 md:py-14"
            >
              {/* index */}
              <div className="col-span-2 md:col-span-1">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)] transition group-hover:text-[var(--accent)]">
                  {p.number}
                </span>
              </div>

              {/* title — intentionally offset per row */}
              <div
                className={[
                  "col-span-10",
                  i === 0 ? "md:col-span-6 md:col-start-2" : "",
                  i === 1 ? "md:col-span-6 md:col-start-3" : "",
                  i === 2 ? "md:col-span-6 md:col-start-2" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <h3 className="display text-[clamp(1.75rem,4vw,3rem)] text-[var(--paper)] transition-colors duration-300 group-hover:text-[var(--accent)]">
                  {p.title}
                </h3>
              </div>

              {/* body — right-anchored */}
              <p className="col-span-12 text-[14.5px] leading-relaxed text-[var(--paper-2)] md:col-span-4 md:col-start-9">
                {p.body}
              </p>
            </div>
          ))}
          <div className="border-t border-[var(--hairline)]" aria-hidden />
        </div>
      </div>
    </section>
  );
}
