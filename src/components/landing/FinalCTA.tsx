import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useAnalytics } from "../../hooks/useAnalytics";
import { waitlistSchema, type WaitlistFormData } from "../../lib/schemas";
import { appendSubmission } from "../../lib/submissions";
import { PostSubmitSurvey } from "./PostSubmitSurvey";
import { incrementSignupCount, SignupCounter } from "./SignupCounter";

const waitlistEmailKey = "tumbi_waitlist_email";
const gasWebAppUrl = import.meta.env.VITE_GAS_WEBAPP_URL as string | undefined;

type GasSubmitResponse = {
  ok?: boolean;
  error?: string;
  message?: string;
};

export function FinalCTA() {
  const [submitted, setSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<WaitlistFormData | null>(null);
  const [storedEmail, setStoredEmail] = useState<string | null>(null);
  const [hasTrackedFormStart, setHasTrackedFormStart] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const { trackCTAClick, trackFormStart, trackPlanSelected, trackAgeSelected, trackFormSubmit } =
    useAnalytics();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<WaitlistFormData>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: {
      email: "",
      plan: "premium",
      childAge: undefined,
      biggestConcern: "",
    },
  });
  const selectedPlan = watch("plan");
  const selectedAge = watch("childAge");
  const biggestConcern = watch("biggestConcern") ?? "";

  const ageLabelMap: Record<WaitlistFormData["childAge"], string> = {
    belum_lahir: "Belum lahir (sedang hamil)",
    "0_6_bulan": "0–6 bulan",
    "7_12_bulan": "7–12 bulan",
    "1_2_tahun": "1–2 tahun",
    "2_5_tahun": "2–5 tahun",
  };
  const planLabelMap: Record<WaitlistFormData["plan"], string> = {
    free: "Mulai Gratis",
    premium: "Premium Rp39rb/bulan",
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const syncFromStorage = () => {
      const email = window.localStorage.getItem(waitlistEmailKey);
      if (email) {
        setStoredEmail(email);
        setSubmitted(true);
      }
    };
    syncFromStorage();
    window.addEventListener("tumbi-waitlist-updated", syncFromStorage);
    return () => window.removeEventListener("tumbi-waitlist-updated", syncFromStorage);
  }, []);

  async function onSubmit(data: WaitlistFormData) {
    try {
      if (isSubmitting) {
        return;
      }
      if (!gasWebAppUrl) {
        throw new Error("gas_not_configured");
      }
      if (!navigator.onLine) {
        throw new Error("offline");
      }
      if (honeypot.trim()) {
        // Honeypot filled likely indicates bot traffic.
        return;
      }
      const submittedAt = new Date().toISOString();
      const payload = JSON.stringify({
        email: data.email,
        plan: data.plan,
        childAge: data.childAge,
        biggestConcern: data.biggestConcern?.trim() || undefined,
        source: "final_cta",
        timestamp: submittedAt,
        userAgent: navigator.userAgent,
        website: honeypot,
      });
      const controller = new AbortController();
      const timeoutId = window.setTimeout(() => controller.abort(), 15000);
      const response = await fetch(gasWebAppUrl, {
        method: "POST",
        body: payload,
        headers: {
          "Content-Type": "text/plain;charset=UTF-8",
        },
        signal: controller.signal,
      }).finally(() => window.clearTimeout(timeoutId));
      if (!response.ok) {
        throw new Error("gas_submit_failed");
      }
      let result: GasSubmitResponse | null = null;
      try {
        result = (await response.json()) as GasSubmitResponse;
      } catch {
        result = null;
      }
      if (result && result.ok === false) {
        const serverDetail =
          typeof result.message === "string" && result.message.trim()
            ? result.message.trim().slice(0, 220)
            : "";
        toast.error(
          serverDetail
            ? `Gagal menyimpan pendaftaran: ${serverDetail}`
            : "Gagal menyimpan ke server. Cek Google Apps Script (Spreadsheet / izin Mail) lalu deploy ulang Web App.",
          { position: "bottom-center", duration: 9000 }
        );
        return;
      }
      appendSubmission({
        email: data.email,
        plan: data.plan,
        childAge: data.childAge,
        biggestConcern: data.biggestConcern?.trim() || undefined,
        featureVote: undefined,
        timestamp: submittedAt,
        source: "final_cta",
      });
      if (typeof window !== "undefined") {
        window.localStorage.setItem(waitlistEmailKey, data.email);
        incrementSignupCount();
        window.dispatchEvent(new Event("tumbi-waitlist-updated"));
      }
      trackFormSubmit({
        plan: data.plan,
        childAge: data.childAge,
        hasCustomConcern: Boolean(data.biggestConcern?.trim()),
        formLocation: "final_cta",
      });
      setStoredEmail(data.email);
      setSubmittedData(data);
      setSubmitted(true);
    } catch (error) {
      toast.error("Gagal mendaftar. Coba lagi ya!", { position: "bottom-center" });
    }
  }

  const resetForNewEmail = () => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(waitlistEmailKey);
    }
    setSubmitted(false);
    setStoredEmail(null);
    setSubmittedData(null);
    setHasTrackedFormStart(false);
    reset({
      email: "",
      plan: "premium",
      childAge: undefined,
      biggestConcern: "",
    });
  };

  const selectedSummary =
    submittedData && submitted
      ? {
          plan: planLabelMap[submittedData.plan],
          age: ageLabelMap[submittedData.childAge],
        }
      : null;

  if (!submitted) {
    return (
      <section id="daftar" className="bg-terracotta text-white">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-24 sm:py-32 text-center">
          <div className="reveal">
            <div className="font-mono text-white/80 text-xs uppercase tracking-widest mb-5">
              ◆ Daftar Early Access
            </div>
            <h2 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl leading-[0.95] mb-6">
              Mulai pantau si kecil hari ini.
            </h2>
            <p className="text-lg sm:text-xl text-white/90 max-w-xl mx-auto mb-10">
              Daftar sekarang untuk akses awal dan diskon Early Bird seumur hidup.
            </p>
          </div>

          <form
            id="waitlist-form"
            onSubmit={handleSubmit(onSubmit)}
            className="reveal max-w-2xl mx-auto bg-background text-foreground p-6 sm:p-8 rounded-xl text-left space-y-5 shadow-[8px_8px_0_0_rgba(0,0,0,0.4)] scroll-mt-24"
          >
            <div className="text-center space-y-2">
              <h3 className="font-display font-black text-3xl sm:text-4xl text-foreground">
                Daftar Akses Awal Tumbi.id
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                Bantu kami build fitur yang paling kamu butuhkan
              </p>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">
                Email
              </label>
              <input
                type="email"
                {...register("email")}
                onFocus={() => {
                  if (!hasTrackedFormStart) {
                    trackFormStart("final_cta");
                    setHasTrackedFormStart(true);
                  }
                }}
                placeholder="email@kamu.com"
                className="w-full bg-surface border border-border rounded-md px-4 py-3 focus:outline-none focus:border-terracotta transition"
              />
              {errors.email && <p className="mt-2 text-sm text-red-500">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">
                Pilih Plan
              </label>
              <div className="grid sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setValue("plan", "free", { shouldValidate: true });
                    trackPlanSelected("free");
                  }}
                  className={`rounded-md px-4 py-3.5 font-semibold border transition ${
                    selectedPlan === "free"
                      ? "bg-terracotta text-white border-terracotta"
                      : "bg-transparent border-border hover:bg-surface"
                  }`}
                >
                  Mulai Gratis
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setValue("plan", "premium", { shouldValidate: true });
                    trackPlanSelected("premium");
                  }}
                  className={`rounded-md px-4 py-3.5 font-semibold border transition ${
                    selectedPlan === "premium"
                      ? "bg-terracotta text-white border-terracotta"
                      : "bg-transparent border-border hover:bg-surface"
                  }`}
                >
                  Premium Rp39rb/bulan ⭐
                </button>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">Harga early bird terkunci selamanya</p>
              {errors.plan && <p className="mt-2 text-sm text-red-500">{errors.plan.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">
                Usia Anak
              </label>
              <select
                {...register("childAge", {
                  onChange: (event) => trackAgeSelected(String(event.target.value)),
                })}
                value={selectedAge ?? ""}
                className="w-full bg-surface border border-border rounded-md px-4 py-3 focus:outline-none focus:border-terracotta transition"
              >
                <option value="" disabled>
                  Pilih usia anak...
                </option>
                <option value="belum_lahir">Belum lahir (sedang hamil)</option>
                <option value="0_6_bulan">0–6 bulan</option>
                <option value="7_12_bulan">7–12 bulan</option>
                <option value="1_2_tahun">1–2 tahun</option>
                <option value="2_5_tahun">2–5 tahun</option>
              </select>
              {errors.childAge && <p className="mt-2 text-sm text-red-500">{errors.childAge.message}</p>}
            </div>

            <div className="relative">
              <label className="block text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">
                Apa yang paling kamu khawatirkan soal tumbuh kembang anak? (opsional)
              </label>
              <textarea
                {...register("biggestConcern")}
                maxLength={150}
                placeholder="Contoh: anak saya 9 bulan belum bisa duduk sendiri, tidak tahu normal atau tidak..."
                className="w-full min-h-28 bg-surface/70 border border-border rounded-md px-4 py-3 focus:outline-none focus:border-terracotta transition text-sm"
              />
              <span className="absolute right-3 bottom-3 text-[11px] text-muted-foreground">
                {biggestConcern.length}/150
              </span>
              {errors.biggestConcern && (
                <p className="mt-2 text-sm text-red-500">{errors.biggestConcern.message}</p>
              )}
            </div>

            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(event) => setHoneypot(event.target.value)}
              className="hidden"
              aria-hidden="true"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-terracotta text-white font-bold py-4 rounded-md hover:opacity-90 transition mt-2 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  Mendaftar...
                </>
              ) : (
                "Daftar Akses Awal →"
              )}
            </button>
            <p className="text-xs text-muted-foreground text-center">
              Dengan mendaftar, Anda menyetujui kebijakan privasi kami.
            </p>
          </form>
          <div className="max-w-2xl mx-auto mt-6 reveal">
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

  return (
    <section id="daftar" className="bg-terracotta text-white">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 py-24 sm:py-32 text-center">
        <div className="max-w-lg mx-auto bg-background text-foreground p-8 rounded-xl shadow-[8px_8px_0_0_rgba(0,0,0,0.4)]">
          <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-sage text-background grid place-items-center text-3xl font-black">
            ✓
          </div>
          <h3 className="font-display font-black text-3xl mb-2">Kamu sudah masuk! 🎉</h3>
          <p className="text-muted-foreground mb-6">Kami akan kabari kamu saat Tumbi.id siap.</p>
          {storedEmail && (
            <p className="text-sm text-muted-foreground mb-4">
              Email terdaftar: <span className="font-semibold text-foreground">{storedEmail}</span>
            </p>
          )}
          {selectedSummary && (
            <div className="bg-surface rounded-md border border-border p-4 text-left mb-6 space-y-1">
              <p className="text-sm">
                <span className="font-semibold">Plan dipilih:</span> {selectedSummary.plan}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Usia anak:</span> {selectedSummary.age}
              </p>
            </div>
          )}
          <p className="text-xs text-muted-foreground mt-4">Cek email kamu untuk konfirmasi</p>
          <button
            type="button"
            onClick={resetForNewEmail}
            className="mt-3 inline-flex w-full justify-center border border-border text-foreground font-semibold py-3 rounded-md hover:bg-surface transition"
          >
            Daftar dengan email lain
          </button>
          {storedEmail && (
            <PostSubmitSurvey
              email={storedEmail}
              plan={submittedData?.plan ?? null}
              childAge={submittedData?.childAge ?? null}
            />
          )}
        </div>
      </div>
    </section>
  );
}
