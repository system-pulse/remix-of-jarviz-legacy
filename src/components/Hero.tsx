import { useEffect, useState } from "react";
import { ParticleField } from "./ParticleField";
import { HexGrid } from "./HexGrid";
import { HeroPanel } from "./HeroPanel";
import { useThemeMode } from "@/hooks/useThemeMode";

const TERMINAL = "[ SYS_ONLINE ] ── JARVIZ TECH v2.0 ── EST. 2023";

export function Hero() {
  const { mode } = useThemeMode();
  const isTech = mode === "tech";
  const [typed, setTyped] = useState("");

  useEffect(() => {
    if (!isTech) {
      setTyped(TERMINAL);
      return;
    }
    setTyped("");
    let i = 0;
    const id = setInterval(() => {
      i++;
      setTyped(TERMINAL.slice(0, i));
      if (i >= TERMINAL.length) clearInterval(id);
    }, 28);
    return () => clearInterval(id);
  }, [isTech]);

  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const services = [
    "Web Development",
    "Software Development",
    "Digital Marketing",
    "Poster & Graphic Design",
    "QR / Restaurant Systems",
    "Maintenance & Support",
  ];

  return (
    <section
      id="hero"
      className={`relative isolate flex min-h-screen items-center overflow-hidden bg-bg-deep ${
        isTech ? "pt-24 pb-40 md:pb-48" : "pt-32 pb-28 md:pb-32"
      }`}
    >
      {/* Background layers — TECH only */}
      {isTech && (
        <div className="absolute inset-0">
          <HexGrid />
          <ParticleField />
          <div className="absolute inset-0 vignette" />
        </div>
      )}

      <div className="container relative mx-auto">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className={`max-w-[820px] ${isTech ? "lg:col-span-8" : "lg:col-span-12"}`}>
            {isTech ? (
              <div className="mb-8 font-mono text-[0.72rem] tracking-widest text-accent-blue/80">
                {typed}
                <span className="ml-0.5 inline-block h-3 w-2 -translate-y-0.5 bg-accent-blue/80 animate-blink align-middle" />
              </div>
            ) : (
              <div className="mb-7 inline-flex items-center gap-3 border-b border-text-primary/15 pb-3">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-blue" />
                <span className="text-[0.72rem] uppercase tracking-[0.22em] text-text-muted">
                  Jarviz Tech · A Digital Studio · Est. 2023
                </span>
              </div>
            )}

            {isTech ? (
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
            ) : (
              <h1
                className="font-syne leading-[1.02] tracking-tight text-text-primary animate-fade-up"
                style={{ fontSize: "clamp(2.4rem, 5.2vw, 5rem)" }}
              >
                A studio for{" "}
                <em className="italic text-accent-blue">thoughtful</em>
                <br />
                websites, software &amp; brand work.
              </h1>
            )}

            <p
              className={`mt-7 max-w-[560px] font-dm leading-relaxed text-text-muted animate-fade-up ${
                isTech ? "text-base font-light" : "text-lg"
              }`}
              style={{ animationDelay: "850ms" }}
            >
              {isTech
                ? "Websites, software, and digital marketing — designed, built, and shipped by a team that actually cares about the details."
                : "We design and build digital products for businesses that care about details — from polished websites and custom software to marketing creatives that actually move the needle."}
            </p>

            {/* Service capability chips */}
            <div
              className="mt-7 flex flex-wrap gap-2 animate-fade-up"
              style={{ animationDelay: "950ms" }}
            >
              {services.map((s) =>
                isTech ? (
                  <span
                    key={s}
                    className="inline-flex items-center gap-2 border border-white/10 bg-white/[0.02] px-3 py-1.5 font-mono text-[0.6rem] tracking-widest text-text-muted transition-colors hover:border-accent-blue/50 hover:text-accent-blue"
                  >
                    <span className="h-1 w-1 rounded-full bg-accent-blue/70" />
                    {s.toUpperCase()}
                  </span>
                ) : (
                  <span
                    key={s}
                    className="inline-flex items-center gap-2 rounded-full border border-text-primary/15 bg-bg-card px-3.5 py-1.5 text-[0.78rem] text-text-primary transition-colors hover:border-accent-blue/50 hover:text-accent-blue"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-accent-blue" />
                    {s}
                  </span>
                ),
              )}
            </div>

            <div
              className="mt-10 flex flex-wrap items-center gap-4 animate-fade-up"
              style={{ animationDelay: "1050ms" }}
            >
              {isTech ? (
                <>
                  <button
                    onClick={() => go("work")}
                    className="bg-accent-blue px-9 py-[15px] font-syne text-sm font-semibold uppercase tracking-wider text-bg-deep transition-all duration-300 hover:shadow-glow-blue-strong hover:-translate-y-0.5"
                    style={{ borderRadius: 4 }}
                  >
                    Explore Our Work
                  </button>
                  <button
                    onClick={() => go("contact")}
                    className="group flex items-center gap-2 border border-white/10 px-9 py-[15px] font-syne text-sm font-semibold uppercase tracking-wider text-text-primary transition-all duration-300 hover:border-accent-blue/60 hover:text-accent-blue hover:shadow-glow-blue"
                    style={{ borderRadius: 4 }}
                  >
                    Start a Project
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => go("contact")}
                    className="rounded-full bg-text-primary px-8 py-3.5 text-sm font-medium text-bg-deep transition-all duration-300 hover:bg-accent-blue hover:-translate-y-0.5"
                  >
                    Start a Project →
                  </button>
                  <button
                    onClick={() => go("work")}
                    className="group flex items-center gap-2 rounded-full border border-text-primary/25 px-8 py-3.5 text-sm font-medium text-text-primary transition-all duration-300 hover:border-text-primary hover:bg-text-primary/5"
                  >
                    See Our Work
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Right-side decorative system panel — TECH desktop only */}
          {isTech && (
            <div className="hidden lg:flex lg:col-span-4 justify-center">
              <HeroPanel />
            </div>
          )}
        </div>
      </div>

      {/* Marquee ticker — TECH only */}
      {isTech && (
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
      )}

      {/* Pro-mode bottom hairline + meta strip */}
      {!isTech && (
        <div className="absolute inset-x-0 bottom-0">
          <div className="container mx-auto flex flex-wrap items-center justify-between gap-3 border-t border-text-primary/10 py-4 text-[0.72rem] uppercase tracking-[0.18em] text-text-muted">
            <span>Based in India · Working worldwide</span>
            <span className="hidden md:inline">Selected for: hospitality · institutions · brands</span>
            <span>Available · 2026</span>
          </div>
        </div>
      )}
    </section>
  );
}
