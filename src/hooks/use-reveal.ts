import { useEffect, useRef } from "react";

/**
 * Adds .is-visible to elements with .reveal when they enter the viewport.
 * Uses a MutationObserver to catch elements added after async data loads.
 * Use data-stagger="80" on a parent to stagger children by N ms.
 */
export function useReveal() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = ref.current ?? document;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const parent = el.parentElement;
            const stagger = parent?.dataset.stagger
              ? parseInt(parent.dataset.stagger)
              : 0;
            if (stagger) {
              const siblings = Array.from(
                parent!.querySelectorAll<HTMLElement>(":scope > .reveal")
              );
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

    // Observe any .reveal elements already in the DOM
    const observe = (node: ParentNode) => {
      node.querySelectorAll<HTMLElement>(".reveal").forEach((t) => {
        if (!t.classList.contains("is-visible")) observer.observe(t);
      });
    };

    observe(root);

    // Watch for new .reveal elements added after async data loads
    const mutation = new MutationObserver((records) => {
      records.forEach((record) => {
        record.addedNodes.forEach((node) => {
          if (node.nodeType !== 1) return;
          const el = node as HTMLElement;
          if (el.classList?.contains("reveal")) observer.observe(el);
          observe(el); // also check children of added node
        });
      });
    });

    mutation.observe(root as Node, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutation.disconnect();
    };
  }, []);

  return ref;
}