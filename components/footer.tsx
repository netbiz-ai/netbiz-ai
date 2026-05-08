export function Footer() {
  return (
    <footer className="border-t border-white/5 px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 text-sm text-white/50 md:flex-row md:items-center">
        <div className="flex items-center gap-2">
          <span className="grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br from-violet-500 via-pink-500 to-cyan-400 text-[10px] font-bold text-black">
            N
          </span>
          <span className="font-medium text-white/80">Netbiz AI</span>
          <span className="text-white/30">
            © {new Date().getFullYear()}
          </span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#services" className="hover:text-white transition">
            Services
          </a>
          <a href="#philosophy" className="hover:text-white transition">
            Philosophy
          </a>
          <a href="#contact" className="hover:text-white transition">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
