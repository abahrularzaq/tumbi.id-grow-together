import { TESTIMONIALS_DATA } from "../../constants/landingData";

export function Testimonials() {
  return (
    <section className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="reveal mb-12">
          <div className="font-mono text-amber text-xs uppercase tracking-widest mb-4">
            ◆ Testimoni
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl">
            Dipakai orang tua se-Indonesia.
          </h2>
        </div>
        <div className="flex gap-5 overflow-x-auto pb-6 -mx-5 px-5 snap-x snap-mandatory scrollbar-thin">
          {TESTIMONIALS_DATA.map((t, i) => (
            <div
              key={i}
              className="reveal shrink-0 w-[85%] sm:w-[420px] snap-start bg-surface rounded-lg p-7 border border-border relative"
            >
              <div className="font-display text-7xl text-terracotta leading-none mb-2">“</div>
              <p className="text-lg leading-relaxed mb-6">{t.quote}</p>
              <div className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
                {t.name} · {t.role}, {t.city}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
