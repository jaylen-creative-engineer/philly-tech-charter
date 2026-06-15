import Pill from "../components/Pill";
import BlueTexture from "../components/BlueTexture";

interface HeroStarProps {
  className: string;
  textureId: string;
}

function HeroStar({ className, textureId }: HeroStarProps) {
  const starPath =
    "M50 4.5 61.6 35.8 95 36.8 68.7 57.3 78.1 89.5 50 71.1 21.9 89.5 31.3 57.3 5 36.8 38.4 35.8 50 4.5Z";

  return (
    <svg
      className={`hero-star ${className}`}
      viewBox="0 0 100 96"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <filter id={textureId} x="-12%" y="-12%" width="124%" height="124%">
          <feTurbulence type="fractalNoise" baseFrequency="1.15" numOctaves="3" seed="23" result="noise" />
          <feColorMatrix
            in="noise"
            type="matrix"
            values="0 0 0 0 0.84 0 0 0 0 0.87 0 0 0 0 0.96 0 0 0 0.28 0"
            result="tint"
          />
          <feBlend in="SourceGraphic" in2="tint" mode="multiply" />
        </filter>
      </defs>
      <path className="hero-star-shadow" d={starPath} />
      <path className="hero-star-rim" d={starPath} />
      <path className="hero-star-face" d={starPath} filter={`url(#${textureId})`} />
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
