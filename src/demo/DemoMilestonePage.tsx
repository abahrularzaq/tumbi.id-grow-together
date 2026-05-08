import { memo, useState } from "react";
import { GradientHeader } from "@/components/tumbi/GradientHeader";
import { ProgressRing } from "@/components/tumbi/ProgressRing";
import { MilestoneItem } from "@/components/tumbi/MilestoneItem";
import {
  CHILD_DATA,
  MILESTONE_CATEGORY_TIPS,
  MILESTONE_DATA,
  type MilestoneItemDemo,
} from "@/data/demoData";
import type { DemoPageProps } from "./TumbiDemoApp";

type MilestoneRouteTabId =
  | "motorik_kasar"
  | "motorik_halus"
  | "bahasa"
  | "sosial"
  | "kognitif";

const TAB_ORDER: MilestoneRouteTabId[] = [
  "motorik_kasar",
  "motorik_halus",
  "bahasa",
  "sosial",
  "kognitif",
];

const TAB_TO_DATA_ID: Record<MilestoneRouteTabId, string> = {
  motorik_kasar: "kasar",
  motorik_halus: "halus",
  bahasa: "bahasa",
  sosial: "sosial",
  kognitif: "kognitif",
};

const TAB_COLORS: Record<MilestoneRouteTabId, string> = {
  motorik_kasar: "#E07B54",
  motorik_halus: "#8B72BE",
  bahasa: "#5C7A5E",
  sosial: "#E8B86D",
  kognitif: "#D97E96",
};

const firstName = CHILD_DATA.name.split(" ")[0] ?? CHILD_DATA.name;
const childAgeMonths = CHILD_DATA.ageMonths;

function deriveUrgency(item: MilestoneItemDemo, done: boolean): "perhatian" | "segera" | null {
  if (done) return null;
  const t = item.targetAgeMonths;
  if (t != null) {
    if (childAgeMonths > t) return "perhatian";
    if (childAgeMonths <= t && t <= childAgeMonths + 2) return "segera";
    return null;
  }
  if (item.badge === "perhatian") return "perhatian";
  if (item.badge === "segera") return "segera";
  return null;
}

export const DemoMilestonePage = memo(function DemoMilestonePage(_props: DemoPageProps) {
  const [activeCategory, setActiveCategory] = useState<MilestoneRouteTabId>("motorik_kasar");
  const [milestonesByCategory, setMilestonesByCategory] = useState<Record<string, MilestoneItemDemo[]>>(() =>
    structuredClone(MILESTONE_DATA.itemsByCategoryId),
  );

  const dataCategoryId = TAB_TO_DATA_ID[activeCategory];
  const activeColor = TAB_COLORS[activeCategory];

  const items = milestonesByCategory[dataCategoryId] ?? [];
  const doneCount = items.filter((i) => i.done).length;
  const total = items.length;
  const ringPercent = total > 0 ? Math.round((doneCount / total) * 100) : 0;

  const curMeta = MILESTONE_DATA.categories.find((c) => c.id === dataCategoryId);
  const tipsText = MILESTONE_CATEGORY_TIPS[dataCategoryId] ?? "";

  const toggleItem = (index: number) => {
    setMilestonesByCategory((prev) => {
      const list = prev[dataCategoryId] ?? [];
      return {
        ...prev,
        [dataCategoryId]: list.map((it, i) => (i === index ? { ...it, done: !it.done } : it)),
      };
    });
  };

  return (
    <div className="animate-fade-in">
      <GradientHeader variant="warm">
        <h1 className="text-xl sm:text-2xl font-bold leading-tight">⭐ Milestone Tumbuh Kembang</h1>
        <p className="text-sm opacity-90 mt-1.5">
          Standar WHO & IDAI · {firstName} {CHILD_DATA.ageMonths} Bulan
        </p>
      </GradientHeader>

      <div className="px-5 -mt-6 relative z-10">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
          {TAB_ORDER.map((tabId) => {
            const dataId = TAB_TO_DATA_ID[tabId];
            const cat = MILESTONE_DATA.categories.find((c) => c.id === dataId);
            const active = activeCategory === tabId;
            const bg = TAB_COLORS[tabId];
            return (
              <button
                key={tabId}
                type="button"
                onClick={() => setActiveCategory(tabId)}
                className={`shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-semibold transition-all shadow-card border ${
                  active
                    ? "text-white shadow-soft scale-[1.02] border-white/25 [text-shadow:0_1px_2px_rgb(0_0_0_/_0.35)]"
                    : "bg-card text-foreground border-border/60"
                }`}
                style={active ? { backgroundColor: bg } : undefined}
              >
                <span>{cat?.emoji}</span>
                <span>{cat?.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <main className="px-5 mt-4 space-y-5 pb-6">
        <section className="bg-card rounded-3xl shadow-card p-5 flex items-center gap-5">
          <ProgressRing value={ringPercent} size={100} color={activeColor} trackColor="var(--color-muted)">
            <div className="text-center">
              <p className="text-xl font-bold text-foreground">{ringPercent}%</p>
              <p className="text-[10px] text-muted-foreground">tercapai</p>
            </div>
          </ProgressRing>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-muted-foreground">Ringkasan kategori</p>
            <h2 className="font-bold text-foreground text-lg">{curMeta?.label}</h2>
            <p className="text-sm font-semibold text-foreground mt-1">
              {doneCount} dari {total} tercapai
            </p>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
              {ringPercent >= 70 ? "Perkembangan sangat baik 👏" : "Tambah stimulasi ringan sesuai tips di bawah"}
            </p>
          </div>
        </section>

        <section className="space-y-2">
          {items.map((it, i) => (
            <MilestoneItem
              key={`${it.label}-${i}`}
              label={it.label}
              hint={it.hint}
              ageBadge={it.ageBadge}
              urgency={deriveUrgency(it, it.done ?? false)}
              done={it.done ?? false}
              onToggle={() => toggleItem(i)}
            />
          ))}
        </section>

        <section className="rounded-3xl border border-secondary/25 bg-secondary/10 p-4 shadow-card">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-secondary mb-1.5">Tips stimulasi</p>
          <p className="text-sm text-foreground/90 leading-relaxed">{tipsText}</p>
        </section>
      </main>
    </div>
  );
});
