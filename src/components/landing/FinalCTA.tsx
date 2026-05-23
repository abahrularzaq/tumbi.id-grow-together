import { useAnalytics } from "../../hooks/useAnalytics";
import { TUMBI_APP_AUTH_URLS } from "../../constants/landingData";
import { SignupCounter } from "./SignupCounter";

export function FinalCTA() {
  const { trackCTAClick } = useAnalytics();

  return (
    <section id="daftar" className="bg-terracotta text-white">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 py-24 sm:py-32 text-center">
        <div className="reveal">
          <h2 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl leading-[0.95] mb-8">
            Tumbi.id sudah siap.
            <br />
            Si kecil menunggu untuk dipantau.
          </h2>
          <a
            href={TUMBI_APP_AUTH_URLS.final_cta}
            onClick={() => trackCTAClick("final_cta")}
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-terracotta font-bold text-lg rounded-md hover:opacity-90 transition shadow-[8px_8px_0_0_rgba(0,0,0,0.25)]"
          >
            Buka Tumbi.id Sekarang — Gratis →
          </a>
          <p className="mt-5 text-sm sm:text-base text-white/85 max-w-lg mx-auto leading-relaxed">
            Daftar dalam 1 menit · Tidak perlu kartu kredit · Data aman terenkripsi
          </p>
        </div>

        <div className="max-w-2xl mx-auto mt-14 reveal">
          <div className="flex items-center gap-3 text-white/70">
            <div className="h-px flex-1 bg-white/20" />
            <span className="text-xs font-mono uppercase tracking-wider">atau</span>
            <div className="h-px flex-1 bg-white/20" />
          </div>
          <div className="mt-4 rounded-2xl p-5 border border-white/10 bg-white/10 text-left">
            <div className="text-2xl mb-2">💬</div>
            <h4 className="font-display font-bold text-2xl text-white">
              Gabung komunitas orang tua Tumbi.id
            </h4>
            <p className="text-white/85 mt-1">
              Diskusi, tanya jawab, dan dapat update langsung via WhatsApp
            </p>
            <p className="text-xs font-mono uppercase tracking-wider text-white/70 mt-3">
              47 anggota aktif
            </p>
            <button
              type="button"
              onClick={() => {
                trackCTAClick("whatsapp");
                window.open(
                  "https://wa.me/6281234567890?text=Halo, saya mau gabung komunitas Tumbi.id",
                  "_blank"
                );
              }}
              className="mt-4 w-full sm:w-auto px-6 py-3 rounded-full bg-[#25D366] text-white font-bold hover:opacity-90 transition"
            >
              Gabung Grup WhatsApp
            </button>
            <p className="text-xs text-white/70 mt-3">Gratis · Bisa keluar kapan saja</p>
          </div>
        </div>
        <div className="mt-5 text-center">
          <SignupCounter />
        </div>
      </div>
    </section>
  );
}
