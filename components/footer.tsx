const LINKS = ["#services", "#stack", "#philosophy", "#contact"] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer>
      {/* receipt-end band */}
      <div className="border-b border-t border-[var(--hairline)] bg-[var(--ink-2)]">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
            END OF SESSION · SYS-001 · {year}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
            STATUS: COMPLETE
          </span>
        </div>
      </div>

      {/* bottom bar */}
      <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-6 px-6 py-8 md:flex-row md:items-center">
        <a
          href="#top"
          className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--paper)] transition hover:text-[var(--accent)]"
        >
          Netbiz<span className="text-[var(--muted)]">.</span>AI
        </a>

        <nav className="flex flex-wrap items-center gap-x-8 gap-y-3">
          {LINKS.map((href) => (
            <a
              key={href}
              href={href}
              className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted)] transition hover:text-[var(--accent)]"
            >
              {href.replace("#", "")}
            </a>
          ))}
        </nav>

        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">
          © {year}
        </span>
      </div>
    </footer>
  );
}
