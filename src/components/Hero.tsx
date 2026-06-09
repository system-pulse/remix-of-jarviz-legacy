import { ParticleField } from "./ParticleField";
import { HexGrid } from "./HexGrid";
import { HeroPanel } from "./HeroPanel";

export function Hero() {
  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      className="relative isolate flex min-h-screen items-center overflow-hidden bg-bg-deep pt-24 pb-32 md:pb-40"
    >
      {/* Background — dimmed */}
      <div className="absolute inset-0 opacity-40">
        <HexGrid />
        <ParticleField />
      </div>
      {/* Glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 -z-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full opacity-30 blur-[120px]"
        style={{ background: "hsl(var(--accent-blue))" }}
      />
      <div className="absolute inset-0 vignette" />

      <div className="container relative mx-auto">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          {/* Status pill */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent-blue/30 bg-accent-blue/5 px-3 py-1 animate-fade-up">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-blue animate-pulse" />
            <span className="font-mono text-[0.65rem] uppercase tracking-widest text-accent-blue">
              Available for New Projects
            </span>
          </div>

          {/* Headline */}
          <h1
            className="font-syne font-extrabold leading-[1.05] tracking-tight text-text-primary animate-fade-up"
            style={{ fontSize: "clamp(2.4rem, 5.2vw, 4.8rem)", animationDelay: "120ms" }}
          >
            We build the tech your{" "}
            <span className="text-accent-blue">business</span> needs to grow.
          </h1>

          {/* Subhead */}
          <p
            className="mt-5 max-w-xl font-dm text-base text-text-muted md:text-lg animate-fade-up"
            style={{ animationDelay: "260ms" }}
          >
            Beautifully crafted websites, smart restaurant systems, and custom dashboards —
            built to attract customers and grow your business.
          </p>

          {/* CTAs */}
          <div
            className="mt-8 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row sm:gap-4 animate-fade-up"
            style={{ animationDelay: "380ms" }}
          >
            <button
              onClick={() => go("contact")}
              className="w-full bg-accent-blue px-8 py-4 font-syne text-sm font-bold uppercase tracking-wider text-bg-deep shadow-glow-blue-strong transition-all duration-300 hover:-translate-y-0.5 sm:w-auto"
              style={{ borderRadius: 8 }}
            >
              Get a Free Estimate in 24h
            </button>
            <button
              onClick={() => go("offerings")}
              className="group flex items-center gap-2 px-6 py-4 font-syne text-sm font-semibold uppercase tracking-wider text-text-primary transition-colors hover:text-accent-blue"
            >
              See what we do
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </button>
          </div>

          {/* Trust line */}
          <div
            className="mt-8 flex items-center justify-center gap-3 opacity-70 animate-fade-up"
            style={{ animationDelay: "500ms" }}
          >
            <div className="flex -space-x-2">
              <span className="h-6 w-6 rounded-full border-2 border-bg-deep bg-bg-card" />
              <span className="h-6 w-6 rounded-full border-2 border-bg-deep bg-bg-surface" />
              <span className="h-6 w-6 rounded-full border-2 border-bg-deep bg-white/10" />
            </div>
            <p className="font-mono text-[0.65rem] uppercase tracking-widest text-text-muted">
              Trusted by restaurants, universities &amp; startups
            </p>
          </div>
        </div>
      </div>

      {/* Marquee ticker */}
      <div className="absolute inset-x-0 bottom-0">
        <div className="h-px w-full bg-white/[0.06]" />
        <div className="overflow-hidden py-4">
          <div className="flex w-max animate-marquee gap-12 whitespace-nowrap font-mono text-[0.7rem] tracking-widest text-text-dim">
            {Array.from({ length: 2 }).map((_, k) => (
              <div key={k} className="flex gap-12">
                {[
                  "CUSTOM WEBSITES", "QR RESTAURANT SYSTEMS", "CUSTOM DASHBOARDS",
                  "DIGITAL MARKETING", "POSTER DESIGN", "MAINTENANCE & SUPPORT",
                ].map((w) => (
                  <span key={w + k} className="flex items-center gap-12">
                    {w}
                    <span className="text-accent-blue/40">·</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
