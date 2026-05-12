import { useEffect, useRef, useState } from "react";

export const signupCountKey = "tumbi_signup_count";
const signupCountSeed = 127;
const signupCountEvent = "tumbi-signup-count-updated";

function getSignupCountFromStorage() {
  if (typeof window === "undefined") return signupCountSeed;
  const raw = window.localStorage.getItem(signupCountKey);
  const parsed = raw ? Number.parseInt(raw, 10) : Number.NaN;
  if (Number.isNaN(parsed)) {
    window.localStorage.setItem(signupCountKey, String(signupCountSeed));
    return signupCountSeed;
  }
  return parsed;
}

export function incrementSignupCount() {
  if (typeof window === "undefined") return signupCountSeed;
  const current = getSignupCountFromStorage();
  const next = current + 1;
  window.localStorage.setItem(signupCountKey, String(next));
  window.dispatchEvent(new Event(signupCountEvent));
  return next;
}

export function SignupCounter() {
  const [count, setCount] = useState(signupCountSeed);
  const [displayCount, setDisplayCount] = useState(signupCountSeed);
  const [hasAnimated, setHasAnimated] = useState(false);
  const wrapperRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const syncCount = () => {
      setCount(getSignupCountFromStorage());
    };

    syncCount();
    window.addEventListener(signupCountEvent, syncCount);
    window.addEventListener("storage", syncCount);
    return () => {
      window.removeEventListener(signupCountEvent, syncCount);
      window.removeEventListener("storage", syncCount);
    };
  }, []);

  useEffect(() => {
    if (hasAnimated) {
      setDisplayCount(count);
      return;
    }

    const target = wrapperRef.current;
    if (!target || typeof window === "undefined") return;

    const io = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry?.isIntersecting) return;

        const start = Math.max(signupCountSeed, count - 12);
        const durationMs = 500;
        const totalSteps = Math.max(1, count - start);
        let step = 0;
        setDisplayCount(start);

        const timer = window.setInterval(() => {
          step += 1;
          const next = start + Math.floor((step / totalSteps) * (count - start));
          setDisplayCount(next);
          if (step >= totalSteps) {
            window.clearInterval(timer);
            setDisplayCount(count);
          }
        }, Math.max(20, Math.floor(durationMs / totalSteps)));

        setHasAnimated(true);
        io.disconnect();
      },
      { threshold: 0.2 }
    );

    io.observe(target);
    return () => io.disconnect();
  }, [count, hasAnimated]);

  return (
    <p ref={wrapperRef} className="font-mono text-xs text-muted-foreground leading-relaxed">
      <span className="block">
        🌱 {displayCount} orang tua sudah mulai memantau
      </span>
      <span className="block">si kecil dengan Tumbi.id</span>
    </p>
  );
}
