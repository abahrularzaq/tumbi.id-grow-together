export interface ProblemItem {
  headline: string;
  body: string;
  accentColor: "terracotta" | "amber" | "sage";
}

export interface FeatureItem {
  tag: string;
  tagColor: "sage" | "amber" | "terracotta" | "purple";
  headline: string;
  body: string;
}

export interface TestimonialItem {
  quote: string;
  name: string;
  city: string;
  role: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface PricingPlan {
  name: string;
  price: string;
  oldPrice?: string;
  sub: string;
  features: string[];
  ctaText: string;
  featured: boolean;
}

export interface PricingPlans {
  free: PricingPlan;
  premium: PricingPlan;
}

export interface TrustBadgeItem {
  icon: string;
  label: string;
}

export const PROBLEMS_DATA: ProblemItem[] = [
  {
    headline: "“Anak tetangga sudah jalan,",
    body: "anak saya belum.”",
    accentColor: "terracotta",
  },
  {
    headline: "“Dokter antrenya 2 minggu,",
    body: "saya khawatir sekarang.”",
    accentColor: "amber",
  },
  {
    headline: "“Banyak app parenting tapi",
    body: "tidak berbahasa Indonesia.”",
    accentColor: "sage",
  },
];

export const FEATURES_DATA: FeatureItem[] = [
  {
    tag: "CORE",
    tagColor: "sage",
    headline: "Growth Chart vs WHO",
    body: "Grafik berat, tinggi, lingkar kepala otomatis dibandingkan dengan kurva standar WHO 0–5 tahun.",
  },
  {
    tag: "SMART",
    tagColor: "amber",
    headline: "Imunisasi Kemenkes 2024",
    body: "Jadwal imunisasi terbaru sesuai rekomendasi Kemenkes & IDAI, dengan pengingat otomatis.",
  },
  {
    tag: "AI",
    tagColor: "terracotta",
    headline: "AI Insight Bahasa Indonesia",
    body: "Tanya apa saja tentang tumbuh kembang anak — jawaban personal dalam Bahasa Indonesia.",
  },
  {
    tag: "COMMUNITY",
    tagColor: "purple",
    headline: "Komunitas Orang Tua",
    body: "Bertukar pengalaman dengan ribuan orang tua Indonesia yang sedang menempuh fase yang sama.",
  },
];

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    quote: "Akhirnya ada app yang ngerti standar IDAI. Anak saya bisa dipantau setiap minggu tanpa khawatir.",
    name: "Sarah W.",
    city: "Jakarta",
    role: "Ibu",
  },
  {
    quote: "Fitur AI Insight-nya jujur penyelamat tengah malam. Jawabannya tenang dan masuk akal.",
    name: "Dimas P.",
    city: "Bandung",
    role: "Ayah",
  },
  {
    quote: "Pengingat imunisasi-nya akurat banget. Sudah 3 bulan tidak pernah telat lagi.",
    name: "Rina H.",
    city: "Surabaya",
    role: "Ibu",
  },
];

export const FAQ_DATA: FAQItem[] = [
  {
    question: "Untuk usia anak berapa saja?",
    answer: "Tumbi.id mendukung pemantauan anak usia 0–5 tahun, sesuai dengan standar tumbuh kembang WHO dan IDAI.",
  },
  {
    question: "Apakah datanya aman?",
    answer: "Ya. Data disimpan terenkripsi dan tidak pernah dibagikan ke pihak ketiga. Kami patuh pada UU PDP Indonesia.",
  },
  {
    question: "Apakah bisa dipakai gratis?",
    answer: "Tentu. Paket Free mencakup 1 profil anak, growth chart WHO, milestone tracker, dan pengingat imunisasi — selamanya gratis.",
  },
  {
    question: "Sumber data imunisasi dari mana?",
    answer: "Jadwal imunisasi mengikuti rekomendasi terbaru Kemenkes RI 2024 dan IDAI.",
  },
  {
    question: "Bisa untuk lebih dari satu anak?",
    answer: "Paket Premium memungkinkan profil anak tak terbatas, cocok untuk orang tua dengan beberapa anak.",
  },
];

export const PRICING_PLANS: PricingPlans = {
  free: {
    name: "Free",
    price: "Rp0",
    sub: "Selamanya, tanpa kartu kredit.",
    features: ["1 profil anak", "Growth chart WHO", "Pengingat imunisasi", "Milestone tracker"],
    ctaText: "Mulai Gratis",
    featured: false,
  },
  premium: {
    name: "Premium",
    price: "Rp39.000",
    oldPrice: "Rp59.000",
    sub: "/ bulan, batal kapan saja.",
    features: [
      "Profil anak tak terbatas",
      "AI Insight tak terbatas",
      "Export laporan PDF",
      "Akses komunitas premium",
      "Priority support",
    ],
    ctaText: "Coba Premium",
    featured: true,
  },
};

export const MARQUEE_ITEMS: string[] = [
  "Milestone WHO & IDAI",
  "Growth Chart",
  "Imunisasi Kemenkes 2024",
  "AI Insight",
  "0–5 Tahun",
  "Gratis",
];

export const TRUST_BADGES: TrustBadgeItem[] = [
  { icon: "✓", label: "WHO Standard" },
  { icon: "✓", label: "Bahasa Indonesia" },
  { icon: "✓", label: "Data Aman" },
  { icon: "✓", label: "Freemium" },
];
