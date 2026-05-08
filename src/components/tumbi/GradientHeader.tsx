import { ReactNode } from "react";

interface GradientHeaderProps {
  variant?: "warm" | "sage" | "aurora" | "lavender" | "homeHero" | "growthSageDark" | "insightHero";
  children: ReactNode;
  className?: string;
}

export function GradientHeader({ variant = "warm", children, className = "" }: GradientHeaderProps) {
  const grad =
    variant === "sage"
      ? "gradient-sage"
      : variant === "aurora"
        ? "gradient-aurora"
        : variant === "lavender"
          ? "gradient-lavender"
          : variant === "homeHero"
            ? "gradient-home-hero"
            : variant === "growthSageDark"
              ? "gradient-growth-header"
              : variant === "insightHero"
                ? "gradient-insight-hero"
                : "gradient-warm";
  return (
    <header className={`${grad} text-white px-5 pt-10 pb-10 rounded-b-[2.5rem] relative overflow-hidden ${className}`}>
      <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10 blur-2xl" />
      <div className="absolute -bottom-12 -left-8 w-32 h-32 rounded-full bg-white/10 blur-2xl" />
      <div className="relative">{children}</div>
    </header>
  );
}
