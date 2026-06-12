import Pill from "../components/Pill";
import IndependenceHall from "../components/IndependenceHall";
import FlagWaves from "../components/FlagWaves";

export default function Hero() {
  return (
    <>
      {/* Opening bar — wordmark lockup on the cream field, like the poster's airline lockup */}
      <div className="w-full bg-[var(--color-cream)] px-10 py-4 flex items-center justify-between gap-6 max-md:px-6">
        <p className="animate-rise-1 font-display leading-[1.05] text-[clamp(16px,1.8vw,22px)]">
          <span className="text-[var(--color-red)]">Philly Tech</span>
          <br />
          <span className="text-[var(--color-blue)]">Charter</span>
        </p>
        <p className="animate-rise-1 font-display uppercase text-[var(--color-blue)] text-center tracking-[0.18em] text-[12px] max-md:text-[10px]">
          ★ We Are Living Through History ★
        </p>
        <p className="animate-rise-1 font-display uppercase text-[var(--color-red)] tracking-[0.14em] text-[11px] text-right max-md:hidden">
          Est. 1776
          <br />
          <span className="text-[var(--color-blue)]">Renewed 2026</span>
        </p>
      </div>

      <section className="relative bg-[var(--color-blue)] text-[var(--color-cream)] overflow-hidden flex flex-col min-h-screen">
        {/* Flag waves sweeping across the top */}
        <div className="animate-fade-slow relative w-full" aria-hidden="true">
          <FlagWaves className="block w-full h-[26vh] min-h-[160px]" />
        </div>

        {/* Independence Hall centerpiece */}
        <div className="animate-rise-2 flex-1 flex items-end justify-center pt-10">
          <IndependenceHall className="h-[44vh] min-h-[280px] w-auto" />
        </div>

        {/* Giant wordmark — the poster's "Philadelphia" */}
        <div className="px-6 text-center">
          <p className="animate-rise-3 font-display text-[var(--color-gold)] uppercase tracking-[0.3em] text-[11px] mt-10 mb-2">
            2026 · America&apos;s 250th Year · A Living Document
          </p>
          <h1
            className="animate-rise-3 font-display leading-[0.95] tracking-[-0.01em] text-[var(--color-cream)]"
            style={{ fontSize: "clamp(52px, 11vw, 150px)" }}
          >
            Philadelphia
          </h1>
          <p className="animate-rise-4 mx-auto mt-5 max-w-xl text-[15px] leading-[1.7] text-[var(--color-cream)]/85">
            Two hundred fifty years ago, people sat in this city and wrote down
            their intentions for a new world. It is time to do it again — a gift
            to America, and a design for what comes next.
          </p>
        </div>

        {/* Calls to action */}
        <div className="animate-rise-4 flex items-center justify-center gap-4 mt-10 mb-16 max-md:flex-col">
          <Pill variant="red" href="#document">Read the Document</Pill>
          <Pill variant="cream" href="#contribute">Add Your Voice</Pill>
        </div>

        {/* Scroll indicator */}
        <div className="animate-rise-5 absolute bottom-8 right-10 flex flex-col items-center gap-2 font-display text-[9px] tracking-[0.2em] uppercase text-[var(--color-cream)]/70 max-md:hidden">
          <div className="animate-scroll-pulse w-[3px] h-12 bg-[var(--color-red)]" />
          Scroll
        </div>
      </section>
    </>
  );
}
