import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { PROJECTS, type Project } from "@/data/projects";
import { ProjectModal } from "./ProjectModal";

export function Work() {
  const [active, setActive] = useState<Project | null>(null);
  const featured = PROJECTS.filter((p) => p.featured);

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
          <Link
            to="/work"
            className="group flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-text-muted transition-colors hover:text-accent-blue"
          >
            View All Work
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>

        <div className="grid gap-5 lg:grid-cols-3" data-stagger="100">
          {featured.map((p) => (
            <button
              key={p.id}
              onClick={() => setActive(p)}
              className={`reveal group relative flex flex-col overflow-hidden border border-white/[0.05] text-left transition-all duration-500 hover:scale-[1.015] hover:border-accent-blue/40 hover:shadow-glow-blue ${p.span ?? ""}`}
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

                {/* Small, undisturbed thumbnail */}
                <div className="my-5 overflow-hidden border border-white/10 shadow-lg">
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    width={1024}
                    height={576}
                    className="aspect-[16/9] h-auto w-full object-cover transition-transform duration-700 group-hover:scale-105"
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
            </button>
          ))}
        </div>
      </div>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </section>
  );
}
