import Pill from "../components/Pill";
import BlueTexture from "../components/BlueTexture";

interface HeroStarProps {
  className: string;
  textureId: string;
}

function HeroStar({ className, textureId }: HeroStarProps) {
  const starPath =
    "M50 4.5 61.6 35.8 95 36.8 68.7 57.3 78.1 89.5 50 71.1 21.9 89.5 31.3 57.3 5 36.8 38.4 35.8 50 4.5Z";
  const clipId = `${textureId}-clip`;
  const textureFilterId = `${textureId}-texture`;
  const facetLightId = `${textureId}-facet-light`;
  const facetMidId = `${textureId}-facet-mid`;
  const facetDarkId = `${textureId}-facet-dark`;
  const center = "50 53.5";
  const facets = [
    { className: "hero-star-facet--light", d: `M${center} L50 4.5 L61.6 35.8 Z`, fill: facetLightId },
    { className: "hero-star-facet--mid", d: `M${center} L61.6 35.8 L95 36.8 Z`, fill: facetMidId },
    { className: "hero-star-facet--light", d: `M${center} L95 36.8 L68.7 57.3 Z`, fill: facetLightId },
    { className: "hero-star-facet--dark", d: `M${center} L68.7 57.3 L78.1 89.5 Z`, fill: facetDarkId },
    { className: "hero-star-facet--mid", d: `M${center} L78.1 89.5 L50 71.1 Z`, fill: facetMidId },
    { className: "hero-star-facet--dark", d: `M${center} L50 71.1 L21.9 89.5 Z`, fill: facetDarkId },
    { className: "hero-star-facet--light", d: `M${center} L21.9 89.5 L31.3 57.3 Z`, fill: facetLightId },
    { className: "hero-star-facet--mid", d: `M${center} L31.3 57.3 L5 36.8 Z`, fill: facetMidId },
    { className: "hero-star-facet--light", d: `M${center} L5 36.8 L38.4 35.8 Z`, fill: facetLightId },
    { className: "hero-star-facet--dark", d: `M${center} L38.4 35.8 L50 4.5 Z`, fill: facetDarkId },
  ];
  const facetLines =
    "M50 53.5 L50 4.5 M50 53.5 L61.6 35.8 M50 53.5 L95 36.8 M50 53.5 L68.7 57.3 M50 53.5 L78.1 89.5 M50 53.5 L50 71.1 M50 53.5 L21.9 89.5 M50 53.5 L31.3 57.3 M50 53.5 L5 36.8 M50 53.5 L38.4 35.8";

  return (
    <svg
      className={`hero-star ${className}`}
      viewBox="0 0 100 96"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <clipPath id={clipId}>
          <path d={starPath} />
        </clipPath>
        <linearGradient id={facetLightId} x1="35" y1="11" x2="72" y2="79" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fff8c7" />
          <stop offset="48%" stopColor="#e4b94c" />
          <stop offset="100%" stopColor="#8c6419" />
        </linearGradient>
        <linearGradient id={facetMidId} x1="21" y1="20" x2="88" y2="82" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#f5d978" />
          <stop offset="45%" stopColor="#bd8724" />
          <stop offset="100%" stopColor="#54380d" />
        </linearGradient>
        <linearGradient id={facetDarkId} x1="28" y1="7" x2="72" y2="88" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#b98725" />
          <stop offset="52%" stopColor="#6b4a12" />
          <stop offset="100%" stopColor="#211404" />
        </linearGradient>
        <filter id={textureFilterId} x="-12%" y="-12%" width="124%" height="124%">
          <feTurbulence type="fractalNoise" baseFrequency="1.05" numOctaves="4" seed="23" result="noise" />
          <feColorMatrix
            in="noise"
            type="matrix"
            values="0 0 0 0 0.96 0 0 0 0 0.72 0 0 0 0 0.24 0 0 0 0.18 0"
            result="tint"
          />
          <feBlend in="SourceGraphic" in2="tint" mode="overlay" />
        </filter>
      </defs>
      <path className="hero-star-shadow" d={starPath} />
      <path className="hero-star-white-outline" d={starPath} />
      <g clipPath={`url(#${clipId})`} filter={`url(#${textureFilterId})`}>
        {facets.map((facet) => (
          <path
            key={facet.d}
            className={`hero-star-facet ${facet.className}`}
            d={facet.d}
            fill={`url(#${facet.fill})`}
          />
        ))}
      </g>
      <path className="hero-star-facet-lines" d={facetLines} />
      <path className="hero-star-edge" d={starPath} />
    </svg>
  );
}

export default function Hero() {
  return (
    <section className="hero-surface relative min-h-[100svh] bg-[var(--color-blue)] text-[var(--color-white)]">
      <BlueTexture variant="hero" />
      <div className="hero-blue-planes pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="hero-backdrop pointer-events-none" aria-hidden="true" />
      <div className="hero-star-field pointer-events-none absolute inset-0" aria-hidden="true">
        <HeroStar className="hero-star--primary" textureId="hero-star-texture-primary" />
        <HeroStar className="hero-star--upper" textureId="hero-star-texture-upper" />
        <HeroStar className="hero-star--lower" textureId="hero-star-texture-lower" />
      </div>

      <div className="hero-content">
        <div className="hero-inner">
          <div className="animate-rise-1">
            <span className="hero-badge">
              <span className="hero-badge-dot" aria-hidden="true" />
              Living Document · Version 1.0
            </span>
          </div>

          <div className="animate-rise-2 mt-10 flex justify-center">
            <span className="hero-era" aria-label="1776 to 2026">
              <span className="hero-era-year">1776</span>
              <span className="hero-era-line" aria-hidden="true" />
              <span className="hero-era-year">2026</span>
            </span>
          </div>

          <div className="hero-divider animate-rise-2 mt-8" aria-hidden="true" />

          <div className="animate-rise-3 mt-8">
            <p className="hero-kicker mb-4 font-display text-[11px] font-semibold uppercase tracking-[0.2em]">
              Philadelphia · America&apos;s 250th Year
            </p>
            <h1
              className="hero-title font-display leading-[1.0] tracking-[-0.03em]"
              style={{ fontSize: "clamp(40px, 8vw, 96px)" }}
            >
              Philly Tech
              <br />
              <span>Charter</span>
            </h1>
          </div>

          <p className="hero-copy animate-rise-4 mx-auto mt-8 max-w-xl text-[17px] font-light leading-[1.75] max-md:text-[15px]">
            Two hundred fifty years ago, people sat in this city and wrote down
            their intentions for a new world.{" "}
            <span className="font-medium">
              This is a civic commitment to do it again — for technology, culture, and what comes next.
            </span>
          </p>

          <div className="animate-rise-4 mt-10 flex items-center justify-center gap-4 max-md:flex-col">
            <Pill variant="red" href="#document">
              Read the Charter
            </Pill>
            <Pill variant="cream" href="/contribute">
              Participate
            </Pill>
          </div>
        </div>

        <div className="hero-scroll animate-rise-5 absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 font-display text-[9px] uppercase tracking-[0.18em] max-md:hidden">
          <div className="h-10 w-px" />
          Scroll
        </div>

        <div className="absolute inset-x-0 bottom-0 flex h-[3px]" aria-hidden="true">
          <div className="flex-[2] bg-[var(--color-red)]" />
          <div className="flex-1 bg-[var(--color-white)]" />
          <div className="flex-[2] bg-[var(--color-blue)]" />
        </div>
      </div>
    </section>
  );
}
