import { useEffect, useState } from "react";
import { ParticleField } from "./ParticleField";
import { HexGrid } from "./HexGrid";
import { HeroPanel } from "./HeroPanel";

const TERMINAL = "[ SYS_ONLINE ] ── JARVIZ SOLUTIONS v2.0 ── EST. 2023";

export function Hero() {
  const [typed, setTyped] = useState("");

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i++;
      setTyped(TERMINAL.slice(0, i));
      if (i >= TERMINAL.length) clearInterval(id);
    }, 28);
    return () => clearInterval(id);
  }, []);

  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      className="relative isolate flex min-h-screen items-center overflow-hidden bg-bg-deep pt-24 pb-40 md:pb-48"
    >
      {/* Background layers */}
      <div className="absolute inset-0">
        <HexGrid />
        <ParticleField />
        <div className="absolute inset-0 vignette" />
      </div>

      <div className="container relative mx-auto">
        <div className="grid items-center gap-12 lg:grid-cols-12">
        <div className="max-w-[780px] lg:col-span-8">
          <div className="mb-8 font-mono text-[0.72rem] tracking-widest text-accent-blue/80">
            {typed}
            <span className="ml-0.5 inline-block h-3 w-2 -translate-y-0.5 bg-accent-blue/80 animate-blink align-middle" />
          </div>

          <h1
            className="font-syne font-extrabold leading-[0.95] tracking-tight text-text-primary"
            style={{ fontSize: "clamp(2.6rem, 5.5vw, 5.4rem)" }}
          >
            {["We Build Digital", "Experiences That", "Actually Matter."].map((line, i) => (
              <span
                key={i}
                className="block animate-fade-up"
                style={{ animationDelay: `${300 + i * 150}ms` }}
              >
                {line === "Actually Matter." ? (
                  <>
                    Actually Matter
                    <span className="inline-block w-[0.08em]" />
                    <span className="inline-block h-[0.85em] w-[0.06em] translate-y-[0.08em] bg-accent-blue animate-blink" />
                  </>
                ) : (
                  line
                )}
              </span>
            ))}
          </h1>

          <p
            className="mt-7 max-w-[520px] font-dm text-base font-light leading-relaxed text-text-muted animate-fade-up"
            style={{ animationDelay: "850ms" }}
          >
            Websites, software, and digital marketing — designed, built, and shipped by a team that
            actually cares about the details.
          </p>

          {/* Service capability chips */}
          <div
            className="mt-6 flex flex-wrap gap-2 animate-fade-up"
            style={{ animationDelay: "950ms" }}
          >
            {[
              "WEB DEVELOPMENT",
              "QR / RESTAURANT SYSTEMS",
              "SOFTWARE DEVELOPMENT",
              "DIGITAL MARKETING",
              "POSTER & GRAPHIC DESIGN",
              "MAINTENANCE & SUPPORT",
            ].map((s) => (
              <span
                key={s}
                className="inline-flex items-center gap-2 border border-white/10 bg-white/[0.02] px-3 py-1.5 font-mono text-[0.6rem] tracking-widest text-text-muted transition-colors hover:border-accent-blue/50 hover:text-accent-blue"
              >
                <span className="h-1 w-1 rounded-full bg-accent-blue/70" />
                {s}
              </span>
            ))}
          </div>

          <div
            className="mt-10 flex flex-wrap items-center gap-4 animate-fade-up"
            style={{ animationDelay: "1050ms" }}
          >
            <button
              onClick={() => go("contact")}
              className="bg-accent-blue px-9 py-[15px] font-syne text-sm font-semibold uppercase tracking-wider text-bg-deep transition-all duration-300 hover:shadow-glow-blue-strong hover:-translate-y-0.5"
              style={{ borderRadius: 4 }}
            >
              Get a Free Estimate in 24h
            </button>
            <button
              onClick={() => go("work")}
              className="group flex items-center gap-2 border border-white/10 px-9 py-[15px] font-syne text-sm font-semibold uppercase tracking-wider text-text-primary transition-all duration-300 hover:border-accent-blue/60 hover:text-accent-blue hover:shadow-glow-blue"
              style={{ borderRadius: 4 }}
            >
              See Our Work
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </button>
          </div>

          <p
            className="mt-4 font-mono text-[0.7rem] tracking-widest text-text-dim animate-fade-up"
            style={{ animationDelay: "1150ms" }}
          >
            No contracts. No agency bloat. Just results.
          </p>
        </div>

        {/* Right-side decorative system panel — desktop only */}
        <div className="hidden lg:flex lg:col-span-4 justify-center">
          <HeroPanel />
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
                  "WEB DESIGN", "DEVELOPMENT", "QR SYSTEMS", "MOBILE-FIRST",
                  "UI/UX", "FAST DELIVERY", "MAINTENANCE", "DIGITAL PRODUCTS",
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
