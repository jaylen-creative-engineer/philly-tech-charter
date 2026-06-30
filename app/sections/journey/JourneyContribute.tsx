"use client";

import HallPanel from "../../components/hall/HallPanel";
import Pill from "../../components/Pill";
import { CharterIcon } from "../../components/CharterIcons";

export default function JourneyContribute() {
  return (
    <HallPanel id="contribute-threshold">
      <div className="hall-glass-card hall-glass-card--warm text-center">
        <p className="hall-kicker mb-6">Contribution threshold</p>
        <h2
          className="font-display leading-[1.0] text-[var(--color-blue)] mb-6"
          style={{ fontSize: "clamp(32px, 5vw, 56px)" }}
        >
          The document is alive.
          <br />
          <span className="text-[var(--color-red)]">Your voice can shape it.</span>
        </h2>
        <p className="mx-auto mb-10 max-w-md text-[15px] leading-[1.8] text-[var(--color-ink)]">
          Sign, propose a principle, or add context. Every contribution is saved to the public record.
        </p>
        <div className="flex items-center justify-center gap-4 max-md:flex-col">
          <Pill variant="red" href="/contribute">
            <CharterIcon name="voice" size={14} />
            Contribute now
          </Pill>
          <Pill variant="outline" href="#contribute">
            See how to participate
            <CharterIcon name="chevron-right" size={14} />
          </Pill>
        </div>
      </div>
    </HallPanel>
  );
}
