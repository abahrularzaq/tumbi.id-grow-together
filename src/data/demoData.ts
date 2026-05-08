/** Demo / dummy data terpusat untuk Tumbi.id — jangan pakai di produksi. */

export type ChildGender = "female" | "male";

/** Profil anak demo (inti) */
export interface ChildDemoProfileBase {
  name: string;
  birthDate: string;
  ageMonths: number;
  ageDays: number;
  gender: ChildGender;
  avatarEmoji: string;
  weight: number;
  height: number;
  headCirc: number;
}

/** Profil + ringkasan milestone di beranda (demo) */
export interface ChildDemoProfile extends ChildDemoProfileBase {
  homeMilestoneStatusLabel: string;
  /** Banner premium di beranda */
  homePremium: {
    description: string;
    ctaLabel: string;
  };
}

export const CHILD_DATA: ChildDemoProfile = {
  name: "Alara Putri",
  birthDate: "2025-08-14",
  ageMonths: 9,
  ageDays: 19,
  gender: "female",
  avatarEmoji: "👶",
  weight: 9.0,
  height: 72,
  headCirc: 45,
  homeMilestoneStatusLabel: "On Track",
  homePremium: {
    description: "Laporan PDF bulanan + konsultasi dokter",
    ctaLabel: "Mulai 7 Hari Gratis",
  },
};

/** Kategori milestone yang ditampilkan di beranda (urutan tetap) */
export const HOME_MILESTONE_CATEGORY_IDS = ["kasar", "halus", "bahasa", "kognitif"] as const;

export type HomeMilestoneCategoryId = (typeof HOME_MILESTONE_CATEGORY_IDS)[number];

export interface HomeMilestoneRowDemo {
  id: HomeMilestoneCategoryId;
  label: string;
  done: number;
  total: number;
}

export interface MilestoneCategoryDemo {
  id: string;
  emoji: string;
  label: string;
  progress: number;
}

export type MilestoneBadgeDemo = "perhatian" | "segera" | null;

export interface MilestoneItemDemo {
  label: string;
  hint?: string;
  /** Badge seed (dipakai jika `targetAgeMonths` tidak diset) */
  badge?: MilestoneBadgeDemo;
  done?: boolean;
  /** Usia tipikal tercapai (bulan) — untuk logika “lewat” vs “segera” */
  targetAgeMonths?: number;
  /** Teks badge usia di UI */
  ageBadge?: string;
}

export interface MilestoneDemoData {
  categories: MilestoneCategoryDemo[];
  itemsByCategoryId: Record<string, MilestoneItemDemo[]>;
}

/** Tips stimulasi per kategori (id data: kasar, halus, …) */
export const MILESTONE_CATEGORY_TIPS: Record<string, string> = {
  kasar:
    "Latih motorik kasar dengan tummy time, ajak merangkak ke mainan favorit, dan beri pegangan aman saat mencoba berdiri. 10–15 menit per sesi sudah cukup.",
  halus:
    "Sediakan benda aman berukuran berbeda untuk dijepit dan dipindahkan. Permainan menutup-buka kontainer melatih koordinasi mata–tangan.",
  bahasa:
    "Bacakan buku sederhana 2× sehari, ulangi kata pendek saat aktivitas rutin, dan tunggu respons sebelum memberi mainan.",
  sosial:
    "Mainkan ciluk-ba, cerminkan ekspresi wajah, dan ajak interaksi singkat dengan anggota keluarga agar kepercayaan sosial bertambah.",
  kognitif:
    "Sembunyikan mainan di bawah kain, tunjuk lalu sebut nama benda, dan beri mainan cause–effect (bunyi/ketika ditekan) untuk eksplorasi.",
};

