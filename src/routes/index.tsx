import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import {
  EbookSection,
  FAQ,
  DemoSection,
  Features,
  FinalCTA,
  Footer,
  Hero,
  Marquee,
  Navbar,
  Pricing,
  Problems,
  Testimonials,
} from "../components/landing";
import { useAnalytics } from "../hooks/useAnalytics";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

function LandingPage() {
  const { trackScrollDepth } = useAnalytics();
  const trackedDepthRef = useRef<Set<25 | 50 | 75 | 100>>(new Set());

  useEffect(() => {
    if (typeof window === "undefined") return;

    const thresholds: Array<25 | 50 | 75 | 100> = [25, 50, 75, 100];
    const handleScrollDepth = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const maxScroll = scrollHeight - clientHeight;
      if (maxScroll <= 0) return;

      const depth = Math.round((scrollTop / maxScroll) * 100);
      thresholds.forEach((threshold) => {
        if (depth >= threshold && !trackedDepthRef.current.has(threshold)) {
          trackedDepthRef.current.add(threshold);
          trackScrollDepth(threshold);
        }
      });
    };

    window.addEventListener("scroll", handleScrollDepth, { passive: true });
    handleScrollDepth();
    return () => window.removeEventListener("scroll", handleScrollDepth);
  }, [trackScrollDepth]);

  return (
    <main className="bg-background text-foreground">
      <Navbar />
      <Hero />
      <Marquee />
      <Problems />
      <Features />
      <DemoSection />
      <Testimonials />
      <Pricing />
      <EbookSection />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
