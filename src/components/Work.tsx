import { ArrowUpRight, ExternalLink } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ProjectModal } from "./ProjectModal";
import { FadeText } from "./FadeText";
import { useProjects, cardBgFor, imageFor, type DBProject } from "@/hooks/useProjects";

export function Work() {
  const [active, setActive] = useState<DBProject | null>(null);
  const { projects } = useProjects();
  const featured = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <section id="work" className="relative bg-bg-base py-28 md:py-36">
      <div className="container mx-auto">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div className="reveal">
            <div className="label-mono mb-4 flex items-center gap-3">
              <span className="red-spark" />
              <span>Selected Projects</span>
            </div>
            <h2 className="font-syne text-4xl font-extrabold leading-tight tracking-tight text-text-primary md:text-5xl">
              Featured Work
            </h2>
          </div>

          {/* Highlighted CTA */}
          <Link
            to="/work"
            className="group relative inline-flex items-center gap-3 overflow-hidden border border-accent-blue/50 bg-accent-blue/[0.06] px-6 py-3 font-syne text-sm font-semibold uppercase tracking-wider text-accent-blue transition-all duration-300 hover:bg-accent-blue hover:text-bg-deep hover:shadow-glow-blue-strong hover:-translate-y-0.5"
            style={{ borderRadius: 4 }}
          >
            <span
              aria-hidden
              className="absolute inset-0 -z-0 opacity-40"
              style={{
                background:
                  "linear-gradient(90deg, transparent, hsl(var(--accent-blue) / 0.15), transparent)",
              }}
            />
            <span className="relative">View All Work</span>
            <ArrowUpRight size={16} className="relative transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <div className="grid gap-5 lg:grid-cols-3" data-stagger="100">
          {featured.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setActive(p)}
              className="group relative flex flex-col overflow-hidden border border-white/[0.05] text-left transition-all duration-500 hover:scale-[1.015] hover:border-accent-blue/40 hover:shadow-glow-blue animate-fade-up"
              style={{ background: cardBgFor(i), minHeight: 360, animationDelay: `${i * 100}ms` }}
            >
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

                <div className="my-5 overflow-hidden border border-white/10 shadow-lg">
                  <img
                    src={imageFor(p)}
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
                    <FadeText text={project_descriptionForCard(p)} words={22} />
                  </p>
                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <span className="inline-block border border-white/15 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-widest text-text-primary/60">
                      {p.client || "—"}
                    </span>
                    {p.project_url && (
                      <a
                        href={p.project_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 border border-accent-blue/40 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-widest text-accent-blue transition-colors hover:bg-accent-blue hover:text-bg-deep"
                      >
                        View <ExternalLink size={10} />
                      </a>
                    )}
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
