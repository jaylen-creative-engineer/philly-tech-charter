"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import BlueTexture from "../components/BlueTexture";
import Pill from "../components/Pill";
import SectionLabel from "../components/SectionLabel";
import ImagePlaceholder from "../components/ImagePlaceholder";
import { CharterIcon, type CharterIconName } from "../components/CharterIcons";
import { Contribution, ContributionType, Signatory } from "../../lib/types";

type ContributionKind = "signature" | "principle" | "other";

const OTHER_TYPES: { type: ContributionType; short: string; hint: string; icon: CharterIconName }[] = [
  {
    type: "A refinement to existing text",
    short: "Refinement",
    hint: "Sharpen language that is already in the charter.",
    icon: "refinement",
  },
  {
    type: "A challenge or counterpoint",
    short: "Challenge",
    hint: "Name a tension, disagreement, or missing perspective.",
    icon: "challenge",
  },
  {
    type: "A real-world example or evidence",
    short: "Evidence",
    hint: "Ground the document in lived practice or local proof.",
    icon: "evidence",
  },
  {
    type: "A question the document doesn't answer",
    short: "Question",
    hint: "Ask what the next version needs to wrestle with.",
    icon: "question",
  },
];

const KIND_OPTIONS: {
  kind: ContributionKind;
  label: string;
  description: string;
  eyebrow: string;
  icon: CharterIconName;
  previewPrompt: string;
  detailsPrompt: string;
  submitLabel: string;
}[] = [
  {
    kind: "signature",
    label: "Signature",
    description: "Add your name to the public record of people standing with the charter.",
    eyebrow: "Stand with it",
    icon: "signature",
    previewPrompt: "Good. Your signature is a public mark of support. Here is how it can appear.",
    detailsPrompt: "What name should the charter carry forward?",
    submitLabel: "Add my signature",
  },
  {
    kind: "principle",
    label: "Principle",
    description: "Propose a guiding commitment for the next version of the document.",
    eyebrow: "Shape v1.1",
    icon: "principle",
    previewPrompt: "Good. A principle should feel clear enough to remember and strong enough to test.",
    detailsPrompt: "What principle do you want future readers to consider?",
    submitLabel: "Submit this principle",
  },
  {
    kind: "other",
    label: "Other contribution",
    description: "Offer a refinement, challenge, question, example, or piece of evidence.",
    eyebrow: "Add context",
    icon: "voice",
    previewPrompt: "Good. Context helps the charter get sharper, more honest, and more useful.",
    detailsPrompt: "What should the next version make room for?",
    submitLabel: "Submit this contribution",
  },
];

const cardInputTitle =
  "w-full bg-transparent border-0 border-b border-transparent text-[20px] font-semibold leading-tight text-[var(--color-blue)] outline-none transition-colors duration-200 focus:border-[var(--color-red)] placeholder:text-[var(--color-mute)]/45 p-0 mb-1";

const cardInputContext =
  "w-full bg-transparent border-0 border-b border-transparent text-[12px] text-[var(--color-mute)] outline-none transition-colors duration-200 focus:border-[var(--color-red)] placeholder:text-[var(--color-mute)]/45 p-0 mt-1";

const cardInputPrincipleTitle =
  "w-full bg-transparent border-0 border-b border-transparent font-display text-[13px] uppercase tracking-[0.08em] text-[var(--color-blue)] outline-none transition-colors duration-200 focus:border-[var(--color-red)] placeholder:text-[var(--color-mute)]/45 p-0 mb-3";

const cardTextarea =
  "w-full bg-transparent border-0 text-[16px] font-medium leading-[1.7] text-[var(--color-ink)] outline-none resize-none min-h-[96px] placeholder:text-[var(--color-mute)]/45 p-0 mb-5";

const cardAttributionInput =
  "w-full bg-transparent border-0 border-b border-transparent text-[12px] font-medium text-[var(--color-mute)] outline-none transition-colors duration-200 focus:border-[var(--color-red)] placeholder:text-[var(--color-mute)]/45 p-0";

const CONVERSATION_PACE = {
  typewriterWelcome: 42,
  typewriterQuestion: 36,
  typewriterReply: 32,
  pauseAfterWelcome: 1270,
  pauseBeforeQuestion: 750,
  pauseBeforeReply: 750,
  pauseBeforeCard: 750,
  revealDuration: 0.50,
  cardRevealDuration: 0.3,
  fieldRevealDuration: 0.75,
  subtitleFadeMs: 1200,
} as const;

