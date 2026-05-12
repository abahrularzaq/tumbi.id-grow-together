import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { TUMBI_APP_AUTH_URL } from "../../constants/landingData";
import { useAnalytics } from "../../hooks/useAnalytics";
import { DemoSkeleton } from "../../demo/DemoSkeleton";

const TumbiDemoApp = lazy(() => import("../../demo/TumbiDemoApp"));

const DEMO_FEATURES: string[] = [
  "Tracking milestone WHO & IDAI",
  "Growth chart vs referensi WHO",
  "AI insight berbahasa Indonesia",
  "Jadwal imunisasi Kemenkes 2024",
];

function PhoneFallback() {
  return (
    <div className="tumbi-demo h-full w-full">
      <DemoSkeleton />
    </div>
  );
}

export function DemoSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);
  const { trackCTAClick } = useAnalytics();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const el = sectionRef.current;
    if (!el) return;

    if (!("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first?.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { root: null, threshold: 0.01, rootMargin: "200px 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={(node) => {
        sectionRef.current = node;
      }}
      className="relative bg-[#111111] py-20 sm:py-[120px] overflow-hidden"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-15 blur-[80px]"
        style={{ backgroundColor: "var(--color-terracotta)" }}
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div className={`demo-reveal-text ${inView ? "is-visible" : ""}`}>
            <div className="inline-block font-mono text-amber text-xs uppercase tracking-widest mb-5">
              ◆ COBA LANGSUNG
            </div>
            <h2 className="font-display font-black text-[32px] sm:text-[44px] leading-[0.95]">
              Rasakan sendiri
              <br />
              seperti apa Tumbi.id
            </h2>
            <p className="mt-6 text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl">
              Demo interaktif — klik, navigasi, dan eksplorasi semua fitur. Tidak perlu daftar, tidak
              perlu login.
            </p>

            <ul className="mt-8 space-y-3">
              {DEMO_FEATURES.map((text) => (
                <li key={text} className="flex items-start gap-3 text-foreground">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-sage/20 text-sage grid place-items-center text-xs font-black">
                    ✓
                  </span>
                  <span className="text-sm sm:text-base">{text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div
            className={`demo-reveal-phone flex flex-col items-center lg:items-end w-full ${
              inView ? "is-visible" : ""
            }`}
          >
            <div className="flex justify-center lg:justify-end w-full">
              <div className="demo-phone-float relative">
              <div
                className="absolute -top-4 -right-4 z-20 inline-flex items-center gap-2 rounded-full border border-amber/30 bg-amber/20 px-3 py-1.5 font-mono text-xs text-amber animate-bounce"
                style={{ animationDuration: "1.8s" }}
              >
                👆 Bisa diklik!
              </div>

              <div
                className="relative overflow-hidden w-[290px] md:w-[390px] h-[580px] md:h-[780px] rounded-[44px] max-w-full"
                style={{
                  border: "2px solid rgba(255,255,255,0.12)",
                  background: "#111",
                  boxShadow:
                    "0 50px 100px rgba(224,123,84,0.25), 0 0 0 1px rgba(255,255,255,0.05)",
                }}
              >
                <div className="h-[28px] bg-[#111] flex items-center justify-between px-6">
                  <span className="font-mono text-xs text-white">9:41</span>
                  <span className="text-xs text-white">●●●</span>
                </div>

                <div className="h-[calc(100%-28px)]">
                  <div className="h-full w-full origin-top-left scale-[0.7436] md:scale-100">
                    {inView ? (
                      <Suspense fallback={<PhoneFallback />}>
                        <TumbiDemoApp />
                      </Suspense>
                    ) : (
                      <PhoneFallback />
                    )}
                  </div>
                </div>
              </div>
            </div>
            </div>

            <div className="mt-10 w-full max-w-[390px] text-center lg:text-right px-1">
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Ini data demo. App kamu akan menampilkan data anak kamu sendiri.
              </p>
              <a
                href={TUMBI_APP_AUTH_URL}
                onClick={() => trackCTAClick("demo")}
                className="inline-flex items-center justify-center px-6 py-3.5 bg-terracotta text-white font-bold rounded-md hover:opacity-90 transition shadow-[4px_4px_0_0_rgba(245,240,232,0.12)]"
              >
                Coba dengan Data Saya →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