export const MILESTONE_DATA: MilestoneDemoData = {
  categories: [
    { id: "kasar", emoji: "🏃", label: "Motorik Kasar", progress: 75 },
    { id: "halus", emoji: "✋", label: "Motorik Halus", progress: 60 },
    { id: "bahasa", emoji: "💬", label: "Bahasa", progress: 50 },
    { id: "sosial", emoji: "🤝", label: "Sosial", progress: 80 },
    { id: "kognitif", emoji: "🧠", label: "Kognitif", progress: 65 },
  ],
  itemsByCategoryId: {
    kasar: [
      { label: "Duduk tanpa bantuan", done: true, targetAgeMonths: 6, ageBadge: "±6 bln" },
      { label: "Merangkak dengan stabil", done: true, targetAgeMonths: 8, ageBadge: "7–9 bln" },
      { label: "Berdiri dengan pegangan", hint: "Sudah mulai mencoba", targetAgeMonths: 9, ageBadge: "8–10 bln" },
      { label: "Berjalan beberapa langkah", targetAgeMonths: 11, ageBadge: "10–14 bln" },
    ],
    halus: [
      { label: "Mengambil benda dengan jari telunjuk", done: true, targetAgeMonths: 7, ageBadge: "6–8 bln" },
      { label: "Memindahkan benda antar tangan", done: true, targetAgeMonths: 8, ageBadge: "7–9 bln" },
      { label: "Menjepit benda kecil", targetAgeMonths: 8, ageBadge: "8–10 bln" },
    ],
    bahasa: [
      { label: "Mengoceh 'mama', 'papa'", done: true, targetAgeMonths: 8, ageBadge: "6–9 bln" },
      { label: "Merespon namanya", done: true, targetAgeMonths: 7, ageBadge: "6–8 bln" },
      { label: "Mengucap 1 kata bermakna", targetAgeMonths: 9, ageBadge: "9–12 bln" },
    ],
    sosial: [
      { label: "Tersenyum spontan", done: true, targetAgeMonths: 2, ageBadge: "1–3 bln" },
      { label: "Bermain ciluk-ba", done: true, targetAgeMonths: 6, ageBadge: "5–7 bln" },
      { label: "Melambai 'bye-bye'", done: true, targetAgeMonths: 9, ageBadge: "8–10 bln" },
    ],
    kognitif: [
      { label: "Mencari benda yang disembunyikan", done: true, targetAgeMonths: 8, ageBadge: "7–9 bln" },
      { label: "Meniru gerakan sederhana", targetAgeMonths: 9, ageBadge: "8–10 bln" },
    ],
  },
};

/** Ring % = rata-rata progress kategori beranda (dari MILESTONE_DATA). */
export function getHomeMilestoneRingPercent(data: MilestoneDemoData = MILESTONE_DATA): number {
  const ids = HOME_MILESTONE_CATEGORY_IDS;
  const sum = ids.reduce((acc, id) => {
    const p = data.categories.find((c) => c.id === id)?.progress ?? 0;
    return acc + p;
  }, 0);
  return Math.round(sum / ids.length);
}

export function getHomeMilestoneRows(data: MilestoneDemoData = MILESTONE_DATA): HomeMilestoneRowDemo[] {
  return HOME_MILESTONE_CATEGORY_IDS.map((id) => {
    const label = data.categories.find((c) => c.id === id)?.label ?? id;
    const items = data.itemsByCategoryId[id] ?? [];
    const done = items.filter((i) => i.done).length;
    return { id, label, done, total: items.length };
  });
}

/** Satu titik per bulan (0–9) untuk grafik BB / TB / LK */
export interface WhoPercentileTriple {
  p3: number;
  p50: number;
  p97: number;
}

export interface GrowthChartPointDemo {
  month: number;
  /** Label sumbu X, mis. "3b" */
  monthLabel: string;
  alara: number;
  /** Referensi WHO (median + rentang) */
  who: WhoPercentileTriple;
}

export interface GrowthMetricDemo {
  /** Ringkasan teks di kartu (sama seperti sebelumnya) */
  currentDisplay: string;
  statusLabel: string;
  percentileLabel: string;
  /** Titik per bulan 0–9 */
  series: GrowthChartPointDemo[];
}

export interface GrowthDemoData {
  birthDate: string;
  bb: GrowthMetricDemo;
  tb: GrowthMetricDemo;
  lk: GrowthMetricDemo;
}

