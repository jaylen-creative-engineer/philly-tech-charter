"use client";

import Pill from "../../components/Pill";
import { CharterIcon } from "../../components/CharterIcons";

export default function JourneyHero() {
  return (
    <div className="text-center">
      <p className="hall-kicker mb-6">Philadelphia · America&apos;s 250th Year</p>
      <h1
        className="font-display leading-[1.0] tracking-[-0.03em] text-[var(--color-blue)] drop-shadow-sm"
        style={{ fontSize: "clamp(40px, 8vw, 88px)" }}
      >
        Philly Tech
        <br />
        <span className="text-[var(--color-red)]">Charter</span>
      </h1>
      <p className="mx-auto mt-8 max-w-lg text-[17px] font-light leading-[1.75] text-[var(--color-ink)]">
        Two hundred fifty years ago, people sat in this city and wrote down their intentions for a
        new world.{" "}
        <span className="font-medium text-[var(--color-blue)]">
          Scroll to enter the hall — and walk the path from history to intention.
        </span>
      </p>
      <div className="mt-10 flex items-center justify-center gap-4 max-md:flex-col">
        <Pill variant="red" href="#history">
          Enter the Hall
          <CharterIcon name="chevron-right" size={14} />
        </Pill>
      </div>
      <div className="mt-16 flex flex-col items-center gap-2 font-display text-[9px] uppercase tracking-[0.18em] text-[var(--color-mute)] max-md:hidden">
        <div className="hall-scroll-line h-12 w-px" />
        Scroll to approach
      </div>
    </div>
  );
}
