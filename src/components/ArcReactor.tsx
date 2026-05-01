/**
 * Animated arc-reactor logo mark — two counter-rotating rings + core.
 * CSS only.
 */
export function ArcReactor({ size = 22 }: { size?: number }) {
  return (
    <span
      aria-hidden
      className="relative inline-block"
      style={{ width: size, height: size }}
    >
      <span
        className="absolute inset-0 rounded-full border border-accent-blue/60 animate-rotate-slow"
        style={{ borderTopColor: "transparent", borderLeftColor: "transparent" }}
      />
      <span
        className="absolute rounded-full border border-accent-blue/40 animate-rotate-rev"
        style={{
          inset: 3,
          borderBottomColor: "transparent",
          borderRightColor: "transparent",
        }}
      />
      <span
        className="absolute rounded-full bg-accent-blue"
        style={{
          inset: size / 2 - 2,
          width: 4, height: 4,
          boxShadow: "0 0 8px hsl(var(--accent-blue))",
        }}
      />
    </span>
  );
}
