type Principle = {
  number: string;
  title: string;
  body: string;
};

const PRINCIPLES: Principle[] = [
  {
    number: "01",
    title: "Ship, don't demo.",
    body:
      "Models change weekly. Execution is the moat. We measure success in things running in production, not screenshots in pitch decks.",
  },
  {
    number: "02",
    title: "Pragmatic by default.",
    body:
      "Not every problem needs an agent. We'll tell you when an SQL query, a script, or a smarter form beats a model — and build that instead.",
  },
  {
    number: "03",
    title: "Measured, not magical.",
    body:
      "Every system we deliver ships with metrics — accuracy, latency, cost, business outcome. If it can't be measured, we don't claim it works.",
  },
];

export function Philosophy() {
  return (
    <section
      id="philosophy"
      className="relative mx-auto max-w-6xl px-6 py-28 md:py-36"
    >
      <div className="mb-16 max-w-2xl">
        <span className="section-eyebrow">Philosophy</span>
        <h2 className="mt-3 text-4xl font-medium tracking-tight sm:text-5xl">
          How we{" "}
          <span className="font-serif italic font-normal gradient-text">
            actually
          </span>{" "}
          work.
        </h2>
        <p className="mt-4 text-white/60">
          Three rules we won&apos;t bend on. They&apos;re the reason our work
          outlasts the model du jour.
        </p>
      </div>

      <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 md:grid-cols-3">
        {PRINCIPLES.map((p) => (
          <div
            key={p.number}
            className="bg-[--background] p-8 transition hover:bg-white/[0.02]"
          >
            <span className="font-mono text-xs text-white/30">{p.number}</span>
            <h3 className="mt-6 text-2xl font-medium tracking-tight">
              {p.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              {p.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
