import Pill from "../components/Pill";
import BlueTexture from "../components/BlueTexture";
import IndependenceHall from "../components/IndependenceHall";
import FlagWaves from "../components/FlagWaves";
import { CharterIcon } from "../components/CharterIcons";

export default function Hero() {
  return (
    <section className="hero-surface blue-surface relative min-h-[100svh] text-[var(--color-cream)]">
      <BlueTexture variant="hero" />

      {/* Full-height blue atmosphere — sits behind all hero content */}
      <div className="hero-flag-blend pointer-events-none absolute inset-0 z-[1]" aria-hidden="true" />

      {/* Flag ribbons — top canopy only */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] pt-12 max-md:pt-10"
        aria-hidden="true"
      >
        <div className="animate-fade-slow relative h-[min(74vh,640px)] min-h-[360px] w-full">
          <FlagWaves className="hero-flag-svg absolute inset-x-0 top-0 h-[68%] w-full" />
        </div>
      </div>

      {/* Single hero moment — flag above, story + call to action together */}
      <div className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center px-6 pb-20 pt-[max(5rem,10vh)] max-md:pb-16 max-md:pt-[max(4.5rem,8vh)]">
        <div className="flex w-full max-w-4xl flex-col items-center text-center">
          {/* Living document */}
          <div className="animate-rise-1 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-[var(--radius-md)] border border-[var(--color-cream)]/25 bg-[var(--color-blue)]/50 px-4 py-2 font-display text-[10px] uppercase tracking-[0.2em] text-[var(--color-cream)]/90 backdrop-blur-sm">
              <span className="animate-pulse-dot h-1.5 w-1.5 rounded-full bg-[var(--color-gold)]" />
              Living Document · v1.0
            </span>
          </div>

          {/* Independence Hall */}
          <div className="animate-rise-2 mt-4 flex justify-center max-md:mt-3">
            <IndependenceHall className="h-[clamp(140px,26vh,280px)] w-auto drop-shadow-[0_20px_40px_rgba(0,0,0,0.25)]" />
          </div>

          {/* Philadelphia call to action */}
          <div className="relative z-10 mt-5 max-md:mt-4">
            <p className="animate-rise-3 mb-3 font-display text-[10px] uppercase tracking-[0.35em] text-[var(--color-gold)]">
              2026 · America&apos;s 250th Year
            </p>
            <h1
              className="animate-rise-3 font-display leading-[0.92] tracking-[-0.02em] text-[var(--color-cream)]"
              style={{ fontSize: "clamp(44px, 9vw, 128px)" }}
            >
              Philadelphia
            </h1>
            <p className="animate-rise-4 mx-auto mt-5 max-w-lg text-[15px] font-light leading-[1.75] text-[var(--color-cream)]/85 max-md:mt-4 max-md:text-[14px]">
              Two hundred fifty years ago, people sat in this city and wrote down
              their intentions for a new world.
              <span className="font-medium text-[var(--color-gold)]"> It is time to do it again.</span>
            </p>
          </div>

          {/* Calls to action */}
          <div className="animate-rise-4 mt-8 flex items-center justify-center gap-4 max-md:mt-6 max-md:flex-col">
            <Pill variant="red" href="#document">
              Read the Charter
              <CharterIcon name="chevron-right" size={14} />
            </Pill>
            <Pill variant="cream" href="/contribute">
              <CharterIcon name="voice" size={14} />
              Participate
            </Pill>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="animate-rise-5 absolute bottom-8 right-10 flex flex-col items-center gap-2 font-display text-[9px] uppercase tracking-[0.2em] text-[var(--color-cream)]/50 max-md:hidden">
          <div className="animate-scroll-pulse h-10 w-[2px] bg-[var(--color-gold)]" />
          Scroll
        </div>

        {/* Bottom tri-color accent */}
        <div className="absolute inset-x-0 bottom-0 flex h-1" aria-hidden="true">
          <div className="flex-1 bg-[var(--color-red)]" />
          <div className="flex-1 bg-[var(--color-gold)]" />
          <div className="flex-1 bg-[var(--color-cream)]" />
        </div>
      </div>
    </section>
  );
}
