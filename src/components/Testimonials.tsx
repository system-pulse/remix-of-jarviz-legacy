import { useEffect, useState } from "react";

const TESTIMONIALS = [
  {
    quote:
      "They delivered our entire college website in under 10 days. Clean, fast, and no unnecessary back-and-forth.",
    name: "Rajesh M.",
    role: "Academic Director",
    company: "Sunrise Institute",
  },
  {
    quote:
      "Our QR menu system increased table turnover by 20%. Jarviz Tech actually understood what we needed.",
    name: "Priya S.",
    role: "Owner",
    company: "GreenLeaf Kitchen",
  },
  {
    quote:
      "Professional team. They built exactly what we asked for and didn't overcomplicate anything.",
    name: "Arun K.",
    role: "Founder",
    company: "UrbanCraft Studio",
  },
];

function Card({ t }: { t: (typeof TESTIMONIALS)[number] }) {
  return (
    <article className="glass relative h-full p-8 transition-all duration-500 hover:border-accent-blue/30 hover:shadow-glow-blue">
      <span
        aria-hidden
        className="absolute left-5 top-2 font-syne text-7xl font-extrabold leading-none text-accent-blue/70"
      >
        “
      </span>
      <p className="relative mt-8 font-dm text-base italic leading-relaxed text-text-muted">
        {t.quote}
      </p>
      <div className="mt-8 border-t border-white/5 pt-5">
        <div className="font-syne text-base font-semibold text-text-primary">{t.name}</div>
        <div className="mt-1 font-mono text-[0.65rem] uppercase tracking-widest text-text-dim">
          {t.role} · {t.company}
        </div>
      </div>
    </article>
  );
}

export function Testimonials() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative bg-bg-deep py-28 md:py-36">
      <div className="container mx-auto">
        <div className="reveal mb-14 max-w-2xl">
          <div className="label-mono mb-4 flex items-center gap-3">
            <span className="red-spark" />
            <span>What Clients Say</span>
          </div>
          <h2 className="font-syne text-4xl font-extrabold leading-tight tracking-tight text-text-primary md:text-5xl">
            Honest words from the people we've shipped for.
          </h2>
        </div>

        {/* Desktop: 3 columns */}
        <div className="hidden gap-5 md:grid md:grid-cols-3" data-stagger="100">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="reveal">
              <Card t={t} />
            </div>
          ))}
        </div>

        {/* Mobile: carousel */}
        <div className="md:hidden">
          <Card t={TESTIMONIALS[idx]} />
          <div className="mt-6 flex justify-center gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                aria-label={`Show testimonial ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === idx ? "w-6 bg-accent-blue" : "w-1.5 bg-text-dim"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
