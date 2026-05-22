export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-hairline)] px-12 py-12 flex justify-between items-center max-md:flex-col max-md:gap-6 max-md:text-center max-md:px-6">
      <p className="font-serif text-[18px] italic text-[var(--color-mute)]">
        Philadelphia Declaration · 250
      </p>
      <div className="text-[11px] font-medium tracking-[0.15em] uppercase text-[var(--color-mute)] leading-[2] text-right max-md:text-center">
        Version 1.0 · May 2026
        <br />
        Written in Philadelphia, PA
        <br />
        <a href="#contribute" className="text-[var(--color-volt)] no-underline hover:underline">
          Contribute to v1.1 →
        </a>
      </div>
    </footer>
  );
}
