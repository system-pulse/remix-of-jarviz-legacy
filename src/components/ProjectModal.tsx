import { useEffect } from "react";
import { X } from "lucide-react";
import type { Project } from "@/data/projects";

interface Props {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: Props) {
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 animate-fade-up"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      <div
        className="absolute inset-0 bg-bg-deep/85 backdrop-blur-xl"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-white/10 bg-bg-card shadow-glow-blue">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center border border-white/10 bg-bg-deep/70 text-text-primary backdrop-blur transition-colors hover:border-accent-blue/60 hover:text-accent-blue"
        >
          <X size={18} />
        </button>

        <div className="relative aspect-[16/9] w-full overflow-hidden bg-bg-deep">
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover"
            loading="lazy"
            width={1024}
            height={576}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-transparent to-transparent" />
        </div>

        <div className="p-7 md:p-10">
          <div className="mb-3 font-mono text-[0.65rem] tracking-widest text-accent-blue/80">
            [ {project.tag} ]
          </div>
          <h2
            id="project-modal-title"
            className="font-syne text-3xl font-extrabold tracking-tight text-text-primary md:text-4xl"
          >
            {project.title}
          </h2>
          <p className="mt-5 font-dm text-base leading-relaxed text-text-muted">
            {project.longDesc ?? project.desc}
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div>
              <div className="label-mono mb-2">Client</div>
              <div className="font-dm text-text-primary">{project.client}</div>
            </div>
            {project.tags && project.tags.length > 0 && (
              <div>
                <div className="label-mono mb-2">Tags</div>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((t) => (
                    <span
                      key={t}
                      className="border border-white/10 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-widest text-text-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
