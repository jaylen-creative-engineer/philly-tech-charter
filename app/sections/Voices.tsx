"use client";

import { useState } from "react";
import { Contribution } from "../../lib/types";

interface Props {
  contributions: Contribution[];
}

type Tab = "all" | "principles";

function ContributionCard({ c }: { c: Contribution }) {
  const isNew = c.id.startsWith("contrib-");
  return (
    <div
      className="card-surface bg-[var(--color-paper)] border-2 border-[var(--color-rule-light)] border-t-[6px] border-t-[var(--color-blue)] p-8"
      style={{ animation: isNew ? "riseIn 0.6s ease forwards" : "none" }}
    >
      <p className="font-display text-[9px] tracking-[0.25em] uppercase text-[var(--color-red)] mb-3.5">
        {c.type}
      </p>
      {c.principleTitle && (
        <p className="font-display text-[12px] tracking-[0.05em] uppercase text-[var(--color-blue)] mb-1.5">
          {c.principleTitle}
        </p>
      )}
      <p className="text-[15px] font-medium leading-[1.7] text-[var(--color-ink)] mb-5">
        &ldquo;{c.text}&rdquo;
      </p>
      <p className="text-[12px] text-[var(--color-mute)] font-medium">
        {c.name}
        {c.context ? ` · ${c.context}` : ""}
      </p>
    </div>
  );
}

export default function Voices({ contributions }: Props) {
  const [tab, setTab] = useState<Tab>("all");

  const principles = contributions.filter((c) => c.type === "A new principle");
  const displayed = tab === "principles" ? principles : contributions;

  const tabBase =
    "font-display text-[10px] tracking-[0.15em] uppercase px-4 py-2.5 rounded-[var(--radius-md)] transition-colors duration-200 cursor-pointer border-2";
  const activeTab =
    "bg-[var(--color-blue)] border-[var(--color-blue)] text-[var(--color-cream)]";
  const inactiveTab =
    "border-[var(--color-rule-light)] text-[var(--color-mute)] hover:text-[var(--color-blue)] hover:border-[var(--color-blue)]";

  return (
    <section id="voices" className="border-t-[3px] border-[var(--color-blue)] py-24 px-12 max-w-[1200px] mx-auto max-md:px-6">
      <div className="flex flex-wrap items-baseline gap-4 mb-10">
        <h2
          className="font-display text-[var(--color-blue)]"
          style={{ fontSize: "clamp(26px, 3.2vw, 44px)" }}
        >
          Voices
        </h2>
        <span className="font-display text-[11px] text-[var(--color-cream)] tracking-[0.1em] bg-[var(--color-red)] px-3 py-1">
          {contributions.length} contribution{contributions.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-10">
        <button
          className={`${tabBase} ${tab === "all" ? activeTab : inactiveTab}`}
          onClick={() => setTab("all")}
        >
          All Voices
        </button>
        <button
          className={`${tabBase} ${tab === "principles" ? activeTab : inactiveTab}`}
          onClick={() => setTab("principles")}
        >
          Proposed Principles
          {principles.length > 0 && (
            <span className="ml-2 opacity-60">{principles.length}</span>
          )}
        </button>
      </div>

      {displayed.length === 0 ? (
        <p className="text-[14px] text-[var(--color-mute)]">
          No proposed principles yet. Be the first to suggest one.
        </p>
      ) : (
        <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}>
          {displayed.map((c) => (
            <ContributionCard key={c.id} c={c} />
          ))}
        </div>
      )}
    </section>
  );
}
