import { useEffect, useState } from "react";
import { ArcReactor } from "./ArcReactor";
import { Menu, X } from "lucide-react";
import { ModeToggle } from "./ModeToggle";
import { useThemeMode } from "@/hooks/useThemeMode";

const LINKS = [
  { id: "work", label: "Work" },
  { id: "services", label: "Services" },
  { id: "about", label: "About" },
  { id: "process", label: "Process" },
  { id: "contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);
  const { mode } = useThemeMode();
  const isTech = mode === "tech";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    LINKS.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) obs.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      obs.disconnect();
    };
  }, []);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? isTech
              ? "bg-bg-deep/90 backdrop-blur-2xl border-b border-white/[0.06]"
              : "bg-bg-deep/95 backdrop-blur-md border-b border-text-primary/10"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto flex h-16 items-center justify-between">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2.5"
            aria-label="Jarviz Tech home"
          >
            {isTech ? (
              <>
                <ArcReactor />
                <span className="font-syne text-base font-extrabold tracking-tight text-text-primary">
                  JARVIZ<span className="text-accent-blue">TECH</span>
                </span>
              </>
            ) : (
              <span className="font-syne text-xl font-bold tracking-tight text-text-primary">
                Jarviz<span className="italic text-accent-blue">.</span>Tech
              </span>
            )}
          </button>

          <nav className="hidden items-center gap-9 md:flex">
            {LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className="nav-link"
                data-active={active === l.id}
              >
                {l.label}
              </button>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <ModeToggle />
            {isTech ? (
              <button
                onClick={() => go("contact")}
                className="inline-flex items-center gap-2 border border-accent-red/70 px-4 py-2 font-syne text-xs font-semibold uppercase tracking-wider text-accent-red transition-all duration-300 hover:bg-accent-red hover:text-text-primary hover:shadow-glow-red"
              >
                Get a Quote
              </button>
            ) : (
              <button
                onClick={() => go("contact")}
                className="inline-flex items-center gap-2 rounded-full bg-text-primary px-5 py-2 text-xs font-medium text-bg-deep transition-all duration-300 hover:bg-accent-blue"
              >
                Get a Quote →
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ModeToggle compact />
            <button
              onClick={() => setOpen((o) => !o)}
              className="flex h-10 w-10 items-center justify-center text-text-primary"
              aria-label="Toggle menu"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-40 bg-bg-deep/98 backdrop-blur-2xl transition-opacity duration-500 md:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex h-full flex-col items-start justify-center gap-8 px-8">
          {LINKS.map((l, i) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className="font-syne text-5xl font-extrabold tracking-tight text-text-primary transition-colors hover:text-accent-blue"
              style={{
                opacity: open ? 1 : 0,
                transform: open ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 500ms ${i * 80}ms, transform 500ms ${i * 80}ms`,
              }}
            >
              {l.label}.
            </button>
          ))}
          <button
            onClick={() => go("contact")}
            className="mt-4 border border-accent-red/70 px-6 py-3 font-syne text-sm font-semibold uppercase tracking-wider text-accent-red"
          >
            Get a Quote
          </button>
        </div>
      </div>
    </>
  );
}
