import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { TRUST_BADGES, TUMBI_APP_AUTH_URL } from "../../constants/landingData";
import { useAnalytics } from "../../hooks/useAnalytics";
import { waitlistSchema } from "../../lib/schemas";
import { incrementSignupCount, SignupCounter } from "./SignupCounter";

const waitlistEmailKey = "tumbi_waitlist_email";
const heroEmailSchema = waitlistSchema.pick({ email: true });
type HeroEmailData = { email: string };

function PhoneMockup() {
  return (
    <div className="relative mx-auto w-[280px] sm:w-[320px]" style={{ transform: "rotate(6deg)" }}>
      <div className="rounded-[2.5rem] bg-[#1a1a1a] border border-border p-3 shadow-[12px_12px_0_0_var(--color-terracotta)]">
        <div className="rounded-[2rem] bg-background overflow-hidden">
          <div className="h-6 flex justify-center items-end pb-1">
            <div className="w-20 h-4 bg-black rounded-b-2xl" />
          </div>
          <div className="px-4 pb-5 space-y-3">
            <div className="rounded-2xl bg-surface p-3 flex items-center gap-3 border border-border">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-terracotta to-amber" />
              <div>
                <div className="font-bold text-foreground">Arini</div>
                <div className="text-xs text-muted-foreground">14 bulan · Perempuan</div>
              </div>
              <div className="ml-auto text-xs px-2 py-1 rounded-full bg-sage/20 text-sage font-mono">
                Sehat
              </div>
            </div>

            <div className="rounded-2xl bg-surface p-3 border border-border">
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs font-semibold">Growth Chart · WHO</div>
                <div className="text-[10px] font-mono text-amber">P50</div>
              </div>
              <svg viewBox="0 0 200 80" className="w-full h-16">
                <path
                  d="M0,70 Q40,55 70,45 T140,25 T200,15"
                  stroke="var(--color-terracotta)"
                  strokeWidth="2.5"
                  fill="none"
                />
                <path
                  d="M0,75 Q40,65 70,58 T140,42 T200,32"
                  stroke="var(--color-amber)"
                  strokeWidth="1.5"
                  strokeDasharray="3 3"
                  fill="none"
                  opacity="0.6"
                />
                {[
                  [20, 65],
                  [70, 45],
                  [120, 32],
                  [170, 20],
                ].map(([x, y], i) => (
                  <circle key={i} cx={x} cy={y} r="3" fill="var(--color-terracotta)" />
                ))}
              </svg>
              <div className="flex justify-between text-[9px] font-mono text-muted-foreground mt-1">
                <span>0</span><span>6</span><span>12</span><span>18 bln</span>
              </div>
            </div>

            <div className="rounded-2xl bg-surface p-3 border border-border space-y-2">
              <div className="text-xs font-semibold mb-1">Milestone Bulan Ini</div>
              {[
                ["Berjalan tanpa bantuan", true],
                ["Mengucap 3-5 kata", true],
                ["Minum dari gelas", false],
              ].map(([t, done], i) => (
                <div key={i} className="flex items-center gap-2 text-[11px]">
                  <span
                    className={`w-4 h-4 rounded grid place-items-center text-[10px] ${
                      done ? "bg-sage text-background" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {done ? "✓" : "·"}
                  </span>
                  <span className={done ? "" : "text-muted-foreground"}>{t}</span>
                </div>
              ))}
            </div>

            <div className="rounded-2xl bg-terracotta/15 border border-terracotta/30 p-3">
              <div className="text-[10px] font-mono text-amber mb-1">IMUNISASI · KEMENKES 2024</div>
              <div className="text-xs font-semibold">MMR — jadwal 2 hari lagi</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  const [heroSubmitted, setHeroSubmitted] = useState(false);
  const [hasTrackedFormStart, setHasTrackedFormStart] = useState(false);
  const { trackCTAClick, trackFormStart, trackFormSubmit } = useAnalytics();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<HeroEmailData>({
    resolver: zodResolver(heroEmailSchema),
    defaultValues: { email: "" },
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    setHeroSubmitted(Boolean(window.localStorage.getItem(waitlistEmailKey)));
  }, []);

  async function onSubmit(data: HeroEmailData) {
    if (typeof window === "undefined") return;
    await new Promise((resolve) => setTimeout(resolve, 400));
    window.localStorage.setItem(waitlistEmailKey, data.email);
    incrementSignupCount();
    window.dispatchEvent(new Event("tumbi-waitlist-updated"));
    trackFormSubmit({
      plan: "unknown",
      childAge: "unknown",
      hasCustomConcern: false,
      formLocation: "hero",
    });
    setHeroSubmitted(true);
  }

  return (
    <section id="top" className="relative min-h-[100svh] flex items-center pt-10 pb-16">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-12 items-center w-full">
        <div className="reveal">
          <div className="inline-block font-mono text-amber text-xs sm:text-sm uppercase tracking-widest mb-6">
            ◆ Untuk 4.8 juta bayi yang lahir di Indonesia setiap tahun
          </div>
          <h1 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tight">
            Kamu tidak harus jadi dokter anak
            <br />
            untuk tahu si kecil <span className="text-terracotta italic">berkembang benar.</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
            Sudah bisa dipakai hari ini.
            <br />
            Gratis. Tanpa kartu kredit.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={TUMBI_APP_AUTH_URL}
              onClick={() => trackCTAClick("hero")}
              className="px-6 py-3.5 bg-terracotta text-white font-bold rounded-md hover:opacity-90 transition shadow-[4px_4px_0_0_rgba(245,240,232,0.15)]"
            >
              Mulai Gratis Sekarang →
            </a>
            <a
              href="#features"
              className="px-6 py-3.5 border border-border bg-transparent text-foreground font-semibold rounded-md hover:bg-surface transition"
            >
              Lihat Fitur
            </a>
          </div>
          <div className="mt-4">
            <SignupCounter />
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-mono uppercase tracking-wider text-muted-foreground">
            {TRUST_BADGES.map((b) => (
              <span key={b.label}>
                {b.icon} {b.label}
              </span>
            ))}
          </div>
          <div className="mt-6 max-w-md mx-auto lg:mx-0">
            {heroSubmitted ? (
              <p className="inline-flex items-center gap-2 text-sm font-semibold text-sage">
                <span className="w-5 h-5 rounded-full bg-sage/20 grid place-items-center">✓</span> Berhasil!
                Cek email kamu.
              </p>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col sm:flex-row gap-3 w-full"
              >
                <div className="flex-1">
                  <input
                    type="email"
                    {...register("email")}
                    onFocus={() => {
                      if (!hasTrackedFormStart) {
                        trackFormStart("hero");
                        setHasTrackedFormStart(true);
                      }
                    }}
                    placeholder="email@kamu.com"
                    className="w-full bg-black/20 border border-white/20 rounded-md px-4 py-3 text-sm placeholder:text-white/50 focus:outline-none focus:border-terracotta transition"
                  />
                  {errors.email && <p className="mt-1 text-xs text-amber">{errors.email.message}</p>}
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-3 rounded-md bg-terracotta text-white font-semibold hover:opacity-90 transition disabled:opacity-70"
                >
                  {isSubmitting ? "Mendaftar..." : "Daftar Sekarang"}
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="reveal flex justify-center lg:justify-end">
          <PhoneMockup />
        </div>
      </div>
    </section>
  );
}
