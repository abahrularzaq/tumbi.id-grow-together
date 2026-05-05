export const submissionsStorageKey = "tumbi_submissions";

export type SubmissionRecord = {
  email: string;
  plan: "free" | "premium";
  childAge: string;
  biggestConcern?: string;
  featureVote?: string;
  timestamp: string;
  source: string;
};

export function getStoredSubmissions(): SubmissionRecord[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(submissionsStorageKey);
    if (!raw) return [];

    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];

    return parsed.filter((item): item is SubmissionRecord => {
      if (!item || typeof item !== "object") return false;
      const record = item as Record<string, unknown>;
      return (
        typeof record.email === "string" &&
        (record.plan === "free" || record.plan === "premium") &&
        typeof record.childAge === "string" &&
        typeof record.timestamp === "string" &&
        typeof record.source === "string"
      );
    });
  } catch {
    return [];
  }
}

export function saveStoredSubmissions(records: SubmissionRecord[]) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(submissionsStorageKey, JSON.stringify(records));
  } catch {
    // Silent fail to avoid breaking user experience.
  }
}

export function appendSubmission(record: SubmissionRecord) {
  const current = getStoredSubmissions();
  saveStoredSubmissions([...current, record]);
}

export function setLatestFeatureVote(email: string, featureVote: string) {
  const current = getStoredSubmissions();
  if (current.length === 0) return;

  for (let index = current.length - 1; index >= 0; index -= 1) {
    if (current[index]?.email === email) {
      current[index] = {
        ...current[index],
        featureVote,
      };
      saveStoredSubmissions(current);
      return;
    }
  }
}

export function submissionsToCsv(records: SubmissionRecord[]): string {
  const headers = [
    "email",
    "plan",
    "childAge",
    "biggestConcern",
    "featureVote",
    "timestamp",
    "source",
  ];

  const escapeCell = (value: string) => `"${value.replaceAll('"', '""')}"`;
  const rows = records.map((record) =>
    [
      record.email,
      record.plan,
      record.childAge,
      record.biggestConcern ?? "",
      record.featureVote ?? "",
      record.timestamp,
      record.source,
    ]
      .map((cell) => escapeCell(String(cell)))
      .join(",")
  );

  return [headers.join(","), ...rows].join("\n");
}
