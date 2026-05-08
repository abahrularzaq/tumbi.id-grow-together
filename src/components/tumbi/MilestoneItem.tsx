import { Check } from "lucide-react";

export interface MilestoneItemProps {
  label: string;
  hint?: string;
  ageBadge?: string;
  /** “Perlu Perhatian” (merah) atau “Segera” (oranye), dari logika usia + data */
  urgency: "perhatian" | "segera" | null;
  done: boolean;
  onToggle: () => void;
}

export function MilestoneItem({ label, hint, ageBadge, urgency, done, onToggle }: MilestoneItemProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="w-full flex items-start gap-3 p-3 rounded-2xl border border-border/70 bg-card shadow-card hover:bg-muted/40 transition-colors text-left active:scale-[0.99] duration-150"
    >
      <span
        className={`mt-0.5 w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-200 ease-out ${
          done ? "bg-secondary border-secondary scale-110 shadow-sm" : "border-border bg-background active:scale-95"
        }`}
      >
        {done && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
      </span>
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-1.5 gap-y-1">
          <p className={`text-sm font-medium ${done ? "text-muted-foreground line-through" : "text-foreground"}`}>
            {label}
          </p>
          {ageBadge && (
            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
              {ageBadge}
            </span>
          )}
        </div>
        {hint && <p className="text-xs text-muted-foreground mt-0.5">{hint}</p>}
      </div>
      <div className="flex flex-col items-end gap-1 shrink-0">
        {urgency === "perhatian" && (
          <span className="text-[10px] font-semibold px-2 py-1 rounded-full bg-red-500/15 text-red-700 border border-red-500/25">
            Perlu Perhatian
          </span>
        )}
        {urgency === "segera" && (
          <span className="text-[10px] font-semibold px-2 py-1 rounded-full bg-orange-500/15 text-orange-800 border border-orange-400/30">
            Segera
          </span>
        )}
      </div>
    </button>
  );
}
