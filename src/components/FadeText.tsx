interface Props {
  text: string;
  words?: number;
  className?: string;
}

/** Truncates text to N words and applies a bottom fade-out gradient mask. */
export function FadeText({ text, words = 22, className = "" }: Props) {
  const all = (text || "").trim().split(/\s+/);
  const truncated = all.length > words;
  const shown = truncated ? all.slice(0, words).join(" ") + "…" : text;

  return (
    <span
      className={`relative inline-block ${className}`}
      style={
        truncated
          ? {
              WebkitMaskImage:
                "linear-gradient(180deg, #000 55%, rgba(0,0,0,0.85) 75%, rgba(0,0,0,0) 100%)",
              maskImage:
                "linear-gradient(180deg, #000 55%, rgba(0,0,0,0.85) 75%, rgba(0,0,0,0) 100%)",
            }
          : undefined
      }
    >
      {shown}
    </span>
  );
}
