export function Footer() {
  return (
    <footer className="bg-background border-t border-border py-10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row gap-4 items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center gap-2 font-bold">
          <span>🌱</span>
          <span className="font-display text-foreground">Tumbi.id</span>
        </div>
        <div className="font-mono text-xs uppercase tracking-widest">
          © 2026 Tumbi.id · Dibuat dengan ❤ di Indonesia
        </div>
        <div className="flex gap-5 text-xs">
          <a href="#" className="hover:text-foreground transition">
            Privasi
          </a>
          <a href="#" className="hover:text-foreground transition">
            Syarat
          </a>
          <a href="#" className="hover:text-foreground transition">
            Kontak
          </a>
        </div>
      </div>
    </footer>
  );
}
