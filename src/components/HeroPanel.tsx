import { useEffect, useState } from "react";

const MODULES = [
  { name: "DESIGN_ENGINE", status: "ONLINE" },
  { name: "BUILD_PIPELINE", status: "READY" },
  { name: "DEPLOY_NODE", status: "ACTIVE" },
  { name: "SUPPORT_LINK", status: "OPEN" },
];

export function HeroPanel() {
  const [tick, setTick] = useState(0);
  const [time, setTime] = useState("");

  useEffect(() => {
    const id = setInterval(() => {
      setTick((t) => (t + 1) % 100);
      const d = new Date();
      // IST = UTC + 5:30
      const ist = new Date(d.getTime() + (5 * 60 + 30) * 60 * 1000);
      const pad = (n: number) => String(n).padStart(2, "0");
      setTime(`${pad(ist.getUTCHours())}:${pad(ist.getUTCMinutes())}:${pad(ist.getUTCSeconds())} IST`);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative w-full max-w-[360px] animate-fade-up" style={{ animationDelay: "1100ms" }}>
      {/* Glow halo */}
      <div
        aria-hidden
        className="absolute -inset-8 -z-10 opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, hsl(var(--accent-blue) / 0.18), transparent 70%)",
        }}
      />

      {/* Rotating ring */}
      <div className="relative mx-auto mb-6 h-44 w-44">
        <svg viewBox="0 0 200 200" className="absolute inset-0 animate-rotate-slow text-accent-blue/60">
          <defs>
            <linearGradient id="ring-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="hsl(var(--accent-blue))" stopOpacity="0.9" />
              <stop offset="100%" stopColor="hsl(var(--accent-blue))" stopOpacity="0" />
            </linearGradient>
          </defs>
          <circle cx="100" cy="100" r="92" fill="none" stroke="url(#ring-grad)" strokeWidth="1.5" strokeDasharray="6 8" />
        </svg>
        <svg viewBox="0 0 200 200" className="absolute inset-0 animate-rotate-rev">
          <circle cx="100" cy="100" r="74" fill="none" stroke="hsl(var(--accent-blue) / 0.25)" strokeWidth="1" strokeDasharray="2 6" />
        </svg>
        <svg viewBox="0 0 200 200" className="absolute inset-0">
          <circle cx="100" cy="100" r="56" fill="none" stroke="hsl(var(--accent-blue) / 0.4)" strokeWidth="1" />
          <circle cx="100" cy="100" r="56" fill="none" stroke="hsl(var(--accent-blue))" strokeWidth="1.5"
            strokeDasharray={`${(tick % 100) * 3.5} 999`} strokeLinecap="round" transform="rotate(-90 100 100)" />
        </svg>

        {/* Center monogram */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="font-syne text-[2.4rem] font-extrabold leading-none tracking-tighter text-text-primary">
            JT
          </div>
          <div className="mt-1 font-mono text-[0.55rem] tracking-[0.2em] text-accent-blue">
            v2.0
          </div>
        </div>

        {/* corner ticks */}
        {[0, 90, 180, 270].map((deg) => (
          <span
            key={deg}
            aria-hidden
            className="absolute left-1/2 top-1/2 block h-2 w-px -translate-x-1/2 bg-accent-blue/70"
            style={{ transform: `rotate(${deg}deg) translateY(-90px)` }}
          />
        ))}
      </div>

      {/* Status panel */}
      <div className="glass border border-white/[0.06] p-4">
        <div className="mb-3 flex items-center justify-between border-b border-white/5 pb-2">
          <span className="flex items-center gap-2 font-mono text-[0.6rem] tracking-widest text-text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse-glow" />
            SYSTEM_STATUS
          </span>
          <span className="font-mono text-[0.6rem] tracking-widest text-accent-blue/80">
            {time || "00:00:00 IST"}
          </span>
        </div>
        <ul className="space-y-2">
          {MODULES.map((m) => (
            <li key={m.name} className="flex items-center justify-between font-mono text-[0.65rem] tracking-widest">
              <span className="text-text-muted">{m.name}</span>
              <span className="flex items-center gap-2 text-accent-blue">
                <span className="h-1 w-8 bg-white/[0.06]">
                  <span className="block h-full bg-accent-blue/80" style={{ width: `${60 + ((tick + m.name.length) % 40)}%` }} />
                </span>
                {m.status}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
