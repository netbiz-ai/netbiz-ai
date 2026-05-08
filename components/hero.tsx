"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";

const STATUS_LINES = [
  { k: "SYSTEMS_LIVE", v: "04" },
  { k: "AVG_TIME_TO_PROD", v: "2-6 WK" },
  { k: "REPLY_SLA", v: "<24 HR" },
  { k: "MODELS_AGNOSTIC", v: "TRUE" },
];

const TICKER = [
  "SHIP",
  "MEASURE",
  "ITERATE",
  "SHIP",
  "MEASURE",
  "ITERATE",
  "SHIP",
  "MEASURE",
  "ITERATE",
];

function useUtcClock() {
  const [now, setNow] = useState<string>("");
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const hh = String(d.getUTCHours()).padStart(2, "0");
      const mm = String(d.getUTCMinutes()).padStart(2, "0");
      const ss = String(d.getUTCSeconds()).padStart(2, "0");
      setNow(`${hh}:${mm}:${ss}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

const reveal = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: 0.18 + i * 0.06,
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

export function Hero() {
  const utc = useUtcClock();

  return (
    <section
      id="top"
      className="relative isolate overflow-hidden border-b border-[var(--hairline)]"
    >
      {/* grid lines & grain backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.55] [background-image:linear-gradient(to_right,var(--hairline)_1px,transparent_1px)] [background-size:calc(100%/12)_100%]"
      />
      <div className="grain" aria-hidden />

      {/* TOP TAPE — system bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 mt-16 border-b border-[var(--hairline)]"
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-6 py-3">
          <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--paper-2)]">
            <span className="inline-block h-1.5 w-1.5 bg-[var(--accent)]" />
            <span>SYS-001</span>
            <span className="text-[var(--muted)]">/</span>
            <span>BUILD-2026.05</span>
            <span className="text-[var(--muted)]">/</span>
            <span className="hidden sm:inline">STATUS: BOOKING_Q3</span>
          </div>
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
            <span className="hidden sm:inline">UTC</span>
            <span className="text-[var(--paper)] tabular-nums">
              {utc || "00:00:00"}
            </span>
            <span className="blink text-[var(--accent)]">▮</span>
          </div>
        </div>
      </motion.div>

      {/* MAIN CANVAS */}
      <div className="relative z-10 mx-auto grid max-w-[1400px] grid-cols-12 gap-x-6 px-6 pt-16 pb-10 md:pt-24 md:pb-16">
        {/* left rail — section index */}
        <div className="col-span-12 mb-10 flex items-start justify-between md:col-span-1 md:mb-0 md:block">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
            00 / Hero
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)] md:mt-3 md:block">
            ↳ Production
          </span>
        </div>

        {/* main col — headline */}
        <div className="col-span-12 md:col-span-8">
          <motion.span
            custom={0}
            variants={reveal}
            initial="hidden"
            animate="show"
            className="mb-6 inline-flex items-center gap-2 border border-[var(--hairline)] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--paper-2)]"
          >
            <span className="h-1 w-1 bg-[var(--accent)]" />
            Now booking — Q3 2026
          </motion.span>

          <h1 className="display text-[clamp(2.75rem,9vw,7.5rem)] text-[var(--paper)]">
            <motion.span
              custom={1}
              variants={reveal}
              initial="hidden"
              animate="show"
              className="block"
            >
              Ship AI that
            </motion.span>
            <motion.span
              custom={2}
              variants={reveal}
              initial="hidden"
              animate="show"
              className="block"
            >
              <span className="relative inline-block">
                <span
                  aria-hidden
                  className="absolute -left-2 top-[0.58em] -z-10 h-[0.42em] w-[calc(100%+1rem)] bg-[var(--accent)]"
                />
                <span className="relative">actually</span>
              </span>{" "}
              <span className="text-[var(--muted)]">/</span> moves
            </motion.span>
            <motion.span
              custom={3}
              variants={reveal}
              initial="hidden"
              animate="show"
              className="block"
            >
              your business.
            </motion.span>
          </h1>

          <motion.p
            custom={4}
            variants={reveal}
            initial="hidden"
            animate="show"
            className="mt-8 max-w-xl text-[15px] leading-relaxed text-[var(--paper-2)]"
          >
            We design, deploy, and measure agents, chatbots, and automations
            end-to-end. Every system we deliver runs in production, with the
            metrics to prove it.{" "}
            <span className="text-[var(--paper)]">
              Demos are not deliverables.
            </span>
          </motion.p>

          <motion.div
            custom={5}
            variants={reveal}
            initial="hidden"
            animate="show"
            className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4"
          >
            <a href="#contact" className="btn-acid">
              <span>Book a call</span>
              <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.25} />
            </a>
            <a href="#services" className="btn-ghost">
              <span>See what we build</span>
              <span aria-hidden>↘</span>
            </a>
          </motion.div>
        </div>

        {/* right col — status panel */}
        <motion.aside
          custom={6}
          variants={reveal}
          initial="hidden"
          animate="show"
          className="col-span-12 mt-14 md:col-span-3 md:col-start-10 md:mt-2"
        >
          <div className="border border-[var(--hairline)] bg-[var(--ink-2)]">
            <div className="flex items-center justify-between border-b border-[var(--hairline)] px-3 py-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
                // IN_PRODUCTION
              </span>
              <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--accent)]">
                <span className="inline-block h-1.5 w-1.5 animate-pulse bg-[var(--accent)]" />
                LIVE
              </span>
            </div>
            <ul className="divide-y divide-[var(--hairline)]">
              {STATUS_LINES.map((s) => (
                <li
                  key={s.k}
                  className="flex items-center justify-between px-3 py-2.5"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
                    {s.k}
                  </span>
                  <span className="font-mono text-[12px] font-semibold uppercase tracking-[0.1em] tabular-nums text-[var(--paper)]">
                    {s.v}
                  </span>
                </li>
              ))}
            </ul>
            <div className="border-t border-[var(--hairline)] px-3 py-2">
              <span className="font-mono text-[9px] uppercase leading-relaxed tracking-[0.18em] text-[var(--muted)]">
                Last commit · {utc || "00:00:00"} UTC · clean
              </span>
            </div>
          </div>

          <div className="mt-4 flex items-start gap-2">
            <span className="mt-0.5 font-mono text-[10px] text-[var(--accent)]">
              ↳
            </span>
            <p className="font-mono text-[10px] uppercase leading-relaxed tracking-[0.16em] text-[var(--muted)]">
              We&apos;re model- and platform-agnostic. We pick the stack that
              fits the problem.
            </p>
          </div>
        </motion.aside>
      </div>

      {/* MARQUEE — bottom of hero */}
      <div className="relative z-10 border-t border-[var(--hairline)] bg-[var(--ink-2)]">
        <div className="overflow-hidden py-5">
          <div className="marquee">
            {Array.from({ length: 2 }).map((_, copy) => (
              <span
                key={copy}
                className="flex shrink-0 items-center gap-10 pr-10 font-mono text-[12px] uppercase tracking-[0.32em] text-[var(--paper-2)]"
              >
                {TICKER.map((t, i) => (
                  <span key={`${copy}-${i}`} className="flex items-center gap-10">
                    <span
                      className={
                        i % 3 === 1
                          ? "text-[var(--accent)]"
                          : "text-[var(--paper-2)]"
                      }
                    >
                      {t}
                    </span>
                    <span className="text-[var(--muted)]">●</span>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
