import { useState } from "react";
import { FAQ_DATA } from "../../constants/landingData";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-24 sm:py-32">
      <div className="max-w-3xl mx-auto px-5 sm:px-8">
        <div className="reveal mb-12 text-center">
          <div className="font-mono text-amber text-xs uppercase tracking-widest mb-4">◆ FAQ</div>
          <h2 className="font-display font-black text-4xl sm:text-5xl">
            Pertanyaan yang sering ditanyakan.
          </h2>
        </div>
        <div className="space-y-3">
          {FAQ_DATA.map((it, i) => (
            <div key={i} className="reveal bg-surface border border-border rounded-md overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 text-left p-5 sm:p-6 hover:bg-surface-2 transition"
              >
                <span className="font-semibold text-base sm:text-lg">{it.question}</span>
                <span
                  className="text-2xl text-terracotta shrink-0 transition-transform"
                  style={{ transform: open === i ? "rotate(45deg)" : "rotate(0)" }}
                >
                  +
                </span>
              </button>
              {open === i && (
                <div className="px-5 sm:px-6 pb-6 text-muted-foreground leading-relaxed">
                  {it.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
