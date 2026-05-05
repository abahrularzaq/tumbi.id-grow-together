import { MARQUEE_ITEMS } from "../../constants/landingData";

export function Marquee() {
  const row = (
    <div className="flex shrink-0 gap-12 px-6">
      {MARQUEE_ITEMS.map((t, i) => (
        <span key={i} className="font-mono text-amber text-sm sm:text-base whitespace-nowrap">
          {t} <span className="text-amber/60">✦</span>
        </span>
      ))}
    </div>
  );
  return (
    <div className="border-y border-border bg-[#0a0a0a] py-4 overflow-hidden">
      <div className="flex animate-marquee w-max">
        {row}
        {row}
        {row}
        {row}
      </div>
    </div>
  );
}
