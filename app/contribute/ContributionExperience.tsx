"use client";

import { useState } from "react";
import BlueTexture from "../components/BlueTexture";
import Pill from "../components/Pill";
import SectionLabel from "../components/SectionLabel";
import { Contribution, ContributionType, Signatory } from "../../lib/types";

type ContributionKind = "signature" | "principle" | "other";

const OTHER_TYPES: { type: ContributionType; short: string; hint: string }[] = [
  {
    type: "A refinement to existing text",
    short: "Refinement",
    hint: "Sharpen language that is already in the charter.",
  },
  {
    type: "A challenge or counterpoint",
    short: "Challenge",
    hint: "Name a tension, disagreement, or missing perspective.",
  },
  {
    type: "A real-world example or evidence",
    short: "Evidence",
    hint: "Ground the document in lived practice or local proof.",
  },
  {
    type: "A question the document doesn't answer",
    short: "Question",
    hint: "Ask what the next version needs to wrestle with.",
  },
];

const KIND_OPTIONS: {
  kind: ContributionKind;
  label: string;
  description: string;
  eyebrow: string;
  previewPrompt: string;
  detailsPrompt: string;
  submitLabel: string;
}[] = [
  {
    kind: "signature",
    label: "Signature",
    description: "Add your name to the public record of people standing with the charter.",
    eyebrow: "Stand with it",
    previewPrompt: "Good. Your signature is a public mark of support. Here is how it can appear.",
    detailsPrompt: "What name should the charter carry forward?",
    submitLabel: "Add my signature",
  },
  {
    kind: "principle",
    label: "Principle",
    description: "Propose a guiding commitment for the next version of the document.",
    eyebrow: "Shape v1.1",
    previewPrompt: "Good. A principle should feel clear enough to remember and strong enough to test.",
    detailsPrompt: "What principle do you want future readers to consider?",
    submitLabel: "Submit this principle",
  },
  {
    kind: "other",
    label: "Other contribution",
    description: "Offer a refinement, challenge, question, example, or piece of evidence.",
    eyebrow: "Add context",
    previewPrompt: "Good. Context helps the charter get sharper, more honest, and more useful.",
    detailsPrompt: "What should the next version make room for?",
    submitLabel: "Submit this contribution",
  },
];

const inputBase =
  "w-full bg-transparent border-0 border-b-2 border-[var(--color-rule-light)] text-[var(--color-ink)] font-sans text-[15px] py-3 outline-none transition-colors duration-200 focus:border-[var(--color-red)] mb-6 placeholder:text-[var(--color-mute)]";

const labelBase =
  "font-display block text-[10px] tracking-[0.2em] uppercase text-[var(--color-blue)] mb-2";

const textareaBase =
  "w-full bg-transparent border-2 border-[var(--color-rule-light)] text-[var(--color-ink)] font-sans text-[15px] p-4 outline-none transition-colors duration-200 focus:border-[var(--color-red)] mb-2 resize-y min-h-[150px] placeholder:text-[var(--color-mute)]";

interface SuccessState {
  kind: ContributionKind;
  title: string;
  message: string;
  href: string;
  hrefLabel: string;
}

function getKindLabel(kind: ContributionKind | "") {
  return KIND_OPTIONS.find((option) => option.kind === kind)?.label ?? "Choose a path";
}

