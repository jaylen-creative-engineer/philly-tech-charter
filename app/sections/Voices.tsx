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
      className="bg-[var(--color-ash)] p-8"
      style={{ animation: isNew ? "riseIn 0.6s ease forwards" : "none" }}
    >
      <p className="text-[9px] font-semibold tracking-[0.25em] uppercase text-[var(--color-volt)] mb-3.5">
        {c.type}
      </p>
      {c.principleTitle && (
        <p className="font-serif text-[13px] font-semibold tracking-[0.05em] uppercase text-[var(--color-off-white)]/60 mb-1.5">
          {c.principleTitle}
        </p>
      )}
      <p className="font-serif text-[16px] italic leading-[1.7] text-[var(--color-off-white)] mb-5">
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
    "text-[11px] font-semibold tracking-[0.15em] uppercase px-4 py-2 rounded-full transition-colors duration-200 cursor-pointer border";
  const activeTab =
    "bg-[var(--color-volt)]/10 border-[var(--color-volt)]/30 text-[var(--color-volt)]";
  const inactiveTab =
    "border-transparent text-[var(--color-mute)] hover:text-[var(--color-off-white)]";

  return (
    <section id="voices" className="border-t border-[var(--color-hairline)] py-24 px-12 max-w-[1200px] mx-auto max-md:px-6">
      <div className="flex flex-wrap items-baseline gap-4 mb-10">
        <h2
          className="font-serif tracking-[-0.02em] text-[var(--color-off-white)]"
          style={{ fontSize: "clamp(28px, 3.5vw, 48px)" }}
        >
          Voices
        </h2>
        <span className="text-[12px] font-medium text-[var(--color-volt)] tracking-[0.1em] bg-[var(--color-volt)]/10 border border-[var(--color-volt)]/20 px-3 py-1 rounded-full">
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
        <p className="text-[14px] text-[var(--color-mute)] font-light">
          No proposed principles yet. Be the first to suggest one.
        </p>
      ) : (
        <div className="grid gap-0.5" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}>
          {displayed.map((c) => (
            <ContributionCard key={c.id} c={c} />
          ))}
        </div>
      )}
    </section>
  );
}
