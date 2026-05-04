import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, ExternalLink } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CustomCursor } from "@/components/CustomCursor";
import { ProjectModal } from "@/components/ProjectModal";
import { FadeText } from "@/components/FadeText";
import { useProjects, cardBgFor, imageFor, type DBProject } from "@/hooks/useProjects";
import { useReveal } from "@/hooks/use-reveal";
import { useThemeMode } from "@/hooks/useThemeMode";

const AllWork = () => {
  const ref = useReveal();
  const [active, setActive] = useState<DBProject | null>(null);
  const { projects, loading } = useProjects();
  const { mode } = useThemeMode();
  const isTech = mode === "tech";

  return (
    <div ref={ref} className="min-h-screen bg-bg-deep text-text-primary">
      {isTech && <CustomCursor />}
      <Navbar />

      <main className="pt-32 pb-24">
        <section className="container mx-auto">
          <Link
            to="/"
            className="mb-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-text-muted transition-colors hover:text-accent-blue"
          >
            <ArrowLeft size={14} /> Back to home
          </Link>

          <div className="mb-14 max-w-3xl reveal">
            <div className="label-mono mb-4 flex items-center gap-3">
              <span className="red-spark" />
              <span>All Projects</span>
            </div>
            <h1 className="font-syne text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
              Every Project. <br />
              <span className="text-accent-blue">One Place.</span>
            </h1>
            <p className="mt-5 font-dm text-text-muted">
              A complete archive of work shipped under Jarviz Tech — from quick microsites to full
              digital systems.
            </p>
          </div>

          {loading ? (
            <div className="font-mono text-xs uppercase tracking-widest text-text-muted">Loading…</div>
          ) : projects.length === 0 ? (
            <div className="font-mono text-xs uppercase tracking-widest text-text-muted">No projects yet.</div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3" data-stagger="80">
              {projects.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => setActive(p)}
                  className="group relative flex flex-col overflow-hidden border border-white/[0.05] text-left transition-all duration-500 hover:scale-[1.015] hover:border-accent-blue/40 hover:shadow-glow-blue animate-fade-up"
                  style={{ background: cardBgFor(i), minHeight: 380, animationDelay: `${i * 80}ms` }}
                >
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-30 mix-blend-overlay"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at 20% 10%, hsl(var(--accent-blue) / 0.25) 0%, transparent 45%), radial-gradient(circle at 90% 90%, hsl(var(--accent-blue) / 0.12) 0%, transparent 50%)",
                    }}
                  />
                  <div className="relative flex h-full flex-col justify-between p-6 md:p-7">
                    <div className="flex items-start justify-between">
                      <span className="font-mono text-[0.65rem] tracking-widest text-text-primary/80">
                        [ {p.tag} ]
                      </span>
                      <ArrowUpRight
                        size={18}
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
                      <h3 className="font-syne text-xl font-bold leading-tight tracking-tight text-text-primary md:text-2xl">
                        {p.title}
                      </h3>
                      <p className="mt-2 font-dm text-sm text-text-primary/70"><FadeText text={p.description} words={22} /></p>
                      <div className="mt-4 flex flex-wrap items-center gap-2">
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
          )}
        </section>
      </main>

      <Footer />
      <ProjectModal project={active} onClose={() => setActive(null)} />
    </div>
  );
};

export default AllWork;
