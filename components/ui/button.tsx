import * as React from "react";

type Variant = "primary" | "secondary" | "ghost";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  asChild?: boolean;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 h-11 text-sm font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary:
    "bg-white text-black hover:bg-white/90 shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_8px_32px_-8px_rgba(236,72,153,0.5)]",
  secondary:
    "border border-white/15 text-white hover:bg-white/5 hover:border-white/25",
  ghost: "text-white/70 hover:text-white",
};

export function Button({
  variant = "primary",
  className = "",
  ...props
}: Props) {
  return (
    <button
      {...props}
      className={`${base} ${variants[variant]} ${className}`}
    />
  );
}

type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
};

export function ButtonLink({
  variant = "primary",
  className = "",
  ...props
}: LinkProps) {
  return (
    <a
      {...props}
      className={`${base} ${variants[variant]} ${className}`}
    />
  );
}
