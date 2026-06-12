import BlueTexture from "../components/BlueTexture";

export default function Footer() {
  return (
    <footer className="blue-surface border-t-[6px] border-[var(--color-red)] text-[var(--color-cream)] px-12 py-12 max-md:px-6">
      <BlueTexture />
      <div className="relative z-10 flex justify-between items-center w-full max-md:flex-col max-md:gap-6 max-md:text-center">
      <p className="font-display text-[16px] leading-[1.3]">
        Philadelphia
        <br />
        <span className="text-[var(--color-gold)]">Declaration · 250</span>
      </p>
      <div className="font-display text-[10px] tracking-[0.15em] uppercase text-[var(--color-cream)]/80 leading-[2.2] text-right max-md:text-center">
        Version 1.0 · May 2026
        <br />
        Written in Philadelphia, PA
        <br />
        <a href="#contribute" className="text-[var(--color-gold)] no-underline hover:underline">
          Contribute to v1.1 →
        </a>
      </div>
      </div>
    </footer>
  );
}
