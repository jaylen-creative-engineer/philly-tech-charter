import Image from "next/image";

const ASPECT = {
  landscape: "aspect-[4/3]",
  wide: "aspect-[21/9]",
  photo: "aspect-[3/2]",
  stereograph: "aspect-[2/1]",
} as const;

interface Props {
  src: string;
  alt: string;
  aspect?: keyof typeof ASPECT;
  objectPosition?: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  /** Vintage scans/slides: optional zoom to crop letterboxing. */
  vintage?: boolean;
  vintageScale?: number;
  fit?: "cover" | "contain";
}

export default function SectionPhoto({
  src,
  alt,
  aspect = "landscape",
  objectPosition = "center",
  className = "",
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 560px",
  vintage = false,
  vintageScale,
  fit = "cover",
}: Props) {
  const scale = vintageScale ?? (vintage ? 1.1 : 1);
  const imageFit = fit === "contain" ? "object-contain" : "object-cover";

  return (
    <div
      className={`relative overflow-hidden rounded-[var(--radius-lg)] ${ASPECT[aspect]} ${
        fit === "contain" ? "bg-[var(--color-cream)]" : ""
      } ${vintage && fit === "cover" ? "" : !vintage ? "border-2 border-[var(--color-rule-light)]" : ""} ${className}`}
    >
      <div
        className="absolute inset-0"
        style={scale !== 1 ? { transform: `scale(${scale})` } : undefined}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          unoptimized
          className={imageFit}
          style={{ objectPosition }}
        />
      </div>
    </div>
  );
}
