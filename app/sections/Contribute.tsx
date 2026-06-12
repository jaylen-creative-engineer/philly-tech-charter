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
  const [principleTitle, setPrincipleTitle] = useState("");
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isNewPrinciple = type === "A new principle";

  async function handleSubmit() {
    if (!type || !text.trim()) {
      setError("Please select a contribution type and write your contribution.");
      return;
    }
    if (isNewPrinciple && !principleTitle.trim()) {
      setError("Please give your principle a title.");
      return;
    }
    setError("");
    setLoading(true);

    const contribution: Contribution = {
      id: `contrib-${Date.now()}`,
      name: name.trim() || "Anonymous",
      context: context.trim(),
      type: type as ContributionType,
      text: text.trim(),
      principleTitle: isNewPrinciple ? principleTitle.trim() : undefined,
      createdAt: new Date().toISOString(),
    };

    try {
      await fetch("/api/contributions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contribution),
      });
    } catch {
      // Non-fatal — optimistic update still happens locally
    }

    onSubmit(contribution);
    setSubmitted(true);
    setName("");
    setContext("");
    setType("");
    setPrincipleTitle("");
    setText("");
    setLoading(false);
    setTimeout(() => setSubmitted(false), 4000);
  }

  const inputBase =
    "w-full bg-transparent border-0 border-b-2 border-[var(--color-rule-light)] text-[var(--color-ink)] font-sans text-[15px] py-3 outline-none transition-colors duration-200 focus:border-[var(--color-red)] mb-8 placeholder:text-[var(--color-mute)]";

  const labelBase =
    "font-display block text-[10px] tracking-[0.2em] uppercase text-[var(--color-blue)] mb-2";

  return (
    <section id="contribute" className="py-[120px] px-12 max-w-[900px] mx-auto text-center max-md:px-6">
      <ScrollReveal>
        <SectionLabel>Add Your Voice</SectionLabel>
      </ScrollReveal>

      <ScrollReveal delay={80}>
        <h2
          className="font-display leading-[1.05] text-[var(--color-blue)] mb-6"
          style={{ fontSize: "clamp(32px, 4.6vw, 58px)" }}
        >
          This document
          <br />
          <span className="text-[var(--color-red)]">belongs to everyone</span>
          <br />
          who signs it.
        </h2>
      </ScrollReveal>

      <ScrollReveal delay={120}>
        <p className="text-[16px] leading-[1.8] text-[var(--color-ink)] max-w-[560px] mx-auto mb-12">
          Submit a perspective, a principle, a challenge, or a refinement. Public contributions are reviewed and incorporated into future versions. Your name and context will be credited in the changelog.
        </p>
      </ScrollReveal>

      <ScrollReveal delay={160}>
        <div className="bg-[var(--color-paper)] border-[3px] border-[var(--color-blue)] p-12 text-left max-w-[640px] mx-auto max-md:p-6">
          {submitted && (
            <div className="mb-6 bg-[var(--color-blue)] text-[var(--color-cream)] text-[13px] font-medium px-4 py-3">
              Thank you — your voice has been added to the document.
            </div>
          )}

          {error && (
            <div className="mb-6 bg-[var(--color-red)] text-[var(--color-cream)] text-[13px] px-4 py-3">
              {error}
            </div>
          )}

          <label className={labelBase}>
            Your Name
          </label>
          <input
            className={inputBase}
            type="text"
            placeholder="How should we credit you?"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label className={labelBase}>
            Your Context
          </label>
          <input
            className={inputBase}
            type="text"
            placeholder="City, field, or role — optional"
            value={context}
            onChange={(e) => setContext(e.target.value)}
          />

          <label className={labelBase}>
            Type of Contribution
          </label>
          <select
            className={`${inputBase} cursor-pointer appearance-none`}
            value={type}
            onChange={(e) => setType(e.target.value as ContributionType)}
            style={{ background: "transparent" }}
          >
            <option value="" disabled>Select one</option>
            {CONTRIBUTION_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>

          {isNewPrinciple && (
            <div style={{ animation: "riseIn 0.35s ease forwards" }}>
              <label className={labelBase}>
                Principle Title
              </label>
              <input
                className={inputBase}
                type="text"
                placeholder="A short, memorable phrase — e.g. 'Transparency before deployment'"
                value={principleTitle}
                onChange={(e) => setPrincipleTitle(e.target.value)}
              />
            </div>
          )}

          <label className={labelBase}>
            {isNewPrinciple ? "Principle Body" : "Your Contribution"}
          </label>
          <textarea
            className="w-full bg-transparent border-2 border-[var(--color-rule-light)] text-[var(--color-ink)] font-sans text-[15px] p-4 outline-none transition-colors duration-200 focus:border-[var(--color-red)] mb-2 resize-y min-h-[120px] placeholder:text-[var(--color-mute)]"
            placeholder={
              isNewPrinciple
                ? "Describe the principle in 1–3 sentences. What should we commit to, and why does it matter?"
                : "Write your perspective here. There is no minimum or maximum — speak as clearly as you can."
            }
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <p className="text-[12px] text-[var(--color-mute)] leading-[1.6] mb-8">
            By submitting, you agree your contribution may be incorporated into future versions of this document under your name.
          </p>

          <Pill
            variant="red"
            onClick={handleSubmit}
            className="w-full justify-center text-[14px]"
          >
            {loading ? "Submitting…" : "Submit Contribution"}
          </Pill>
        </div>
      </ScrollReveal>
    </section>
  );
}
