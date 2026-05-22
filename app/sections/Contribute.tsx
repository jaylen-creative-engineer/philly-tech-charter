"use client";

import { useState } from "react";
import ScrollReveal from "../components/ScrollReveal";
import SectionLabel from "../components/SectionLabel";
import Pill from "../components/Pill";
import { Contribution, ContributionType } from "../../lib/types";

const CONTRIBUTION_TYPES: ContributionType[] = [
  "A new principle",
  "A refinement to existing text",
  "A challenge or counterpoint",
  "A real-world example or evidence",
  "A question the document doesn't answer",
];

interface Props {
  onSubmit: (c: Contribution) => void;
}

export default function Contribute({ onSubmit }: Props) {
  const [name, setName] = useState("");
  const [context, setContext] = useState("");
  const [type, setType] = useState<ContributionType | "">("");
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit() {
    if (!type || !text.trim()) {
      setError("Please select a contribution type and write your contribution.");
      return;
    }
    setError("");

    const contribution: Contribution = {
      id: `contrib-${Date.now()}`,
      name: name.trim() || "Anonymous",
      context: context.trim(),
      type: type as ContributionType,
      text: text.trim(),
      createdAt: new Date().toISOString(),
    };

    onSubmit(contribution);
    setSubmitted(true);
    setName("");
    setContext("");
    setType("");
    setText("");
    setTimeout(() => setSubmitted(false), 4000);
  }

  const inputBase =
    "w-full bg-transparent border-0 border-b border-[var(--color-hairline)] text-[var(--color-off-white)] font-sans text-[15px] font-light py-3 outline-none transition-colors duration-200 focus:border-[var(--color-volt)] mb-8 placeholder:text-[var(--color-mute)]";

  return (
    <section id="contribute" className="py-[120px] px-12 max-w-[900px] mx-auto text-center max-md:px-6">
      <ScrollReveal>
        <SectionLabel>Add Your Voice</SectionLabel>
      </ScrollReveal>

      <ScrollReveal delay={80}>
        <h2
          className="font-serif leading-[1.05] tracking-[-0.025em] text-[var(--color-off-white)] mb-6"
          style={{ fontSize: "clamp(36px, 5vw, 64px)" }}
        >
          This document
          <br />
          <em className="text-[var(--color-volt)]">belongs to everyone</em>
          <br />
          who signs it.
        </h2>
      </ScrollReveal>

      <ScrollReveal delay={120}>
        <p className="text-[16px] font-light leading-[1.8] text-[var(--color-mute)] max-w-[560px] mx-auto mb-12">
          Submit a perspective, a principle, a challenge, or a refinement. Public contributions are reviewed and incorporated into future versions. Your name and context will be credited in the changelog.
        </p>
      </ScrollReveal>

      <ScrollReveal delay={160}>
        <div className="bg-white/[0.03] border border-[var(--color-hairline)] rounded-sm p-12 text-left max-w-[640px] mx-auto max-md:p-6">
          {submitted && (
            <div className="mb-6 bg-[var(--color-volt)]/10 border border-[var(--color-volt)]/25 text-[var(--color-volt)] text-[13px] font-medium px-4 py-3 rounded-sm">
              Thank you — your voice has been added to the document.
            </div>
          )}

          {error && (
            <div className="mb-6 bg-red-500/10 border border-red-500/25 text-red-400 text-[13px] px-4 py-3 rounded-sm">
              {error}
            </div>
          )}

          <label className="block text-[10px] font-semibold tracking-[0.2em] uppercase text-[var(--color-volt)] mb-2">
            Your Name
          </label>
          <input
            className={inputBase}
            type="text"
            placeholder="How should we credit you?"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label className="block text-[10px] font-semibold tracking-[0.2em] uppercase text-[var(--color-volt)] mb-2">
            Your Context
          </label>
          <input
            className={inputBase}
            type="text"
            placeholder="City, field, or role — optional"
            value={context}
            onChange={(e) => setContext(e.target.value)}
          />

          <label className="block text-[10px] font-semibold tracking-[0.2em] uppercase text-[var(--color-volt)] mb-2">
            Type of Contribution
          </label>
          <select
            className={`${inputBase} cursor-pointer appearance-none`}
            value={type}
            onChange={(e) => setType(e.target.value as ContributionType)}
            style={{ background: "transparent" }}
          >
            <option value="" disabled style={{ background: "#3a3a38" }}>Select one</option>
            {CONTRIBUTION_TYPES.map((t) => (
              <option key={t} value={t} style={{ background: "#3a3a38" }}>{t}</option>
            ))}
          </select>

          <label className="block text-[10px] font-semibold tracking-[0.2em] uppercase text-[var(--color-volt)] mb-2">
            Your Contribution
          </label>
          <textarea
            className="w-full bg-transparent border border-[var(--color-hairline)] text-[var(--color-off-white)] font-sans text-[15px] font-light p-4 outline-none transition-colors duration-200 focus:border-[var(--color-volt)]/40 mb-2 rounded-sm resize-y min-h-[120px] placeholder:text-[var(--color-mute)]"
            placeholder="Write your perspective here. There is no minimum or maximum — speak as clearly as you can."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <p className="text-[12px] text-[var(--color-mute)] leading-[1.6] mb-8">
            By submitting, you agree your contribution may be incorporated into future versions of this document under your name.
          </p>

          <Pill variant="volt" onClick={handleSubmit} className="w-full justify-center text-[14px]">
            Submit Contribution
          </Pill>
        </div>
      </ScrollReveal>
    </section>
  );
}
