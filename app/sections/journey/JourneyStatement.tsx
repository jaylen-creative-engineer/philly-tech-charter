"use client";

import HallPanel from "../../components/hall/HallPanel";

export default function JourneyStatement() {
  return (
    <HallPanel id="statement">
      <div className="hall-glass-card text-center">
        <p className="hall-kicker mb-8">Statement hall</p>
        <blockquote
          className="font-display leading-[1.15] text-[var(--color-blue)]"
          style={{ fontSize: "clamp(20px, 3vw, 38px)" }}
        >
          &ldquo;AI is a tool for our collective growth. Culture is a tool for our collective growth.
          Both need to work as an integrated system so we can solve the problems that sit at the core of
          the systems we all live inside.&rdquo;
        </blockquote>
      </div>
    </HallPanel>
  );
}
