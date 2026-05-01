import { useEffect, useState } from "react";
import { ParticleField } from "./ParticleField";
import { HexGrid } from "./HexGrid";

const TERMINAL = "[ SYS_ONLINE ] ── JARVIZ TECH v2.0 ── EST. 2023";

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
      className="relative isolate flex min-h-screen items-center overflow-hidden bg-bg-deep pt-24"
    >
      {/* Background layers */}
      <div className="absolute inset-0">
        <HexGrid />
        <ParticleField />
        <div className="absolute inset-0 vignette" />
      </div>

      <div className="container relative mx-auto">
        <div className="max-w-[780px]">
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
            className="mt-7 max-w-[480px] font-dm text-base font-light leading-relaxed text-text-muted animate-fade-up"
            style={{ animationDelay: "850ms" }}
          >
            Fast. Precise. Pixel-perfect. We design and develop websites, systems, and digital
            products for businesses that are serious about their online presence.
          </p>

          <div
            className="mt-10 flex flex-wrap items-center gap-4 animate-fade-up"
            style={{ animationDelay: "1000ms" }}
          >
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
