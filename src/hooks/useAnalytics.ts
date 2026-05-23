declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

type CTALocation =
  | "hero"
  | "pricing_free"
  | "pricing_premium"
  | "final_cta"
  | "whatsapp"
  | "interview"
  | "demo"
  | "ebook";

type FormLocation = "hero" | "final_cta";
type Plan = "free" | "premium";
type ScrollDepth = 25 | 50 | 75 | 100;

type FormSubmitData = {
  plan: string;
  childAge: string;
  hasCustomConcern: boolean;
  formLocation: string;
};

const trackEvent = (eventName: string, params?: Record<string, unknown>) => {
  try {
    if (typeof window === "undefined") {
      return;
    }

    if (typeof window.gtag === "function") {
      window.gtag("event", eventName, params ?? {});
      return;
    }

    console.log("[Analytics Event]", { eventName, params: params ?? {} });
  } catch {
    // Silent fail to avoid breaking user experience.
  }
};

export function useAnalytics() {
  const trackCTAClick = (location: CTALocation) => {
    try {
      trackEvent("cta_click", { location });
    } catch {
      // Silent fail to avoid breaking user experience.
    }
  };

  const trackFormStart = (formLocation: FormLocation) => {
    try {
      trackEvent("form_start", { formLocation });
    } catch {
      // Silent fail to avoid breaking user experience.
    }
  };

  const trackPlanSelected = (plan: Plan) => {
    try {
      trackEvent("plan_selected", { plan });
    } catch {
      // Silent fail to avoid breaking user experience.
    }
  };

  const trackAgeSelected = (ageGroup: string) => {
    try {
      trackEvent("age_selected", { ageGroup });
    } catch {
      // Silent fail to avoid breaking user experience.
    }
  };

  const trackFormSubmit = (data: FormSubmitData) => {
    try {
      trackEvent("form_submit", data);
    } catch {
      // Silent fail to avoid breaking user experience.
    }
  };

  const trackFeatureVote = (feature: string) => {
    try {
      trackEvent("feature_vote", { feature });
    } catch {
      // Silent fail to avoid breaking user experience.
    }
  };

  const trackScrollDepth = (percentage: ScrollDepth) => {
    try {
      trackEvent("scroll_depth", { percentage });
    } catch {
      // Silent fail to avoid breaking user experience.
    }
  };

  return {
    trackCTAClick,
    trackFormStart,
    trackPlanSelected,
    trackAgeSelected,
    trackFormSubmit,
    trackFeatureVote,
    trackScrollDepth,
  };
}
