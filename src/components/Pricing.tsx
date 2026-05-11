import { Check } from "lucide-react";

const TIERS = [
  {
    name: "Starter",
    desc: "Static website",
    price: "₹6,000",
    priceLabel: "Starting from",
    timeline: "~1 week",
    cta: "Get Started",
    features: [
      "Up to 7 pages, mobile-friendly",
      "Contact form that emails you directly",
      "Basic SEO setup so you show up on Google",
      "1-2 round of revisions included",
    ],
    highlighted: false,
  },
  {
    name: "Growth",
    desc: "Full stack + integrations",
    price: "₹10,000",
    priceLabel: "Starting from",
    timeline: "2 weeks",
    cta: "Get Started",
    features: [
      "Custom design built around your brand",
      "Login, dashboards, and more",
      "Admin Panel with CRUD operations",
      "Free 30 days of support after launch",
    ],
    highlighted: true,
  },
  {
    name: "Custom",
    desc: "Restaurant system / software",
    price: "Get a quote",
    priceLabel: "",
    timeline: "Discussed on call",
    cta: "Let's Talk",
    features: [
      "QR menus, ordering, kitchen displays",
      "Internal tools or admin panels for your team",
      "Built to fit how your business actually runs",
      "Ongoing maintenance plans available",
    ],
    highlighted: false,
  },
];

export function Pricing() {
  const go = () =>
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="pricing" className="relative bg-bg-deep py-28 md:py-36">
      <div className="container mx-auto">
        <div className="reveal mb-14 max-w-2xl">
          <div className="label-mono mb-4 flex items-center gap-3">
            <span className="red-spark" />
            <span>Pricing</span>
          </div>
          <h2 className="font-syne text-4xl font-extrabold leading-tight tracking-tight text-text-primary md:text-5xl">
            Simple pricing. No surprises.
          </h2>
          <p className="mt-4 font-dm text-text-muted">
            Pick the plan that fits your stage. We'll put the exact number on the table after a
            quick chat.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {TIERS.map((t) => (
            <div
              key={t.name}
              className={`relative flex flex-col border bg-bg-card p-7 transition-all ${
                t.highlighted
                  ? "border-accent-blue/60 shadow-glow-blue"
                  : "border-white/[0.06] hover:border-white/15"
              }`}
            >
              {t.highlighted && (
                <span className="absolute -top-3 left-7 bg-accent-blue px-2.5 py-1 font-mono text-[0.55rem] tracking-widest text-bg-deep">
                  RECOMMENDED
                </span>
              )}
              <div className="font-syne text-2xl font-extrabold text-text-primary">{t.name}</div>
              <div className="mt-1 font-mono text-[0.65rem] uppercase tracking-widest text-text-muted">
                {t.desc}
              </div>

              <div className="mt-6">
                {t.priceLabel && (
                  <div className="font-mono text-[0.6rem] uppercase tracking-widest text-text-dim">
                    {t.priceLabel}
                  </div>
                )}
                <div className="font-syne text-3xl font-extrabold text-text-primary md:text-4xl">
                  {t.price}
                </div>
                <div className="mt-1 font-mono text-[0.65rem] uppercase tracking-widest text-accent-blue">
                  {t.timeline}
                </div>
              </div>

              <ul className="mt-6 space-y-3 border-t border-white/[0.06] pt-6">
                {t.features.map((f) => (
                  <li key={f} className="flex gap-3 font-dm text-sm text-text-muted">
                    <Check size={16} className="mt-0.5 shrink-0 text-accent-blue" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={go}
                className={`mt-7 w-full px-5 py-3 font-syne text-xs font-semibold uppercase tracking-wider transition-all ${
                  t.highlighted
                    ? "bg-accent-blue text-bg-deep hover:shadow-glow-blue-strong"
                    : "border border-white/15 text-text-primary hover:border-accent-blue/50 hover:text-accent-blue"
                }`}
                style={{ borderRadius: 4 }}
              >
                {t.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
