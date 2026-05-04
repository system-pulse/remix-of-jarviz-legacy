import { Cpu, Sparkles } from "lucide-react";
import { useThemeMode } from "@/hooks/useThemeMode";

export function ModeToggle({ compact = false }: { compact?: boolean }) {
  const { mode, toggle } = useThemeMode();
  const isTech = mode === "tech";

  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${isTech ? "professional" : "tech"} mode`}
      title={`Switch to ${isTech ? "Professional" : "Tech"} mode`}
      className={`group relative inline-flex items-center gap-2 border px-3 py-2 font-mono text-[0.62rem] uppercase tracking-widest transition-all duration-300 ${
        isTech
          ? "border-accent-blue/50 text-accent-blue hover:bg-accent-blue/10 hover:shadow-glow-blue"
          : "border-text-primary/20 text-text-primary hover:border-text-primary/60 hover:bg-text-primary/5"
      }`}
      style={{ borderRadius: 2 }}
    >
      {isTech ? <Cpu size={12} /> : <Sparkles size={12} />}
      {!compact && <span>{isTech ? "Tech Mode" : "Studio Mode"}</span>}
      <span
        aria-hidden
        className={`ml-1 inline-block h-1.5 w-1.5 rounded-full ${
          isTech ? "bg-accent-blue animate-pulse" : "bg-text-primary/70"
        }`}
      />
    </button>
  );
}
