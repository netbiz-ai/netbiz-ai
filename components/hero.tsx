"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const LOGOS = ["OpenAI", "Anthropic", "n8n", "HubSpot", "Slack", "Notion"];

function Orb() {
  return (
    <div className="relative flex items-center justify-center">
      {/* outer ambient glow */}
      <div
        aria-hidden
        className="absolute rounded-full"
        style={{
          width: "520px",
          height: "520px",
          background:
            "radial-gradient(circle, rgba(139,92,246,0.35) 0%, rgba(236,72,153,0.2) 45%, transparent 70%)",
          filter: "blur(55px)",
        }}
      />
      {/* secondary teal glow */}
      <div
        aria-hidden
        className="absolute rounded-full"
        style={{
          width: "300px",
          height: "300px",
          top: "55%",
          left: "55%",
          background:
            "radial-gradient(circle, rgba(6,182,212,0.3) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />
      {/* main morphing orb */}
      <div
        aria-hidden
        className="orb relative"
        style={{
          width: "380px",
          height: "380px",
          background:
            "radial-gradient(circle at 38% 32%, #ddd6fe, #7c3aed 32%, #db2777 65%, #0e7490 100%)",
          boxShadow:
            "0 0 90px 24px rgba(124,58,237,0.22), inset 0 0 60px 10px rgba(255,255,255,0.06)",
        }}
      />
    </div>
  );
}

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: 0.75,
    delay,
    ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
  },
});

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate min-h-screen overflow-hidden bg-black"
    >
      {/* Ambient bg gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 65% 45%, rgba(88,28,135,0.18) 0%, transparent 65%)",
        }}
      />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1200px] flex-col px-6">
        {/* Main hero grid */}
        <div className="flex flex-1 items-center">
          <div className="grid w-full grid-cols-1 gap-10 py-28 md:grid-cols-2 md:gap-0 md:py-0">
            {/* Left — copy */}
            <div className="flex flex-col justify-center">
              <motion.h1
                {...fade(0.1)}
                className="text-[clamp(2.4rem,5.5vw,4.25rem)] font-medium leading-[1.07] tracking-[-0.03em] text-white"
              >
                <span className="hero-gradient-text">Production AI</span>
                {" "}from
                <br />
                Idea to Deployment
              </motion.h1>

              <motion.p
                {...fade(0.25)}
                className="mt-6 max-w-[420px] text-[15px] leading-relaxed text-[#777]"
              >
                NETBIZ.AI delivers agents, chatbots, and automations that ship
                to production. Not demos — real systems with measurable outcomes
                for businesses that need results.
              </motion.p>

              <motion.div
                {...fade(0.38)}
                className="mt-8 flex flex-wrap items-center gap-3"
              >
                <a
                  href="#contact"
                  className="flex h-9 items-center gap-2 rounded border border-[#333] px-4 text-[13px] font-medium text-white transition-colors hover:border-[#555]"
                >
                  Book a Demo
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
                <a
                  href="#services"
                  className="flex h-9 items-center gap-2 text-[13px] font-medium text-[#777] transition-colors hover:text-white"
                >
                  Build AI
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </motion.div>
            </div>

            {/* Right — orb */}
            <motion.div
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.3, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center justify-center"
            >
              <Orb />
            </motion.div>
          </div>
        </div>

        {/* Social proof strip */}
        <motion.div {...fade(0.55)} className="pb-16 text-center">
          <p className="mb-8 text-[11px] uppercase tracking-[0.22em] text-[#444]">
            NETBIZ.AI works with Startups, Agencies &amp; Enterprise Teams
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-5">
            {LOGOS.map((name) => (
              <span
                key={name}
                className="cursor-default text-[17px] font-semibold text-[#2a2a2a] transition-colors hover:text-[#555]"
              >
                {name}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
