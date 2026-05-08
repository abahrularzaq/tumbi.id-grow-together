import { memo } from "react";
import { GradientHeader } from "@/components/tumbi/GradientHeader";
import { ProgressRing } from "@/components/tumbi/ProgressRing";
import {
  CHILD_DATA,
  IMUNISASI_DATA,
  IMUNISASI_STATUS_DOT_CLASS,
  INSIGHT_DATA,
  getHomeMilestoneRingPercent,
  getHomeMilestoneRows,
  type HomeInsightStatusDemo,
  type HomeMilestoneCategoryId,
  type InsightCardAccentDemo,
} from "@/data/demoData";
import {
  Activity,
  Bell,
  Brain,
  ChevronRight,
  Footprints,
  Hand,
  MessageCircle,
  Sparkles,
  Syringe,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { DemoPageProps } from "./TumbiDemoApp";

const firstName = CHILD_DATA.name.split(" ")[0] ?? CHILD_DATA.name;
const ageLabel = `${CHILD_DATA.ageMonths} Bulan ${CHILD_DATA.ageDays} Hari`;

const milestoneIconById: Record<HomeMilestoneCategoryId, LucideIcon> = {
  kasar: Footprints,
  halus: Hand,
  bahasa: MessageCircle,
  kognitif: Brain,
};

const milestoneChipById: Record<HomeMilestoneCategoryId, string> = {
  kasar: "bg-primary/10 text-primary",
  halus: "bg-secondary/15 text-secondary",
  bahasa: "bg-accent/30 text-foreground",
  kognitif: "bg-gold/20 text-foreground",
};

const insightPreviewIconMap: Record<string, LucideIcon> = {
  activity: Activity,
  message: MessageCircle,
  footprints: Footprints,
  hand: Hand,
};

const insightAccentBar: Record<InsightCardAccentDemo, string> = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  accent: "bg-accent",
  gold: "bg-gold",
};

const insightAccentChip: Record<InsightCardAccentDemo, string> = {
  primary: "bg-primary/10 text-primary",
  secondary: "bg-secondary/15 text-secondary",
  accent: "bg-accent/30 text-foreground",
  gold: "bg-gold/20 text-foreground",
};

function insightStatusBadge(status: HomeInsightStatusDemo) {
  if (status === "normal") {
    return (
      <span className="inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded-full bg-secondary/20 text-secondary">
        ✓ Normal
      </span>
    );
  }
  return (
    <span className="inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gold/25 text-foreground">
      ⚠ Perlu Stimulasi
    </span>
  );
}

