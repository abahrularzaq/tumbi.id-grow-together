import { useEffect } from "react";
import { TUMBI_APP_AUTH_URL } from "../../constants/landingData";

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

export function Navbar() {
  useReveal();

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border">
      <nav className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2 font-bold text-lg">
          <span className="text-2xl">🌱</span>
          <span className="font-display tracking-tight">Tumbi.id</span>
        </a>
        <a
          href={TUMBI_APP_AUTH_URL}
          className="inline-flex items-center px-5 py-2.5 rounded-md bg-terracotta text-white font-semibold text-sm hover:opacity-90 transition shadow-[3px_3px_0_0_rgba(0,0,0,0.4)]"
        >
          Mulai Gratis
        </a>
      </nav>
    </header>
  );
}
