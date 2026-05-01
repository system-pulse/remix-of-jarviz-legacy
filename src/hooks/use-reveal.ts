import { useEffect, useRef } from "react";

/**
 * Adds .is-visible to elements with .reveal when they enter the viewport.
 * Use data-stagger="80" on a parent to stagger children by N ms.
 */
export function useReveal() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = ref.current ?? document;
    const targets = root.querySelectorAll<HTMLElement>(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const parent = el.parentElement;
            const stagger = parent?.dataset.stagger ? parseInt(parent.dataset.stagger) : 0;
            if (stagger) {
              const siblings = Array.from(parent!.querySelectorAll<HTMLElement>(":scope > .reveal"));
              const index = siblings.indexOf(el);
              el.style.transitionDelay = `${index * stagger}ms`;
            }
            el.classList.add("is-visible");
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );

    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  return ref;
}
