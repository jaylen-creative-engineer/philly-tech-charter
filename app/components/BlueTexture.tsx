interface Props {
  /** Hero uses stronger grid + warm glow; sections use subtler depth */
  variant?: "hero" | "section";
}

export default function BlueTexture({ variant = "section" }: Props) {
  const gridStrength = variant === "hero" ? "blue-texture-grid--hero" : "blue-texture-grid--section";

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <div className={`blue-texture-grid ${gridStrength}`} />
      <div className="blue-texture-fine" />
      <div className="blue-texture-grain" />
      <div className="blue-texture-vignette" />
      {variant === "hero" && <div className="hero-glow absolute inset-0" />}
    </div>
  );
}
