"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import BlueTexture from "../components/BlueTexture";
import Pill from "../components/Pill";
import { PRINCIPLE_SUMMARIES, PRINCIPLES } from "../../lib/data";
import { Contribution, ContributionType, Signatory } from "../../lib/types";
import {
  readParticipantProfile,
  resolveParticipantAttribution,
  saveParticipantProfile,
} from "../../lib/participant-profile";
import { normalizeSignatoryName } from "../../lib/supabase";
import { markCharterDataStale, useCharterData } from "../../lib/useCharterData";

type ContributionKind = "signature" | "principle" | "other";
type Stage = "choose" | "draft" | "sign" | "done";

const OTHER_TYPES: { type: ContributionType; short: string; hint: string }[] = [
  {
    type: "A refinement to existing text",
    short: "Refinement",
    hint: "Sharpen language already in the charter.",
  },
  {
    type: "A challenge or counterpoint",
    short: "Challenge",
    hint: "Name a tension or missing perspective.",
  },
  {
    type: "A real-world example or evidence",
    short: "Evidence",
    hint: "Ground it in lived, local proof.",
  },
  {
    type: "A question the document doesn't answer",
    short: "Question",
    hint: "Ask what the next version must wrestle with.",
  },
];

const PATHS: {
  kind: ContributionKind;
  num: string;
  eyebrow: string;
  label: string;
  description: string;
  highlight?: boolean;
}[] = [
  {
    kind: "signature",
    num: "01",
    eyebrow: "Stand with it",
    label: "Signature",
    description: "Add your name to the public record of people standing with the charter.",
  },
  {
    kind: "principle",
    num: "02",
    eyebrow: "Shape v1.1",
    label: "Principle",
    description: "Propose a guiding commitment for the next version of the document.",
    highlight: true,
  },
  {
    kind: "other",
    num: "03",
    eyebrow: "Add context",
    label: "Other contribution",
    description: "Offer a refinement, challenge, question, or piece of evidence.",
  },
];

interface SessionCommit {
  kind: ContributionKind;
  type?: ContributionType;
  title?: string;
  body: string;
  name: string;
  context: string;
  num?: string;
}

function getConsoleText({
  stage,
  kind,
  name,
  principleTitle,
  text,
}: {
  stage: Stage;
  kind: ContributionKind | "";
  name: string;
  principleTitle: string;
  text: string;
}) {
  if (stage === "choose") {
    return "Awaiting your first answer. Choose a path to begin.";
  }
  if (stage === "done") {
    return "Received. Your contribution is now part of the public record.";
  }
  if (kind === "principle" && stage === "draft") {
    if (!principleTitle.trim()) return "Principle path open. Start with a short, memorable title.";
    if (!text.trim()) return "Title received. Now write it in one to three sentences.";
    return "Draft looks ready. Continue to sign it.";
  }
  if (kind === "other" && stage === "draft") {
    if (!text.trim()) return "Choose a type, then write the perspective this needs.";
    return "Draft ready. Continue to sign it.";
  }
  if (kind === "signature" && stage === "sign") {
    if (!name.trim()) return "Signature path open. Type the name the charter should carry forward.";
    return "Ready to sign. Add your name to the record.";
  }
  if (stage === "sign") {
    if (!name.trim()) return "Almost there. Add your name to sign this contribution.";
    return "Ready. Add it to the document when it feels right.";
  }
  return "Choose a path to begin.";
}

function shortForType(type: ContributionType) {
  return OTHER_TYPES.find((option) => option.type === type)?.short ?? "Voice";
}

