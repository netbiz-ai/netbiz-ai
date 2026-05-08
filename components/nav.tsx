import { ArrowUpRight } from "lucide-react";

const LINKS = [
  { href: "#services", label: "Services", id: "01" },
  { href: "#stack", label: "Stack", id: "02" },
  { href: "#philosophy", label: "Philosophy", id: "03" },
  { href: "#contact", label: "Contact", id: "04" },
];

export function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--ink)]/85 backdrop-saturate-150">
      <div className="border-b border-[var(--hairline)]">
        <div className="mx-auto flex h-12 max-w-[1400px] items-center justify-between px-6">
          <a href="#top" className="group flex items-center gap-3">
            <span
              aria-hidden
              className="block h-2.5 w-2.5 bg-[var(--accent)] transition-transform duration-200 group-hover:rotate-45"
            />
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em]">
              Netbiz<span className="text-[var(--muted)]">.</span>AI
            </span>
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)] sm:inline">
              / SYS-001
            </span>
          </a>

          <nav className="hidden items-center gap-7 md:flex">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="group flex items-baseline gap-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--paper-2)] transition hover:text-[var(--accent)]"
              >
                <span className="text-[var(--muted)] group-hover:text-[var(--accent)]">
                  {l.id}
                </span>
                <span>{l.label}</span>
              </a>
            ))}
          </nav>

          <a
            href="#contact"
            className="group flex h-9 items-center gap-2 border border-[var(--paper)] px-3 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] transition hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--accent-ink)]"
          >
            Book a call
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </header>
  );
}
