import { useEffect, useRef, useState } from "react";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const STATS = [
  { value: 25, suffix: "+", label: "Projects Delivered" },
  { value: 3, suffix: " Day", label: "Avg. Response Time" },
  { value: 100, suffix: "%", label: "Post-launch Support" },
];

function Counter({ to, suffix }: { to: number; suffix: string }) {
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
      {Math.round(val)}
      <span className="text-accent-blue">{suffix}</span>
    </span>
  );
}

export function About() {
  const { howWeWork } = useSiteSettings();

  return (
    <section id="about" className="relative overflow-hidden bg-bg-deep py-28 md:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-10 left-0 select-none font-syne text-[28vw] font-extrabold leading-none text-text-dim/[0.06] md:text-[18rem]"
      >
        02
      </div>

      <div className="container relative mx-auto grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="reveal">
            <div className="label-mono mb-4 flex items-center gap-3">
              <span className="red-spark" />
              <span>Who Is Jarviz Solutions</span>
            </div>
            <h2 className="font-syne text-4xl font-extrabold leading-[1.05] tracking-tight text-text-primary md:text-6xl">
              A Lean Team. <br />Maximum Output.
            </h2>
          </div>

          <div className="mt-10 space-y-6 max-w-xl" data-stagger="80">
            <p className="reveal font-dm text-text-muted">
              <span className="text-text-primary">Jarviz Solutions</span> is a focused digital
              team that builds websites, software, and restaurant systems for colleges,
              restaurants, and growing local brands. No 40-person agency overhead, no inflated
              timelines — just a small, senior team that ships fast and stays available after
              launch.
            </p>
          </div>

          {/* Stats row */}
          <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3" data-stagger="80">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="reveal border border-white/[0.06] bg-bg-card px-5 py-6"
              >
                <div className="font-syne text-3xl font-extrabold leading-none text-text-primary md:text-4xl">
                  <Counter to={s.value} suffix={s.suffix} />
                </div>
                <div className="label-mono mt-3">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="reveal glass p-2">
            <div className="border-b border-white/5 px-5 py-4 flex items-center justify-between">
              <span className="font-mono text-[0.7rem] tracking-widest text-text-muted">
                HOW_WE_WORK.SYS
              </span>
              <span className="flex gap-1.5">
                <span className="h-2 w-2 rounded-full bg-accent-red/60" />
                <span className="h-2 w-2 rounded-full bg-accent-gold/60" />
                <span className="h-2 w-2 rounded-full bg-accent-blue/70" />
              </span>
            </div>
            <ul className="divide-y divide-white/5">
              {howWeWork.map((row, i) => (
                <li
                  key={`${row.tag}-${i}`}
                  className="flex items-center gap-5 border-l-2 border-accent-blue/70 px-5 py-5"
                >
                  <span className="w-24 shrink-0 font-mono text-[0.7rem] tracking-widest text-accent-blue">
                    [ {row.tag} ]
                  </span>
                  <span className="font-dm text-sm text-text-primary md:text-base">
                    {row.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
