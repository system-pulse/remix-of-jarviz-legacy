const STEPS = [
  {
    n: "01",
    title: "Understand",
    desc: "We map your goals, users, and requirements before a single line is written.",
  },
  {
    n: "02",
    title: "Design & Build",
    desc: "Clean design, fast development, constant communication throughout.",
  },
  {
    n: "03",
    title: "Deliver & Support",
    desc: "You go live. We stay available. No ghosting after handoff.",
  },
];

export function Process() {
  return (
    <section id="process" className="relative bg-bg-base py-28 md:py-36">
      <div className="container mx-auto">
        <div className="reveal mb-14 max-w-2xl">
          <div className="label-mono mb-4 flex items-center gap-3">
            <span className="red-spark" />
            <span>How It Works</span>
          </div>
          <h2 className="font-syne text-4xl font-extrabold leading-tight tracking-tight text-text-primary md:text-5xl">
            Three steps. No surprises.
          </h2>
        </div>

        <div className="relative grid gap-12 md:grid-cols-3 md:gap-8" data-stagger="120">
          {/* dashed connector (desktop) */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-[8%] right-[8%] top-[3.4rem] hidden md:block"
            style={{
              borderTop: "1px dashed hsl(var(--accent-blue) / 0.25)",
            }}
          />

          {STEPS.map((s) => (
            <div key={s.n} className="reveal relative">
              {/* faint giant number */}
              <span
                aria-hidden
                className="pointer-events-none absolute -top-10 -left-2 select-none font-syne text-[7rem] font-extrabold leading-none text-text-dim/[0.08] md:text-[8rem]"
              >
                {s.n}
              </span>

              <div className="relative">
                <div className="mb-6 flex items-center gap-3">
                  <span className="h-7 w-7 rounded-full bg-bg-deep border border-accent-blue/50 flex items-center justify-center font-mono text-[0.65rem] text-accent-blue">
                    {s.n}
                  </span>
                  <span className="h-px flex-1 bg-white/[0.06]" />
                </div>
                <h3 className="font-syne text-2xl font-bold tracking-tight text-text-primary md:text-3xl">
                  {s.title}
                </h3>
                <p className="mt-4 max-w-xs font-dm text-text-muted">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
