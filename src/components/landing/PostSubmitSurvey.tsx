import { useEffect, useState } from "react";
import type { WaitlistFormData } from "../../lib/schemas";

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
  const [isVisible, setIsVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState<(typeof SURVEY_OPTIONS)[number] | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const existing = window.localStorage.getItem(voteStorageKey);
    if (existing) {
      setIsSubmitted(true);
      setIsVisible(true);
      return;
    }

    const timer = window.setTimeout(() => setIsVisible(true), 1500);
    return () => window.clearTimeout(timer);
  }, []);

  const submitVote = () => {
    if (!selectedOption || typeof window === "undefined") return;

    window.localStorage.setItem(
      voteStorageKey,
      JSON.stringify({
        email,
        plan,
        childAge,
        featureVote: selectedOption,
        timestamp: Date.now(),
      })
    );
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
                  onClick={() => setSelectedOption(option)}
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
