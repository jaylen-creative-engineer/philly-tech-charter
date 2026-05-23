import Pill from "../components/Pill";

export default function Hero() {
  return (
    <>
    {/* Opening statement — the first thing a reader sees */}
    <div className="w-full border-b border-[var(--color-hairline)] px-12 py-5 flex items-center justify-center max-md:px-6">
      <p className="animate-rise-1 font-serif italic text-[var(--color-off-white)] text-center tracking-wide"
        style={{ fontSize: "clamp(15px, 1.6vw, 20px)" }}>
        We Are Living Through History.
      </p>
    </div>

    <section className="relative min-h-screen flex flex-col justify-end px-12 pb-16 overflow-hidden">
      {/* Ghost 250 */}
      <div
        aria-hidden="true"
        className="animate-fade-slow absolute top-0 left-0 right-0 font-serif leading-[0.82] tracking-[-0.02em] px-10 pt-2 pointer-events-none select-none"
        style={{
          fontSize: "clamp(180px, 28vw, 380px)",
          color: "transparent",
          WebkitTextStroke: "1px rgba(200, 241, 53, 0.12)",
        }}
      >
        250
      </div>

      {/* Scroll indicator */}
      <div className="animate-rise-5 absolute bottom-16 right-12 flex flex-col items-center gap-2 text-[9px] tracking-[0.2em] uppercase text-[var(--color-mute)]">
        <div className="animate-scroll-pulse w-px h-12 bg-gradient-to-b from-[var(--color-volt)] to-transparent" />
        Scroll
      </div>

      {/* Content */}
      <p className="animate-rise-1 text-[11px] font-medium tracking-[0.22em] uppercase text-[var(--color-volt)] mb-8">
        Philadelphia · 2026 · A Living Document
      </p>

      <h1
        className="animate-rise-2 font-serif leading-[0.95] tracking-[-0.02em] text-[var(--color-off-white)] max-w-4xl"
        style={{ fontSize: "clamp(44px, 7vw, 96px)" }}
      >
        A gift to America.
        <br />
        <em className="text-[var(--color-volt)]">A design for what comes next.</em>
      </h1>

      <p className="animate-rise-3 mt-8 text-[15px] font-light text-[var(--color-mute)] max-w-lg leading-[1.7]">
        Two hundred fifty years ago, a group of people sat in this city and wrote down their intentions for a new world. We believe it is time to do it again — not as a law, but as a shared commitment to how we move forward together.
      </p>

      <div className="animate-rise-4 mt-12 flex items-center gap-6">
        <Pill variant="volt" href="#document">Read the Document</Pill>
        <Pill variant="outline" href="#contribute">Add Your Voice</Pill>
      </div>
    </section>
    </>
  );
}
