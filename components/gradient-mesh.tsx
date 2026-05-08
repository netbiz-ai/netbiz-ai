export function GradientMesh() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* base radial: violet → pink */}
      <div
        className="blob-a absolute left-1/2 top-1/2 h-[110vmax] w-[110vmax] rounded-full opacity-70"
        style={{
          background:
            "radial-gradient(closest-side, rgba(139,92,246,0.55), rgba(236,72,153,0.35) 35%, transparent 65%)",
          filter: "blur(80px)",
          mixBlendMode: "screen",
        }}
      />
      {/* second blob: cyan accent */}
      <div
        className="blob-b absolute left-1/3 top-2/3 h-[80vmax] w-[80vmax] rounded-full opacity-60"
        style={{
          background:
            "radial-gradient(closest-side, rgba(6,182,212,0.45), transparent 70%)",
          filter: "blur(90px)",
          mixBlendMode: "screen",
        }}
      />
      {/* fade to bottom */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, transparent 60%, var(--background) 100%)",
        }}
      />
      {/* grain */}
      <div className="grain" />
    </div>
  );
}