export default function ContributionExperience() {
  const [stage, setStage] = useState<Stage>("choose");
  const [kind, setKind] = useState<ContributionKind | "">("");
  const [otherType, setOtherType] = useState<ContributionType>(OTHER_TYPES[0].type);
  const [name, setName] = useState("");
  const [context, setContext] = useState("");
  const [principleTitle, setPrincipleTitle] = useState("");
  const [text, setText] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionCommits, setSessionCommits] = useState<SessionCommit[]>([]);
  const [lastKind, setLastKind] = useState<ContributionKind | "">("");
  const appliedPreselection = useRef(false);

  const { contributions } = useCharterData();

  const isPrinciple = kind === "principle";
  const isSignature = kind === "signature";
  const titleReady = principleTitle.trim().length > 0;
  const bodyReady = text.trim().length > 0;
  const continueReady = isPrinciple ? titleReady && bodyReady : bodyReady;
  const submitReady = name.trim().length > 0;

  const proposedFromRecord = contributions.filter((c) => c.type === "A new principle");
  const sessionPrinciples = sessionCommits.filter((c) => c.kind === "principle");
  const sessionOnlyPrinciples = sessionPrinciples.filter(
    (commit) =>
      !proposedFromRecord.some(
        (entry) => entry.principleTitle === commit.title && entry.name === commit.name,
      ),
  );
  const principlesCount =
    PRINCIPLES.length + proposedFromRecord.length + sessionOnlyPrinciples.length;
  const versionLabel = principlesCount > PRINCIPLES.length ? "1.1" : "1.0";
  const draftNum = String(principlesCount + 1).padStart(2, "0");

  const consoleText = getConsoleText({
    stage,
    kind,
    name,
    principleTitle,
    text,
  });

  let eyebrow = "";
  let heading = "";
  let subhead = "";
  if (stage === "choose") {
    eyebrow = "Philadelphia Declaration · Intake";
    heading = "What would you like to contribute?";
    subhead = "Pick the path that fits. The document on the right updates as you go.";
  } else if (isPrinciple && stage === "draft") {
    eyebrow = "Shape v1.1 · Principle";
    heading = "Name the commitment.";
    subhead = "A principle is clear enough to remember and strong enough to test.";
  } else if (kind === "other" && stage === "draft") {
    eyebrow = "Add context";
    heading = "What should the next version make room for?";
    subhead = "A refinement, challenge, question, or piece of evidence.";
  } else if (isSignature && stage === "sign") {
    eyebrow = "Stand with it";
    heading = "Add your name.";
    subhead = "Your signature joins the public record of people behind the charter.";
  } else if (stage === "sign") {
    eyebrow = "Attribution";
    heading = "Sign your contribution.";
    subhead = "This is how you will be credited in the document.";
  }

  let submitLabel = "Add to the record";
  if (isPrinciple) submitLabel = "Add to the document";
  else if (isSignature) submitLabel = "Add my signature";

  let doneTag = "";
  let doneTitle = "";
  let doneMsg = "";
  if (stage === "done") {
      if (lastKind === "principle") {
      const last = sessionOnlyPrinciples[sessionOnlyPrinciples.length - 1]
        ?? sessionPrinciples[sessionPrinciples.length - 1];
      doneTag = "Added to v1.1";
      doneTitle = `Principle ${last?.num ?? ""} has joined the record.`;
      doneMsg =
        "Your commitment is now part of the working draft for v1.1. Every reader will see it — credited to you.";
    } else if (lastKind === "signature") {
      doneTag = "Signed";
      doneTitle = "Your name is on the record.";
      doneMsg =
        "Thank you for standing with the charter. Your signature is now part of the public declaration of support.";
    } else {
      doneTag = "Recorded";
      doneTitle = "Your voice has been added.";
      doneMsg =
        "Thank you for helping sharpen what this document can become. It now sits with the other voices shaping v1.1.";
    }
  }

  const showDraftSlot = isPrinciple && (stage === "draft" || stage === "sign");
  const recentVoices = [
    ...sessionCommits
      .filter((c) => c.kind !== "principle")
      .map((c) => ({
        tag: c.kind === "signature" ? "Signed" : shortForType(c.type ?? OTHER_TYPES[0].type),
        text: c.body,
        by: `— ${c.name}${c.context ? ` · ${c.context}` : ""}`,
      })),
    ...contributions
      .filter((c) => c.type !== "A new principle")
      .slice(0, 4)
      .map((c) => ({
        tag: shortForType(c.type),
        text: c.text,
        by: `— ${c.name}${c.context ? ` · ${c.context}` : ""}`,
      })),
  ].slice(0, 5);

  useEffect(() => {
    if (appliedPreselection.current) return;
    const param = new URLSearchParams(window.location.search).get("kind");
    if (param !== "signature" && param !== "principle" && param !== "other") return;
    appliedPreselection.current = true;
    choosePath(param);
  }, []);

  function applyProfile() {
    const profile = readParticipantProfile();
    if (!profile) return;
    setName((current) => current.trim() || profile.name);
    setContext((current) => current.trim() || profile.context);
    if (profile.email) {
      setEmail((current) => current.trim() || profile.email || "");
    }
  }

  function choosePath(nextKind: ContributionKind) {
    setKind(nextKind);
    setError("");
    setPrincipleTitle("");
    setText("");
    applyProfile();
    setStage(nextKind === "signature" ? "sign" : "draft");
  }

  function goBack() {
    if (stage === "sign" && kind !== "signature") {
      setStage("draft");
      return;
    }
    setKind("");
    setStage("choose");
    setError("");
  }

  function resetToChoose() {
    setStage("choose");
    setKind("");
    setPrincipleTitle("");
    setText("");
    setName("");
    setContext("");
    setEmail("");
    setError("");
    setLoading(false);
    applyProfile();
  }

  function addAnother() {
    resetToChoose();
  }

  async function postJson(url: string, payload: unknown) {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const data = (await response.json().catch(() => null)) as { error?: string } | null;
      throw new Error(data?.error ?? "We could not save that yet. Please try again in a moment.");
    }
  }

  async function handleSubmit() {
    if (!kind || !submitReady) {
      setError("Your name is required.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      if (isSignature) {
        const signatory: Signatory & { email?: string } = {
          id: `sig-${Date.now()}`,
          name: name.trim(),
          context: context.trim(),
          createdAt: new Date().toISOString(),
        };
        if (email.trim()) signatory.email = email.trim();
        await postJson("/api/signatories", signatory);
        saveParticipantProfile({
          name: name.trim(),
          context: context.trim(),
          email: email.trim() || undefined,
        });
        setSessionCommits((prev) => [
          ...prev,
          {
            kind: "signature",
            body: "Stood with the Philly Tech Charter.",
            name: name.trim(),
            context: context.trim(),
          },
        ]);
      } else {
        const attribution = resolveParticipantAttribution(name, context);
        const profile = readParticipantProfile();
        const signatoryNameKey = profile?.name
          ? normalizeSignatoryName(profile.name)
          : attribution.name
            ? normalizeSignatoryName(attribution.name)
            : undefined;

        const contribution: Contribution & { email?: string; signatoryNameKey?: string } = {
          id: `contrib-${Date.now()}`,
          name: attribution.name,
          context: attribution.context,
          type: isPrinciple ? "A new principle" : otherType,
          text: text.trim(),
          principleTitle: isPrinciple ? principleTitle.trim() : undefined,
          createdAt: new Date().toISOString(),
        };
        if (signatoryNameKey) contribution.signatoryNameKey = signatoryNameKey;
        if (email.trim()) contribution.email = email.trim();

        if (contribution.name) {
          saveParticipantProfile({
            name: contribution.name,
            context: contribution.context,
            email: email.trim() || undefined,
          });
        }

        await postJson("/api/contributions", contribution);
        setSessionCommits((prev) => [
          ...prev,
          {
            kind: isPrinciple ? "principle" : "other",
            type: isPrinciple ? "A new principle" : otherType,
            title: isPrinciple ? principleTitle.trim() : undefined,
            body: isPrinciple
              ? text.trim()
              : text.trim(),
            name: attribution.name,
            context: attribution.context,
            num: isPrinciple ? draftNum : undefined,
          },
        ]);
      }

      markCharterDataStale();
      setLastKind(kind);
      setStage("done");
      setPrincipleTitle("");
      setText("");
      setName("");
      setContext("");
      setEmail("");
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "We could not save that yet. Please try again in a moment.",
      );
    } finally {
      setLoading(false);
    }
  }

  const draftTitleDisplay = principleTitle.trim() || "Your principle title";
  const draftBodyDisplay =
    text.trim() ||
    "Start typing on the left — your words appear here, in the document, as you write them.";
  const draftByline = name.trim()
    ? `— ${name.trim()}${context.trim() ? ` · ${context.trim()}` : ""}`
    : "— unsigned draft";

  return (
    <section className="workspace-surface blue-surface min-h-screen px-6 pb-20 pt-28 text-[var(--color-cream)] max-md:pt-24">
      <BlueTexture variant="hero" />

      <div className="relative z-10 mx-auto max-w-[1240px]">
        <div className="mb-6 flex items-center justify-between gap-4">
          <p className="font-display text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--color-cream)]/60">
            Philadelphia Declaration · Contribution
          </p>
          <Link
            href="/"
            className="font-display inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--color-cream)]/55 transition-colors hover:text-[var(--color-cream)]"
          >
            ← Back to start
          </Link>
        </div>

        <div className="workspace-grid">
          <div className="workspace-panel workspace-panel--intake">
            <div className="contribution-console mb-6 p-4">
              <div className="mb-3 flex items-center justify-between gap-4">
                <p className="font-display text-[9px] uppercase tracking-[0.24em] text-[var(--color-red)]">
                  Live intake
                </p>
                <div className="flex items-center gap-1.5" aria-hidden="true">
                  <span className="h-2 w-2 rounded-full bg-[var(--color-red)]" />
                  <span className="h-2 w-2 rounded-full bg-[var(--color-gold)]" />
                  <span className="h-2 w-2 rounded-full bg-[var(--color-blue)]" />
                </div>
              </div>
              <p className="font-mono text-[13px] leading-[1.65] text-[var(--color-blue)]">
                <span className="text-[var(--color-red)]" aria-hidden="true">
                  &gt;{" "}
                </span>
                {consoleText}
                <span className="console-cursor" aria-hidden="true" />
              </p>
            </div>

            {stage !== "done" && (
              <div className="mb-6">
                <p className="font-display mb-2 text-[10px] uppercase tracking-[0.2em] text-[var(--color-red)]">
                  {eyebrow}
                </p>
                <h1 className="font-display mb-3 text-[clamp(24px,3vw,34px)] leading-[1.08] text-[var(--color-blue)]">
                  {heading}
                </h1>
                <p className="max-w-xl text-[14px] leading-[1.65] text-[var(--color-mute)]">
                  {subhead}
                </p>
              </div>
            )}

            {stage === "choose" && (
              <div className="flex flex-col gap-3">
                {PATHS.map((path) => (
                  <button
                    key={path.kind}
                    type="button"
                    className={`path-option ${path.highlight ? "path-option--highlight" : ""}`}
                    onClick={() => choosePath(path.kind)}
                  >
                    {path.highlight && (
                      <span className="path-option-badge">Most shaping</span>
                    )}
                    <span
                      className={`path-option-num ${path.highlight ? "text-[var(--color-blue)]" : "text-[var(--color-gold)]"}`}
                    >
                      {path.num}
                    </span>
                    <span className="min-w-0 flex-1 text-left">
                      <span className="mb-1 block font-display text-[9px] uppercase tracking-[0.2em] text-[var(--color-red)]">
                        {path.eyebrow}
                      </span>
                      <span className="mb-1 block font-display text-[17px] text-[var(--color-blue)]">
                        {path.label}
                      </span>
                      <span className="block text-[13px] leading-[1.5] text-[var(--color-mute)]">
                        {path.description}
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            )}

            {isPrinciple && stage === "draft" && (
              <div>
                <label className="mb-2 block font-display text-[9px] font-semibold uppercase tracking-[0.16em] text-[var(--color-blue)]">
                  Principle title
                </label>
                <input
                  className="workspace-field mb-4 text-[18px] font-semibold text-[var(--color-blue)]"
                  type="text"
                  placeholder="A short, memorable title"
                  value={principleTitle}
                  onChange={(event) => setPrincipleTitle(event.target.value)}
                />
                {titleReady && (
                  <div style={{ animation: "riseIn 0.4s ease both" }}>
                    <label className="mb-2 block font-display text-[9px] font-semibold uppercase tracking-[0.16em] text-[var(--color-blue)]">
                      The commitment
                    </label>
                    <textarea
                      className="workspace-field min-h-[110px] resize-none text-[15px] leading-[1.65] text-[var(--color-ink)]"
                      rows={4}
                      placeholder="Describe it in one to three sentences. Watch it appear in the document on the right."
                      value={text}
                      onChange={(event) => setText(event.target.value)}
                    />
                  </div>
                )}
              </div>
            )}

            {kind === "other" && stage === "draft" && (
              <div>
                <p className="mb-3 font-display text-[9px] font-semibold uppercase tracking-[0.16em] text-[var(--color-blue)]">
                  What kind of contribution?
                </p>
                <div className="mb-4 grid grid-cols-2 gap-2 max-sm:grid-cols-1">
                  {OTHER_TYPES.map((option) => (
                    <button
                      key={option.type}
                      type="button"
                      data-selected={otherType === option.type}
                      className="type-card cursor-pointer p-3 text-left"
                      onClick={() => setOtherType(option.type)}
                    >
                      <span className="mb-1 block font-display text-[11px] uppercase tracking-[0.04em] text-[var(--color-blue)]">
                        {option.short}
                      </span>
                      <span className="block text-[11px] leading-snug text-[var(--color-mute)]">
                        {option.hint}
                      </span>
                    </button>
                  ))}
                </div>
                <label className="mb-2 block font-display text-[9px] font-semibold uppercase tracking-[0.16em] text-[var(--color-blue)]">
                  Your contribution
                </label>
                <textarea
                  className="workspace-field min-h-[110px] resize-none text-[15px] leading-[1.65] text-[var(--color-ink)]"
                  rows={4}
                  placeholder="Write the refinement, challenge, question, or evidence you want the next version to hold."
                  value={text}
                  onChange={(event) => setText(event.target.value)}
                />
              </div>
            )}

            {stage === "sign" && (
              <div>
                <label className="mb-2 block font-display text-[9px] font-semibold uppercase tracking-[0.16em] text-[var(--color-blue)]">
                  Your name
                </label>
                <input
                  className="workspace-field mb-4 text-[16px] font-semibold text-[var(--color-ink)]"
                  type="text"
                  placeholder="The name the charter should carry forward"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  autoComplete="name"
                />
                <label className="mb-2 block font-display text-[9px] font-semibold uppercase tracking-[0.16em] text-[var(--color-blue)]">
                  City or role{" "}
                  <span className="font-sans font-medium normal-case tracking-normal text-[var(--color-mute)]">
                    — optional
                  </span>
                </label>
                <input
                  className="workspace-field mb-4 text-[15px] text-[var(--color-mute)]"
                  type="text"
                  placeholder="Philadelphia, PA · Designer"
                  value={context}
                  onChange={(event) => setContext(event.target.value)}
                />
                <label className="mb-2 block font-display text-[9px] font-semibold uppercase tracking-[0.16em] text-[var(--color-blue)]">
                  Email{" "}
                  <span className="font-sans font-medium normal-case tracking-normal text-[var(--color-mute)]">
                    — optional, never shown
                  </span>
                </label>
                <input
                  className="workspace-field text-[14px] text-[var(--color-ink)]"
                  type="email"
                  placeholder="For follow-up about v1.1"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  autoComplete="email"
                />
              </div>
            )}

            {stage === "done" && (
              <div className="py-2 text-center" style={{ animation: "riseIn 0.4s ease both" }}>
                <span className="mb-4 inline-flex h-[52px] w-[52px] items-center justify-center rounded-full border-2 border-[var(--color-gold)] bg-[rgba(196,154,46,0.14)] font-display text-[22px] font-extrabold text-[var(--color-gold)]">
                  ✓
                </span>
                <p className="font-display mb-2 text-[9px] uppercase tracking-[0.2em] text-[var(--color-red)]">
                  {doneTag}
                </p>
                <h2 className="font-display mb-3 text-[24px] leading-tight text-[var(--color-blue)]">
                  {doneTitle}
                </h2>
                <p className="mx-auto mb-6 max-w-md text-[14px] leading-[1.65] text-[var(--color-mute)]">
                  {doneMsg}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <Pill variant="red" onClick={addAnother}>
                    Add another →
                  </Pill>
                  <Pill variant="outline" href="/">
                    Back to start
                  </Pill>
                </div>
              </div>
            )}

            {error && (
              <div className="mt-4 bg-[var(--color-red)] px-4 py-3 text-[13px] text-[var(--color-cream)]">
                {error}
              </div>
            )}

            {(stage === "draft" || stage === "sign") && (
              <div className="mt-6 flex items-center gap-3">
                <button
                  type="button"
                  className="font-display px-3 py-2.5 text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--color-mute)] transition-colors hover:text-[var(--color-blue)]"
                  onClick={goBack}
                >
                  ← Back
                </button>
                <div className="flex-1" />
                {stage === "draft" && (
                  continueReady ? (
                    <Pill variant="blue" onClick={() => setStage("sign")}>
                      Continue →
                    </Pill>
                  ) : (
                    <span className="workspace-btn-disabled">Continue →</span>
                  )
                )}
                {stage === "sign" && (
                  submitReady ? (
                    <Pill variant="red" onClick={handleSubmit}>
                      {loading ? "Submitting..." : submitLabel}
                    </Pill>
                  ) : (
                    <span className="workspace-btn-disabled">{submitLabel}</span>
                  )
                )}
              </div>
            )}
          </div>

          <div id="document" className="workspace-panel workspace-panel--document">
            <div className="mb-5 flex items-start justify-between gap-4 border-b-[3px] border-[var(--color-blue)] pb-5">
              <div>
                <span className="mb-2 inline-flex items-center gap-2 font-display text-[9px] font-semibold uppercase tracking-[0.18em] text-[var(--color-red)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-red)] animate-pulse-dot" />
                  Living document
                </span>
                <h2 className="font-display text-[clamp(20px,2.4vw,28px)] leading-[1.05] text-[var(--color-blue)]">
                  A Declaration of
                  <br />
                  <span className="text-[var(--color-red)]">Intentional Design</span>
                </h2>
              </div>
              <div className="shrink-0 text-right">
                <p className="font-display text-[24px] font-extrabold leading-none text-[var(--color-gold)]">
                  v{versionLabel}
                </p>
                <p className="mt-1.5 font-mono text-[10px] tracking-[0.1em] text-[var(--color-mute)]">
                  {principlesCount} PRINCIPLES
                </p>
              </div>
            </div>

            <div id="principles" className="workspace-doc-scroll">
              {PRINCIPLE_SUMMARIES.map((principle) => (
                <div key={principle.num} className="flex gap-3.5">
                  <span className="w-6 shrink-0 font-display text-[15px] font-extrabold leading-snug text-[var(--color-blue)]">
                    {principle.num}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="mb-0.5 font-display text-[15px] font-bold text-[var(--color-blue)]">
                      {principle.title}
                    </p>
                    <p className="text-[13px] leading-[1.55] text-[var(--color-mute)]">
                      {principle.body}
                    </p>
                  </div>
                </div>
              ))}

              {proposedFromRecord.map((contribution, index) => (
                <div
                  key={contribution.id}
                  className="flex gap-3.5 border-l-[3px] border-[var(--color-gold)] pl-3"
                >
                  <span className="w-6 shrink-0 font-display text-[15px] font-extrabold leading-snug text-[var(--color-gold)]">
                    {String(PRINCIPLES.length + index + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="mb-0.5 flex flex-wrap items-center gap-2">
                      <p className="font-display text-[15px] font-bold text-[var(--color-blue)]">
                        {contribution.principleTitle || "Proposed principle"}
                      </p>
                      <span className="rounded-[3px] border border-[var(--color-gold)] px-1.5 py-0.5 font-display text-[7px] font-bold uppercase tracking-[0.1em] text-[var(--color-gold)]">
                        v1.1
                      </span>
                    </div>
                    <p className="mb-1 text-[13px] leading-[1.55] text-[var(--color-mute)]">
                      {contribution.text}
                    </p>
                    <p className="text-[12px] italic text-[var(--color-mute)]">
                      — {contribution.name}
                      {contribution.context ? ` · ${contribution.context}` : ""}
                    </p>
                  </div>
                </div>
              ))}

              {sessionOnlyPrinciples.map((commit) => (
                <div
                  key={`${commit.num}-${commit.title}`}
                  className="flex gap-3.5 border-l-[3px] border-[var(--color-gold)] pl-3"
                >
                  <span className="w-6 shrink-0 font-display text-[15px] font-extrabold leading-snug text-[var(--color-gold)]">
                    {commit.num}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="mb-0.5 flex flex-wrap items-center gap-2">
                      <p className="font-display text-[15px] font-bold text-[var(--color-blue)]">
                        {commit.title}
                      </p>
                      <span className="rounded-[3px] border border-[var(--color-gold)] px-1.5 py-0.5 font-display text-[7px] font-bold uppercase tracking-[0.1em] text-[var(--color-gold)]">
                        v1.1
                      </span>
                    </div>
                    <p className="mb-1 text-[13px] leading-[1.55] text-[var(--color-mute)]">
                      {commit.body}
                    </p>
                    <p className="text-[12px] italic text-[var(--color-mute)]">
                      — {commit.name}
                      {commit.context ? ` · ${commit.context}` : ""}
                    </p>
                  </div>
                </div>
              ))}

              {showDraftSlot && (
                <div className="draft-slot flex gap-3.5">
                  <span className="w-6 shrink-0 font-display text-[15px] font-extrabold leading-snug text-[var(--color-red)]">
                    {draftNum}
                  </span>
                  <div className="min-w-0 flex-1">
                    <span className="mb-2 inline-block rounded-[3px] bg-[var(--color-red)] px-1.5 py-0.5 font-display text-[7px] font-bold uppercase tracking-[0.12em] text-white">
                      Drafting · you
                    </span>
                    <p className="mb-1 font-display text-[16px] font-bold text-[var(--color-blue)]">
                      {draftTitleDisplay}
                    </p>
                    <p className="mb-1 text-[13px] leading-[1.55] text-[var(--color-mute)]">
                      {draftBodyDisplay}
                    </p>
                    <p className="text-[12px] italic text-[var(--color-mute)]">{draftByline}</p>
                  </div>
                </div>
              )}
            </div>

            <div id="voices" className="mt-5 border-t border-[var(--color-rule-light)] pt-4">
              <p className="mb-3 font-display text-[9px] font-semibold uppercase tracking-[0.18em] text-[var(--color-red)]">
                Recent voices
              </p>
              {recentVoices.length > 0 ? (
                <div className="flex flex-col gap-3">
                  {recentVoices.map((voice, index) => (
                    <div key={`${voice.tag}-${index}`} className="voice-row">
                      <span className="voice-tag">{voice.tag}</span>
                      <div className="min-w-0 flex-1">
                        <p className="mb-0.5 text-[13px] leading-[1.5] text-[var(--color-ink)]">
                          {voice.text}
                        </p>
                        <p className="text-[12px] italic text-[var(--color-mute)]">{voice.by}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[13px] leading-[1.55] text-[var(--color-mute)]">
                  Contributions will appear here as people add their voice.
                </p>
              )}
            </div>
            <div className="mt-5 flex gap-3 border-t border-[var(--color-rule-light)] pt-4">
              <span className="shrink-0 font-mono text-[16px] leading-snug text-[var(--color-red)]" aria-hidden="true">
                →
              </span>
              <p className="text-[12px] leading-[1.6] text-[var(--color-mute)]">
                <span className="font-display text-[9px] font-semibold uppercase tracking-[0.16em] text-[var(--color-blue)]">
                  Where this goes —{" "}
                </span>
                Every principle, commitment, challenge, and voice added here is synthesized into a
                proposed strategy for how Philadelphia builds technology next.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
