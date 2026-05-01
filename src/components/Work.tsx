import { ArrowUpRight } from "lucide-react";

const PROJECTS = [
  {
    title: "Sunrise Campus Portal",
    desc: "Full college web system, admissions + events + departments.",
    tag: "EDUCATION",
    client: "Academic Institution",
    bg: "var(--gradient-card-teal)",
    span: "lg:col-span-2",
  },
  {
    title: "GreenLeaf Digital Menu",
    desc: "QR ordering + live menu management for a restaurant chain.",
    tag: "HOSPITALITY",
    client: "Restaurant Group",
    bg: "var(--gradient-card-slate)",
    span: "",
  },
  {
    title: "UrbanCraft Agency",
    desc: "Portfolio + lead funnel site for a creative studio.",
    tag: "BUSINESS",
    client: "Creative Studio",
    bg: "var(--gradient-card-charcoal)",
    span: "",
  },
];

export function Work() {
  return (
    <section id="work" className="relative bg-bg-base py-28 md:py-36">
      <div className="container mx-auto">
        <div className="mb-14 flex items-end justify-between gap-6">
          <div className="reveal">
            <div className="label-mono mb-4 flex items-center gap-3">
              <span className="red-spark" />
              <span>Selected Projects</span>
            </div>
            <h2 className="font-syne text-4xl font-extrabold leading-tight tracking-tight text-text-primary md:text-5xl">
              Featured Work
            </h2>
          </div>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-text-muted transition-colors hover:text-accent-blue"
          >
            View All Work
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
        </div>

        <div className="grid gap-5 lg:grid-cols-3" data-stagger="100">
          {PROJECTS.map((p) => (
            <article
              key={p.title}
              className={`reveal group relative overflow-hidden border border-white/[0.05] transition-all duration-500 hover:scale-[1.015] hover:border-accent-blue/40 hover:shadow-glow-blue ${p.span}`}
              style={{ background: p.bg, minHeight: 360 }}
            >
              {/* texture */}
              <div
                aria-hidden
                className="absolute inset-0 opacity-30 mix-blend-overlay"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 20% 10%, hsl(var(--accent-blue) / 0.25) 0%, transparent 45%), radial-gradient(circle at 90% 90%, hsl(var(--accent-blue) / 0.12) 0%, transparent 50%)",
                }}
              />
              <div
                aria-hidden
                className="absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage:
                    "linear-gradient(0deg, transparent 95%, white 95%), linear-gradient(90deg, transparent 95%, white 95%)",
                  backgroundSize: "32px 32px",
                }}
              />

              <div className="relative flex h-full flex-col justify-between p-7 md:p-8">
                <div className="flex items-start justify-between">
                  <span className="font-mono text-[0.65rem] tracking-widest text-text-primary/80">
                    [ {p.tag} ]
                  </span>
                  <ArrowUpRight
                    size={20}
                    className="-translate-x-2 translate-y-1 text-text-primary/0 transition-all duration-500 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:text-text-primary"
                  />
                </div>

                <div>
                  <h3 className="font-syne text-2xl font-bold leading-tight tracking-tight text-text-primary md:text-[1.7rem]">
                    {p.title}
                  </h3>
                  <p className="mt-3 max-w-md font-dm text-sm text-text-primary/70">
                    {p.desc}
                  </p>
                  <div className="mt-5 inline-block border border-white/15 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-widest text-text-primary/60">
                    {p.client}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
