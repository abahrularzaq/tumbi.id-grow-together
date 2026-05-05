export function Footer() {
  return (
    <footer className="bg-background border-t border-border py-10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="border-b border-border pb-8 mb-8">
          <div className="rounded-xl border border-border bg-surface/40 p-5 sm:p-6">
            <div className="text-xl mb-2">🎙️</div>
            <h3 className="font-display font-bold text-xl sm:text-2xl text-foreground">
              Mau bantu kami build Tumbi.id yang tepat?
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground mt-2 max-w-2xl leading-relaxed">
              Cerita 15 menit via Google Meet. Gratis, santai, tidak ada sales pitch. Kamu dapat
              akses Premium gratis 3 bulan sebagai ucapan terima kasih.
            </p>
            <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-3">
              <a
                href="#"
                className="inline-flex w-full sm:w-auto justify-center px-5 py-2.5 rounded-full border border-border text-foreground text-sm font-semibold hover:bg-surface transition"
              >
                Jadwalkan 15 Menit
              </a>
              <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider">
                Sudah 8 orang tua bergabung sebagai early tester
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between text-sm text-muted-foreground">
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
      </div>
    </footer>
  );
}
