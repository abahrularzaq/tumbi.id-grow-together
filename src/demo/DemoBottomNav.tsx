import { Home, Star, TrendingUp, Sparkles, Syringe } from "lucide-react";
import type { DemoPage } from "./TumbiDemoApp";

const tabs: ReadonlyArray<{ page: DemoPage; label: string; icon: typeof Home }> = [
  { page: "home", label: "Beranda", icon: Home },
  { page: "milestone", label: "Milestone", icon: Star },
  { page: "tumbuh", label: "Tumbuh", icon: TrendingUp },
  { page: "insight", label: "AI Insight", icon: Sparkles },
  { page: "imunisasi", label: "Imunisasi", icon: Syringe },
];

interface DemoBottomNavProps {
  activePage: DemoPage;
  onNavigate: (page: DemoPage) => void;
}

export function DemoBottomNav({ activePage, onNavigate }: DemoBottomNavProps) {
  return (
    <nav className="absolute bottom-0 left-0 right-0 z-50">
      <div className="mx-3 mb-3 rounded-3xl bg-card shadow-soft border border-border/50 px-2 py-2">
        <ul className="flex items-center justify-between">
          {tabs.map(({ page, label, icon: Icon }) => {
            const active = activePage === page;
            return (
              <li key={page} className="flex-1">
                <button
                  type="button"
                  onClick={() => onNavigate(page)}
                  className="w-full flex flex-col items-center gap-1 py-1.5 rounded-2xl transition-colors"
                >
                  <span
                    className={`flex items-center justify-center w-10 h-10 rounded-2xl transition-all ${
                      active ? "bg-primary text-primary-foreground shadow-soft scale-105" : "text-muted-foreground"
                    }`}
                  >
                    <Icon className="w-5 h-5" strokeWidth={2.2} />
                  </span>
                  <span
                    className={`text-[10px] font-medium ${active ? "text-primary" : "text-muted-foreground"}`}
                  >
                    {label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
