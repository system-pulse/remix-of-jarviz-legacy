import { Github, Instagram, Linkedin } from "lucide-react";
import { ArcReactor } from "./ArcReactor";

const NAV = ["Work", "Services", "About", "Process", "Contact"];

export function Footer() {
  return (
    <footer className="relative bg-bg-deep">
      <div className="h-px w-full bg-white/[0.06]" />
      <div className="container mx-auto py-12">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex items-center gap-2.5">
            <ArcReactor />
            <span className="font-syne text-base font-extrabold tracking-tight text-text-primary">
              JARVIZ<span className="text-accent-blue">TECH</span>
            </span>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2">
            {NAV.map((n) => (
              <button
                key={n}
                onClick={() =>
                  document.getElementById(n.toLowerCase())?.scrollIntoView({ behavior: "smooth" })
                }
                className="nav-link"
              >
                {n}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4 text-text-muted">
            {[
              { Icon: Twitter, href: "#", label: "Twitter" },
              { Icon: Instagram, href: "#", label: "Instagram" },
              { Icon: Linkedin, href: "#", label: "LinkedIn" },
              { Icon: Github, href: "#", label: "GitHub" },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="transition-colors hover:text-accent-blue"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-white/[0.05] pt-6 font-mono text-[0.65rem] uppercase tracking-widest text-text-dim md:flex-row">
          <span>© 2025 Jarviz Tech</span>
          <span>Designed &amp; built with intent.</span>
        </div>
      </div>
    </footer>
  );
}
