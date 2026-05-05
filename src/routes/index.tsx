import { createFileRoute } from "@tanstack/react-router";
import {
  FAQ,
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

export const Route = createFileRoute("/")({
  component: LandingPage,
});

function LandingPage() {
  return (
    <main className="bg-background text-foreground">
      <Navbar />
      <Hero />
      <Marquee />
      <Problems />
      <Features />
      <Testimonials />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
