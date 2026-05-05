import { useRef, useState } from "react";

export function FinalCTA() {
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
