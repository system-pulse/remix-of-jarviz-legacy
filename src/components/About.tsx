import { useSiteSettings } from "@/hooks/useSiteSettings";
import { useThemeMode } from "@/hooks/useThemeMode";

export function About() {
  const { howWeWork } = useSiteSettings();
  const { mode } = useThemeMode();
  const isTech = mode === "tech";

  return (
    <section id="about" className="relative overflow-hidden bg-bg-deep py-28 md:py-36">
      {isTech && (
        <div
          aria-hidden
          className="pointer-events-none absolute -top-10 left-0 select-none font-syne text-[28vw] font-extrabold leading-none text-text-dim/[0.06] md:text-[18rem]"
        >
          02
        </div>
      )}

      <div className="container relative mx-auto grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="reveal">
            <div className="label-mono mb-4 flex items-center gap-3">
              <span className="red-spark" />
              <span>{isTech ? "Who Is Jarviz Tech" : "About the studio"}</span>
            </div>
            <h2 className="font-syne text-4xl font-extrabold leading-[1.05] tracking-tight text-text-primary md:text-6xl">
              {isTech ? (
                <>A Lean Team. <br />Maximum Output.</>
              ) : (
                <>A small team, <br /><em className="italic text-accent-blue">crafting</em> with intent.</>
              )}
            </h2>
          </div>

          <div className="mt-10 space-y-6 max-w-xl" data-stagger="80">
            <p className="reveal font-dm text-text-muted">
              <span className="text-text-primary">Jarviz Tech</span> is a small, capable studio
              that ships polished digital work without the agency overhead. We pick what we work
              on, we own outcomes, and we deliver.
            </p>
            <p className="reveal font-dm text-text-muted">
              We believe in <span className="text-text-primary">speed, clarity, and zero bloat</span>.
              No 200-page decks, no inflated timelines — just thoughtful design and code that
              performs in production.
            </p>
            <p className="reveal font-dm text-text-muted">
              We work with any business that's <span className="text-text-primary">serious about
              digital</span> — colleges, restaurants, studios, and growing brands that want a real
              partner, not a vendor.
            </p>
          </div>
        </div>

        <div className="lg:col-span-5">
          {isTech ? (
            <div className="reveal glass p-2">
              <div className="border-b border-white/5 px-5 py-4 flex items-center justify-between">
                <span className="font-mono text-[0.7rem] tracking-widest text-text-muted">
                  HOW_WE_WORK.SYS
                </span>
                <span className="flex gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-accent-red/60" />
                  <span className="h-2 w-2 rounded-full bg-accent-gold/60" />
                  <span className="h-2 w-2 rounded-full bg-accent-blue/70" />
                </span>
              </div>
              <ul className="divide-y divide-white/5">
                {howWeWork.map((row, i) => (
                  <li key={`${row.tag}-${i}`} className="flex items-center gap-5 border-l-2 border-accent-blue/70 px-5 py-5">
                    <span className="w-24 shrink-0 font-mono text-[0.7rem] tracking-widest text-accent-blue">
                      [ {row.tag} ]
                    </span>
                    <span className="font-dm text-sm text-text-primary md:text-base">{row.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="reveal rounded-lg border border-text-primary/10 bg-bg-card p-2 shadow-sm">
              <div className="px-6 py-5 border-b border-text-primary/10">
                <div className="text-[0.7rem] uppercase tracking-[0.22em] text-accent-blue">How we work</div>
                <div className="mt-1 font-syne text-xl text-text-primary">Our four-step approach</div>
              </div>
              <ol className="divide-y divide-text-primary/10">
                {howWeWork.map((row, i) => (
                  <li key={`${row.tag}-${i}`} className="flex items-start gap-5 px-6 py-5">
                    <span className="mt-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-blue/10 text-xs font-medium text-accent-blue">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <div className="font-syne text-base font-semibold text-text-primary">{row.tag}</div>
                      <div className="mt-0.5 text-sm text-text-muted">{row.text}</div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
