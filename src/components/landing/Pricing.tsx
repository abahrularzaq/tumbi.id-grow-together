import { PRICING_PLANS, TUMBI_APP_AUTH_URLS } from "../../constants/landingData";
import { useAnalytics } from "../../hooks/useAnalytics";

export function Pricing() {
  const cards = [PRICING_PLANS.free, PRICING_PLANS.premium];
  const { trackCTAClick } = useAnalytics();
  return (
    <section className="py-24 sm:py-32 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="reveal text-center mb-14">
          <div className="font-mono text-amber text-xs uppercase tracking-widest mb-4">◆ Harga</div>
          <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl">
            Mulai gratis, naik ketika siap.
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {cards.map((c) => (
            <div
              key={c.name}
              className={`reveal relative rounded-xl p-8 sm:p-10 border ${
                c.featured
                  ? "bg-surface border-terracotta shadow-[8px_8px_0_0_var(--color-terracotta)]"
                  : "bg-surface border-border"
              }`}
            >
              {c.featured && (
                <div className="absolute -top-3 right-6 px-3 py-1 bg-amber text-background text-xs font-mono font-bold uppercase tracking-wider rounded">
                  Early Bird
                </div>
              )}
              <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2">
                {c.name}
              </div>
              <div className="flex items-baseline gap-3 mb-2">
                <div className="font-display font-black text-5xl">{c.price}</div>
                {c.oldPrice && (
                  <div className="text-xl text-muted-foreground line-through">{c.oldPrice}</div>
                )}
              </div>
              <div className="text-sm text-muted-foreground mb-6">{c.sub}</div>
              <ul className="space-y-3 mb-8">
                {c.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <span className="text-terracotta mt-0.5">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href={
                  c === PRICING_PLANS.free
                    ? TUMBI_APP_AUTH_URLS.pricing_free
                    : TUMBI_APP_AUTH_URLS.pricing_premium
                }
                onClick={() =>
                  trackCTAClick(c === PRICING_PLANS.free ? "pricing_free" : "pricing_premium")
                }
                className={`block text-center py-3.5 rounded-md font-bold transition ${
                  c.featured
                    ? "bg-terracotta text-white hover:opacity-90"
                    : "bg-foreground text-background hover:opacity-90"
                }`}
              >
                {c.ctaText}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
