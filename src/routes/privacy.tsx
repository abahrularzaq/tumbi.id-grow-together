import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Kebijakan Privasi — Tumbi.id" },
      {
        name: "description",
        content:
          "Kebijakan privasi Tumbi.id dalam Bahasa Indonesia: data yang dikumpulkan, cara penggunaan, keamanan, dan hak kamu.",
      },
    ],
  }),
  component: PrivacyPage,
});

function SectionCard({
  title,
  children,
  className = "",
  id,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={`rounded-xl border border-border bg-surface p-6 sm:p-7 shadow-sm ${id ? "scroll-mt-24" : ""} ${className}`.trim()}
    >
      <h2 className="font-display text-lg font-bold tracking-tight text-foreground sm:text-xl">
        {title}
      </h2>
      <div className="mt-4 space-y-3 text-[15px] leading-relaxed text-muted-foreground sm:text-base">
        {children}
      </div>
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="list-none space-y-2.5 pl-0">
      {items.map((line) => (
        <li key={line} className="flex gap-2.5">
          <span className="mt-0.5 shrink-0 text-amber" aria-hidden>
            ✓
          </span>
          <span>{line}</span>
        </li>
      ))}
    </ul>
  );
}

function DashList({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <ul className={`list-none space-y-2 ${className}`.trim()}>
      {items.map((line) => (
        <li key={line} className="flex gap-2.5 pl-0">
          <span className="text-muted-foreground">–</span>
          <span>{line}</span>
        </li>
      ))}
    </ul>
  );
}

function NumberedList({ items }: { items: string[] }) {
  return (
    <ol className="list-none space-y-2.5">
      {items.map((line, i) => (
        <li key={line} className="flex gap-3">
          <span className="font-mono text-sm font-semibold text-terracotta tabular-nums">
            {i + 1}.
          </span>
          <span>{line}</span>
        </li>
      ))}
    </ol>
  );
}

function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="relative overflow-hidden bg-gradient-to-br from-terracotta via-[oklch(0.58_0.14_38)] to-amber px-5 py-12 sm:py-14">
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage: "radial-gradient(circle at 20% 20%, white 0%, transparent 45%)",
          }}
        />
        <div className="relative mx-auto max-w-[720px] text-center">
          <h1 className="font-display text-2xl font-bold tracking-tight text-primary-foreground sm:text-3xl md:text-4xl">
            Kebijakan Privasi Tumbi.id
          </h1>
          <p className="mt-3 text-sm font-medium text-primary-foreground/90 sm:text-base">
            Terakhir diperbarui: Mei 2026
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-[720px] px-5 py-10 pb-16 sm:py-12 sm:pb-20">
        <div className="space-y-8">
          <section className="rounded-xl border border-amber/35 bg-surface p-6 sm:p-7 shadow-[0_0_0_1px_oklch(0.82_0.17_82_/_0.12)]">
            <p className="font-display text-base font-bold text-foreground sm:text-lg">
              Versi pendek yang bisa kamu percaya:
            </p>
            <div className="mt-4 text-[15px] leading-relaxed text-muted-foreground sm:text-base">
              <BulletList
                items={[
                  "Kami tidak menjual data kamu",
                  "Kami tidak memasang iklan",
                  "Data anak hanya kamu yang bisa lihat",
                  "Kamu bisa hapus semua data kapan saja",
                  "Kami beritahu kamu jika ada perubahan",
                ]}
              />
            </div>
          </section>

          <SectionCard title="Data apa yang dikumpulkan">
            <div>
              <p className="font-semibold text-foreground">Data yang kamu berikan ke kami:</p>
              <DashList
                className="mt-2"
                items={[
                  "Email dan nama akun",
                  "Profil anak (nama, tanggal lahir, jenis kelamin, data pertumbuhan)",
                  "Data milestone yang kamu input",
                  "Jadwal imunisasi yang di-generate dari tanggal lahir anak",
                ]}
              />
            </div>
            <div className="pt-2">
              <p className="font-semibold text-foreground">Data yang dikumpulkan otomatis:</p>
              <DashList
                className="mt-2"
                items={["Waktu akses (untuk keamanan)", "Device type (untuk optimasi tampilan)"]}
              />
            </div>
            <div className="pt-2">
              <p className="font-semibold text-foreground">Yang TIDAK kami kumpulkan:</p>
              <DashList
                className="mt-2"
                items={[
                  "Lokasi real-time",
                  "Kontak HP",
                  "Data keuangan",
                  "Apapun yang tidak kamu input sendiri",
                ]}
              />
            </div>
          </SectionCard>

          <SectionCard title="Bagaimana data digunakan">
            <p className="font-semibold text-foreground">Hanya untuk:</p>
            <div className="mt-2">
              <NumberedList
                items={[
                  "Menjalankan fitur Tumbi.id",
                  "Menghitung dan menampilkan milestone",
                  "Generate jadwal imunisasi",
                  "Kirim notifikasi yang kamu aktifkan",
                ]}
              />
            </div>
            <p className="pt-4 font-semibold text-foreground">TIDAK digunakan untuk:</p>
            <DashList
              className="mt-2"
              items={[
                "Iklan atau targeting",
                "Dijual ke pihak ketiga",
                "Profiling komersial",
                "Apapun di luar layanan Tumbi.id",
              ]}
            />
          </SectionCard>

          <SectionCard title="Keamanan data">
            <DashList
              items={[
                "Data disimpan di Supabase (server Singapore, ISO 27001)",
                "Enkripsi in-transit (HTTPS/TLS 1.3)",
                "Enkripsi at-rest (AES-256)",
                "Row Level Security: data kamu hanya bisa diakses oleh akun kamu",
              ]}
            />
          </SectionCard>

          <SectionCard title="Hak kamu">
            <p>Kamu berhak untuk:</p>
            <DashList
              className="mt-2"
              items={[
                "Melihat semua data yang kami simpan",
                "Menghapus akun dan semua data (grace period 7 hari)",
                "Meminta salinan data kamu",
                "Mengajukan pertanyaan ke tim kami",
              ]}
            />
          </SectionCard>

          <SectionCard id="kontak" title="Kontak">
            <p>
              Email:{" "}
              <a
                href="mailto:privacy@tumbi.id"
                className="font-medium text-terracotta underline decoration-terracotta/40 underline-offset-2 hover:text-amber hover:decoration-amber/50"
              >
                privacy@tumbi.id
              </a>
            </p>
            <p className="text-sm">(atau email resmi yang kami pakai untuk komunikasi dengan pengguna)</p>
          </SectionCard>
        </div>

        <footer className="mt-12 border-t border-border pt-8 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-foreground transition hover:text-terracotta"
          >
            <span aria-hidden>←</span>
            Kembali ke Tumbi.id
          </Link>
        </footer>
      </main>
    </div>
  );
}
