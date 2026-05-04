import { ArrowUpRight, ExternalLink } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ProjectModal } from "./ProjectModal";
import { FadeText } from "./FadeText";
import { useProjects, cardBgFor, imageFor, type DBProject } from "@/hooks/useProjects";
import { useThemeMode } from "@/hooks/useThemeMode";

export function Work() {
  const [active, setActive] = useState<DBProject | null>(null);
  const { projects } = useProjects();
  const { mode } = useThemeMode();
  const isTech = mode === "tech";
  const featured = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <section
      id="work"
      className={`relative py-28 md:py-36 ${isTech ? "bg-bg-base" : "bg-bg-base"}`}
    >
      <div className="container mx-auto">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div className="reveal">
            <div className="label-mono mb-4 flex items-center gap-3">
              <span className="red-spark" />
              <span>Selected Projects</span>
            </div>
            <h2 className="font-syne text-4xl font-extrabold leading-tight tracking-tight text-text-primary md:text-5xl">
              {isTech ? "Featured Work" : "A few things we've made."}
            </h2>
          </div>

          {isTech ? (
            <Link
              to="/work"
              className="group relative inline-flex items-center gap-3 overflow-hidden border border-accent-blue/50 bg-accent-blue/[0.06] px-6 py-3 font-syne text-sm font-semibold uppercase tracking-wider text-accent-blue transition-all duration-300 hover:bg-accent-blue hover:text-bg-deep hover:shadow-glow-blue-strong hover:-translate-y-0.5"
              style={{ borderRadius: 4 }}
            >
              <span className="relative">View All Work</span>
              <ArrowUpRight size={16} className="relative transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          ) : (
            <Link
              to="/work"
              className="group inline-flex items-center gap-2 border-b border-text-primary pb-1 text-sm font-medium text-text-primary transition-colors hover:text-accent-blue hover:border-accent-blue"
            >
              View all work
              <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          )}
        </div>

        <div className={`grid gap-6 ${isTech ? "lg:grid-cols-3" : "md:grid-cols-2 lg:grid-cols-3"}`} data-stagger="100">
          {featured.map((p, i) =>
            isTech ? (
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
                      <FadeText text={p.description} words={22} />
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
            ) : (
              // PRO MODE — clean editorial card
              <button
                key={p.id}
                onClick={() => setActive(p)}
                className="group relative flex flex-col overflow-hidden rounded-lg border border-text-primary/10 bg-bg-card text-left shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl animate-fade-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-bg-surface">
                  <img
                    src={imageFor(p)}
                    alt={p.title}
                    loading="lazy"
                    width={1024}
                    height={640}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center justify-between">
                    <span className="text-[0.7rem] uppercase tracking-[0.2em] text-accent-blue">
                      {p.tag}
                    </span>
                    <ArrowUpRight
                      size={18}
                      className="text-text-muted transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-text-primary"
                    />
                  </div>
                  <h3 className="mt-3 font-syne text-2xl leading-tight tracking-tight text-text-primary">
                    {p.title}
                  </h3>
                  <p className="mt-2 font-dm text-sm leading-relaxed text-text-muted">
                    <FadeText text={p.description} words={22} />
                  </p>
                  <div className="mt-5 flex items-center justify-between border-t border-text-primary/10 pt-4">
                    <span className="text-xs italic text-text-muted">{p.client || "Independent"}</span>
                    {p.project_url && (
                      <a
                        href={p.project_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 text-xs font-medium text-accent-blue hover:underline"
                      >
                        Visit site <ExternalLink size={11} />
                      </a>
                    )}
                  </div>
                </div>
              </button>
            ),
          )}
        </div>
      </div>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </section>
  );
}
