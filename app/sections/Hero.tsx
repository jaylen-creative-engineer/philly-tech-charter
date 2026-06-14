import Pill from "../components/Pill";

export default function Hero() {
  return (
    <section className="hero-surface relative min-h-[100svh] bg-[var(--color-white)] text-[var(--color-ink)]">
      <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="hero-backdrop pointer-events-none" aria-hidden="true" />

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
            <p className="mb-4 font-display text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-red)]">
              Philadelphia · America&apos;s 250th Year
            </p>
            <h1
              className="font-display leading-[1.0] tracking-[-0.03em] text-[var(--color-blue)]"
              style={{ fontSize: "clamp(40px, 8vw, 96px)" }}
            >
              Philly Tech
              <br />
              <span className="text-[var(--color-red)]">Charter</span>
            </h1>
          </div>

          <p className="animate-rise-4 mx-auto mt-8 max-w-xl text-[17px] font-light leading-[1.75] text-[var(--color-ink)] max-md:text-[15px]">
            Two hundred fifty years ago, people sat in this city and wrote down
            their intentions for a new world.{" "}
            <span className="font-medium text-[var(--color-blue)]">
              This is a civic commitment to do it again — for technology, culture, and what comes next.
            </span>
          </p>

          <div className="animate-rise-4 mt-10 flex items-center justify-center gap-4 max-md:flex-col">
            <Pill variant="red" href="#document">
              Read the Charter
            </Pill>
            <Pill variant="outline" href="/contribute">
              Participate
            </Pill>
          </div>
        </div>

        <div className="animate-rise-5 absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 font-display text-[9px] uppercase tracking-[0.18em] text-[var(--color-mute)] max-md:hidden">
          <div className="h-10 w-px bg-[var(--color-rule-light)]" />
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
