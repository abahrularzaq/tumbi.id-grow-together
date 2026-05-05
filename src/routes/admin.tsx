import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  getStoredSubmissions,
  submissionsToCsv,
  type SubmissionRecord,
} from "../lib/submissions";

const adminPassword = "tumbi2025admin";
const authSessionKey = "tumbi_admin_authed";

const featureCatalog = [
  "📊 Grafik tumbuh kembang vs standar WHO",
  "🤖 AI insight & rekomendasi aktivitas",
  "💉 Reminder jadwal imunisasi otomatis",
  "💬 Tanya jawab dengan ahli tumbuh kembang",
];

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

function AdminPage() {
  const [passwordInput, setPasswordInput] = useState("");
  const [authError, setAuthError] = useState("");
  const [isAuthed, setIsAuthed] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.sessionStorage.getItem(authSessionKey) === "1";
  });
  const [refreshSeed, setRefreshSeed] = useState(0);

  const submissions = useMemo(() => getStoredSubmissions(), [refreshSeed]);

  const planCounts = useMemo(() => {
    const total = submissions.length;
    const free = submissions.filter((entry) => entry.plan === "free").length;
    const premium = submissions.filter((entry) => entry.plan === "premium").length;

    return {
      total,
      free,
      premium,
      freePercentage: total ? Math.round((free / total) * 100) : 0,
      premiumPercentage: total ? Math.round((premium / total) * 100) : 0,
    };
  }, [submissions]);

  const ageData = useMemo(() => {
    const map = new Map<string, number>();
    submissions.forEach((entry) => {
      map.set(entry.childAge, (map.get(entry.childAge) ?? 0) + 1);
    });

    return Array.from(map.entries()).map(([name, value]) => ({ name, value }));
  }, [submissions]);

  const featureRanking = useMemo(() => {
    const votes = new Map<string, number>();
    featureCatalog.forEach((feature) => votes.set(feature, 0));

    submissions.forEach((entry) => {
      if (!entry.featureVote) return;
      votes.set(entry.featureVote, (votes.get(entry.featureVote) ?? 0) + 1);
    });

    return Array.from(votes.entries())
      .map(([feature, count]) => ({ feature, count }))
      .sort((a, b) => b.count - a.count);
  }, [submissions]);

  const concerns = useMemo(
    () =>
      submissions
        .map((entry) => entry.biggestConcern?.trim())
        .filter((value): value is string => Boolean(value)),
    [submissions]
  );

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (passwordInput === adminPassword) {
      setIsAuthed(true);
      setAuthError("");
      if (typeof window !== "undefined") {
        window.sessionStorage.setItem(authSessionKey, "1");
      }
      return;
    }
    setAuthError("Password salah.");
  };

  const handleExportCsv = () => {
    if (typeof window === "undefined") return;

    const csv = submissionsToCsv(submissions);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `tumbi-submissions-${new Date().toISOString()}.csv`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const handleLogout = () => {
    setIsAuthed(false);
    setPasswordInput("");
    setAuthError("");
    if (typeof window !== "undefined") {
      window.sessionStorage.removeItem(authSessionKey);
    }
  };

  if (!isAuthed) {
    return (
      <main className="min-h-screen bg-background text-foreground p-6">
        <div className="max-w-sm mx-auto mt-20 border border-border rounded-lg p-5 bg-surface">
          <h1 className="text-xl font-bold mb-2">Admin Login</h1>
          <p className="text-sm text-muted-foreground mb-4">Masukkan password untuk melihat data.</p>
          <form onSubmit={handleLogin} className="space-y-3">
            <input
              type="password"
              value={passwordInput}
              onChange={(event) => setPasswordInput(event.target.value)}
              className="w-full border border-border rounded-md px-3 py-2 bg-background"
              placeholder="Password admin"
            />
            <button
              type="submit"
              className="w-full rounded-md bg-foreground text-background px-3 py-2 font-semibold"
            >
              Masuk
            </button>
            {authError && <p className="text-sm text-red-500">{authError}</p>}
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground p-6 space-y-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-2xl font-bold">Tumbi Admin Dashboard</h1>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setRefreshSeed((seed) => seed + 1)}
              className="border border-border rounded-md px-3 py-2 text-sm"
            >
              Refresh
            </button>
            <button
              type="button"
              onClick={handleExportCsv}
              className="bg-foreground text-background rounded-md px-3 py-2 text-sm font-semibold"
            >
              Export CSV
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="border border-border rounded-md px-3 py-2 text-sm"
            >
              Logout
            </button>
          </div>
        </div>

        <section className="border border-border rounded-lg p-4 bg-surface">
          <p className="text-sm text-muted-foreground">Total pendaftar</p>
          <p className="text-3xl font-black">{planCounts.total}</p>
        </section>

        <section className="border border-border rounded-lg p-4 bg-surface space-y-3">
          <h2 className="text-lg font-semibold">Breakdown Plan</h2>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Free ({planCounts.free})</span>
              <span>{planCounts.freePercentage}%</span>
            </div>
            <div className="h-2 rounded bg-muted overflow-hidden">
              <div className="h-2 bg-amber" style={{ width: `${planCounts.freePercentage}%` }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Premium ({planCounts.premium})</span>
              <span>{planCounts.premiumPercentage}%</span>
            </div>
            <div className="h-2 rounded bg-muted overflow-hidden">
              <div className="h-2 bg-terracotta" style={{ width: `${planCounts.premiumPercentage}%` }} />
            </div>
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-4">
          <div className="border border-border rounded-lg p-4 bg-surface">
            <h2 className="text-lg font-semibold mb-3">Breakdown Usia Anak</h2>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ageData}>
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#d96f4a" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="border border-border rounded-lg p-4 bg-surface">
            <h2 className="text-lg font-semibold mb-3">Feature Votes</h2>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie dataKey="count" data={featureRanking} nameKey="feature" outerRadius={90} label>
                    {featureRanking.map((entry, index) => (
                      <Cell
                        key={entry.feature}
                        fill={["#d96f4a", "#f0a868", "#8dc48a", "#7aa4d8"][index % 4]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <ol className="mt-2 text-sm space-y-1">
              {featureRanking.map((entry, index) => (
                <li key={entry.feature}>
                  {index + 1}. {entry.feature} ({entry.count})
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="border border-border rounded-lg p-4 bg-surface">
          <h2 className="text-lg font-semibold mb-3">Daftar Kekhawatiran Terbesar</h2>
          {concerns.length ? (
            <ul className="space-y-2 text-sm">
              {concerns.map((concern, index) => (
                <li key={`${concern}-${index}`} className="border border-border rounded-md px-3 py-2">
                  {concern}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">Belum ada isian kekhawatiran.</p>
          )}
        </section>

        <section className="border border-border rounded-lg p-4 bg-surface overflow-auto">
          <h2 className="text-lg font-semibold mb-3">Raw Submissions</h2>
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="text-left border-b border-border">
                <th className="py-2 pr-3">Email</th>
                <th className="py-2 pr-3">Plan</th>
                <th className="py-2 pr-3">Age</th>
                <th className="py-2 pr-3">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((entry: SubmissionRecord, index) => (
                <tr key={`${entry.email}-${entry.timestamp}-${index}`} className="border-b border-border/60">
                  <td className="py-2 pr-3">{entry.email}</td>
                  <td className="py-2 pr-3">{entry.plan}</td>
                  <td className="py-2 pr-3">{entry.childAge}</td>
                  <td className="py-2 pr-3">{new Date(entry.timestamp).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </main>
  );
}
