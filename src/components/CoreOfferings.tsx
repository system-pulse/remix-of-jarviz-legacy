import { Monitor, QrCode, LineChart, ArrowRight } from "lucide-react";

const OFFERINGS = [
  {
    Icon: Monitor,
    title: "Custom Websites",
    desc: "Get more customers with a professional, lightning-fast site designed to convert.",
    target: "services",
  },
  {
    Icon: QrCode,
    title: "QR Restaurant Systems",
    desc: "Speed up ordering and cut wait times with simple QR menus and live kitchen displays.",
    target: "restaurant",
  },
  {
    Icon: LineChart,
    title: "Custom Dashboards",
    desc: "See all your business data in one simple view and make better decisions, faster.",
    target: "services",
  },
];

export function CoreOfferings() {
  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="offerings" className="relative bg-bg-deep py-20 md:py-28">
      <div className="container mx-auto">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <div className="label-mono mb-3 inline-flex items-center gap-3">
            <span className="red-spark" />
            <span>What We Build</span>
          </div>
          <h2 className="font-syne text-3xl font-extrabold tracking-tight text-text-primary md:text-4xl">
            Three things we do exceptionally well.
          </h2>
          <p className="mt-3 font-dm text-text-muted">
            Pick what fits your business. We'll handle the rest — design, build, launch, and support.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3 md:gap-6">
          {OFFERINGS.map(({ Icon, title, desc, target }) => (
            <button
              key={title}
              onClick={() => go(target)}
              className="group flex flex-col items-start rounded-2xl border border-white/5 bg-bg-card p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:border-accent-blue/40 hover:shadow-glow-blue md:p-8"
            >
              <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-accent-blue/10 text-accent-blue transition-colors group-hover:bg-accent-blue/20">
                <Icon size={22} />
              </span>
              <h3 className="font-syne text-xl font-bold tracking-tight text-text-primary md:text-2xl">
                {title}
              </h3>
              <p className="mt-2 font-dm text-sm leading-relaxed text-text-muted">
                {desc}
              </p>
              <span className="mt-5 inline-flex items-center gap-2 font-mono text-[0.65rem] font-bold uppercase tracking-widest text-accent-blue">
                Learn more
                <ArrowRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
