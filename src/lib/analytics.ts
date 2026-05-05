declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

let hasInitializedGa = false;

export function initializeAnalytics() {
  if (typeof window === "undefined" || typeof document === "undefined") return;
  if (hasInitializedGa) return;

  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;
  if (!measurementId) {
    return;
  }

  try {
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || ((...args: unknown[]) => window.dataLayer.push(args));
    window.gtag("js", new Date());
    window.gtag("config", measurementId);

    const existingScript = document.querySelector(
      `script[src="https://www.googletagmanager.com/gtag/js?id=${measurementId}"]`
    );

    if (!existingScript) {
      const gaScript = document.createElement("script");
      gaScript.async = true;
      gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
      document.head.appendChild(gaScript);
    }

    hasInitializedGa = true;
  } catch {
    // Silent fail to avoid breaking user experience.
  }
}
