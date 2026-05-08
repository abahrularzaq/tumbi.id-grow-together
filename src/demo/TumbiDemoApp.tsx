import { lazy, startTransition, Suspense, useEffect, useRef, useState } from "react";
import type { TouchEvent as ReactTouchEvent } from "react";
import { DemoBottomNav } from "./DemoBottomNav";
import { DemoHomePage } from "./DemoHomePage";
import { DemoMilestonePage } from "./DemoMilestonePage";
import { DemoInsightPage } from "./DemoInsightPage";
import { DemoImunisasiPage } from "./DemoImunisasiPage";
import { DemoSkeleton } from "./DemoSkeleton";
import { ErrorBoundary } from "./ErrorBoundary";
import "./demo.css";

const DemoGrowthPage = lazy(() => import("./DemoGrowthPage").then((m) => ({ default: m.DemoGrowthPage })));

export type DemoPage = "home" | "milestone" | "tumbuh" | "insight" | "imunisasi";

export interface DemoPageProps {
  onNavigate?: (page: DemoPage) => void;
}

const PAGE_ORDER: ReadonlyArray<DemoPage> = [
  "home",
  "milestone",
  "tumbuh",
  "insight",
  "imunisasi",
];

const SWIPE_THRESHOLD_PX = 50;

function isInsideHorizontalScroll(
  target: EventTarget | null,
  boundary: HTMLElement | null,
): boolean {
  let el = target as HTMLElement | null;
  while (el && el !== boundary) {
    const style = window.getComputedStyle(el);
    const ox = style.overflowX;
    if ((ox === "auto" || ox === "scroll") && el.scrollWidth > el.clientWidth + 1) {
      return true;
    }
    el = el.parentElement;
  }
  return false;
}

export default function TumbiDemoApp() {
  const [activePage, setActivePage] = useState<DemoPage>("home");
  const [isLoading, setIsLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const node = scrollRef.current;
    if (node) node.scrollTop = 0;
  }, [activePage]);

  const handleTouchStart = (e: ReactTouchEvent<HTMLDivElement>) => {
    const t = e.touches[0];
    if (!t) return;
    if (isInsideHorizontalScroll(e.target, scrollRef.current)) {
      touchStartRef.current = null;
      return;
    }
    touchStartRef.current = { x: t.clientX, y: t.clientY };
  };

  const handleTouchEnd = (e: ReactTouchEvent<HTMLDivElement>) => {
    const start = touchStartRef.current;
    touchStartRef.current = null;
    if (!start) return;
    const t = e.changedTouches[0];
    if (!t) return;
    const deltaX = t.clientX - start.x;
    const deltaY = t.clientY - start.y;
    if (Math.abs(deltaX) <= SWIPE_THRESHOLD_PX) return;
    if (Math.abs(deltaX) <= Math.abs(deltaY)) return;

    const idx = PAGE_ORDER.indexOf(activePage);
    if (deltaX < 0 && idx < PAGE_ORDER.length - 1) {
      startTransition(() => setActivePage(PAGE_ORDER[idx + 1]));
    } else if (deltaX > 0 && idx > 0) {
      startTransition(() => setActivePage(PAGE_ORDER[idx - 1]));
    }
  };

  const handleNavigate = (page: DemoPage) => {
    startTransition(() => setActivePage(page));
  };

  return (
    <div
      style={{ maxWidth: 390, height: 780 }}
      className="tumbi-demo relative overflow-hidden rounded-[40px] bg-[#FDF8F2] shadow-2xl border border-black/5 mx-auto w-full"
    >
      <span
        className="absolute top-3 right-3 z-50 px-2 py-0.5 rounded-md text-[10px] font-mono font-bold tracking-wider text-black select-none pointer-events-none"
        style={{ backgroundColor: "#FFB800" }}
        aria-hidden
      >
        DEMO
      </span>

      <div
        ref={scrollRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="h-full overflow-y-auto pb-20"
      >
        {isLoading ? (
          <DemoSkeleton />
        ) : (
          <>
            {activePage === "home" && <DemoHomePage onNavigate={handleNavigate} />}
            {activePage === "milestone" && <DemoMilestonePage onNavigate={handleNavigate} />}
            {activePage === "tumbuh" && (
              <ErrorBoundary
                fallback={
                  <div className="p-6 text-center text-muted-foreground">
                    <p className="text-2xl mb-2">📈</p>
                    <p className="text-sm">Chart sedang dimuat...</p>
                  </div>
                }
              >
                <Suspense
                  fallback={
                    <div className="p-6 text-center text-muted-foreground">
                      <p className="text-2xl mb-2">📈</p>
                      <p className="text-sm">Chart sedang dimuat...</p>
                    </div>
                  }
                >
                  <DemoGrowthPage onNavigate={handleNavigate} />
                </Suspense>
              </ErrorBoundary>
            )}
            {activePage === "insight" && <DemoInsightPage onNavigate={handleNavigate} />}
            {activePage === "imunisasi" && <DemoImunisasiPage onNavigate={handleNavigate} />}
          </>
        )}
      </div>

      {!isLoading && <DemoBottomNav activePage={activePage} onNavigate={handleNavigate} />}
    </div>
  );
}
