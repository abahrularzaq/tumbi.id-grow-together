import { memo, useEffect, useMemo, useState } from "react";
import { GradientHeader } from "@/components/tumbi/GradientHeader";
import {
  CHILD_DATA,
  GROWTH_DATA,
  GROWTH_HISTORY_LAST,
  toGrowthRechartsRows,
  type GrowthRechartsRow,
} from "@/data/demoData";
import type { DemoPageProps } from "./TumbiDemoApp";
import { DemoSkeleton } from "./DemoSkeleton";

type GrowthTab = "bb" | "tb" | "lk";

const METRIC: Record<
  GrowthTab,
  { key: GrowthTab; title: string; unit: string; color: string; metric: (typeof GROWTH_DATA)["bb"] }
> = {
  bb: {
    key: "bb",
    title: "Berat Badan",
    unit: "kg",
    color: "#E07B54",
    metric: GROWTH_DATA.bb,
  },
  tb: {
    key: "tb",
    title: "Tinggi Badan",
    unit: "cm",
    color: "#5C7A5E",
    metric: GROWTH_DATA.tb,
  },
  lk: {
    key: "lk",
    title: "Lingkar Kepala",
    unit: "cm",
    color: "#8B72BE",
    metric: GROWTH_DATA.lk,
  },
};

const TAB_ORDER: GrowthTab[] = ["bb", "tb", "lk"];

const WHO_P50_STROKE = "#b8b8b8";
const WHO_P3_P97_STROKE = "#d4d4d4";

function clamp(n: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, n));
}

function pointsToPath(points: Array<{ x: number; y: number }>) {
  if (!points.length) return "";
  return points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(" ");
}

function GrowthMiniChart({
  rows,
  unit,
  color,
}: {
  rows: GrowthRechartsRow[];
  unit: string;
  color: string;
}) {
  const W = 320;
  const H = 180;
  const PAD = { top: 10, right: 10, bottom: 28, left: 36 };
  const innerW = W - PAD.left - PAD.right;
  const innerH = H - PAD.top - PAD.bottom;

  const yDomain = useMemo((): [number, number] => {
    const vals: number[] = [];
    for (const r of rows) vals.push(r.alara, r.p3, r.p50, r.p97);
    const lo = Math.min(...vals);
    const hi = Math.max(...vals);
    const pad = unit === "kg" ? 0.45 : 2;
    return [lo - pad, hi + pad];
  }, [rows, unit]);

  const xAt = (i: number) => PAD.left + (rows.length <= 1 ? 0 : (i / (rows.length - 1)) * innerW);
  const yAt = (v: number) => {
    const [lo, hi] = yDomain;
    const t = (clamp(v, lo, hi) - lo) / (hi - lo || 1);
    return PAD.top + (1 - t) * innerH;
  };

  const p3 = rows.map((r, i) => ({ x: xAt(i), y: yAt(r.p3) }));
  const p50 = rows.map((r, i) => ({ x: xAt(i), y: yAt(r.p50) }));
  const p97 = rows.map((r, i) => ({ x: xAt(i), y: yAt(r.p97) }));
  const alara = rows.map((r, i) => ({ x: xAt(i), y: yAt(r.alara) }));

  const tickCount = 3;
  const [lo, hi] = yDomain;
  const yTicks = new Array(tickCount).fill(0).map((_, i) => {
    const t = i / (tickCount - 1);
    const v = lo + (1 - t) * (hi - lo);
    return { v, y: yAt(v) };
  });

  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="block">
      <rect x="0" y="0" width={W} height={H} fill="transparent" />
      {/* horizontal grid */}
      {yTicks.map((t) => (
        <line
          key={t.y}
          x1={PAD.left}
          x2={W - PAD.right}
          y1={t.y}
          y2={t.y}
          stroke="#E8E0D8"
          strokeOpacity={0.6}
          strokeDasharray="3 3"
        />
      ))}

      {/* y labels */}
      {yTicks.map((t) => (
        <text
          key={t.y}
          x={PAD.left - 6}
          y={t.y + 3}
          textAnchor="end"
          fontSize={10}
          fill="#7A6E68"
        >
          {unit === "kg" ? t.v.toFixed(1) : Math.round(t.v)} {unit}
        </text>
      ))}

      {/* x labels (0, 3, 6, 9) */}
      {[0, 3, 6, 9].filter((i) => i < rows.length).map((i) => (
        <text
          key={i}
          x={xAt(i)}
          y={H - 10}
          textAnchor="middle"
          fontSize={10}
          fill="#7A6E68"
        >
          {rows[i]?.monthLabel}
        </text>
      ))}

      {/* reference paths */}
      <path d={pointsToPath(p97)} fill="none" stroke={WHO_P3_P97_STROKE} strokeWidth={1} strokeDasharray="2 5" />
      <path d={pointsToPath(p3)} fill="none" stroke={WHO_P3_P97_STROKE} strokeWidth={1} strokeDasharray="2 5" />
      <path d={pointsToPath(p50)} fill="none" stroke={WHO_P50_STROKE} strokeWidth={2} strokeDasharray="5 5" />

      {/* alara path */}
      <path d={pointsToPath(alara)} fill="none" stroke={color} strokeWidth={2.5} />

      {/* last point */}
      {alara.length ? (
        <circle
          cx={alara[alara.length - 1]!.x}
          cy={alara[alara.length - 1]!.y}
          r={5}
          fill={color}
          stroke="#fff"
          strokeWidth={1.5}
        />
      ) : null}
    </svg>
  );
}

