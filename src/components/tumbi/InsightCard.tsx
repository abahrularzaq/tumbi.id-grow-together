import { useState, ReactNode } from "react";
import { ChevronDown } from "lucide-react";

export type InsightActivityBudget = "gratis" | "murah";

export interface InsightCardProps {
  accent: "primary" | "secondary" | "accent" | "gold";
  icon?: ReactNode;
  title?: string;
  subtitle?: string;
  children?: ReactNode;
  defaultOpen?: boolean;
  expandable?: boolean;
  /** Bar kiri lebih tebal (mode kategori insight) */
  thickLeftBar?: boolean;
  /** Mode kategori: nama kategori (tanpa emoji, emoji terpisah) */
  categoryLabel?: string;
  categoryEmoji?: string;
  /** Mis. "✓ Sesuai Tahap" */
  statusBadge?: string;
  /** Pesan AI 1–2 kalimat */
  aiMessage?: string;
  /** Judul blok aktivitas */
  activitySectionTitle?: string;
  activityBullets?: string[];
  activityBudget?: InsightActivityBudget;
  /** Expand aktivitas (controlled) */
  expandOpen?: boolean;
  onExpandToggle?: () => void;
}

const accentMap = {
  primary: { bar: "bg-primary", chip: "bg-primary/10 text-primary" },
  secondary: { bar: "bg-secondary", chip: "bg-secondary/15 text-secondary" },
  accent: { bar: "bg-accent", chip: "bg-accent/30 text-foreground" },
  gold: { bar: "bg-gold", chip: "bg-gold/20 text-foreground" },
};

export function InsightCard({
  accent,
  icon,
  title,
  subtitle,
  children,
  defaultOpen = false,
  expandable = false,
  thickLeftBar = false,
  categoryLabel,
  categoryEmoji,
  statusBadge,
  aiMessage,
  activitySectionTitle = "💡 Aktivitas Minggu Ini",
  activityBullets,
  activityBudget,
  expandOpen,
  onExpandToggle,
}: InsightCardProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const activitiesControlled = onExpandToggle != null && expandOpen !== undefined;
  const activitiesOpen = activitiesControlled ? expandOpen : internalOpen;

  const toggleLegacy = () => expandable && setInternalOpen((o) => !o);
  const toggleActivities = () => {
    if (activitiesControlled) onExpandToggle?.();
    else setInternalOpen((o) => !o);
  };

  const a = accentMap[accent];
  const barClass = thickLeftBar ? `w-2.5 shrink-0 rounded-l-xl ${a.bar}` : `w-1.5 shrink-0 ${a.bar}`;
  const categoryMode = Boolean(aiMessage);

  if (categoryMode) {
    const hasActivities = (activityBullets?.length ?? 0) > 0;
    return (
      <div className="bg-card rounded-2xl shadow-card overflow-hidden flex">
        <div className={barClass} />
        <div className="flex-1 p-4 min-w-0">
          <div className="flex items-start gap-3">
            {icon && (
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${a.chip}`}>{icon}</div>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <p className="font-semibold text-sm text-foreground">
                  {categoryLabel}
                  {categoryEmoji ? ` ${categoryEmoji}` : null}
                </p>
                {statusBadge && (
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${
                      statusBadge.includes("⚠")
                        ? "bg-amber-500/15 text-amber-900 border border-amber-500/25"
                        : "bg-emerald-500/12 text-emerald-900 border border-emerald-600/20"
                    }`}
                  >
                    {statusBadge}
                  </span>
                )}
              </div>
              <p className="text-xs text-foreground/90 leading-relaxed mt-2">{aiMessage}</p>
            </div>
          </div>

          {hasActivities && (
            <>
              <button
                type="button"
                onClick={toggleActivities}
                className="mt-3 flex w-full items-center justify-between gap-2 rounded-xl bg-muted/40 px-3 py-2.5 text-left text-sm font-semibold text-foreground transition-colors hover:bg-muted/60"
              >
                <span>{activitySectionTitle}</span>
                <ChevronDown
                  className={`w-4 h-4 shrink-0 text-muted-foreground transition-transform ${activitiesOpen ? "rotate-180" : ""}`}
                />
              </button>
              {activitiesOpen && (
                <div className="mt-3 space-y-2 border-t border-border/60 pt-3 text-sm text-foreground/85 animate-fade-in">
                  <ul className="list-disc space-y-1.5 pl-5">
                    {activityBullets!.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                  {activityBudget && (
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                      Budget:{" "}
                      <span className="rounded-full bg-secondary/20 px-2 py-0.5 text-secondary">
                        {activityBudget === "gratis" ? "Gratis" : "Murah"}
                      </span>
                    </p>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-2xl shadow-card overflow-hidden flex">
      <div className={barClass} />
      <div className="flex-1 p-4">
        <button
          type="button"
          onClick={toggleLegacy}
          className="w-full flex items-start gap-3 text-left"
          disabled={!expandable}
        >
          {icon && (
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${a.chip}`}>{icon}</div>
          )}
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm text-foreground">{title}</p>
            {subtitle && <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{subtitle}</p>}
          </div>
          {expandable && (
            <ChevronDown
              className={`w-4 h-4 text-muted-foreground transition-transform ${internalOpen ? "rotate-180" : ""}`}
            />
          )}
        </button>
        {expandable && internalOpen && (
          <div className="mt-3 pt-3 border-t border-border/60 text-sm text-foreground/80 leading-relaxed animate-fade-in">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