export default function ContributionExperience() {
  const [kind, setKind] = useState<ContributionKind | "">("");
  const [otherType, setOtherType] = useState<ContributionType>(OTHER_TYPES[0].type);
  const [name, setName] = useState("");
  const [context, setContext] = useState("");
  const [principleTitle, setPrincipleTitle] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<SuccessState | null>(null);

  const previewName = name.trim() || (kind === "signature" ? "Your Name" : "Anonymous");
  const previewContext = context.trim();
  const hasSelectedKind = Boolean(kind);
  const isPrinciple = kind === "principle";
  const isSignature = kind === "signature";
  const contributionText = text.trim();
  const selectedOption = KIND_OPTIONS.find((option) => option.kind === kind);

  function handleKindSelect(nextKind: ContributionKind) {
    setKind(nextKind);
    setError("");
    setSuccess(null);
    if (nextKind === "signature") {
      setPrincipleTitle("");
      setText("");
    }
  }

  function resetForm() {
    setKind("");
    setOtherType(OTHER_TYPES[0].type);
    setName("");
    setContext("");
    setPrincipleTitle("");
    setText("");
    setError("");
    setLoading(false);
    setSuccess(null);
  }

  function validate() {
    if (!kind) {
      return "Choose the kind of contribution you want to make.";
    }
    if (isSignature && !name.trim()) {
      return "Please enter your name to sign the charter.";
    }
    if (isPrinciple && !principleTitle.trim()) {
      return "Please give your principle a title.";
    }
    if (!isSignature && !contributionText) {
      return "Please write the contribution you want to add.";
    }
    return "";
  }

  async function submitSignature() {
    const signatory: Signatory = {
      id: `sig-${Date.now()}`,
      name: name.trim(),
      context: context.trim(),
      createdAt: new Date().toISOString(),
    };

    await fetch("/api/signatories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(signatory),
    }).catch(() => {});
  }

  async function submitContribution() {
    const contribution: Contribution = {
      id: `contrib-${Date.now()}`,
      name: name.trim() || "Anonymous",
      context: context.trim(),
      type: isPrinciple ? "A new principle" : otherType,
      text: contributionText,
      principleTitle: isPrinciple ? principleTitle.trim() : undefined,
      createdAt: new Date().toISOString(),
    };

    await fetch("/api/contributions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contribution),
    }).catch(() => {});
  }

  async function handleSubmit() {
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    setLoading(true);

    try {
      if (isSignature) {
        await submitSignature();
        setSuccess({
          kind: "signature",
          title: "Your name has been added.",
          message: "Thank you for standing with the charter.",
          href: "/#signatories",
          hrefLabel: "View signatories",
        });
      } else {
        await submitContribution();
        setSuccess({
          kind: isPrinciple ? "principle" : "other",
          title: isPrinciple ? "Your principle has been added." : "Your contribution has been added.",
          message: "Thank you for helping sharpen what this document can become.",
          href: "/#voices",
          hrefLabel: "View voices",
        });
      }

      setName("");
      setContext("");
      setPrincipleTitle("");
      setText("");
    } catch {
      setError("We could not save that yet. Please try again in a moment.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="blue-surface min-h-screen px-6 pb-24 pt-28 text-[var(--color-cream)]">
      <BlueTexture variant="hero" />
      <div className="relative z-10 mx-auto max-w-[980px]">
        <div className="mb-12 text-center">
          <SectionLabel color="cream">Participate</SectionLabel>
          <h1
            className="font-display mx-auto mb-5 max-w-4xl leading-[0.98] tracking-[-0.02em]"
            style={{ fontSize: "clamp(42px, 7vw, 92px)" }}
          >
            Let&apos;s add your voice, one step at a time.
          </h1>
          <p className="mx-auto max-w-2xl text-[16px] leading-[1.8] text-[var(--color-cream)]/80">
            We&apos;ll begin with a simple question, shape the card together, and end with a clear
            confirmation that your contribution has been received.
          </p>
        </div>

        {success ? (
          <div className="mx-auto max-w-[680px] text-center">
            <div
              className="card-surface mb-6 bg-[var(--color-cream)] px-8 py-10 text-[var(--color-blue)]"
              style={{ animation: "riseIn 0.5s ease forwards" }}
            >
              <span className="mb-4 block text-3xl text-[var(--color-gold)]" aria-hidden="true">
                {success.kind === "signature" ? "★" : "✦"}
              </span>
              <p className="font-display mb-2 text-[20px]">{success.title}</p>
              <p className="text-[14px] leading-[1.7] text-[var(--color-mute)]">{success.message}</p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Pill variant="cream" href={success.href}>
                {success.hrefLabel}
              </Pill>
              <Pill variant="outline" onClick={resetForm} className="border-[var(--color-cream)] text-[var(--color-cream)] hover:bg-[var(--color-cream)] hover:text-[var(--color-blue)]">
                Add another
              </Pill>
            </div>
          </div>
        ) : (
          <div className="card-surface bg-[var(--color-cream)] p-6 text-[var(--color-ink)] shadow-[0_24px_80px_rgba(0,0,0,0.18)] md:p-10">
            <div className="mb-10">
              <p className="font-display mb-2 text-[10px] uppercase tracking-[0.2em] text-[var(--color-red)]">
                First question
              </p>
              <h2 className="font-display mb-4 text-[clamp(24px,3vw,38px)] leading-tight text-[var(--color-blue)]">
                What would you like to contribute?
              </h2>
              <p className="mb-6 max-w-2xl text-[14px] leading-[1.7] text-[var(--color-mute)]">
                Pick the path that feels closest. The next prompt will adapt to what you choose.
              </p>
              <div className="grid gap-3 md:grid-cols-3">
                {KIND_OPTIONS.map((option) => (
                  <button
                    key={option.kind}
                    type="button"
                    data-selected={kind === option.kind}
                    className="type-card cursor-pointer p-4 text-left"
                    onClick={() => handleKindSelect(option.kind)}
                  >
                    <p className="font-display mb-2 text-[9px] uppercase tracking-[0.2em] text-[var(--color-red)]">
                      {option.eyebrow}
                    </p>
                    <p className="font-display mb-2 text-[17px] leading-tight text-[var(--color-blue)]">
                      {option.label}
                    </p>
                    <p className="text-[12px] leading-[1.55] text-[var(--color-mute)]">
                      {option.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-10">
              <p className="font-display mb-2 text-[10px] uppercase tracking-[0.2em] text-[var(--color-red)]">
                {kind ? "Next prompt" : "Waiting for your answer"}
              </p>
              <h2 className="font-display mb-4 text-[clamp(22px,2.6vw,34px)] leading-tight text-[var(--color-blue)]">
                {selectedOption?.previewPrompt ?? "Once you choose a path, we will show the card it creates."}
              </h2>
              <div
                className="preview-card p-7 transition-all duration-300"
                style={{
                  opacity: hasSelectedKind ? 1 : 0.6,
                  transform: hasSelectedKind ? "scale(1)" : "scale(0.99)",
                }}
              >
                <PreviewCard
                  kind={kind}
                  otherType={otherType}
                  name={previewName}
                  context={previewContext}
                  principleTitle={principleTitle}
                  text={contributionText}
                />
              </div>
            </div>

            <div>
              <p className="font-display mb-2 text-[10px] uppercase tracking-[0.2em] text-[var(--color-red)]">
                Final prompt
              </p>
              <h2 className="font-display mb-6 text-[clamp(22px,2.6vw,34px)] leading-tight text-[var(--color-blue)]">
                {selectedOption?.detailsPrompt ?? "Tell us what should go on the card."}
              </h2>

              {error && (
                <div className="mb-6 bg-[var(--color-red)] px-4 py-3 text-[13px] text-[var(--color-cream)]">
                  {error}
                </div>
              )}

              {!kind ? (
                <p className="mb-8 text-[14px] leading-[1.7] text-[var(--color-mute)]">
                  Choose signature, principle, or another contribution type to open the right fields.
                </p>
              ) : (
                <>
                  <label className={labelBase}>
                    Your Name {isSignature && <span className="text-[var(--color-red)]">*</span>}
                  </label>
                  <input
                    className={inputBase}
                    type="text"
                    placeholder={isSignature ? "As you would like it to appear" : "How should we credit you?"}
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    autoComplete="name"
                  />

                  <label className={labelBase}>City / Role</label>
                  <input
                    className={inputBase}
                    type="text"
                    placeholder="Philadelphia, PA · Designer"
                    value={context}
                    onChange={(event) => setContext(event.target.value)}
                  />

                  {isPrinciple && (
                    <div style={{ animation: "riseIn 0.35s ease forwards" }}>
                      <label className={labelBase}>Principle Title *</label>
                      <input
                        className={inputBase}
                        type="text"
                        placeholder="A short, memorable phrase"
                        value={principleTitle}
                        onChange={(event) => setPrincipleTitle(event.target.value)}
                      />
                    </div>
                  )}

                  {kind === "other" && (
                    <div className="mb-8" style={{ animation: "riseIn 0.35s ease forwards" }}>
                      <p className={labelBase}>What kind of contribution is it?</p>
                      <div className="grid gap-2 md:grid-cols-2">
                        {OTHER_TYPES.map((option) => (
                          <button
                            key={option.type}
                            type="button"
                            data-selected={otherType === option.type}
                            className="type-card cursor-pointer p-3 text-left"
                            onClick={() => setOtherType(option.type)}
                          >
                            <p className="font-display mb-1 text-[10px] uppercase tracking-[0.08em] text-[var(--color-blue)]">
                              {option.short}
                            </p>
                            <p className="text-[11px] leading-snug text-[var(--color-mute)]">
                              {option.hint}
                            </p>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {!isSignature && (
                    <>
                      <label className={labelBase}>
                        {isPrinciple ? "Principle Body *" : "Your Contribution *"}
                      </label>
                      <textarea
                        className={textareaBase}
                        placeholder={
                          isPrinciple
                            ? "Describe the principle in 1-3 sentences."
                            : "Write the refinement, question, example, or challenge you want to add."
                        }
                        value={text}
                        onChange={(event) => setText(event.target.value)}
                      />
                      <p className="mb-8 text-[11px] text-[var(--color-mute)]">
                        {text.length > 0 ? `${text.length} characters` : "Start writing to complete the card."}
                      </p>
                    </>
                  )}

                  {isSignature && (
                    <p className="mb-8 text-[12px] leading-[1.6] text-[var(--color-mute)]">
                      Your name joins the public signatory record. Optional context appears beneath it.
                    </p>
                  )}
                </>
              )}

              <Pill
                variant="red"
                onClick={handleSubmit}
                className="w-full justify-center text-[14px]"
              >
                {loading ? "Submitting..." : selectedOption?.submitLabel ?? `Submit ${getKindLabel(kind)}`}
              </Pill>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function PreviewCard({
  kind,
  otherType,
  name,
  context,
  principleTitle,
  text,
}: {
  kind: ContributionKind | "";
  otherType: ContributionType;
  name: string;
  context: string;
  principleTitle: string;
  text: string;
}) {
  if (kind === "signature") {
    return (
      <div>
        <div className="mb-6 flex items-start gap-3">
          <span className="shrink-0 text-lg text-[var(--color-gold)]" aria-hidden="true">
            ★
          </span>
          <div>
            <p className="font-display mb-1 text-[10px] uppercase tracking-[0.2em] text-[var(--color-red)]">
              Signatory
            </p>
            <p className="text-[20px] font-semibold leading-tight text-[var(--color-blue)]">
              {name}
            </p>
            {context ? (
              <p className="mt-1 text-[12px] text-[var(--color-mute)]">{context}</p>
            ) : (
              <p className="mt-1 text-[12px] italic text-[var(--color-mute)]/50">
                City / role will appear here
              </p>
            )}
          </div>
        </div>
        <p className="border-t border-[var(--color-rule-light)] pt-4 text-[12px] leading-[1.6] text-[var(--color-mute)]">
          This is a declaration of intent: technology in Philadelphia should serve everyone.
        </p>
      </div>
    );
  }

  if (kind === "principle") {
    return (
      <div>
        <p className="font-display mb-3 text-[9px] uppercase tracking-[0.25em] text-[var(--color-red)]">
          A new principle
        </p>
        <p className="font-display mb-3 text-[13px] uppercase tracking-[0.08em] text-[var(--color-blue)]">
          {principleTitle.trim() || "Principle title"}
        </p>
        <p className="mb-5 min-h-[72px] text-[16px] font-medium leading-[1.7] text-[var(--color-ink)]">
          {text ? (
            <>&ldquo;{text}&rdquo;</>
          ) : (
            <span className="font-normal italic text-[var(--color-mute)]/45">
              Your proposed principle will appear here.
            </span>
          )}
        </p>
        <p className="border-t border-[var(--color-rule-light)] pt-4 text-[12px] font-medium text-[var(--color-mute)]">
          {name}
          {context ? ` · ${context}` : ""}
        </p>
      </div>
    );
  }

  if (kind === "other") {
    return (
      <div>
        <p className="font-display mb-3 text-[9px] uppercase tracking-[0.25em] text-[var(--color-red)]">
          {otherType}
        </p>
        <p className="mb-5 min-h-[72px] text-[16px] font-medium leading-[1.7] text-[var(--color-ink)]">
          {text ? (
            <>&ldquo;{text}&rdquo;</>
          ) : (
            <span className="font-normal italic text-[var(--color-mute)]/45">
              Your contribution will appear here as a card.
            </span>
          )}
        </p>
        <p className="border-t border-[var(--color-rule-light)] pt-4 text-[12px] font-medium text-[var(--color-mute)]">
          {name}
          {context ? ` · ${context}` : ""}
        </p>
      </div>
    );
  }

  return (
    <div>
      <p className="font-display mb-3 text-[9px] uppercase tracking-[0.25em] text-[var(--color-mute)]/60">
        Waiting for your choice
      </p>
      <p className="min-h-[72px] text-[16px] font-medium leading-[1.7] text-[var(--color-mute)]/50">
        Select a contribution type above to see the shape of what you can add.
      </p>
    </div>
  );
}
