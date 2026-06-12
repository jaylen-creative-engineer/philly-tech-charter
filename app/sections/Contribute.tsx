"use client";

import { useState } from "react";
import ScrollReveal from "../components/ScrollReveal";
import SectionLabel from "../components/SectionLabel";
import Pill from "../components/Pill";
import { Contribution, ContributionType } from "../../lib/types";

const CONTRIBUTION_TYPES: { type: ContributionType; short: string; hint: string }[] = [
  { type: "A new principle", short: "New Principle", hint: "Propose a guiding commitment" },
  { type: "A refinement to existing text", short: "Refinement", hint: "Sharpen what's already written" },
  { type: "A challenge or counterpoint", short: "Challenge", hint: "Push back or question an idea" },
  { type: "A real-world example or evidence", short: "Evidence", hint: "Ground the document in reality" },
  { type: "A question the document doesn't answer", short: "Open Question", hint: "Name what's missing" },
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
  const hasContent = type && text.trim();

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
    setTimeout(() => setSubmitted(false), 5000);
  }

  const inputBase =
    "w-full bg-transparent border-0 border-b-2 border-[var(--color-rule-light)] text-[var(--color-ink)] font-sans text-[15px] py-3 outline-none transition-colors duration-200 focus:border-[var(--color-red)] mb-6 placeholder:text-[var(--color-mute)]";

  const labelBase =
    "font-display block text-[10px] tracking-[0.2em] uppercase text-[var(--color-blue)] mb-2";

  const previewName = name.trim() || "Anonymous";
  const previewContext = context.trim();

  return (
    <section id="contribute" className="py-[120px] px-12 max-w-[1100px] mx-auto max-md:px-6">
      <div className="text-center mb-14">
        <ScrollReveal>
          <SectionLabel>Add Your Voice</SectionLabel>
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <h2
            className="font-display leading-[1.05] text-[var(--color-blue)] mb-4"
            style={{ fontSize: "clamp(32px, 4.6vw, 58px)" }}
          >
            Refine the document.
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={120}>
          <p className="text-[16px] leading-[1.8] text-[var(--color-ink)] max-w-[520px] mx-auto">
            Shape a perspective, principle, or challenge. Watch your contribution take form as you write — every voice sharpens what comes next.
          </p>
        </ScrollReveal>
      </div>

      <ScrollReveal delay={160}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Form */}
          <div className="card-surface bg-[var(--color-paper)] border-[3px] border-[var(--color-blue)] p-10 text-left max-md:p-6">
            {submitted && (
              <div
                className="mb-6 bg-[var(--color-blue)] text-[var(--color-cream)] text-[13px] font-medium px-4 py-3"
                style={{ animation: "riseIn 0.4s ease forwards" }}
              >
                ★ Your voice has been added — scroll down to see it in Voices.
              </div>
            )}

            {error && (
              <div className="mb-6 bg-[var(--color-red)] text-[var(--color-cream)] text-[13px] px-4 py-3">
                {error}
              </div>
            )}

            <p className="font-display text-[10px] tracking-[0.2em] uppercase text-[var(--color-red)] mb-6">
              What are you adding?
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-8 max-sm:grid-cols-1">
              {CONTRIBUTION_TYPES.map(({ type: t, short, hint }) => (
                <button
                  key={t}
                  type="button"
                  data-selected={type === t}
                  className="type-card text-left p-3 cursor-pointer"
                  onClick={() => setType(t)}
                >
                  <p className="font-display text-[10px] tracking-[0.08em] uppercase text-[var(--color-blue)] mb-1">
                    {short}
                  </p>
                  <p className="text-[11px] text-[var(--color-mute)] leading-snug">
                    {hint}
                  </p>
                </button>
              ))}
            </div>

            <label className={labelBase}>Your Name</label>
            <input
              className={inputBase}
              type="text"
              placeholder="How should we credit you?"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label className={labelBase}>Your Context</label>
            <input
              className={inputBase}
              type="text"
              placeholder="City, field, or role — optional"
              value={context}
              onChange={(e) => setContext(e.target.value)}
            />

            {isNewPrinciple && (
              <div style={{ animation: "riseIn 0.35s ease forwards" }}>
                <label className={labelBase}>Principle Title</label>
                <input
                  className={inputBase}
                  type="text"
                  placeholder="A short, memorable phrase"
                  value={principleTitle}
                  onChange={(e) => setPrincipleTitle(e.target.value)}
                />
              </div>
            )}

            <label className={labelBase}>
              {isNewPrinciple ? "Principle Body" : "Your Contribution"}
            </label>
            <textarea
              className="w-full bg-transparent border-2 border-[var(--color-rule-light)] text-[var(--color-ink)] font-sans text-[15px] p-4 outline-none transition-colors duration-200 focus:border-[var(--color-red)] mb-2 resize-y min-h-[140px] placeholder:text-[var(--color-mute)]"
              placeholder={
                isNewPrinciple
                  ? "Describe the principle in 1–3 sentences."
                  : "Write your perspective. Refine as you go — there's no minimum."
              }
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <div className="flex justify-between items-center mb-8">
              <p className="text-[11px] text-[var(--color-mute)]">
                {text.length > 0 ? `${text.length} characters` : "Start writing to preview"}
              </p>
            </div>

            <Pill
              variant="red"
              onClick={handleSubmit}
              className="w-full justify-center text-[14px]"
            >
              {loading ? "Submitting…" : "Submit Contribution"}
            </Pill>
          </div>

          {/* Live preview */}
          <div className="md:sticky md:top-28">
            <p className="font-display text-[10px] tracking-[0.2em] uppercase text-[var(--color-mute)] mb-4">
              Live preview
            </p>
            <div
              className="preview-card p-8 transition-all duration-300"
              style={{
                opacity: hasContent ? 1 : 0.5,
                transform: hasContent ? "scale(1)" : "scale(0.98)",
              }}
            >
              {type ? (
                <p className="font-display text-[9px] tracking-[0.25em] uppercase text-[var(--color-red)] mb-3">
                  {type}
                </p>
              ) : (
                <p className="font-display text-[9px] tracking-[0.25em] uppercase text-[var(--color-mute)]/50 mb-3">
                  Select a contribution type
                </p>
              )}

              {isNewPrinciple && principleTitle.trim() && (
                <p className="font-display text-[12px] tracking-[0.05em] uppercase text-[var(--color-blue)] mb-2">
                  {principleTitle}
                </p>
              )}

              <p className="text-[15px] font-medium leading-[1.7] text-[var(--color-ink)] mb-5 min-h-[60px]">
                {text.trim() ? (
                  <>&ldquo;{text}&rdquo;</>
                ) : (
                  <span className="text-[var(--color-mute)]/40 italic font-normal">
                    Your words will appear here as you type…
                  </span>
                )}
              </p>

              <p className="text-[12px] text-[var(--color-mute)] font-medium border-t border-[var(--color-rule-light)] pt-4">
                {previewName}
                {previewContext ? ` · ${previewContext}` : ""}
              </p>
            </div>

            <p className="text-[11px] text-[var(--color-mute)]/60 mt-3 leading-relaxed">
              Contributions are reviewed and may be incorporated into future versions of the charter.
            </p>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