interface SuccessState {
  kind: ContributionKind;
  title: string;
  message: string;
  href: string;
  hrefLabel: string;
}

interface ConsoleStateInput {
  kind: ContributionKind | "";
  name: string;
  context: string;
  principleTitle: string;
  text: string;
}

function getKindLabel(kind: ContributionKind | "") {
  return KIND_OPTIONS.find((option) => option.kind === kind)?.label ?? "Choose a path";
}

function getConsoleText({ kind, name, context, principleTitle, text }: ConsoleStateInput) {
  if (!kind) {
    return "Awaiting your first answer. Choose signature, principle, or another contribution path.";
  }

  if (kind === "signature") {
    if (!name.trim()) {
      return "Signature path open. Type the name the charter should carry forward.";
    }

    if (!context.trim()) {
      return "Name received. Add optional city or role context, or submit the signature.";
    }

    return "Signature card is ready. Review it below, then add your name to the record.";
  }

  if (kind === "principle") {
    if (!principleTitle.trim()) {
      return "Principle path open. Start with a short, memorable title.";
    }

    if (!text.trim()) {
      return "Title received. Now write the principle body in one to three sentences.";
    }

    return "Principle draft is live. Edit the card below, then submit it for v1.1.";
  }

  if (!text.trim()) {
    return "Contribution path open. Choose a type, then write the perspective this charter needs.";
  }

  return "Contribution draft is live. Edit the card below, then submit it to the public record.";
}

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(query.matches);

    updatePreference();
    query.addEventListener("change", updatePreference);
    return () => query.removeEventListener("change", updatePreference);
  }, []);

  return prefersReducedMotion;
}

type TypewriterSlot =
  | "welcome-headline"
  | "first-question"
  | "preview-prompt"
  | "details-prompt";

const TYPEWRITER_CURSOR_COLOR: Record<TypewriterSlot, string> = {
  "welcome-headline": "var(--color-cream)",
  "first-question": "var(--color-blue)",
  "preview-prompt": "var(--color-blue)",
  "details-prompt": "var(--color-blue)",
};