function GrowthChartBlock({ tab }: { tab: GrowthTab }) {
  const { unit, color, metric } = METRIC[tab];
  const data = useMemo(() => toGrowthRechartsRows(metric.series), [metric.series]);

  return (
    <div className="w-full">
      <GrowthMiniChart key={tab} rows={data} unit={unit} color={color} />
      <div className="mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[10px] text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-0.5 w-4 rounded-full" style={{ backgroundColor: color }} />
          Alara
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-0.5 w-4 rounded-full border border-dashed border-[#b8b8b8] bg-transparent" />
          Median WHO
        </span>
        <span className="inline-flex items-center gap-1.5 opacity-80">
          <span className="h-px w-4 border-t border-dashed border-[#d4d4d4]" />
          p3 / p97
        </span>
      </div>
    </div>
  );
}

export const DemoGrowthPage = memo(function DemoGrowthPage(_props: DemoPageProps) {
  const [mounted, setMounted] = useState(false);
  const [savedNotice, setSavedNotice] = useState<string | null>(null);
  const [tab, setTab] = useState<GrowthTab>("bb");
  const [formDate, setFormDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [formBb, setFormBb] = useState(GROWTH_DATA.bb.currentDisplay);
  const [formTb, setFormTb] = useState(GROWTH_DATA.tb.currentDisplay);
  const [formLk, setFormLk] = useState(GROWTH_DATA.lk.currentDisplay);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <DemoSkeleton />;

  const subtitle = `0–9 Bulan · ${CHILD_DATA.name}`;

  const summaryPills = [
    {
      key: "bb" as const,
      text: `${GROWTH_DATA.bb.currentDisplay} kg · ${GROWTH_DATA.bb.statusLabel} ✓`,
    },
    {
      key: "tb" as const,
      text: `${GROWTH_DATA.tb.currentDisplay} cm · ${GROWTH_DATA.tb.statusLabel} ✓`,
    },
    {
      key: "lk" as const,
      text: `${GROWTH_DATA.lk.currentDisplay} cm · ${GROWTH_DATA.lk.statusLabel} ✓`,
    },
  ];

  const handleSave = () => {
    try {
      const entry = {
        at: new Date().toISOString(),
        date: formDate,
        bb: formBb,
        tb: formTb,
        lk: formLk,
      };
      const raw = globalThis.localStorage?.getItem("tumbi_growth_demo_entries");
      const list = raw ? (JSON.parse(raw) as unknown[]) : [];
      list.push(entry);
      globalThis.localStorage?.setItem("tumbi_growth_demo_entries", JSON.stringify(list.slice(-20)));
    } catch {
      /* demo: abaikan error storage */
    }
    setSavedNotice("Data tersimpan! (Demo: tercatat di perangkat ini saja.)");
  };

  return (
    <div className="animate-fade-in">
      {savedNotice ? (
        <div className="px-5 pt-4">
          <div className="rounded-2xl border border-emerald-600/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-900 shadow-card">
            <p className="font-semibold">✓ {savedNotice}</p>
            <button
              type="button"
              onClick={() => setSavedNotice(null)}
              className="mt-2 text-xs font-semibold text-emerald-900/80 underline"
            >
              Tutup
            </button>
          </div>
        </div>
      ) : null}

      <GradientHeader variant="growthSageDark">
        <h1 className="text-xl sm:text-2xl font-bold leading-tight">📈 Grafik Tumbuh Kembang</h1>
        <p className="text-sm opacity-95 mt-1.5">{subtitle}</p>
      </GradientHeader>

      <main className="px-5 -mt-6 space-y-4 relative z-10 pb-8">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {summaryPills.map((p) => (
            <div
              key={p.key}
              className="shrink-0 rounded-full border border-emerald-600/25 bg-emerald-500/12 px-3 py-2 text-center shadow-card"
            >
              <p className="text-[10px] font-semibold uppercase tracking-wide text-emerald-900/80">
                {p.key === "bb" ? "BB" : p.key === "tb" ? "TB" : "LK"}
              </p>
              <p className="text-[11px] font-semibold text-emerald-900 whitespace-nowrap">{p.text}</p>
            </div>
          ))}
        </div>

        <div className="flex rounded-2xl bg-muted/50 p-1 shadow-inner">
          {TAB_ORDER.map((id) => {
            const m = METRIC[id];
            const active = tab === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setTab(id)}
                className={`flex-1 min-w-0 rounded-xl px-2 py-2.5 text-center text-[11px] font-semibold transition-all sm:text-xs ${
                  active ? "bg-card text-foreground shadow-card" : "text-muted-foreground hover:text-foreground"
                }`}
                style={active ? { boxShadow: `inset 0 0 0 1px ${m.color}33` } : undefined}
              >
                {id === "bb" ? "Berat Badan" : id === "tb" ? "Tinggi Badan" : "Lingkar Kepala"}
              </button>
            );
          })}
        </div>

        <section className="bg-card rounded-3xl shadow-card p-4 sm:p-5">
          <div className="mb-2 flex items-center justify-between gap-2">
            <div>
              <p className="text-xs text-muted-foreground">Grafik vs WHO</p>
              <p className="font-bold text-foreground" style={{ color: METRIC[tab].color }}>
                {METRIC[tab].title}
              </p>
            </div>
            <span className="text-[10px] font-medium text-muted-foreground">{METRIC[tab].metric.percentileLabel}</span>
          </div>
          <GrowthChartBlock tab={tab} />
        </section>

        <section
          className="rounded-3xl p-4 sm:p-5 shadow-card border border-black/5"
          style={{ backgroundColor: "#FFE8D6" }}
        >
          <h3 className="font-bold text-foreground mb-3 text-sm">Catat pengukuran</h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <label className="col-span-2 sm:col-span-1 block">
              <span className="text-[10px] font-semibold text-muted-foreground">Tanggal</span>
              <input
                type="date"
                value={formDate}
                onChange={(e) => setFormDate(e.target.value)}
                className="mt-1 w-full rounded-xl border border-border bg-card px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#E07B54]/40"
              />
            </label>
            <label className="block">
              <span className="text-[10px] font-semibold text-muted-foreground">Berat (kg)</span>
              <input
                type="number"
                step="0.1"
                value={formBb}
                onChange={(e) => setFormBb(e.target.value)}
                className="mt-1 w-full rounded-xl border border-border bg-card px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#E07B54]/40"
              />
            </label>
            <label className="block">
              <span className="text-[10px] font-semibold text-muted-foreground">Tinggi (cm)</span>
              <input
                type="number"
                step="0.1"
                value={formTb}
                onChange={(e) => setFormTb(e.target.value)}
                className="mt-1 w-full rounded-xl border border-border bg-card px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#E07B54]/40"
              />
            </label>
            <label className="block">
              <span className="text-[10px] font-semibold text-muted-foreground">LK (cm)</span>
              <input
                type="number"
                step="0.1"
                value={formLk}
                onChange={(e) => setFormLk(e.target.value)}
                className="mt-1 w-full rounded-xl border border-border bg-card px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#E07B54]/40"
              />
            </label>
          </div>
          <button
            type="button"
            onClick={handleSave}
            className="mt-4 w-full rounded-2xl py-3 text-sm font-semibold text-white shadow-soft transition-opacity hover:opacity-95 active:scale-[0.99]"
            style={{ backgroundColor: "#E07B54" }}
          >
            Simpan Pengukuran
          </button>
        </section>

        <section className="bg-card rounded-3xl shadow-card p-4 overflow-hidden">
          <h3 className="font-bold text-foreground mb-3 text-sm">Riwayat pengukuran</h3>
          <div className="overflow-x-auto -mx-1">
            <table className="w-full min-w-[280px] text-left text-xs">
              <thead>
                <tr className="border-b border-border text-[10px] uppercase tracking-wide text-muted-foreground">
                  <th className="pb-2 pr-2 font-semibold">Tanggal</th>
                  <th className="pb-2 pr-2 font-semibold">BB</th>
                  <th className="pb-2 pr-2 font-semibold">TB</th>
                  <th className="pb-2 font-semibold">LK</th>
                </tr>
              </thead>
              <tbody>
                {GROWTH_HISTORY_LAST.map((row) => (
                  <tr key={row.date} className="border-b border-border/60 last:border-0">
                    <td className="py-2 pr-2 text-foreground">{row.date}</td>
                    <td className="py-2 pr-2 font-medium">{row.bb}</td>
                    <td className="py-2 pr-2 font-medium">{row.tb}</td>
                    <td className="py-2 font-medium">{row.lk}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
});
