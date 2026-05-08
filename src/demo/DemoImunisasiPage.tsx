import { memo, useMemo, useState } from "react";
import { GradientHeader } from "@/components/tumbi/GradientHeader";
import { Bell, Check, ChevronDown, Syringe } from "lucide-react";
import { toast, Toaster } from "sonner";
import {
  CHILD_DATA,
  IMUNISASI_DATA,
  IMUNISASI_STATUS_DOT_CLASS,
  imunisasiCountdownLabel,
  type ImunisasiUpcomingDemo,
} from "@/data/demoData";
import type { DemoPageProps } from "./TumbiDemoApp";

function cloneUpcoming(list: ImunisasiUpcomingDemo[]) {
  return list.map((u) => ({ ...u }));
}

export const DemoImunisasiPage = memo(function DemoImunisasiPage(_props: DemoPageProps) {
  const [completedVaccines, setCompletedVaccines] = useState<string[]>(() => [...IMUNISASI_DATA.completed]);
  const [upcomingVaccines, setUpcomingVaccines] = useState<ImunisasiUpcomingDemo[]>(() =>
    cloneUpcoming(IMUNISASI_DATA.upcoming),
  );
  const [recommendedOpen, setRecommendedOpen] = useState(false);

  const nextShot = upcomingVaccines[0];
  const countdownNext = useMemo(() => {
    if (!nextShot?.dateIso) return "";
    return nextShot.homeCountdownLabel ?? imunisasiCountdownLabel(nextShot.dateIso);
  }, [nextShot]);

  const markDone = (name: string) => {
    setUpcomingVaccines((prev) => prev.filter((u) => u.name !== name));
    setCompletedVaccines((prev) => (prev.includes(name) ? prev : [...prev, name]));
  };

  const remind = (label: string) => {
    toast.success("Pengingat (demo)", { description: `${label} — notifikasi contoh.` });
  };

  return (
    <div className="animate-fade-in">
      <Toaster richColors position="top-center" />

      <GradientHeader variant="sage">
        <h1 className="text-xl sm:text-2xl font-bold leading-tight">💉 Jadwal Imunisasi</h1>
        <p className="text-sm opacity-95 mt-1.5">Program Kemenkes RI · {CHILD_DATA.name}</p>
      </GradientHeader>

      <main className="px-5 -mt-6 space-y-4 relative z-10 pb-10">
        <section className="rounded-3xl shadow-card p-5 border border-emerald-700/10" style={{ backgroundColor: "#E8F5E9" }}>
          <p className="text-sm font-bold text-emerald-950 flex items-center gap-2">
            <span className="text-lg leading-none" aria-hidden>
              ✅
            </span>
            {completedVaccines.length} Imunisasi Selesai
          </p>
          <ul className="mt-3 space-y-1.5 text-sm text-emerald-950/90">
            {completedVaccines.map((v) => (
              <li key={v} className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 shrink-0 text-emerald-700" strokeWidth={2.5} />
                <span>{v}</span>
              </li>
            ))}
          </ul>
        </section>

        {nextShot && (
          <section
            className="rounded-3xl p-5 shadow-card border-2"
            style={{
              borderColor: "#E07B54",
              background: "linear-gradient(180deg, oklch(0.98 0.02 75) 0%, oklch(0.96 0.03 55) 100%)",
            }}
          >
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#c45d38] mb-2">Paling dekat</p>
            <div className="flex items-start gap-3">
              <div className="w-11 h-11 rounded-2xl bg-primary/15 text-primary flex items-center justify-center shrink-0">
                <Syringe className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-foreground text-lg leading-tight">{nextShot.name}</p>
                <p className="text-sm text-muted-foreground mt-1">Jadwal: {nextShot.date}</p>
                <p className="text-xs font-semibold text-primary mt-1">{countdownNext}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => remind(nextShot.name)}
              className="mt-4 w-full flex items-center justify-center gap-2 rounded-2xl bg-primary text-primary-foreground py-2.5 text-sm font-semibold shadow-soft"
            >
              <Bell className="w-4 h-4" /> Ingatkan Saya
            </button>
          </section>
        )}

        <section>
          <h2 className="font-bold text-foreground mb-3 px-0.5 text-sm">Jadwal mendatang</h2>
          <div className="space-y-3">
            {upcomingVaccines.map((u) => (
              <div key={u.name} className="bg-card rounded-2xl shadow-card border border-border/70 p-4">
                <div className="flex items-start gap-3 mb-3">
                  <span className={`mt-1.5 w-2.5 h-2.5 rounded-full shrink-0 ${IMUNISASI_STATUS_DOT_CLASS[u.status]}`} />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground">{u.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{u.date}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => markDone(u.name)}
                    className="flex-1 flex items-center justify-center gap-1.5 rounded-xl border-2 border-primary bg-transparent text-primary py-2 text-xs font-semibold hover:bg-primary/5 transition-colors"
                  >
                    <Check className="w-3.5 h-3.5" /> Tandai Selesai
                  </button>
                  <button
                    type="button"
                    onClick={() => remind(u.name)}
                    className="flex-1 flex items-center justify-center gap-1.5 bg-primary text-primary-foreground rounded-xl py-2 text-xs font-semibold shadow-soft"
                  >
                    <Bell className="w-3.5 h-3.5" /> Ingatkan
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          className="rounded-3xl p-4 shadow-card border border-black/5"
          style={{ backgroundColor: "#FFE8D6" }}
        >
          <p className="text-xs font-semibold text-foreground/90 leading-relaxed">{IMUNISASI_DATA.kemenkesInfoText}</p>
        </section>

        <section className="bg-card rounded-3xl shadow-card border border-border/80 overflow-hidden">
          <button
            type="button"
            onClick={() => setRecommendedOpen((o) => !o)}
            className="flex w-full items-center justify-between gap-2 px-4 py-3.5 text-left font-semibold text-sm text-foreground hover:bg-muted/30 transition-colors"
          >
            <span>Vaksin anjuran</span>
            <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${recommendedOpen ? "rotate-180" : ""}`} />
          </button>
          {recommendedOpen && (
            <div className="px-4 pb-4 pt-0 border-t border-border/60 animate-fade-in">
              <ul className="mt-3 space-y-1.5 text-sm text-foreground/90 list-disc pl-5">
                {IMUNISASI_DATA.recommendedVaccines.map((v) => (
                  <li key={v}>{v}</li>
                ))}
              </ul>
              <p className="mt-3 text-[11px] text-muted-foreground leading-relaxed italic">
                Konsultasikan dengan dokter anak sebelum memberikan vaksin di luar jadwal dasar.
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
});
