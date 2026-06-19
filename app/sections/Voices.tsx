"use client";

import { useState } from "react";
import { Contribution } from "../../lib/types";
import { FetchStatus } from "../../lib/useCharterData";
import { CharterIcon, type CharterIconName } from "../components/CharterIcons";
import { RecordEmpty, RecordError, RecordLoading } from "../components/RecordState";

interface Props {
  contributions: Contribution[];
  status: FetchStatus;
  error: string;
  onRetry: () => void;
}

type Tab = "all" | "principles";

function iconForType(type: string): CharterIconName {
  if (type === "A new principle") return "principle";
  if (type === "A refinement to existing text") return "refinement";
  if (type === "A challenge or counterpoint") return "challenge";
  if (type === "A real-world example or evidence") return "evidence";
  if (type === "A question the document doesn't answer") return "question";
  return "voice";
}

function ContributionCard({ c }: { c: Contribution }) {
  const isNew = c.id.startsWith("contrib-");
  return (
    <div
      className="card-surface bg-[var(--color-paper)] border-2 border-[var(--color-rule-light)] border-t-[6px] border-t-[var(--color-blue)] p-8"
      style={{ animation: isNew ? "riseIn 0.6s ease forwards" : "none" }}
    >
      <div className="flex items-start gap-3 mb-3.5">
        <span className="icon-badge h-8 w-8 shrink-0 text-[var(--color-red)]">
          <CharterIcon name={iconForType(c.type)} size={16} />
        </span>
        <p className="font-display text-[9px] tracking-[0.25em] uppercase text-[var(--color-red)] pt-1.5">
          {c.type}
        </p>
      </div>
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

function emptyMessage(tab: Tab) {
  if (tab === "principles") {
    return "No proposed principles yet. Be the first to suggest one.";
  }

  return "No contributions yet. Be the first to add your voice.";
}

export default function Voices({ contributions, status, error, onRetry }: Props) {
  const [tab, setTab] = useState<Tab>("all");

  const principles = contributions.filter((c) => c.type === "A new principle");
  const displayed = tab === "principles" ? principles : contributions;
  const countLabel =
    status === "loading" ? "…" : `${contributions.length} contribution${contributions.length !== 1 ? "s" : ""}`;

  const tabBase =
    "font-display text-[10px] tracking-[0.15em] uppercase px-4 py-2.5 rounded-[var(--radius-md)] transition-colors duration-200 cursor-pointer border-2 inline-flex items-center gap-2";
  const activeTab =
    "bg-[var(--color-blue)] border-[var(--color-blue)] text-[var(--color-cream)]";
  const inactiveTab =
    "border-[var(--color-rule-light)] text-[var(--color-mute)] hover:text-[var(--color-blue)] hover:border-[var(--color-blue)]";

  return (
    <section id="voices" className="border-t-[3px] border-[var(--color-blue)] py-24 px-12 max-w-[1200px] mx-auto max-md:px-6">
      <div className="flex flex-wrap items-center gap-4 mb-10">
        <span className="icon-badge h-12 w-12 text-[var(--color-blue)]">
          <CharterIcon name="voice" size={24} />
        </span>
        <h2
          className="font-display text-[var(--color-blue)]"
          style={{ fontSize: "clamp(26px, 3.2vw, 44px)" }}
        >
          Voices
        </h2>
        <span className="font-display text-[11px] text-[var(--color-cream)] tracking-[0.1em] bg-[var(--color-red)] px-3 py-1">
          {countLabel}
        </span>
      </div>

      <div className="flex gap-2 mb-10">
        <button
          className={`${tabBase} ${tab === "all" ? activeTab : inactiveTab}`}
          onClick={() => setTab("all")}
          disabled={status === "loading"}
        >
          <CharterIcon name="voice" size={12} />
          All Voices
        </button>
        <button
          className={`${tabBase} ${tab === "principles" ? activeTab : inactiveTab}`}
          onClick={() => setTab("principles")}
          disabled={status === "loading"}
        >
          <CharterIcon name="principle" size={12} />
          Proposed Principles
          {principles.length > 0 && (
            <span className="ml-1 opacity-60">{principles.length}</span>
          )}
        </button>
      </div>

      {status === "loading" ? (
        <RecordLoading label="Loading contributions from the public record…" />
      ) : status === "error" ? (
        <RecordError message={error} onRetry={onRetry} />
      ) : displayed.length === 0 ? (
        <RecordEmpty
          message={emptyMessage(tab)}
          href="/contribute"
          hrefLabel="Add your voice"
        />
      ) : (
        <div
          className="grid gap-3"
          style={{ gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}
        >
          {displayed.map((c) => (
            <ContributionCard key={c.id} c={c} />
          ))}
        </div>
      )}
    </section>
  );
}
