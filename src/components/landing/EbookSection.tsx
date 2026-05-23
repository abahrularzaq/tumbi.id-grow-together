import { EBOOK_DOWNLOAD_COUNT, TUMBI_APP_AUTH_URLS } from "../../constants/landingData";
import { useAnalytics } from "../../hooks/useAnalytics";

const EBOOK_FEATURES = [
  "Milestone motorik, bahasa, sosial, kognitif per usia",
  "Tanda peringatan yang perlu konsultasi dokter",
  "Tips stimulasi praktis dan murah",
  "Checklist yang bisa dicetak",
] as const;

function BookMockup() {
  return (
    <div className="flex justify-center">
      <div
        className="relative w-[180px] h-[240px] sm:w-[240px] sm:h-[320px] flex flex-col items-center justify-center px-5 py-6 bg-gradient-to-br from-terracotta to-amber rounded-l-[4px] rounded-r-[12px] -rotate-3 shadow-[-8px_8px_0_rgba(0,0,0,0.3),0_20px_60px_rgba(224,123,84,0.4)]"
        aria-hidden
      >
        <span className="text-[48px] leading-none mb-2" role="img" aria-label="buku">
          📚
        </span>
        <p className="text-xs font-mono text-white/60 uppercase tracking-wide">Ebook</p>
        <p className="text-xl sm:text-2xl font-bold text-white leading-tight text-center">Milestone</p>
        <p className="text-xl sm:text-2xl font-bold text-white leading-tight text-center">1-5 Tahun</p>
        <p className="text-sm text-white/70 mt-1">by Tumbi.id</p>
        <div className="w-full h-px bg-white/20 my-3" />
        <p className="text-xs text-white/50 text-center leading-snug">WHO + IDAI + Kemenkes</p>
        <span className="absolute -top-2 -right-2 px-2.5 py-1 bg-[#FFB800] text-black font-mono font-bold text-xs rounded-full rotate-12">
          GRATIS
        </span>
      </div>
    </div>
  );
}

export function EbookSection() {
  const { trackCTAClick } = useAnalytics();

  const handleCtaClick = () => {
    trackCTAClick("ebook");
    window.open(TUMBI_APP_AUTH_URLS.ebook, "_blank");
  };

  return (
    <section id="ebook-section" className="bg-[#111111] py-20">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="reveal flex justify-center order-1">
            <BookMockup />
          </div>

          <div className="reveal order-2">
            <p className="font-mono text-amber text-xs uppercase tracking-widest mb-4">
              EKSKLUSIF UNTUK BETA TESTER
            </p>
            <h2 className="font-display font-black text-[44px] leading-[1.05] tracking-tight mb-5">
              Download gratis.
              <br />
              Simpan selamanya.
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8 max-w-lg">
              Panduan lengkap milestone tumbuh kembang anak 1-5 tahun. Dibuat berdasarkan standar WHO,
              IDAI, dan Kemenkes RI. Bahasa Indonesia. 24 halaman. Gratis.
            </p>

            <ul className="space-y-3 mb-8">
              {EBOOK_FEATURES.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-sm sm:text-base">
                  <span className="text-terracotta shrink-0 mt-0.5">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={handleCtaClick}
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-terracotta text-white font-semibold text-base rounded-full hover:opacity-90 transition"
            >
              Daftar Gratis &amp; Download Ebook →
            </button>

            <p className="mt-4 text-xs text-muted-foreground leading-relaxed">
              Gratis selamanya · Tanpa kartu kredit · Download langsung setelah daftar
            </p>

            <p className="mt-5 font-mono text-xs text-amber/70">
              📥 Sudah didownload {EBOOK_DOWNLOAD_COUNT.toLocaleString("id-ID")} kali
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
