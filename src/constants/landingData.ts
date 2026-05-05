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
  icon: string;
  metric: string;
  subtext: string;
  source: string;
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
    headline: "Anak tetangga sudah jalan, anak saya belum.",
    body: "Bandingin tumbuh kembang anak dengan orang lain itu melelahkan dan tidak ada habisnya. Yang kamu butuhkan adalah data berbasis usia anak kamu sendiri — bukan cerita tetangga.",
    accentColor: "terracotta",
  },
  {
    headline: "Dokter antrenya 2 minggu, padahal saya khawatir sekarang.",
    body: "Akses ke ahli tumbuh kembang mahal dan susah. Sementara itu, kamu sendirian menebak-nebak apakah yang terjadi itu normal atau butuh penanganan lebih lanjut.",
    accentColor: "amber",
  },
  {
    headline: "Banyak app parenting, tapi tidak ada yang ngomong bahasa saya.",
    body: "Jadwal imunisasi Kemenkes beda. Makanan MPASI lokal beda. Budaya pengasuhan kita beda. Konten parenting global bagus tapi tidak relevan untuk konteks Indonesia.",
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
    icon: "📊",
    metric: "73%",
    subtext: "orang tua merasa tidak punya cukup informasi untuk pantau milestone anak",
    source: "Survey Kemenkes 2023",
  },
  {
    icon: "🏥",
    metric: "1:5000",
    subtext: "rasio dokter spesialis anak vs populasi anak di Indonesia",
    source: "Data IDAI 2024",
  },
  {
    icon: "⏰",
    metric: "2-4 minggu",
    subtext: "waktu tunggu rata-rata konsultasi dokter tumbuh kembang di kota besar Indonesia",
    source: "Riset internal Tumbi.id",
  },
];

export const FAQ_DATA: FAQItem[] = [
  {
    question: "Apakah Tumbi.id pengganti dokter anak?",
    answer:
      "Tidak, dan Tumbi.id tidak pernah mengklaim demikian. Kami membantu kamu memantau dan mendokumentasikan tumbuh kembang — bukan mendiagnosa kondisi medis. Jika ada kekhawatiran serius, selalu konsultasikan ke dokter anak.",
  },
  {
    question: "Kapan Tumbi.id bisa mulai digunakan?",
    answer:
      "Kami sedang dalam tahap pengembangan aktif. Daftar sekarang untuk dapat akses awal saat launch dan harga early bird yang terkunci selamanya — tidak akan naik meski harga normal berubah.",
  },
  {
    question: "Apakah benar-benar gratis untuk selamanya?",
    answer:
      "Ya. Fitur dasar Tumbi.id — tracking milestone, growth chart, dan jadwal imunisasi — gratis selamanya tanpa batas waktu. Kami monetisasi dari fitur Premium, bukan dari iklan atau penjualan data.",
  },
  {
    question: "Apakah data anak saya aman?",
    answer:
      "Data anak kamu disimpan dengan enkripsi dan tidak pernah dibagikan ke pihak ketiga untuk tujuan komersial. Kami tidak memasang iklan berbasis data anak. Privacy policy lengkap tersedia sebelum launch.",
  },
  {
    question: "Apakah bisa digunakan untuk anak prematur?",
    answer:
      "Ya. Tumbi.id mendukung koreksi usia gestasional (adjusted age) untuk tracking milestone yang lebih akurat. Kami paham bahwa setiap anak punya timeline-nya sendiri.",
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
  { icon: "🏥", label: "Standar WHO & IDAI" },
  { icon: "🇮🇩", label: "Bahasa Indonesia" },
  { icon: "🔒", label: "Data Anak Aman" },
  { icon: "💰", label: "Gratis untuk Fitur Dasar" },
];
