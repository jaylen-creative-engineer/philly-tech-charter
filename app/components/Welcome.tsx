"use client";

import { useCallback, useEffect, useState } from "react";
import LandingContent, { type LandingIntent } from "./LandingContent";

interface Props {
  onComplete: (intent?: LandingIntent) => void;
  principlesCount?: number;
  voicesCount?: number;
  versionLabel?: string;
}

const SEEN_KEY = "ptc-welcomed-v4";

/** Entrance animation settles before CTAs become the primary action. */
const ACTIONS_READY_MS = 1400;

type Phase = "intro" | "exit" | "done";

export default function Welcome({
  onComplete,
  principlesCount,
  voicesCount,
  versionLabel,
}: Props) {
  const [phase, setPhase] = useState<Phase>("intro");
  const [shouldShow, setShouldShow] = useState(true);
  const [actionsReady, setActionsReady] = useState(false);
  const [pendingIntent, setPendingIntent] = useState<LandingIntent | undefined>();

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setActionsReady(true);
    }

    if (!reduceMotion && !sessionStorage.getItem(SEEN_KEY)) return;

    const t = setTimeout(() => {
      setShouldShow(false);
      setPhase("done");
      onComplete();
    }, 0);
    return () => clearTimeout(t);
  }, [onComplete]);

  useEffect(() => {
    if (!shouldShow || phase !== "intro") return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setActionsReady(true);
      return;
    }

    const t = setTimeout(() => setActionsReady(true), ACTIONS_READY_MS);
    return () => clearTimeout(t);
  }, [shouldShow, phase]);

  useEffect(() => {
    if (phase !== "exit") return;
    sessionStorage.setItem(SEEN_KEY, "1");
    const t = setTimeout(() => {
      setPhase("done");
      onComplete(pendingIntent);
    }, 700);
    return () => clearTimeout(t);
  }, [phase, onComplete, pendingIntent]);

  useEffect(() => {
    if (phase === "done") return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [phase]);

  const enter = useCallback((intent: LandingIntent) => {
    if (!actionsReady) return;
    setPendingIntent(intent);
    setPhase((p) => (p === "intro" ? "exit" : p));
  }, [actionsReady]);

  if (!shouldShow || phase === "done") return null;

  const exiting = phase === "exit";
  const panel =
    "absolute inset-0 transition-transform duration-600 ease-[cubic-bezier(0.77,0,0.18,1)]";
  const lift = exiting ? "-translate-y-full" : "translate-y-0";

  return (
    <div
      data-welcome="true"
      className="fixed inset-0 z-[100] overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Welcome to the Philly Tech Charter"
    >
      <div
        className={`${panel} ${lift} z-[1] bg-[var(--color-red)]`}
        style={{ transitionDelay: exiting ? "180ms" : "0ms" }}
      />
      <div
        className={`${panel} ${lift} z-[2] welcome-surface overflow-y-auto border-b border-[var(--color-rule-light)]`}
      >
        <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="hero-backdrop pointer-events-none" aria-hidden="true" />

        <div className="relative z-10 flex min-h-full flex-col items-center justify-center px-6 py-16 text-center">
          <LandingContent
            animate
            actionsReady={actionsReady && !exiting}
            principlesCount={principlesCount}
            voicesCount={voicesCount}
            versionLabel={versionLabel}
            onIntent={enter}
          />
        </div>

        <div className="absolute inset-x-0 bottom-0 flex h-[3px]" aria-hidden="true">
          <div className="flex-[2] bg-[var(--color-red)]" />
          <div className="flex-1 bg-[var(--color-white)]" />
          <div className="flex-[2] bg-[var(--color-blue)]" />
        </div>
      </div>
    </div>
  );
}