/** Dataset 0–9 bulan + WHO p3/p50/p97 per metrik. */
export const GROWTH_DATA: GrowthDemoData = {
  birthDate: CHILD_DATA.birthDate,
  bb: {
    currentDisplay: "9.0",
    statusLabel: "Normal",
    percentileLabel: "P50",
    series: [
      { month: 0, monthLabel: "0b", alara: 3.3, who: { p3: 2.8, p50: 3.2, p97: 3.9 } },
      { month: 1, monthLabel: "1b", alara: 4.2, who: { p3: 3.6, p50: 4.2, p97: 4.9 } },
      { month: 2, monthLabel: "2b", alara: 4.9, who: { p3: 4.4, p50: 5.1, p97: 5.9 } },
      { month: 3, monthLabel: "3b", alara: 5.4, who: { p3: 5.0, p50: 5.8, p97: 6.6 } },
      { month: 4, monthLabel: "4b", alara: 6.1, who: { p3: 5.6, p50: 6.4, p97: 7.3 } },
      { month: 5, monthLabel: "5b", alara: 6.8, who: { p3: 6.2, p50: 7.0, p97: 8.0 } },
      { month: 6, monthLabel: "6b", alara: 7.4, who: { p3: 6.7, p50: 7.5, p97: 8.6 } },
      { month: 7, monthLabel: "7b", alara: 8.0, who: { p3: 7.1, p50: 7.9, p97: 9.1 } },
      { month: 8, monthLabel: "8b", alara: 8.5, who: { p3: 7.5, p50: 8.3, p97: 9.5 } },
      { month: 9, monthLabel: "9b", alara: 9.0, who: { p3: 7.8, p50: 8.6, p97: 9.8 } },
    ],
  },
  tb: {
    currentDisplay: "72",
    statusLabel: "Normal",
    percentileLabel: "P55",
    series: [
      { month: 0, monthLabel: "0b", alara: 50, who: { p3: 48.5, p50: 50.0, p97: 53.0 } },
      { month: 1, monthLabel: "1b", alara: 54, who: { p3: 52.0, p50: 54.0, p97: 57.0 } },
      { month: 2, monthLabel: "2b", alara: 57, who: { p3: 55.0, p50: 57.0, p97: 60.5 } },
      { month: 3, monthLabel: "3b", alara: 60, who: { p3: 57.5, p50: 60.4, p97: 64.0 } },
      { month: 4, monthLabel: "4b", alara: 62, who: { p3: 59.5, p50: 62.6, p97: 66.5 } },
      { month: 5, monthLabel: "5b", alara: 64, who: { p3: 61.5, p50: 64.4, p97: 68.5 } },
      { month: 6, monthLabel: "6b", alara: 66, who: { p3: 63.0, p50: 66.0, p97: 70.5 } },
      { month: 7, monthLabel: "7b", alara: 68, who: { p3: 64.5, p50: 67.5, p97: 72.5 } },
      { month: 8, monthLabel: "8b", alara: 70, who: { p3: 65.8, p50: 68.8, p97: 74.0 } },
      { month: 9, monthLabel: "9b", alara: 72, who: { p3: 67.0, p50: 70.1, p97: 75.5 } },
    ],
  },
  lk: {
    currentDisplay: "45",
    statusLabel: "Normal",
    percentileLabel: "P50",
    series: [
      { month: 0, monthLabel: "0b", alara: 36, who: { p3: 34.5, p50: 36.0, p97: 38.0 } },
      { month: 1, monthLabel: "1b", alara: 37.5, who: { p3: 36.0, p50: 37.5, p97: 39.5 } },
      { month: 2, monthLabel: "2b", alara: 39, who: { p3: 37.5, p50: 39.0, p97: 41.0 } },
      { month: 3, monthLabel: "3b", alara: 40, who: { p3: 38.8, p50: 40.5, p97: 42.5 } },
      { month: 4, monthLabel: "4b", alara: 41, who: { p3: 39.8, p50: 41.4, p97: 43.5 } },
      { month: 5, monthLabel: "5b", alara: 42, who: { p3: 40.6, p50: 42.2, p97: 44.2 } },
      { month: 6, monthLabel: "6b", alara: 43, who: { p3: 41.3, p50: 42.9, p97: 45.0 } },
      { month: 7, monthLabel: "7b", alara: 43.8, who: { p3: 41.9, p50: 43.5, p97: 45.8 } },
      { month: 8, monthLabel: "8b", alara: 44.5, who: { p3: 42.4, p50: 44.0, p97: 46.5 } },
      { month: 9, monthLabel: "9b", alara: 45, who: { p3: 42.8, p50: 44.5, p97: 47.2 } },
    ],
  },
};

