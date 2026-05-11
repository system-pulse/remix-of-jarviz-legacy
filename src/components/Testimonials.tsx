import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { useTestimonials, type DBTestimonial } from "@/hooks/useTestimonials";

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function Card({ t }: { t: DBTestimonial }) {
  return (
    <article className="glass relative h-full p-8 transition-all duration-500 hover:border-accent-blue/30 hover:shadow-glow-blue">
      <div className="flex items-center gap-4">
        {t.photo_url ? (
          <img
            src={t.photo_url}
            alt={t.name}
            className="h-12 w-12 rounded-full border border-white/10 object-cover"
          />
        ) : (
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-accent-blue/40 bg-accent-blue/10 font-syne text-sm font-bold text-accent-blue">
            {initials(t.name) || "·"}
          </div>
        )}
        <div className="min-w-0">
          <div className="font-syne text-base font-semibold text-text-primary">{t.name}</div>
          <div className="font-mono text-[0.6rem] uppercase tracking-widest text-text-dim">
            {t.role}
          </div>
        </div>
      </div>

      <div className="mt-5 flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={14}
            className={i < t.rating ? "fill-accent-blue text-accent-blue" : "text-text-dim"}
          />
        ))}
      </div>

      <p className="mt-4 font-dm text-base italic leading-relaxed text-text-muted">
        “{t.quote}”
      </p>
    </article>
  );
}

export function Testimonials() {
  const { items } = useTestimonials({ featuredOnly: true });
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (items.length < 2) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % items.length), 5000);
    return () => clearInterval(id);
  }, [items.length]);

  if (!items.length) return null;

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

        <div className="hidden gap-5 md:grid md:grid-cols-3 lg:grid-cols-3" data-stagger="100">
          {items.slice(0, 3).map((t) => (
            <div key={t.id} className="reveal">
              <Card t={t} />
            </div>
          ))}
        </div>

        <div className="md:hidden">
          <Card t={items[idx]} />
          <div className="mt-6 flex justify-center gap-2">
            {items.map((_, i) => (
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