function TypewriterText({
  text,
  slot,
  activeSlot,
  speed = 22,
  startDelay = 0,
  cursor = true,
  cursorColor,
  reducedMotion,
  className = "",
  onComplete,
}: {
  text: string;
  slot: TypewriterSlot;
  activeSlot: TypewriterSlot | null;
  speed?: number;
  startDelay?: number;
  cursor?: boolean;
  cursorColor?: string;
  reducedMotion: boolean;
  className?: string;
  onComplete?: () => void;
}) {
  const [visibleCharacters, setVisibleCharacters] = useState(reducedMotion ? text.length : 0);
  const completedRef = useRef(false);
  const isActive = activeSlot === slot;

  useEffect(() => {
    completedRef.current = false;
    setVisibleCharacters(reducedMotion ? text.length : isActive ? 0 : text.length);
  }, [isActive, reducedMotion, text]);

  useEffect(() => {
    if (!isActive || reducedMotion) {
      return;
    }

    let interval: ReturnType<typeof setInterval> | undefined;

    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        setVisibleCharacters((current) => {
          if (current >= text.length) {
            if (interval) clearInterval(interval);
            return current;
          }

          return current + 1;
        });
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [isActive, reducedMotion, speed, startDelay, text]);

  useEffect(() => {
    if (!isActive || completedRef.current) {
      return;
    }

    if (reducedMotion || visibleCharacters >= text.length) {
      completedRef.current = true;
      if (!reducedMotion) {
        onComplete?.();
      }
    }
  }, [isActive, onComplete, reducedMotion, text.length, visibleCharacters]);

  const visibleText = isActive && !reducedMotion ? text.slice(0, visibleCharacters) : text;
  const showCursor = cursor && isActive && !reducedMotion;
  const inkColor = cursorColor ?? TYPEWRITER_CURSOR_COLOR[slot];

  return (
    <span
      className={`typewriter-copy ${className}`}
      style={{ color: inkColor, ["--typewriter-cursor-color" as string]: inkColor }}
      role="text"
      aria-label={text}
    >
      <span aria-hidden="true">{visibleText}</span>
      {showCursor && (
        <span
          className={`typewriter-cursor ${slot === "welcome-headline" ? "typewriter-cursor-hero" : ""}`}
          aria-hidden="true"
        />
      )}
    </span>
  );
}

function ConversationReveal({
  visible,
  children,
  className = "",
}: {
  visible: boolean;
  children: ReactNode;
  className?: string;
}) {
  if (!visible) {
    return null;
  }

  return (
    <div
      className={className}
      style={{ animation: `riseIn ${CONVERSATION_PACE.revealDuration}s ease forwards` }}
    >
      {children}
    </div>
  );
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
  const [activeTypewriter, setActiveTypewriter] = useState<TypewriterSlot | null>("welcome-headline");
  const [welcomeHeadlineComplete, setWelcomeHeadlineComplete] = useState(false);
  const [welcomeComplete, setWelcomeComplete] = useState(false);
  const [firstQuestionComplete, setFirstQuestionComplete] = useState(false);
  const [previewPromptComplete, setPreviewPromptComplete] = useState(false);
  const [detailsPromptComplete, setDetailsPromptComplete] = useState(false);
  const appliedPreselection = useRef(false);

  const hasSelectedKind = Boolean(kind);
  const isPrinciple = kind === "principle";
  const isSignature = kind === "signature";
  const contributionText = text.trim();
  const selectedOption = KIND_OPTIONS.find((option) => option.kind === kind);
  const prefersReducedMotion = usePrefersReducedMotion();
  const previewPrompt = selectedOption?.previewPrompt ?? "Once you choose a path, we will show the card it creates.";
  const detailsPrompt = selectedOption?.detailsPrompt ?? "Tell us what should go on the card.";
  const consoleText = getConsoleText({
    kind,
    name,
    context,
    principleTitle,
    text,
  });

  const showGuidanceSection = hasSelectedKind;
  const showDetailsSection = hasSelectedKind && previewPromptComplete;
  const showCard = hasSelectedKind && detailsPromptComplete;
  const showOtherTypePicker = kind === "other" && showCard;
  const showCardContext = showCard && (isSignature ? name.trim().length > 0 : true);
  const showCardBody = showCard && (isPrinciple ? principleTitle.trim().length > 0 : kind === "other");
  const showCardAttribution = showCard && !isSignature && contributionText.length > 0;
  const showSubmit =
    showCard &&
    (isSignature
      ? name.trim().length > 0
      : isPrinciple
        ? principleTitle.trim().length > 0 && contributionText.length > 0
        : contributionText.length > 0);

  useEffect(() => {
    if (!prefersReducedMotion) {
      return;
    }

    setWelcomeHeadlineComplete(true);
    setWelcomeComplete(true);
    setFirstQuestionComplete(true);
    setActiveTypewriter(null);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!welcomeComplete || appliedPreselection.current) {
      return;
    }

    const param = new URLSearchParams(window.location.search).get("kind");
    if (param !== "signature" && param !== "principle" && param !== "other") {
      return;
    }

    appliedPreselection.current = true;
    setFirstQuestionComplete(true);
    handleKindSelect(param);
  }, [welcomeComplete]);

  function beginConversation() {
    setWelcomeHeadlineComplete(true);
    window.setTimeout(() => {
      setWelcomeComplete(true);
      setActiveTypewriter("first-question");
    }, prefersReducedMotion ? 0 : CONVERSATION_PACE.pauseAfterWelcome);
  }

  function handleKindSelect(nextKind: ContributionKind) {
    setKind(nextKind);
    setError("");
    setSuccess(null);
    setPreviewPromptComplete(false);
    setDetailsPromptComplete(false);
    setActiveTypewriter("preview-prompt");
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
    setPreviewPromptComplete(false);
    setDetailsPromptComplete(false);
    setWelcomeComplete(true);
    setWelcomeHeadlineComplete(true);
    setFirstQuestionComplete(false);
    setActiveTypewriter("first-question");
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
          <SectionLabel color="cream" icon={<CharterIcon name="voice" size={18} />}>
            Participate
          </SectionLabel>
          <div className="mx-auto mb-8 grid max-w-2xl grid-cols-3 gap-3 max-md:max-w-xs max-md:grid-cols-1">
            <ImagePlaceholder variant="liberty" aspect="square" className="max-md:hidden" aria-hidden="true" />
            <ImagePlaceholder variant="signature" aspect="square" label="Your voice" className="shadow-lg" />
            <ImagePlaceholder variant="document" aspect="square" className="max-md:hidden" aria-hidden="true" />
          </div>
          <h1
            className="font-display mx-auto mb-5 max-w-4xl leading-[0.98] tracking-[-0.02em]"
            style={{ fontSize: "clamp(42px, 7vw, 92px)" }}
          >
            <TypewriterText
              slot="welcome-headline"
              activeSlot={activeTypewriter}
              text="Let's add your voice."
              speed={CONVERSATION_PACE.typewriterWelcome}
              reducedMotion={prefersReducedMotion}
              onComplete={beginConversation}
            />
          </h1>
          <p
            className={`mx-auto max-w-2xl text-[16px] leading-[1.8] text-[var(--color-cream)]/80 transition-opacity ease-out ${
              welcomeHeadlineComplete ? "opacity-100" : "opacity-0"
            }`}
            style={{ transitionDuration: `${CONVERSATION_PACE.subtitleFadeMs}ms` }}
          >
            We&apos;ll begin with a simple question, shape the card together, and end with a clear
            confirmation that your contribution has been received.
          </p>
        </div>

        {success ? (
          <div className="mx-auto max-w-[680px] text-center">
            <div
              className="card-surface mb-6 bg-[var(--color-cream)] px-8 py-10 text-[var(--color-blue)]"
              style={{ animation: `riseIn ${CONVERSATION_PACE.cardRevealDuration}s ease forwards` }}
            >
              <span className="mb-4 inline-flex text-[var(--color-gold)]" aria-hidden="true">
                <CharterIcon
                  name={success.kind === "signature" ? "star" : "principle"}
                  size={36}
                />
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
        ) : welcomeComplete ? (
          <div
            className="card-surface bg-[var(--color-cream)] p-6 text-[var(--color-ink)] shadow-[0_24px_80px_rgba(0,0,0,0.18)] md:p-10"
              style={{ animation: `riseIn ${CONVERSATION_PACE.cardRevealDuration}s ease forwards` }}
          >
            <div className="contribution-console mb-10 p-4">
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
              <p className="font-mono text-[13px] leading-[1.7] text-[var(--color-blue)] transition-opacity duration-300">
                <span className="text-[var(--color-red)]" aria-hidden="true">
                  &gt;{" "}
                </span>
                {consoleText}
              </p>
            </div>

            <div className="mb-10">
              <p className="font-display mb-2 text-[10px] uppercase tracking-[0.2em] text-[var(--color-red)]">
                Philadelphia Declaration · Intake
              </p>
              <h2 className="font-display mb-4 text-[clamp(24px,3vw,38px)] leading-tight text-[var(--color-blue)]">
                <TypewriterText
                  slot="first-question"
                  activeSlot={activeTypewriter}
                  text="What would you like to contribute?"
                  speed={CONVERSATION_PACE.typewriterQuestion}
                  startDelay={CONVERSATION_PACE.pauseBeforeQuestion}
                  reducedMotion={prefersReducedMotion}
                  onComplete={() => {
                    setActiveTypewriter(null);
                    window.setTimeout(() => {
                      setFirstQuestionComplete(true);
                    }, prefersReducedMotion ? 0 : CONVERSATION_PACE.pauseBeforeReply);
                  }}
                />
              </h2>
              <ConversationReveal visible={firstQuestionComplete}>
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
                      <span className="icon-badge mb-3 h-9 w-9 text-[var(--color-red)]">
                        <CharterIcon name={option.icon} size={18} />
                      </span>
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
              </ConversationReveal>
            </div>

            <ConversationReveal visible={showGuidanceSection} className="mb-10">
              <p className="font-display mb-2 text-[10px] uppercase tracking-[0.2em] text-[var(--color-red)]">
                Next
              </p>
              <h2 className="font-display mb-4 text-[clamp(22px,2.6vw,34px)] leading-tight text-[var(--color-blue)]">
                <TypewriterText
                  key={previewPrompt}
                  slot="preview-prompt"
                  activeSlot={activeTypewriter}
                  text={previewPrompt}
                  speed={CONVERSATION_PACE.typewriterReply}
                  startDelay={CONVERSATION_PACE.pauseBeforeReply}
                  reducedMotion={prefersReducedMotion}
                  onComplete={() => {
                    setPreviewPromptComplete(true);
                    setActiveTypewriter("details-prompt");
                  }}
                />
              </h2>
            </ConversationReveal>

            <ConversationReveal visible={showDetailsSection}>
              <p className="font-display mb-2 text-[10px] uppercase tracking-[0.2em] text-[var(--color-red)]">
                Your turn
              </p>
              <h2 className="font-display mb-6 text-[clamp(22px,2.6vw,34px)] leading-tight text-[var(--color-blue)]">
                <TypewriterText
                  key={detailsPrompt}
                  slot="details-prompt"
                  activeSlot={activeTypewriter}
                  text={detailsPrompt}
                  speed={CONVERSATION_PACE.typewriterReply}
                  startDelay={CONVERSATION_PACE.pauseBeforeReply}
                  reducedMotion={prefersReducedMotion}
                  onComplete={() => {
                    setActiveTypewriter(null);
                    window.setTimeout(() => {
                      setDetailsPromptComplete(true);
                    }, prefersReducedMotion ? 0 : CONVERSATION_PACE.pauseBeforeCard);
                  }}
                />
              </h2>
            </ConversationReveal>

            <ConversationReveal visible={showCard}>
              {error && (
                <div className="mb-6 bg-[var(--color-red)] px-4 py-3 text-[13px] text-[var(--color-cream)]">
                  {error}
                </div>
              )}

              {showOtherTypePicker && (
                <div className="mb-6" style={{ animation: `riseIn ${CONVERSATION_PACE.revealDuration}s ease forwards` }}>
                  <p className="font-display mb-3 text-[10px] tracking-[0.2em] uppercase text-[var(--color-blue)]">
                    What kind of contribution is it?
                  </p>
                  <div className="grid gap-2 md:grid-cols-2">
                    {OTHER_TYPES.map((option) => (
                      <button
                        key={option.type}
                        type="button"
                        data-selected={otherType === option.type}
                        className="type-card cursor-pointer p-3 text-left"
                        onClick={() => setOtherType(option.type)}
                      >
                        <span className="icon-badge mb-2 h-8 w-8 text-[var(--color-blue)]">
                          <CharterIcon name={option.icon} size={16} />
                        </span>
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

              <p className="font-display mb-3 text-[10px] tracking-[0.2em] uppercase text-[var(--color-blue)]">
                {isSignature ? "Your signature card" : "Your contribution card"}
              </p>
              <p className="mb-4 text-[13px] leading-[1.6] text-[var(--color-mute)]">
                Edit directly in the card below. This is what will appear in the public record.
              </p>

              <div className="preview-card p-7">
                <ContributionCard
                  kind={kind}
                  otherType={otherType}
                  name={name}
                  context={context}
                  principleTitle={principleTitle}
                  text={text}
                  showContext={showCardContext}
                  showBody={showCardBody}
                  showAttribution={showCardAttribution}
                  onNameChange={setName}
                  onContextChange={setContext}
                  onPrincipleTitleChange={setPrincipleTitle}
                  onTextChange={setText}
                />
              </div>

              {isSignature && showCardContext && (
                <p
                  className="mt-4 text-[12px] leading-[1.6] text-[var(--color-mute)]"
                  style={{ animation: `riseIn ${CONVERSATION_PACE.revealDuration}s ease forwards` }}
                >
                  Your name joins the public signatory record. Optional context appears beneath it.
                </p>
              )}

              <ConversationReveal visible={Boolean(showSubmit)} className="mt-8">
                <Pill
                  variant="red"
                  onClick={handleSubmit}
                  className="w-full justify-center text-[14px]"
                >
                  {loading ? "Submitting..." : selectedOption?.submitLabel ?? `Submit ${getKindLabel(kind)}`}
                </Pill>
              </ConversationReveal>
            </ConversationReveal>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function ContributionCard({
  kind,
  otherType,
  name,
  context,
  principleTitle,
  text,
  showContext,
  showBody,
  showAttribution,
  onNameChange,
  onContextChange,
  onPrincipleTitleChange,
  onTextChange,
}: {
  kind: ContributionKind | "";
  otherType: ContributionType;
  name: string;
  context: string;
  principleTitle: string;
  text: string;
  showContext: boolean;
  showBody: boolean;
  showAttribution: boolean;
  onNameChange: (value: string) => void;
  onContextChange: (value: string) => void;
  onPrincipleTitleChange: (value: string) => void;
  onTextChange: (value: string) => void;
}) {
  if (kind === "signature") {
    return (
      <div>
        <div className="mb-6 flex items-start gap-3">
          <span className="icon-badge shrink-0 h-10 w-10 text-[var(--color-gold)]">
            <CharterIcon name="star" size={20} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-display mb-2 text-[10px] uppercase tracking-[0.2em] text-[var(--color-red)]">
              Signatory
            </p>
            <label className="sr-only" htmlFor="signature-name">
              Your name
            </label>
            <input
              id="signature-name"
              className={cardInputTitle}
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(event) => onNameChange(event.target.value)}
              autoComplete="name"
            />
            {showContext && (
              <div style={{ animation: `riseIn ${CONVERSATION_PACE.fieldRevealDuration}s ease forwards` }}>
                <label className="sr-only" htmlFor="signature-context">
                  City or role
                </label>
                <input
                  id="signature-context"
                  className={cardInputContext}
                  type="text"
                  placeholder="Philadelphia, PA · Designer (optional)"
                  value={context}
                  onChange={(event) => onContextChange(event.target.value)}
                />
              </div>
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
        <label className="sr-only" htmlFor="principle-title">
          Principle title
        </label>
        <input
          id="principle-title"
          className={cardInputPrincipleTitle}
          type="text"
          placeholder="Principle title"
          value={principleTitle}
          onChange={(event) => onPrincipleTitleChange(event.target.value)}
        />
        {showBody && (
          <div style={{ animation: `riseIn ${CONVERSATION_PACE.fieldRevealDuration}s ease forwards` }}>
            <label className="sr-only" htmlFor="principle-body">
              Principle body
            </label>
            <textarea
              id="principle-body"
              className={cardTextarea}
              placeholder="Describe the principle in one to three sentences."
              value={text}
              onChange={(event) => onTextChange(event.target.value)}
              rows={4}
            />
            {text.length > 0 && (
              <p className="mb-5 text-[11px] text-[var(--color-mute)]">{text.length} characters</p>
            )}
          </div>
        )}
        {showAttribution && (
          <div
            className="border-t border-[var(--color-rule-light)] pt-4"
            style={{ animation: `riseIn ${CONVERSATION_PACE.fieldRevealDuration}s ease forwards` }}
          >
            <label className="sr-only" htmlFor="principle-name">
              Your name
            </label>
            <input
              id="principle-name"
              className={`${cardAttributionInput} mb-2`}
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(event) => onNameChange(event.target.value)}
              autoComplete="name"
            />
            <label className="sr-only" htmlFor="principle-context">
              City or role
            </label>
            <input
              id="principle-context"
              className={cardAttributionInput}
              type="text"
              placeholder="City / role (optional)"
              value={context}
              onChange={(event) => onContextChange(event.target.value)}
            />
          </div>
        )}
      </div>
    );
  }

  if (kind === "other") {
    return (
      <div>
        <p className="font-display mb-3 text-[9px] uppercase tracking-[0.25em] text-[var(--color-red)]">
          {otherType}
        </p>
        {showBody && (
          <div style={{ animation: `riseIn ${CONVERSATION_PACE.fieldRevealDuration}s ease forwards` }}>
            <label className="sr-only" htmlFor="contribution-body">
              Your contribution
            </label>
            <textarea
              id="contribution-body"
              className={cardTextarea}
              placeholder="Write the refinement, question, example, or challenge you want to add."
              value={text}
              onChange={(event) => onTextChange(event.target.value)}
              rows={4}
            />
            {text.length > 0 && (
              <p className="mb-5 text-[11px] text-[var(--color-mute)]">{text.length} characters</p>
            )}
          </div>
        )}
        {showAttribution && (
          <div
            className="border-t border-[var(--color-rule-light)] pt-4"
            style={{ animation: `riseIn ${CONVERSATION_PACE.fieldRevealDuration}s ease forwards` }}
          >
            <label className="sr-only" htmlFor="contribution-name">
              Your name
            </label>
            <input
              id="contribution-name"
              className={`${cardAttributionInput} mb-2`}
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(event) => onNameChange(event.target.value)}
              autoComplete="name"
            />
            <label className="sr-only" htmlFor="contribution-context">
              City or role
            </label>
            <input
              id="contribution-context"
              className={cardAttributionInput}
              type="text"
              placeholder="City / role (optional)"
              value={context}
              onChange={(event) => onContextChange(event.target.value)}
            />
          </div>
        )}
      </div>
    );
  }

  return null;
}