export const DemoHomePage = memo(function DemoHomePage({ onNavigate }: DemoPageProps) {
  const ringPercent = getHomeMilestoneRingPercent();
  const milestoneRows = getHomeMilestoneRows();
  const upcomingPreview = IMUNISASI_DATA.upcoming.slice(0, 2);

  const statCards = [
    {
      label: "Berat",
      val: String(CHILD_DATA.weight),
      unit: "kg",
      valueClass: "text-[#E07B54]",
    },
    {
      label: "Tinggi",
      val: String(CHILD_DATA.height),
      unit: "cm",
      valueClass: "text-secondary",
    },
    {
      label: "LK",
      val: String(CHILD_DATA.headCirc),
      unit: "cm",
      valueClass: "text-[#8B72BE]",
    },
  ];

  return (
    <div className="animate-fade-in">
      <GradientHeader variant="homeHero">
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-xs uppercase tracking-wider opacity-90">Tumbi.id</p>
            <p className="text-sm font-medium opacity-95">Tumbuh Bersama Si Kecil</p>
          </div>
          <button
            type="button"
            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center"
            aria-label="Notifikasi"
          >
            <Bell className="w-5 h-5" />
          </button>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 shrink-0 rounded-full bg-white/25 backdrop-blur flex items-center justify-center text-3xl ring-[3px] ring-white ring-offset-0 shadow-sm">
            {CHILD_DATA.avatarEmoji}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-bold leading-tight">{CHILD_DATA.name}</h1>
            <p className="text-sm opacity-90 mt-0.5">{ageLabel}</p>
            <span className="inline-block mt-2 text-[11px] font-semibold bg-white/25 backdrop-blur px-3 py-1 rounded-full border border-white/40">
              {ageLabel}
            </span>
          </div>
        </div>
      </GradientHeader>

      <main className="px-5 -mt-6 space-y-5 relative z-10">
        <div className="grid grid-cols-3 gap-3">
          {statCards.map((s) => (
            <div key={s.label} className="bg-card rounded-2xl shadow-card p-3 text-center">
              <p className="text-[10px] font-semibold text-muted-foreground tracking-wider">{s.label}</p>
              <p className={`text-xl font-bold mt-1 ${s.valueClass}`}>{s.val}</p>
              <p className="text-[10px] text-muted-foreground">{s.unit}</p>
            </div>
          ))}
        </div>

        <section className="bg-card rounded-3xl shadow-card p-5">
          <div className="flex items-start justify-between gap-2 mb-3">
            <div>
              <p className="text-xs text-muted-foreground">Milestone Bulan Ini</p>
              <h2 className="font-bold text-foreground">Perkembangan {firstName}</h2>
            </div>
            <span className="text-[10px] font-semibold px-2 py-1 rounded-full bg-secondary/15 text-secondary shrink-0">
              {CHILD_DATA.homeMilestoneStatusLabel}
            </span>
          </div>
          <div className="flex items-center gap-5">
            <ProgressRing value={ringPercent} size={110} stroke={10} color="var(--color-primary)" trackColor="var(--color-muted)">
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground leading-none">{ringPercent}%</p>
                <p className="text-[10px] text-muted-foreground mt-1">tercapai</p>
              </div>
            </ProgressRing>
            <div className="flex-1 grid grid-cols-2 gap-2 min-w-0">
              {milestoneRows.map((row) => {
                const Icon = milestoneIconById[row.id];
                const chip = milestoneChipById[row.id];
                return (
                  <div key={row.id} className="flex items-center gap-2 min-w-0">
                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${chip}`}>
                      <Icon className="w-3.5 h-3.5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-medium text-foreground truncate">{row.label}</p>
                      <p className="text-[10px] font-semibold text-muted-foreground">
                        {row.done}/{row.total}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <button
            type="button"
            onClick={() => onNavigate?.("milestone")}
            className="mt-4 flex items-center justify-center gap-1 w-full text-sm font-semibold text-primary py-2.5 rounded-2xl bg-primary/5 hover:bg-primary/10 transition-colors"
          >
            Lihat Detail <ChevronRight className="w-4 h-4" />
          </button>
        </section>

        <section className="space-y-3">
          <div className="flex items-center justify-between gap-2">
            <h2 className="font-bold text-foreground flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary shrink-0" /> AI Insight
            </h2>
            <button
              type="button"
              onClick={() => onNavigate?.("insight")}
              className="text-xs font-semibold text-primary flex items-center gap-0.5 shrink-0"
            >
              Lihat Semua Insight <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
          {INSIGHT_DATA.homePreviewCards.map((card) => {
            const Icon = insightPreviewIconMap[card.icon] ?? Activity;
            return (
              <div key={card.category} className="bg-card rounded-2xl shadow-card overflow-hidden flex">
                <div className={`w-1.5 shrink-0 ${insightAccentBar[card.accent]}`} />
                <div className="flex-1 p-4 flex gap-3 min-w-0">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${insightAccentChip[card.accent]}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1 space-y-1.5">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{card.category}</p>
                    {insightStatusBadge(card.status)}
                    <p className="text-xs text-foreground/90 leading-relaxed">{card.preview}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        <section className="bg-card rounded-3xl shadow-card p-5">
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-secondary/15 text-secondary flex items-center justify-center shrink-0">
                <Syringe className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Imunisasi Berikutnya</p>
                <p className="font-semibold text-foreground text-sm">Jadwal mendatang</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onNavigate?.("imunisasi")}
              className="text-xs font-semibold text-primary flex items-center gap-0.5 shrink-0"
            >
              Lihat semua <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <ul className="space-y-2">
            {upcomingPreview.map((u) => (
              <li key={u.name}>
                <button
                  type="button"
                  onClick={() => onNavigate?.("imunisasi")}
                  className="w-full flex items-center gap-3 rounded-2xl border border-border/80 px-3 py-2.5 hover:bg-muted/40 transition-colors text-left"
                >
                  <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${IMUNISASI_STATUS_DOT_CLASS[u.status]}`} />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground text-sm leading-snug">{u.name}</p>
                    <p className="text-[11px] text-muted-foreground">{u.date}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section className="gradient-premium-cta rounded-3xl p-5 shadow-soft relative overflow-hidden text-white">
          <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full bg-white/20 blur-2xl" />
          <div className="relative flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/25 backdrop-blur flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-base leading-snug">Tumbi Premium</p>
              <p className="text-xs opacity-95 mt-1 leading-relaxed">{CHILD_DATA.homePremium.description}</p>
            </div>
            <button
              type="button"
              className="text-xs font-bold bg-white text-foreground px-4 py-2.5 rounded-xl shrink-0 shadow-sm w-full sm:w-auto"
            >
              {CHILD_DATA.homePremium.ctaLabel}
            </button>
          </div>
        </section>
      </main>
    </div>
  );
});
