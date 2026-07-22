import LandingContent from "../components/LandingContent";
import { PRINCIPLES } from "../../lib/data";

interface Props {
  voicesCount?: number;
  versionLabel?: string;
}

export default function Hero({
  voicesCount = 0,
  versionLabel = "1.0",
}: Props) {
  return (
    <section className="hero-surface relative min-h-[100svh] bg-[var(--color-white)] text-[var(--color-ink)]">
      <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="hero-backdrop pointer-events-none" aria-hidden="true" />

      <div className="hero-content">
        <LandingContent
          principlesCount={PRINCIPLES.length}
          voicesCount={voicesCount}
          versionLabel={versionLabel}
        />

        <div className="absolute inset-x-0 bottom-0 flex h-[3px]" aria-hidden="true">
          <div className="flex-[2] bg-[var(--color-red)]" />
          <div className="flex-1 bg-[var(--color-white)]" />
          <div className="flex-[2] bg-[var(--color-blue)]" />
        </div>
      </div>
    </section>
  );
}
