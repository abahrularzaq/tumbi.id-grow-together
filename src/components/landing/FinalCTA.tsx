import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { waitlistSchema, type WaitlistFormData } from "../../lib/schemas";

const waitlistEmailKey = "tumbi_waitlist_email";

export function FinalCTA() {
  const [submitted, setSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<WaitlistFormData | null>(null);
  const [storedEmail, setStoredEmail] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
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
      if (!navigator.onLine) {
        throw new Error("offline");
      }
      await new Promise((resolve) => setTimeout(resolve, 800));
      if (typeof window !== "undefined") {
        window.localStorage.setItem(waitlistEmailKey, data.email);
        window.dispatchEvent(new Event("tumbi-waitlist-updated"));
      }
      setStoredEmail(data.email);
      setSubmittedData(data);
      setSubmitted(true);
    } catch {
      toast.error("Gagal mendaftar. Coba lagi ya!", { position: "bottom-center" });
    }
  }

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
            onSubmit={handleSubmit(onSubmit)}
            className="reveal max-w-2xl mx-auto bg-background text-foreground p-6 sm:p-8 rounded-xl text-left space-y-5 shadow-[8px_8px_0_0_rgba(0,0,0,0.4)]"
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
                  onClick={() => setValue("plan", "free", { shouldValidate: true })}
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
                  onClick={() => setValue("plan", "premium", { shouldValidate: true })}
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
                {...register("childAge")}
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
          <a
            href="https://instagram.com/tumbi.id"
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-full justify-center border border-amber text-amber font-semibold py-3 rounded-md hover:bg-amber/10 transition"
          >
            Ikuti Instagram @tumbi.id untuk tips parenting
          </a>
          <p className="text-xs text-muted-foreground mt-4">Cek email kamu untuk konfirmasi</p>
        </div>
      </div>
    </section>
  );
}
