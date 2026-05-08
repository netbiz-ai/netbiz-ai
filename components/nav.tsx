"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";

const LINKS = [
  { href: "#services", label: "Services" },
  { href: "#stack", label: "Stack" },
  { href: "#philosophy", label: "Philosophy" },
  { href: "/blog", label: "Blog" },
  { href: "#contact", label: "Contact" },
];

function NavItem({
  href,
  label,
  className,
  onClick,
}: {
  href: string;
  label: string;
  className?: string;
  onClick?: () => void;
}) {
  if (href.startsWith("#")) {
    return (
      <a href={href} className={className} onClick={onClick}>
        {label}
      </a>
    );
  }
  return (
    <Link href={href} className={className} onClick={onClick}>
      {label}
    </Link>
  );
}

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto flex h-14 max-w-[1200px] items-center px-6">
        {/* Logo */}
        <a href="#top" className="mr-auto text-[15px] font-semibold tracking-tight text-white">
          netbiz<span className="text-[#555]">.</span>ai
        </a>

        {/* Center nav — desktop */}
        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <NavItem
              key={l.href}
              href={l.href}
              label={l.label}
              className="text-[13px] text-[#999] transition-colors duration-150 hover:text-white"
            />
          ))}
        </nav>

        {/* Right actions */}
        <div className="ml-auto flex items-center gap-5">
          <a
            href="#contact"
            className="hidden h-8 items-center gap-1.5 rounded border border-[#2a2a2a] px-3.5 text-[12px] font-medium text-white transition-colors hover:border-[#444] md:flex"
          >
            Book a Demo
            <ArrowUpRight className="h-3 w-3" />
          </a>
          <a href="#" className="hidden text-[13px] text-[#888] transition-colors hover:text-white md:block">
            Log In
          </a>

          {/* Mobile menu toggle */}
          <button
            className="text-[#888] hover:text-white md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="border-t border-[#1a1a1a] bg-black/95 px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-4">
            {LINKS.map((l) => (
              <NavItem
                key={l.href}
                href={l.href}
                label={l.label}
                onClick={() => setOpen(false)}
                className="text-[14px] text-[#999] hover:text-white"
              />
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 flex h-9 w-fit items-center gap-2 rounded border border-[#333] px-4 text-[13px] font-medium text-white"
            >
              Book a Demo <ArrowUpRight className="h-3 w-3" />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
