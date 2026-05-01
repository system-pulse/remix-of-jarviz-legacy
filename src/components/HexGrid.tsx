/**
 * Faint breathing hexagonal grid behind hero content.
 */
export function HexGrid() {
  // hex pattern: width 80, height ~92
  return (
    <svg
      aria-hidden
      className="absolute inset-0 h-full w-full animate-hex-breathe"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="hex" width="80" height="92" patternUnits="userSpaceOnUse" patternTransform="translate(0,0)">
          <path
            d="M40 2 L77 22 L77 64 L40 84 L3 64 L3 22 Z"
            fill="none"
            stroke="hsl(var(--accent-blue))"
            strokeOpacity="0.08"
            strokeWidth="1"
          />
        </pattern>
        <radialGradient id="hex-mask" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <mask id="hex-fade">
          <rect width="100%" height="100%" fill="url(#hex-mask)" />
        </mask>
      </defs>
      <rect width="100%" height="100%" fill="url(#hex)" mask="url(#hex-fade)" />
    </svg>
  );
}
