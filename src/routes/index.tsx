import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

/* ---------- Reveal on scroll ---------- */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ---------- Navbar ---------- */
function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border">
      <nav className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2 font-bold text-lg">
          <span className="text-2xl">🌱</span>
          <span className="font-display tracking-tight">Tumbi.id</span>
        </a>
        <a
          href="#daftar"
          className="inline-flex items-center px-5 py-2.5 rounded-md bg-terracotta text-white font-semibold text-sm hover:opacity-90 transition shadow-[3px_3px_0_0_rgba(0,0,0,0.4)]"
        >
          Daftar
        </a>
      </nav>
    </header>
  );
}

/* ---------- Phone mockup (pure CSS) ---------- */
function PhoneMockup() {
  return (
    <div className="relative mx-auto w-[280px] sm:w-[320px]" style={{ transform: "rotate(6deg)" }}>
      <div className="rounded-[2.5rem] bg-[#1a1a1a] border border-border p-3 shadow-[12px_12px_0_0_var(--color-terracotta)]">
        <div className="rounded-[2rem] bg-background overflow-hidden">
          {/* notch */}
          <div className="h-6 flex justify-center items-end pb-1">
            <div className="w-20 h-4 bg-black rounded-b-2xl" />
          </div>
          <div className="px-4 pb-5 space-y-3">
            {/* profile card */}
            <div className="rounded-2xl bg-surface p-3 flex items-center gap-3 border border-border">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-terracotta to-amber" />
              <div>
                <div className="font-bold text-foreground">Arini</div>
                <div className="text-xs text-muted-foreground">14 bulan · Perempuan</div>
              </div>
              <div className="ml-auto text-xs px-2 py-1 rounded-full bg-sage/20 text-sage font-mono">
                Sehat
              </div>
            </div>

            {/* growth chart */}
            <div className="rounded-2xl bg-surface p-3 border border-border">
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs font-semibold">Growth Chart · WHO</div>
                <div className="text-[10px] font-mono text-amber">P50</div>
              </div>
              <svg viewBox="0 0 200 80" className="w-full h-16">
                <path
                  d="M0,70 Q40,55 70,45 T140,25 T200,15"
                  stroke="var(--color-terracotta)"
                  strokeWidth="2.5"
                  fill="none"
                />
                <path
                  d="M0,75 Q40,65 70,58 T140,42 T200,32"
                  stroke="var(--color-amber)"
                  strokeWidth="1.5"
                  strokeDasharray="3 3"
                  fill="none"
                  opacity="0.6"
                />
                {[
                  [20, 65],
                  [70, 45],
                  [120, 32],
                  [170, 20],
                ].map(([x, y], i) => (
                  <circle key={i} cx={x} cy={y} r="3" fill="var(--color-terracotta)" />
                ))}
              </svg>
              <div className="flex justify-between text-[9px] font-mono text-muted-foreground mt-1">
                <span>0</span><span>6</span><span>12</span><span>18 bln</span>
              </div>
            </div>

            {/* milestones */}
            <div className="rounded-2xl bg-surface p-3 border border-border space-y-2">
              <div className="text-xs font-semibold mb-1">Milestone Bulan Ini</div>
              {[
                ["Berjalan tanpa bantuan", true],
                ["Mengucap 3-5 kata", true],
                ["Minum dari gelas", false],
              ].map(([t, done], i) => (
                <div key={i} className="flex items-center gap-2 text-[11px]">
                  <span
                    className={`w-4 h-4 rounded grid place-items-center text-[10px] ${
                      done ? "bg-sage text-background" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {done ? "✓" : "·"}
                  </span>
                  <span className={done ? "" : "text-muted-foreground"}>{t}</span>
                </div>
              ))}
            </div>

            {/* immunization */}
            <div className="rounded-2xl bg-terracotta/15 border border-terracotta/30 p-3">
              <div className="text-[10px] font-mono text-amber mb-1">IMUNISASI · KEMENKES 2024</div>
              <div className="text-xs font-semibold">MMR — jadwal 2 hari lagi</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  return (
    <section id="top" className="relative min-h-[100svh] flex items-center pt-10 pb-16">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-12 items-center w-full">
        <div className="reveal">
          <div className="inline-block font-mono text-amber text-xs sm:text-sm uppercase tracking-widest mb-6">
            ◆ Tumbuh Bersama Si Kecil
          </div>
          <h1 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tight">
            Tumbuh bersama si kecil,{" "}
            <span className="text-terracotta italic">dipantau</span> dengan benar.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
            Aplikasi pemantau tumbuh kembang anak berdasarkan standar{" "}
            <span className="text-foreground font-semibold">WHO &amp; IDAI</span>. Pantau
            pertumbuhan, milestone, dan jadwal imunisasi — semuanya dalam Bahasa Indonesia.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#daftar"
              className="px-6 py-3.5 bg-terracotta text-white font-bold rounded-md hover:opacity-90 transition shadow-[4px_4px_0_0_rgba(245,240,232,0.15)]"
            >
              Mulai Gratis →
            </a>
            <a
              href="#features"
              className="px-6 py-3.5 border border-border bg-transparent text-foreground font-semibold rounded-md hover:bg-surface transition"
            >
              Lihat Fitur
            </a>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-mono uppercase tracking-wider text-muted-foreground">
            {["✓ WHO Standard", "✓ Bahasa Indonesia", "✓ Data Aman", "✓ Freemium"].map((b) => (
              <span key={b}>{b}</span>
            ))}
          </div>
        </div>

        <div className="reveal flex justify-center lg:justify-end">
          <PhoneMockup />
        </div>
      </div>
    </section>
  );
}

/* ---------- Marquee ---------- */
function Marquee() {
  const items = [
    "Milestone WHO & IDAI",
    "Growth Chart",
    "Imunisasi Kemenkes 2024",
    "AI Insight",
    "0–5 Tahun",
    "Gratis",
  ];
  const row = (
    <div className="flex shrink-0 gap-12 px-6">
      {items.map((t, i) => (
        <span key={i} className="font-mono text-amber text-sm sm:text-base whitespace-nowrap">
          {t} <span className="text-amber/60">✦</span>
        </span>
      ))}
    </div>
  );
  return (
    <div className="border-y border-border bg-[#0a0a0a] py-4 overflow-hidden">
      <div className="flex animate-marquee w-max">
        {row}
        {row}
        {row}
        {row}
      </div>
    </div>
  );
}

/* ---------- Problem ---------- */
function Problems() {
  const items = [
    { t: "“Anak tetangga sudah jalan, anak saya belum.”", c: "terracotta" },
    { t: "“Dokter antrenya 2 minggu, saya khawatir sekarang.”", c: "amber" },
    { t: "“Banyak app parenting tapi tidak berbahasa Indonesia.”", c: "sage" },
  ] as const;
  return (
    <section className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-12 lg:gap-20">
        <div className="reveal">
          <div className="font-mono text-amber text-xs uppercase tracking-widest mb-4">
            ◆ Masalahnya
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl leading-[0.95]">
            Yang sering bikin orang tua kehilangan tidur.
          </h2>
        </div>
        <div className="space-y-4">
          {items.map((it, i) => (
            <div
              key={i}
              className="reveal bg-surface p-6 sm:p-7 rounded-md border border-border relative overflow-hidden"
              style={{ borderLeft: `5px solid var(--color-${it.c})` }}
            >
              <p className="text-lg sm:text-xl font-medium leading-snug">{it.t}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Features ---------- */
function Features() {
  const cards = [
    {
      tag: "CORE",
      color: "sage",
      title: "Growth Chart vs WHO",
      desc: "Grafik berat, tinggi, lingkar kepala otomatis dibandingkan dengan kurva standar WHO 0–5 tahun.",
    },
    {
      tag: "SMART",
      color: "amber",
      title: "Imunisasi Kemenkes 2024",
      desc: "Jadwal imunisasi terbaru sesuai rekomendasi Kemenkes & IDAI, dengan pengingat otomatis.",
    },
    {
      tag: "AI",
      color: "terracotta",
      title: "AI Insight Bahasa Indonesia",
      desc: "Tanya apa saja tentang tumbuh kembang anak — jawaban personal dalam Bahasa Indonesia.",
    },
    {
      tag: "COMMUNITY",
      color: "purple",
      title: "Komunitas Orang Tua",
      desc: "Bertukar pengalaman dengan ribuan orang tua Indonesia yang sedang menempuh fase yang sama.",
    },
  ] as const;
  return (
    <section id="features" className="py-24 sm:py-32 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="reveal max-w-2xl mb-16">
          <div className="font-mono text-amber text-xs uppercase tracking-widest mb-4">
            ◆ Fitur Utama
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl leading-[0.95]">
            Semua yang dibutuhkan, tidak lebih.
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {cards.map((c, i) => (
            <div
              key={i}
              className="reveal group bg-surface rounded-lg p-7 sm:p-9 border border-border hover:border-foreground/30 transition relative overflow-hidden"
            >
              <div
                className="inline-block font-mono text-[11px] uppercase tracking-widest px-2.5 py-1 rounded-sm mb-6"
                style={{
                  backgroundColor: `var(--color-${c.color})`,
                  color: c.color === "amber" || c.color === "sage" ? "#0E0E0E" : "#fff",
                }}
              >
                {c.tag}
              </div>
              <h3 className="font-display font-bold text-2xl sm:text-3xl mb-3 leading-tight">
                {c.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">{c.desc}</p>
              <div
                className="absolute -bottom-12 -right-12 w-40 h-40 rounded-full opacity-10 blur-2xl group-hover:opacity-20 transition"
                style={{ backgroundColor: `var(--color-${c.color})` }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Testimonials ---------- */
function Testimonials() {
  const items = [
    { q: "Akhirnya ada app yang ngerti standar IDAI. Anak saya bisa dipantau setiap minggu tanpa khawatir.", n: "Sarah W.", r: "Ibu, Jakarta" },
    { q: "Fitur AI Insight-nya jujur penyelamat tengah malam. Jawabannya tenang dan masuk akal.", n: "Dimas P.", r: "Ayah, Bandung" },
    { q: "Pengingat imunisasi-nya akurat banget. Sudah 3 bulan tidak pernah telat lagi.", n: "Rina H.", r: "Ibu, Surabaya" },
  ];
  return (
    <section className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="reveal mb-12">
          <div className="font-mono text-amber text-xs uppercase tracking-widest mb-4">
            ◆ Testimoni
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl">
            Dipakai orang tua se-Indonesia.
          </h2>
        </div>
        <div className="flex gap-5 overflow-x-auto pb-6 -mx-5 px-5 snap-x snap-mandatory scrollbar-thin">
          {items.map((t, i) => (
            <div
              key={i}
              className="reveal shrink-0 w-[85%] sm:w-[420px] snap-start bg-surface rounded-lg p-7 border border-border relative"
            >
              <div className="font-display text-7xl text-terracotta leading-none mb-2">“</div>
              <p className="text-lg leading-relaxed mb-6">{t.q}</p>
              <div className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
                {t.n} · {t.r}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Pricing ---------- */
function Pricing() {
  const cards = [
    {
      name: "Free",
      price: "Rp0",
      sub: "Selamanya, tanpa kartu kredit.",
      features: ["1 profil anak", "Growth chart WHO", "Pengingat imunisasi", "Milestone tracker"],
      cta: "Mulai Gratis",
      featured: false,
    },
    {
      name: "Premium",
      price: "Rp39.000",
      old: "Rp59.000",
      sub: "/ bulan, batal kapan saja.",
      features: ["Profil anak tak terbatas", "AI Insight tak terbatas", "Export laporan PDF", "Akses komunitas premium", "Priority support"],
      cta: "Coba Premium",
      featured: true,
    },
  ];
  return (
    <section className="py-24 sm:py-32 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="reveal text-center mb-14">
          <div className="font-mono text-amber text-xs uppercase tracking-widest mb-4">
            ◆ Harga
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl">
            Mulai gratis, naik ketika siap.
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {cards.map((c) => (
            <div
              key={c.name}
              className={`reveal relative rounded-xl p-8 sm:p-10 border ${
                c.featured
                  ? "bg-surface border-terracotta shadow-[8px_8px_0_0_var(--color-terracotta)]"
                  : "bg-surface border-border"
              }`}
            >
              {c.featured && (
                <div className="absolute -top-3 right-6 px-3 py-1 bg-amber text-background text-xs font-mono font-bold uppercase tracking-wider rounded">
                  Early Bird
                </div>
              )}
              <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2">
                {c.name}
              </div>
              <div className="flex items-baseline gap-3 mb-2">
                <div className="font-display font-black text-5xl">{c.price}</div>
                {c.old && (
                  <div className="text-xl text-muted-foreground line-through">{c.old}</div>
                )}
              </div>
              <div className="text-sm text-muted-foreground mb-6">{c.sub}</div>
              <ul className="space-y-3 mb-8">
                {c.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <span className="text-terracotta mt-0.5">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#daftar"
                className={`block text-center py-3.5 rounded-md font-bold transition ${
                  c.featured
                    ? "bg-terracotta text-white hover:opacity-90"
                    : "bg-foreground text-background hover:opacity-90"
                }`}
              >
                {c.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
function FAQ() {
  const items = [
    { q: "Untuk usia anak berapa saja?", a: "Tumbi.id mendukung pemantauan anak usia 0–5 tahun, sesuai dengan standar tumbuh kembang WHO dan IDAI." },
    { q: "Apakah datanya aman?", a: "Ya. Data disimpan terenkripsi dan tidak pernah dibagikan ke pihak ketiga. Kami patuh pada UU PDP Indonesia." },
    { q: "Apakah bisa dipakai gratis?", a: "Tentu. Paket Free mencakup 1 profil anak, growth chart WHO, milestone tracker, dan pengingat imunisasi — selamanya gratis." },
    { q: "Sumber data imunisasi dari mana?", a: "Jadwal imunisasi mengikuti rekomendasi terbaru Kemenkes RI 2024 dan IDAI." },
    { q: "Bisa untuk lebih dari satu anak?", a: "Paket Premium memungkinkan profil anak tak terbatas, cocok untuk orang tua dengan beberapa anak." },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-24 sm:py-32">
      <div className="max-w-3xl mx-auto px-5 sm:px-8">
        <div className="reveal mb-12 text-center">
          <div className="font-mono text-amber text-xs uppercase tracking-widest mb-4">◆ FAQ</div>
          <h2 className="font-display font-black text-4xl sm:text-5xl">
            Pertanyaan yang sering ditanyakan.
          </h2>
        </div>
        <div className="space-y-3">
          {items.map((it, i) => (
            <div
              key={i}
              className="reveal bg-surface border border-border rounded-md overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 text-left p-5 sm:p-6 hover:bg-surface-2 transition"
              >
                <span className="font-semibold text-base sm:text-lg">{it.q}</span>
                <span
                  className="text-2xl text-terracotta shrink-0 transition-transform"
                  style={{ transform: open === i ? "rotate(45deg)" : "rotate(0)" }}
                >
                  +
                </span>
              </button>
              {open === i && (
                <div className="px-5 sm:px-6 pb-6 text-muted-foreground leading-relaxed">
                  {it.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Form / Final CTA ---------- */
function FinalCTA() {
  const [email, setEmail] = useState("");
  const [plan, setPlan] = useState("Free");
  const [age, setAge] = useState("0-1 tahun");
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) return;
    setSubmitted(true);
  }

  return (
    <section id="daftar" className="bg-terracotta text-white">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 py-24 sm:py-32 text-center">
        <div className="reveal">
          <div className="font-mono text-white/80 text-xs uppercase tracking-widest mb-5">
            ◆ Daftar Early Access
          </div>
          <h2 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl leading-[0.95] mb-6">
            Mulai pantau si kecil hari ini.
          </h2>
          <p className="text-lg sm:text-xl text-white/90 max-w-xl mx-auto mb-10">
            Daftar sekarang untuk akses awal dan diskon Early Bird seumur hidup.
          </p>
        </div>

        {!submitted ? (
          <form
            ref={formRef}
            onSubmit={onSubmit}
            className="reveal max-w-2xl mx-auto bg-background text-foreground p-6 sm:p-8 rounded-xl text-left space-y-4 shadow-[8px_8px_0_0_rgba(0,0,0,0.4)]"
          >
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value.slice(0, 255))}
                placeholder="nama@email.com"
                className="w-full bg-surface border border-border rounded-md px-4 py-3 focus:outline-none focus:border-terracotta transition"
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">
                  Paket
                </label>
                <select
                  value={plan}
                  onChange={(e) => setPlan(e.target.value)}
                  className="w-full bg-surface border border-border rounded-md px-4 py-3 focus:outline-none focus:border-terracotta transition"
                >
                  <option>Free</option>
                  <option>Premium</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">
                  Usia Anak
                </label>
                <select
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full bg-surface border border-border rounded-md px-4 py-3 focus:outline-none focus:border-terracotta transition"
                >
                  <option>0-1 tahun</option>
                  <option>1-2 tahun</option>
                  <option>2-3 tahun</option>
                  <option>3-5 tahun</option>
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-terracotta text-white font-bold py-4 rounded-md hover:opacity-90 transition mt-2"
            >
              Daftar Sekarang →
            </button>
            <p className="text-xs text-muted-foreground text-center">
              Dengan mendaftar, Anda menyetujui kebijakan privasi kami.
            </p>
          </form>
        ) : (
          <div className="max-w-md mx-auto bg-background text-foreground p-8 rounded-xl shadow-[8px_8px_0_0_rgba(0,0,0,0.4)]">
            <div className="text-5xl mb-4">🌱</div>
            <h3 className="font-display font-black text-2xl mb-2">Terima kasih!</h3>
            <p className="text-muted-foreground">
              Kami akan mengirim undangan early access ke <strong>{email}</strong> segera.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  return (
    <footer className="bg-background border-t border-border py-10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row gap-4 items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center gap-2 font-bold">
          <span>🌱</span>
          <span className="font-display text-foreground">Tumbi.id</span>
        </div>
        <div className="font-mono text-xs uppercase tracking-widest">
          © 2026 Tumbi.id · Dibuat dengan ❤ di Indonesia
        </div>
        <div className="flex gap-5 text-xs">
          <a href="#" className="hover:text-foreground transition">Privasi</a>
          <a href="#" className="hover:text-foreground transition">Syarat</a>
          <a href="#" className="hover:text-foreground transition">Kontak</a>
        </div>
      </div>
    </footer>
  );
}

function LandingPage() {
  useReveal();
  return (
    <main className="bg-background text-foreground">
      <Navbar />
      <Hero />
      <Marquee />
      <Problems />
      <Features />
      <Testimonials />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
