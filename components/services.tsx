"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

type Service = {
  num: string;
  code: string;
  title: string;
  blurb: string;
  examples: string[];
  status: "ACTIVE" | "SHIPPED" | "BOOKING";
};

const SERVICES: Service[] = [
  {
    num: "01",
    code: "SVC-A.AGT",
    title: "Autonomous Agents",
    blurb:
      "Multi-step agents that take real actions on your behalf — sales outreach, internal ops, research, and reporting. Built with handoffs, audit trails, and rollback.",
    examples: ["Sales research", "Ops automation", "Doc & data pipelines"],
    status: "ACTIVE",
  },
  {
    num: "02",
    code: "SVC-B.CHT",
    title: "Conversational Systems",
    blurb:
      "Production-grade support and knowledge assistants grounded in your data. Citations, handoff to humans, and analytics built in from day one.",
    examples: ["Support copilots", "RAG knowledge", "Internal Q&A"],
    status: "SHIPPED",
  },
  {
    num: "03",
    code: "SVC-C.INT",
    title: "Custom Integrations",
    blurb:
      "AI woven into the tools you already use — CRMs, helpdesks, Slack, email — so the value lands where work actually happens.",
    examples: ["CRM enrichment", "Slack / email", "n8n / Make pipelines"],
    status: "BOOKING",
  },
];

const statusColor: Record<Service["status"], string> = {
  ACTIVE: "text-[var(--accent)]",
  SHIPPED: "text-[var(--paper)]",
  BOOKING: "text-[var(--paper-2)]",
};

function ServiceRow({ s, i }: { s: Service; i: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.li
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group relative border-t border-[var(--hairline)]"
    >
      {/* hover acid wash */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 origin-left scale-x-0 bg-[var(--accent)]/[0.04] transition-transform duration-500 ease-[cubic-bezier(0.7,0,0.2,1)] group-hover:scale-x-100"
      />

      <div className="relative grid grid-cols-12 items-start gap-x-6 px-2 py-8 md:py-10">
        {/* index */}
        <div className="col-span-2 md:col-span-1">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted)] transition group-hover:text-[var(--accent)]">
            {s.num}
          </span>
        </div>

        {/* title block */}
        <div className="col-span-10 md:col-span-7">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
            {s.code}
          </span>
          <h3 className="display mt-2 text-[clamp(1.85rem,4.6vw,3.25rem)] text-[var(--paper)] transition-colors duration-300 group-hover:text-[var(--accent)]">
            {s.title}
          </h3>
          <p className="mt-4 max-w-2xl text-[14.5px] leading-relaxed text-[var(--paper-2)]">
            {s.blurb}
          </p>

          {/* examples — receipt style */}
          <ul className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
            {s.examples.map((ex, idx) => (
              <li
                key={ex}
                className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--paper-2)]"
              >
                <span className="text-[var(--accent)]">↳</span>
                {ex}
                {idx < s.examples.length - 1 && (
                  <span className="text-[var(--hairline)]">|</span>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* right rail — status & arrow */}
        <div className="col-span-12 mt-6 flex items-center justify-between md:col-span-4 md:col-start-9 md:mt-0 md:flex-col md:items-end md:justify-between md:gap-12">
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em]">
            <span className="text-[var(--muted)]">[STATUS]</span>
            <span className={statusColor[s.status]}>{s.status}</span>
          </div>
          <span
            aria-hidden
            className="font-mono text-[28px] leading-none text-[var(--hairline)] transition-all duration-300 group-hover:translate-x-1 group-hover:text-[var(--accent)]"
          >
            ↗
          </span>
        </div>
      </div>
    </motion.li>
  );
}

export function Services() {
  return (
    <section
      id="services"
      className="relative border-b border-[var(--hairline)]"
    >
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32">
        {/* section header */}
        <div className="grid grid-cols-12 gap-x-6">
          <div className="col-span-12 md:col-span-1">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
              01 / Manifest
            </span>
          </div>
          <header className="col-span-12 md:col-span-8">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--accent)]">
              [ WHAT WE BUILD ]
            </span>
            <h2 className="display mt-4 text-[clamp(2.25rem,5.5vw,4.25rem)]">
              Three lines of work.
              <br />
              <span className="text-[var(--muted)]">
                All shipped to production.
              </span>
            </h2>
          </header>
          <p className="col-span-12 mt-6 max-w-md text-[14.5px] leading-relaxed text-[var(--paper-2)] md:col-span-3 md:col-start-10 md:mt-3">
            Every engagement starts with the question of whether AI is the right
            tool. When it is, we deliver one of three things — and we measure
            it.
          </p>
        </div>

        {/* receipt header row */}
        <div className="mt-16 hidden grid-cols-12 gap-x-6 border-t border-[var(--hairline)] px-2 py-3 md:grid">
          <span className="col-span-1 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
            #
          </span>
          <span className="col-span-7 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
            Service
          </span>
          <span className="col-span-4 text-right font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
            Status / link
          </span>
        </div>

        {/* manifest */}
        <ul className="mt-0 md:mt-0">
          {SERVICES.map((s, i) => (
            <ServiceRow key={s.code} s={s} i={i} />
          ))}
          <li className="border-t border-[var(--hairline)]" aria-hidden />
        </ul>

        {/* footer line */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
          <span>END OF MANIFEST · 03/03</span>
          <a
            href="#contact"
            className="group flex items-center gap-2 text-[var(--paper)] transition hover:text-[var(--accent)]"
          >
            Start a project
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
