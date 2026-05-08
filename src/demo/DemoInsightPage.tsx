import { memo, useState } from "react";
import { GradientHeader } from "@/components/tumbi/GradientHeader";
import { InsightCard } from "@/components/tumbi/InsightCard";
import { Brain, Footprints, Hand, MessageCircle, Users } from "lucide-react";
import { INSIGHT_DATA } from "@/data/demoData";
import type { DemoPageProps } from "./TumbiDemoApp";

const iconMap = {
  footprints: <Footprints className="w-5 h-5" />,
  hand: <Hand className="w-5 h-5" />,
  message: <MessageCircle className="w-5 h-5" />,
  brain: <Brain className="w-5 h-5" />,
  users: <Users className="w-5 h-5" />,
} as const;

export const DemoInsightPage = memo(function DemoInsightPage(_props: DemoPageProps) {
  const [expandedInsight, setExpandedInsight] = useState<string | null>(null);

  return (
    <div className="animate-fade-in">
      <GradientHeader variant="insightHero">
        <h1 className="text-xl sm:text-2xl font-bold leading-tight [text-shadow:0_1px_2px_rgb(0_0_0_/_0.25)]">
          🤖 AI Parenting Insight
        </h1>
        <p className="text-sm opacity-95 mt-1.5">Analisis berbasis WHO · IDAI · Kemenkes</p>
      </GradientHeader>

      <main className="px-5 -mt-6 space-y-4 relative z-10 pb-8">
        <section className="gradient-insight-weekly rounded-3xl shadow-card p-5 border border-[#c4b8dc]">
          <div className="flex items-center gap-2 text-xs font-semibold text-foreground/85 mb-2">
            {INSIGHT_DATA.weeklySummaryCardLabel}
          </div>
          <p className="text-sm font-medium text-foreground leading-relaxed">
            {INSIGHT_DATA.weeklySummaryLead}
            <span className="text-secondary font-semibold">{INSIGHT_DATA.weeklySummaryHighlight}</span>
            {INSIGHT_DATA.weeklySummaryTrail}
          </p>
          <p className="mt-3 text-sm text-foreground/90 leading-relaxed rounded-2xl bg-white/50 px-3 py-2.5 border border-white/60">
            <span className="font-semibold text-primary">✨ </span>
            {INSIGHT_DATA.weeklyHighlightAchievement}
          </p>
          <div className="grid grid-cols-3 gap-2 mt-4">
            {INSIGHT_DATA.weeklySummaryStats.map((s) => (
              <div key={s.label} className={`rounded-2xl p-3 text-center ${s.toneClass}`}>
                <p className="text-xl font-bold">{s.value}</p>
                <p className="text-[10px] font-semibold mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="space-y-3">
          {INSIGHT_DATA.categoryCards.map((card) => (
            <InsightCard
              key={card.id}
              accent={card.accent}
              icon={iconMap[card.icon]}
              thickLeftBar
              categoryLabel={card.categoryLabel}
              categoryEmoji={card.categoryEmoji}
              statusBadge={card.statusBadge}
              aiMessage={card.aiMessage}
              activitySectionTitle={card.activitySectionTitle ?? "💡 Aktivitas Minggu Ini"}
              activityBullets={card.activityBullets}
              activityBudget={card.activityBudget}
              expandOpen={expandedInsight === card.id}
              onExpandToggle={() =>
                setExpandedInsight((cur) => (cur === card.id ? null : card.id))
              }
            />
          ))}
        </div>

        <section className="rounded-3xl border border-border/60 bg-[oklch(0.97_0.02_75)] p-5 shadow-card">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground mb-1">
            Saran minggu ini
          </p>
          <h3 className="font-bold text-foreground text-base leading-snug">{INSIGHT_DATA.saranMingguIni.actionTitle}</h3>
          <p className="text-sm text-foreground/90 leading-relaxed mt-2">{INSIGHT_DATA.saranMingguIni.howTo}</p>
          <p className="text-xs font-semibold text-primary mt-3 inline-flex items-center rounded-full bg-primary/10 px-3 py-1">
            ⏱ {INSIGHT_DATA.saranMingguIni.durationLabel}
          </p>
        </section>

        <section className="gradient-insight-premium rounded-3xl p-5 shadow-soft text-white relative overflow-hidden">
          <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/15 blur-2xl" />
          <div className="relative">
            <p className="font-bold text-lg leading-snug">{INSIGHT_DATA.premiumDoctorCard.title}</p>
            <p className="text-xs opacity-95 mt-2 leading-relaxed max-w-[95%]">
              {INSIGHT_DATA.premiumDoctorCard.description}
            </p>
            <button
              type="button"
              className="mt-4 w-full sm:w-auto font-bold text-sm bg-white text-foreground px-5 py-2.5 rounded-xl shadow-md hover:bg-white/95 transition-colors"
            >
              {INSIGHT_DATA.premiumDoctorCard.ctaLabel}
            </button>
          </div>
        </section>
      </main>
    </div>
  );
});
