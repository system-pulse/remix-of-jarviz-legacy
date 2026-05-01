import { ArrowUpRight } from "lucide-react";

const SERVICES = [
  {
    n: "01",
    title: "Web Design & Development",
    desc: "Custom websites built for performance, clarity, and conversion.",
    tag: "DESIGN",
  },
  {
    n: "02",
    title: "Business & Brand Portals",
    desc: "Landing pages, service sites, client portals — built to grow with you.",
    tag: "BUSINESS",
  },
  {
    n: "03",
    title: "Restaurant & Hospitality Systems",
    desc: "QR menus, table ordering, digital boards, booking integrations.",
    tag: "HOSPITALITY",
  },
  {
    n: "04",
    title: "Maintenance & Support",
    desc: "Speed optimization, updates, uptime monitoring — we stay after delivery.",
    tag: "SUPPORT",
  },
];

export function Services() {
  return (
    <section id="services" className="relative bg-bg-deep py-28 md:py-36">
      <div className="container mx-auto grid gap-16 lg:grid-cols-12">
        {/* Left sticky */}
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <div className="reveal">
              <div className="label-mono mb-4 flex items-center gap-3">
                <span className="red-spark" />
                <span>What We Do</span>
              </div>
              <h2 className="font-syne text-4xl font-extrabold leading-tight tracking-tight text-text-primary md:text-5xl">
                Services built for serious businesses.
              </h2>
              <p className="mt-5 max-w-sm font-dm text-text-muted">
                Four focused offerings. No bloat, no upsells — just the work that actually
                ships and keeps running.
              </p>
            </div>
          </div>
        </div>

        {/* Right rows */}
        <div className="lg:col-span-8" data-stagger="80">
          {SERVICES.map((s) => (
            <a
              key={s.n}
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="reveal group block border-b border-white/[0.06]"
            >
              <div className="grid grid-cols-12 items-center gap-4 py-8 transition-colors duration-500 group-hover:bg-white/[0.015] md:py-10">
                <div className="col-span-2 font-mono text-2xl text-text-dim transition-colors duration-300 group-hover:text-accent-blue md:text-3xl">
                  {s.n}
                </div>
                <div className="col-span-7 md:col-span-8">
                  <h3 className="font-syne text-xl font-bold tracking-tight text-text-primary md:text-2xl">
                    {s.title}
                  </h3>
                  <p className="mt-2 max-w-md font-dm text-sm text-text-muted md:text-base">
                    {s.desc}
                  </p>
                </div>
                <div className="col-span-3 md:col-span-2 flex items-center justify-end gap-3">
                  <span className="hidden font-mono text-[0.65rem] tracking-widest text-text-dim sm:inline">
                    [ {s.tag} ]
                  </span>
                  <ArrowUpRight
                    size={20}
                    className="text-text-muted transition-all duration-300 group-hover:translate-x-1.5 group-hover:-translate-y-0.5 group-hover:text-accent-blue"
                  />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
