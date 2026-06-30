"use client";

import HallPanel from "../../components/hall/HallPanel";
import Pill from "../../components/Pill";
import { CharterIcon } from "../../components/CharterIcons";
import { PRINCIPLES } from "../../../lib/data";

export default function JourneyDocument() {
  return (
    <HallPanel id="document-preview">
      <div className="hall-glass-card">
        <p className="hall-kicker mb-4">Document chamber</p>
        <h2
          className="font-display leading-[1.05] text-[var(--color-blue)] mb-6"
          style={{ fontSize: "clamp(28px, 3.4vw, 42px)" }}
        >
          A Declaration of
          <br />
          <span className="text-[var(--color-red)]">Intentional Design</span>
        </h2>
        <p className="text-[15px] leading-[1.8] text-[var(--color-ink)] mb-8">
          Not a law. Not a policy. An act of collective design — written in the city where America
          first dared to write down what it believed, offered to anyone willing to add their voice.
        </p>
        <Pill variant="red" href="#document">
          Read the full charter
          <CharterIcon name="chevron-right" size={14} />
        </Pill>
      </div>
    </HallPanel>
  );
}

export function JourneyPrinciples() {
  return (
    <HallPanel id="principles-preview">
      <div className="hall-glass-card">
        <p className="hall-kicker mb-4">Principles gallery</p>
        <h2
          className="font-display leading-[1.05] text-[var(--color-blue)] mb-8"
          style={{ fontSize: "clamp(28px, 3.4vw, 42px)" }}
        >
          Six core
          <br />
          <span className="text-[var(--color-red)]">commitments</span>
        </h2>
        <ul className="space-y-4 mb-8">
          {PRINCIPLES.map((p) => (
            <li key={p.num} className="flex gap-4 text-[14px] leading-[1.6] text-[var(--color-ink)]">
              <span className="font-display shrink-0 text-[11px] tracking-[0.2em] text-[var(--color-red)]">
                {p.num}
              </span>
              <span>
                <strong className="font-medium text-[var(--color-blue)]">{p.title}</strong>
              </span>
            </li>
          ))}
        </ul>
        <Pill variant="outline" href="#principles">
          Explore all principles
          <CharterIcon name="chevron-right" size={14} />
        </Pill>
      </div>
    </HallPanel>
  );
}
