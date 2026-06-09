import { QrCode, Smartphone, MonitorPlay, ArrowRight } from "lucide-react";

const FEATURES = [
  {
    Icon: QrCode,
    title: "Digital QR Menu",
    desc: "Update your menu instantly. No reprinting, ever.",
  },
  {
    Icon: Smartphone,
    title: "Online Ordering",
    desc: "Customers order directly from their phone — no app needed.",
  },
  {
    Icon: MonitorPlay,
    title: "Live Order Dashboard",
    desc: "Kitchen staff see every order the moment it lands.",
  },
];

export function RestaurantSystems() {
  return (
    <section
      id="restaurant"
      className="relative py-24 md:py-32"
      style={{ background: "#0a1a16" }}
    >
      <div className="container mx-auto grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
        <div>
          <div className="label-mono mb-4 flex items-center gap-3">
            <span className="red-spark" />
            <span>[ RESTAURANT_SYSTEMS ]</span>
          </div>
          <h2 className="font-syne text-4xl font-extrabold leading-[1.05] tracking-tight text-text-primary md:text-5xl">
            Built for Restaurants. <br />Not Just Websites.
          </h2>
          <p className="mt-5 max-w-md font-dm text-text-muted">
           A complete smart ordering setup that seamlessly connects your phone,  and display screen for faster and smoother service ⚡📱🖨️🖥️
          </p>

          <ul className="mt-10 space-y-5">
            {FEATURES.map(({ Icon, title, desc }) => (
              <li key={title} className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-accent-blue/30 bg-accent-blue/10 text-accent-blue">
                  <Icon size={20} />
                </span>
                <div>
                  <div className="font-syne text-lg font-bold text-text-primary">{title}</div>
                  <div className="mt-1 font-dm text-sm text-text-muted">{desc}</div>
                </div>
              </li>
            ))}
          </ul>

          <a
            href="#work"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="mt-10 inline-flex items-center gap-2 bg-accent-blue px-7 py-3.5 font-syne text-sm font-semibold uppercase tracking-wider text-bg-deep transition-all hover:shadow-glow-blue-strong hover:-translate-y-0.5"
            style={{ borderRadius: 4 }}
          >
            view the Work <ArrowRight size={16} />
          </a>
        </div>

        {/* Mockup panel */}
        <div className="glass relative overflow-hidden p-2">
          <div className="flex items-center justify-between border-b border-white/5 px-5 py-3">
            <span className="font-mono text-[0.65rem] tracking-widest text-text-muted">
              ORDERS.LIVE
            </span>
            <span className="flex items-center gap-2 font-mono text-[0.6rem] text-accent-blue">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-blue animate-pulse" />
              5 ACTIVE
            </span>
          </div>

          <div className="space-y-2 p-4">
            {[
              { t: "Table 04", items: "2× Margherita · 1× Coke", time: "00:42", status: "PREP" },
              { t: "Table 11", items: "1× Paneer Tikka · 2× Naan", time: "01:18", status: "PREP" },
              { t: "Takeaway #207", items: "1× Biryani · 1× Raita", time: "02:05", status: "PLATE" },
              { t: "Table 07", items: "3× Espresso", time: "03:11", status: "READY" },
            ].map((o) => (
              <div
                key={o.t}
                className="flex items-center justify-between border border-white/[0.06] bg-bg-deep/60 px-4 py-3"
              >
                <div>
                  <div className="font-syne text-sm font-bold text-text-primary">{o.t}</div>
                  <div className="font-dm text-xs text-text-muted">{o.items}</div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-[0.6rem] tracking-widest text-accent-blue">
                    {o.status}
                  </div>
                  <div className="font-mono text-[0.6rem] text-text-dim">{o.time}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-white/5 px-5 py-3 font-mono text-[0.6rem] tracking-widest text-text-dim">
            QR_MENU · ORDERING · KITCHEN_DISPLAY
          </div>
        </div>
      </div>
    </section>
  );
}