/** Bentuk baris untuk Recharts: garis referensi memakai median WHO (p50) seperti sebelumnya */
export function toGrowthChartRows(series: GrowthChartPointDemo[]) {
  return series.map((p) => ({
    m: p.monthLabel,
    alara: p.alara,
    who: p.who.p50,
  }));
}

/** Satu baris chart lengkap (Alara + WHO p3/p50/p97) */
export interface GrowthRechartsRow {
  monthIndex: number;
  monthLabel: string;
  alara: number;
  p3: number;
  p50: number;
  p97: number;
}

export function toGrowthRechartsRows(series: GrowthChartPointDemo[]): GrowthRechartsRow[] {
  return series.map((p) => ({
    monthIndex: p.month,
    monthLabel: `${p.month} bln`,
    alara: p.alara,
    p3: p.who.p3,
    p50: p.who.p50,
    p97: p.who.p97,
  }));
}

export function growthValueStatus(alara: number, p3: number, p97: number): "Normal" | "Perhatian" {
  if (alara < p3 || alara > p97) return "Perhatian";
  return "Normal";
}

export interface GrowthHistoryRowDemo {
  date: string;
  bb: string;
  tb: string;
  lk: string;
}

function buildGrowthHistoryLast5(): GrowthHistoryRowDemo[] {
  const monthIndices = [5, 6, 7, 8, 9];
  return monthIndices.map((mi) => {
    const d = new Date(`${CHILD_DATA.birthDate}T12:00:00`);
    d.setMonth(d.getMonth() + mi);
    const bb = GROWTH_DATA.bb.series.find((s) => s.month === mi)?.alara;
    const tb = GROWTH_DATA.tb.series.find((s) => s.month === mi)?.alara;
    const lk = GROWTH_DATA.lk.series.find((s) => s.month === mi)?.alara;
    const dateStr = d.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
    return {
      date: dateStr,
      bb: bb != null ? bb.toFixed(1) : "—",
      tb: tb != null ? String(Math.round(tb * 10) / 10) : "—",
      lk: lk != null ? String(Math.round(lk * 10) / 10) : "—",
    };
  });
}

/** 5 kunjungan terakhir (demo) dari rentang usia 5–9 bulan */
export const GROWTH_HISTORY_LAST: GrowthHistoryRowDemo[] = buildGrowthHistoryLast5();

export type InsightCardAccentDemo = "primary" | "secondary" | "accent" | "gold";

export interface InsightSummaryStatDemo {
  label: string;
  value: string;
  toneClass: string;
}

export interface InsightCategoryCardDemo {
  id: string;
  accent: InsightCardAccentDemo;
  icon: "footprints" | "hand" | "message" | "brain" | "users";
  categoryLabel: string;
  categoryEmoji: string;
  /** Mis. "✓ Sesuai Tahap" atau "⚠ Perlu Stimulasi" */
  statusBadge: string;
  aiMessage: string;
  activitySectionTitle?: string;
  activityBullets: string[];
  activityBudget: "gratis" | "murah";
}

export type HomeInsightStatusDemo = "normal" | "attention";

export interface InsightHomePreviewCardDemo {
  accent: InsightCardAccentDemo;
  icon: "activity" | "message" | "footprints" | "hand";
  category: string;
  status: HomeInsightStatusDemo;
  /** Teks ringkas di bawah badge */
  preview: string;
}

export interface InsightSaranMingguDemo {
  actionTitle: string;
  howTo: string;
  durationLabel: string;
}

export interface InsightPremiumDoctorCardDemo {
  title: string;
  description: string;
  ctaLabel: string;
}

export interface InsightDemoData {
  weeklySummaryTitle: string;
  /** Label tampilan kartu ringkasan (dengan emoji) */
  weeklySummaryCardLabel: string;
  /** Teks sebelum highlight */
  weeklySummaryLead: string;
  /** Teks yang ditampilkan dengan class secondary */
  weeklySummaryHighlight: string;
  /** Teks setelah highlight */
  weeklySummaryTrail: string;
  /** Baris sorot pencapaian terbaru */
  weeklyHighlightAchievement: string;
  weeklySummaryStats: InsightSummaryStatDemo[];
  categoryCards: InsightCategoryCardDemo[];
  homePreviewCards: InsightHomePreviewCardDemo[];
  saranMingguIni: InsightSaranMingguDemo;
  premiumDoctorCard: InsightPremiumDoctorCardDemo;
}

