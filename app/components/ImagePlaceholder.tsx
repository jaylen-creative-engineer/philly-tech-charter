interface Props {
  variant?: PlaceholderVariant;
  aspect?: "square" | "portrait" | "landscape" | "wide" | "tall";
  label?: string;
  className?: string;
}

export type PlaceholderVariant =
  | "liberty"
  | "history"
  | "document"
  | "community"
  | "tech"
  | "signature";

export const PLACEHOLDER_GRADIENTS: Record<PlaceholderVariant, string> = {
  liberty:
    "linear-gradient(145deg, var(--color-blue-deep) 0%, var(--color-blue) 45%, var(--color-red) 100%)",
  history:
    "linear-gradient(160deg, var(--color-brick) 0%, var(--color-gold) 55%, var(--color-cream) 100%)",
  document:
    "linear-gradient(135deg, var(--color-paper) 0%, var(--color-cream) 40%, var(--color-rule-light) 100%)",
  community:
    "linear-gradient(155deg, var(--color-red) 0%, var(--color-gold) 50%, var(--color-blue) 100%)",
  tech:
    "linear-gradient(170deg, var(--color-blue) 0%, var(--color-blue-deep) 60%, var(--color-ink) 100%)",
  signature:
    "linear-gradient(140deg, var(--color-gold) 0%, var(--color-cream) 50%, var(--color-red) 100%)",
};

const ASPECT: Record<NonNullable<Props["aspect"]>, string> = {
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  wide: "aspect-[21/9]",
  tall: "aspect-[2/3]",
};

/**
 * Gradient placeholder for future photography or illustration.
 * Matches the vintage poster palette until real assets are added.
 */
export default function ImagePlaceholder({
  variant = "liberty",
  aspect = "landscape",
  label,
  className = "",
}: Props) {
  return (
    <div
      className={`image-placeholder relative overflow-hidden rounded-[var(--radius-lg)] border-2 border-[var(--color-rule-light)] ${ASPECT[aspect]} ${className}`}
      role="img"
      aria-label={label ?? "Image placeholder"}
    >
      <div
        className="absolute inset-0"
        style={{ background: PLACEHOLDER_GRADIENTS[variant] }}
        aria-hidden="true"
      />
      <div className="image-placeholder-grain absolute inset-0 opacity-40" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/10"
        aria-hidden="true"
      />
      {label && (
        <span className="absolute bottom-3 left-3 font-display text-[9px] uppercase tracking-[0.2em] text-white/70">
          {label}
        </span>
      )}
    </div>
  );
}
