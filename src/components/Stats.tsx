import { useEffect, useRef, useState } from "react";

const STATS = [
  { value: 25, suffix: "+", label: "Projects" },
  { value: 100, suffix: "%", label: "Mobile Ready" },
  { value: 7, suffix: " Days", label: "Avg. Delivery" },
  { value: 4.9, suffix: "★", label: "Client Rating", decimals: 1 },
];

function Counter({ to, decimals = 0, suffix }: { to: number; decimals?: number; suffix: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const dur = 1400;
          const tick = (t: number) => {
            const p = Math.min(1, (t - start) / dur);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(to * eased);
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [to]);

  return (
    <span ref={ref}>
      {val.toFixed(decimals)}
      <span className="text-accent-blue">{suffix}</span>
    </span>
  );
}

export function Stats() {
  return (
    <section className="relative border-y border-white/[0.05] bg-bg-surface">
      <div className="container mx-auto grid grid-cols-2 divide-y divide-x divide-white/[0.05] md:grid-cols-4 md:divide-y-0">
        {STATS.map((s) => (
          <div key={s.label} className="px-6 py-10 text-center md:py-14">
            <div className="font-syne text-4xl font-extrabold leading-none text-text-primary md:text-5xl">
              <Counter to={s.value} decimals={s.decimals ?? 0} suffix={s.suffix} />
            </div>
            <div className="label-mono mt-3">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