export const INSIGHT_DATA: InsightDemoData = {
  weeklySummaryTitle: "Ringkasan Minggu Ini",
  weeklySummaryCardLabel: "🌟 Ringkasan Minggu Ini",
  weeklySummaryLead: `${CHILD_DATA.name} tumbuh dengan ceria minggu ini. Pola tidur lebih teratur dan minat bermain di lantai meningkat — tanda motorik yang `,
  weeklySummaryHighlight: "sesuai tahap WHO & IDAI",
  weeklySummaryTrail: ". Orang tua konsisten memberi stimulasi; area bahasa masih bisa diperkaya dengan permainan suara sederhana.",
  weeklyHighlightAchievement:
    "Pencapaian terbaru: mulai berdiri bertumpu pada sofa rendah dan merespons panggilan namanya dengan senyuman.",
  weeklySummaryStats: [
    { label: "Sesuai", value: "4", toneClass: "bg-secondary/15 text-secondary" },
    { label: "Stimulasi", value: "1", toneClass: "bg-gold/20 text-foreground" },
    { label: "Aktivitas", value: "12", toneClass: "bg-accent/30 text-foreground" },
  ],
  categoryCards: [
    {
      id: "motorik",
      accent: "primary",
      icon: "footprints",
      categoryLabel: "Motorik",
      categoryEmoji: "🏃",
      statusBadge: "✓ Sesuai Tahap",
      aiMessage:
        "Alara menunjukkan kesiapan berdiri bertumpu: keseimbangan tubuh bagus dan antusias mengejar mainan. Teruskan variasi posisi bermain agar otot punggung tetap kuat.",
      activitySectionTitle: "💡 Aktivitas Minggu Ini",
      activityBullets: [
        "Tummy time 2×10 menit dengan mainan bersuara di depannya",
        "Latihan berdiri 5 menit sambil memegang sofa dengan supervision ketat",
        "Ajak merangkak melalui “terowongan” dari bantal rendah",
      ],
      activityBudget: "gratis",
    },
    {
      id: "bahasa",
      accent: "gold",
      icon: "message",
      categoryLabel: "Bahasa",
      categoryEmoji: "💬",
      statusBadge: "⚠ Perlu Stimulasi",
      aiMessage:
        "Kosakata reseptif baik, namun produksi kata bermakna masih jarang. Ulangi kata pendek dalam konteks (makan, mandi, main) agar asosiasi makna semakin kuat.",
      activitySectionTitle: "💡 Aktivitas Minggu Ini",
      activityBullets: [
        "Saat ganti popok, sebut “basah / kering” sambil tunjuk benda",
        "Bacakan board book bergambar besar 2 kali sehari dengan jeda jawaban",
        "Main tepuk nama sederhana sebelum tidur",
      ],
      activityBudget: "murah",
    },
    {
      id: "sosial",
      accent: "secondary",
      icon: "users",
      categoryLabel: "Sosial",
      categoryEmoji: "🤝",
      statusBadge: "✓ Sesuai Tahap",
      aiMessage:
        "Interaksi dengan orang utama sudah hangat: kontak mata dan tawa bersama stabil. Ajak interaksi singkat dengan anggota keluarga lain agar variasi sosial bertambah.",
      activitySectionTitle: "💡 Aktivitas Minggu Ini",
      activityBullets: [
        "Video call singkat (3 menit) dengan nenek sambil melambaikan",
        "Permainan “serahkan mainan” bergantian dengan orang dewasa",
        "Senyum balik saat bayangan di cermin — cerminkan ekspresi",
      ],
      activityBudget: "gratis",
    },
    {
      id: "kognitif",
      accent: "accent",
      icon: "brain",
      categoryLabel: "Kognitif",
      categoryEmoji: "🧠",
      statusBadge: "✓ Sesuai Tahap",
      aiMessage:
        "Eksplorasi cause–effect dan pencarian benda tersembunyi berjalan baik. Tambah tantangan bertahap: tutup mainan di bawah dua lapisan kain ringan.",
      activitySectionTitle: "💡 Aktivitas Minggu Ini",
      activityBullets: [
        "Sembunyikan mainan kecil di bawah kain, tunjuk “mana ya?”",
        "Main tekan tombol mainan yang mengeluarkan suara lembut",
        "Susun ring stacker 2–3 cincin bersama-sama",
      ],
      activityBudget: "murah",
    },
  ],
  homePreviewCards: [
    {
      accent: "primary",
      icon: "footprints",
      category: "Motorik Kasar",
      status: "normal",
      preview: "Alara siap menapaki fase berdiri. Yuk ajak bermain di lantai 15 menit/hari.",
    },
    {
      accent: "gold",
      icon: "message",
      category: "Bahasa",
      status: "attention",
      preview: "Mulai kenalkan kata baru: 'mama', 'papa', 'bola' dengan repetisi konsisten.",
    },
  ],
  saranMingguIni: {
    actionTitle: "Satu sesi “bicara sambil jalan”",
    howTo:
      "Saat menggendong atau menyuapi, jelaskan apa yang Anda lakukan dengan kalimat pendek: “Ini sendok”, “Hangat ya supnya”. Ulangi kata kunci 3 kali natural.",
    durationLabel: "5–7 menit per waktu makan",
  },
  premiumDoctorCard: {
    title: "🔒 Chat dengan Dokter Anak",
    description: "Tanya jawab kilat seputar tumbuh kembang, imunisasi, atau gejala ringan — dari dokter spesialis anak.",
    ctaLabel: "Upgrade Premium →",
  },
};

