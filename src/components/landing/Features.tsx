import { FEATURES_DATA } from "../../constants/landingData";

export function Features() {
  return (
    <section id="features" className="py-24 sm:py-32 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="reveal max-w-2xl mb-16">
          <div className="font-mono text-amber text-xs uppercase tracking-widest mb-4">
            ◆ Fitur Utama
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl leading-[0.95]">
            Semua yang dibutuhkan, tidak lebih.
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {FEATURES_DATA.map((c, i) => (
            <div
              key={i}
              className="reveal group bg-surface rounded-lg p-7 sm:p-9 border border-border hover:border-foreground/30 transition relative overflow-hidden"
            >
              <div
                className="inline-block font-mono text-[11px] uppercase tracking-widest px-2.5 py-1 rounded-sm mb-6"
                style={{
                  backgroundColor: `var(--color-${c.tagColor})`,
                  color: c.tagColor === "amber" || c.tagColor === "sage" ? "#0E0E0E" : "#fff",
                }}
              >
                {c.tag}
              </div>
              <h3 className="font-display font-bold text-2xl sm:text-3xl mb-3 leading-tight">
                {c.headline}
              </h3>
              <p className="text-muted-foreground leading-relaxed">{c.body}</p>
              <div
                className="absolute -bottom-12 -right-12 w-40 h-40 rounded-full opacity-10 blur-2xl group-hover:opacity-20 transition"
                style={{ backgroundColor: `var(--color-${c.tagColor})` }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
