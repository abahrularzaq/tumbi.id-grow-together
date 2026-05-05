import { useEffect, useState } from "react";
import { useAnalytics } from "../../hooks/useAnalytics";
import type { WaitlistFormData } from "../../lib/schemas";
import { setLatestFeatureVote } from "../../lib/submissions";

const voteStorageKey = "tumbi_feature_vote";

const SURVEY_OPTIONS = [
  "📊 Grafik tumbuh kembang vs standar WHO",
  "🤖 AI insight & rekomendasi aktivitas",
  "💉 Reminder jadwal imunisasi otomatis",
  "💬 Tanya jawab dengan ahli tumbuh kembang",
] as const;

interface PostSubmitSurveyProps {
  email: string;
  plan: WaitlistFormData["plan"] | null;
  childAge: WaitlistFormData["childAge"] | null;
}

export function PostSubmitSurvey({ email, plan, childAge }: PostSubmitSurveyProps) {
  const gasWebAppUrl = import.meta.env.VITE_GAS_WEBAPP_URL as string | undefined;
  const [isVisible, setIsVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState<(typeof SURVEY_OPTIONS)[number] | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { trackFeatureVote } = useAnalytics();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const existing = window.localStorage.getItem(voteStorageKey);
    if (existing) {
      try {
        const parsed = JSON.parse(existing) as {
          email?: string;
          featureVote?: string;
        };

        // Only consider the survey "already submitted" if it matches current email.
        // This lets different users/emails (or your test flow) still see the survey.
        if (String(parsed.email ?? "") === email && typeof parsed.featureVote === "string") {
          setIsSubmitted(true);
          setIsVisible(true);
          return;
        }
      } catch {
        // If stored value is corrupted/unparseable, fall back to showing survey.
      }

      setIsSubmitted(false);
      setIsVisible(true);
      return;
    }
    // Tampilkan survey langsung setelah submit sukses.
    setIsVisible(true);
  }, []);

  const submitVote = () => {
    if (!selectedOption || typeof window === "undefined") return;

    const timestamp = Date.now();

    window.localStorage.setItem(
      voteStorageKey,
      JSON.stringify({
        email,
        plan,
        childAge,
        featureVote: selectedOption,
        timestamp,
      })
    );
    setLatestFeatureVote(email, selectedOption);

    if (gasWebAppUrl) {
      const payload = JSON.stringify({
        email,
        featureVote: selectedOption,
        source: "feature_vote",
        timestamp: new Date(timestamp).toISOString(),
        userAgent: navigator.userAgent,
      });

      fetch(gasWebAppUrl, {
        method: "POST",
        body: payload,
        headers: {
          "Content-Type": "text/plain;charset=UTF-8",
        },
      }).catch(() => {
        // Silent fail; local analytics & admin page still work.
      });
    }

    setIsSubmitted(true);
  };

  return (
    <div
      className={`mt-6 overflow-hidden transition-all duration-500 ${
        isVisible ? "max-h-[600px] opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-2"
      }`}
    >
      {!isSubmitted ? (
        <div className="bg-surface border border-border rounded-xl p-5 text-left">
          <h4 className="font-display font-bold text-2xl text-foreground">
            Satu pertanyaan — 10 detik aja 🙏
          </h4>
          <p className="text-sm text-muted-foreground mt-1">
            Jawaban kamu menentukan fitur yang kami build duluan
          </p>
          <p className="mt-4 text-sm font-semibold text-foreground">
            Fitur mana yang PALING kamu butuhkan dari Tumbi.id?
          </p>

          <div className="grid sm:grid-cols-2 gap-3 mt-4">
            {SURVEY_OPTIONS.map((option) => {
              const isActive = selectedOption === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    setSelectedOption(option);
                    trackFeatureVote(option);
                  }}
                  className={`text-left rounded-lg px-4 py-3 border transition ${
                    isActive
                      ? "border-terracotta bg-terracotta/10"
                      : "border-border bg-[#1E1E1E] hover:border-foreground/30"
                  }`}
                >
                  <span className="text-sm text-foreground">{option}</span>
                </button>
              );
            })}
          </div>

          {selectedOption && (
            <button
              type="button"
              onClick={submitVote}
              className="mt-4 w-full sm:w-auto px-5 py-3 bg-terracotta text-white rounded-md font-bold hover:opacity-90 transition"
            >
              Submit Pilihan Saya
            </button>
          )}
        </div>
      ) : (
        <div className="bg-surface border border-border rounded-xl p-5 text-left">
          <p className="font-semibold text-foreground">Terima kasih! Kami catat pilihanmu. 💛</p>
        </div>
      )}
    </div>
  );
}