export type ImunisasiScheduleStatusDemo = "soon" | "scheduled" | "future";

export interface ImunisasiUpcomingDemo {
  name: string;
  /** Opsional: usia rencana */
  age?: string;
  /** Teks tanggal tampilan */
  date: string;
  /** Untuk hitung hari tersisa (YYYY-MM-DD) */
  dateIso: string;
  status: ImunisasiScheduleStatusDemo;
  /** Override countdown tampilan (opsional) */
  homeCountdownLabel?: string;
}

export interface ImunisasiDemoData {
  birthDate: string;
  completed: string[];
  upcoming: ImunisasiUpcomingDemo[];
  /** Teks kartu info Kemenkes */
  kemenkesInfoText: string;
  /** Vaksin anjuran (accordion) */
  recommendedVaccines: string[];
}

/** Hari kalender dari `from` ke `dateIso` (setengah baris ke atas). */
export function imunisasiDaysUntil(dateIso: string, from: Date = new Date()): number {
  const t = new Date(`${dateIso}T12:00:00`);
  const f = new Date(from);
  f.setHours(0, 0, 0, 0);
  t.setHours(0, 0, 0, 0);
  return Math.round((t.getTime() - f.getTime()) / 86400000);
}

export function imunisasiCountdownLabel(dateIso: string, from?: Date): string {
  const d = imunisasiDaysUntil(dateIso, from);
  if (d <= 0) return "Hari ini / lewat";
  return `${d} hari lagi`;
}

export const IMUNISASI_DATA: ImunisasiDemoData = {
  birthDate: CHILD_DATA.birthDate,
  completed: ["BCG", "HepB-1", "HepB-2", "Polio-1", "Polio-2", "DPT-HB-Hib-1", "DPT-HB-Hib-2"],
  upcoming: [
    {
      name: "HepB-3",
      date: "1 Jun 2026",
      dateIso: "2026-06-01",
      status: "soon",
    },
    {
      name: "DPT-HB-Hib-3",
      date: "15 Jun 2026",
      dateIso: "2026-06-15",
      status: "scheduled",
    },
    {
      name: "Polio-3",
      date: "1 Jul 2026",
      dateIso: "2026-07-01",
      status: "scheduled",
    },
    {
      name: "PCV-1",
      date: "15 Jul 2026",
      dateIso: "2026-07-15",
      status: "future",
    },
  ],
  kemenkesInfoText:
    "Jadwal imunisasi mengikuti pedoman Kemenkes RI 2024 dan rekomendasi IDAI. Tanggal dapat disesuaikan dengan posyandu atau fasilitas kesehatan setempat.",
  recommendedVaccines: ["Varisela", "Influenza", "MMR", "Rotavirus", "HPV"],
};

export const IMUNISASI_STATUS_DOT_CLASS: Record<ImunisasiScheduleStatusDemo, string> = {
  soon: "bg-primary",
  scheduled: "bg-gold",
  future: "bg-accent",
};
