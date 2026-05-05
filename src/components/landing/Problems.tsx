import { PROBLEMS_DATA } from "../../constants/landingData";

export function Problems() {
  return (
    <section className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-12 lg:gap-20">
        <div className="reveal">
          <div className="font-mono text-amber text-xs uppercase tracking-widest mb-4">◆ Masalahnya</div>
          <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl leading-[0.95]">
            Yang sering bikin orang tua kehilangan tidur.
          </h2>
        </div>
        <div className="space-y-4">
          {PROBLEMS_DATA.map((it, i) => (
            <div
              key={i}
              className="reveal bg-surface p-6 sm:p-7 rounded-md border border-border relative overflow-hidden"
              style={{ borderLeft: `5px solid var(--color-${it.accentColor})` }}
            >
              <p className="text-lg sm:text-xl font-medium leading-snug">
                {it.headline} {it.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
