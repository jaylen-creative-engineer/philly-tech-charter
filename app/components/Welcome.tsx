"use client";

import { useCallback, useEffect, useState } from "react";
import WelcomeCarousel from "./WelcomeCarousel";
import { CharterIcon } from "./CharterIcons";

interface Props {
  onComplete: () => void;
}

const SEEN_KEY = "ptc-welcomed-v3";
const CURRENT_YEAR = new Date().getFullYear();

type Phase = "intro" | "exit" | "done";

export default function Welcome({ onComplete }: Props) {
  const [phase, setPhase] = useState<Phase>("intro");
  const [shouldShow, setShouldShow] = useState(true);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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
    const t = setTimeout(() => setPhase("exit"), 3800);
    return () => clearTimeout(t);
  }, [shouldShow, phase]);

  useEffect(() => {
    if (phase !== "exit") return;
    sessionStorage.setItem(SEEN_KEY, "1");
    const t = setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 700);
    return () => clearTimeout(t);
  }, [phase, onComplete]);

  useEffect(() => {
    if (phase === "done") return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [phase]);

  const enter = useCallback(() => {
    setPhase((p) => (p === "intro" ? "exit" : p));
  }, []);

  if (!shouldShow || phase === "done") return null;

  const exiting = phase === "exit";
  const panel =
    "absolute inset-0 transition-transform duration-600 ease-[cubic-bezier(0.77,0,0.18,1)]";
  const lift = exiting ? "-translate-y-full" : "translate-y-0";

  return (
    <div
      data-welcome="true"
      className="fixed inset-0 z-[100] cursor-pointer overflow-hidden"
      role="button"
      tabIndex={0}
      aria-label="Enter the Philly Tech Charter"
      onClick={enter}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") enter();
      }}
    >
      <div
        className={`${panel} ${lift} z-[1] bg-[var(--color-red)]`}
        style={{ transitionDelay: exiting ? "180ms" : "0ms" }}
      />
      <div
        className={`${panel} ${lift} z-[2] welcome-surface overflow-hidden border-b border-[var(--color-rule-light)]`}
      >
        {/* Deepest layer — city portrait panels behind the civic entry surface */}
        <WelcomeCarousel />

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-8 text-center">
          <div className="welcome-animate-rise-1">
            <span className="welcome-era" aria-label={`1776 to ${CURRENT_YEAR}`}>
              <span className="welcome-era-year">1776</span>
              <span className="welcome-era-line" aria-hidden="true" />
              <span className="welcome-era-year">{CURRENT_YEAR}</span>
            </span>
          </div>

          <h1
            className="welcome-animate-rise-2 mt-10 max-w-3xl font-display leading-[1.05] tracking-[-0.02em] text-[var(--color-blue)]"
            style={{ fontSize: "clamp(36px, 7vw, 72px)" }}
          >
            A Civic Commitment
            <br />
            <span className="text-[var(--color-red)]">for Philadelphia</span>
          </h1>

          <p className="welcome-animate-rise-3 mt-8 max-w-md text-[15px] leading-[1.7] text-[var(--color-mute)]">
            A living document for how this city shapes technology — written in the
            tradition of those who first put their intentions to paper here.
          </p>

          <p className="welcome-animate-rise-3 mt-4 font-display text-[10px] uppercase tracking-[0.22em] text-[var(--color-mute)]">
            Philadelphia · America&apos;s 250th
          </p>

          <button
            type="button"
            className="welcome-animate-rise-4 welcome-enter-btn mt-12 inline-flex items-center gap-2 px-10 py-3.5 font-display text-[11px] uppercase tracking-[0.14em] pointer-events-none"
            tabIndex={-1}
          >
            Enter the Charter
            <CharterIcon name="chevron-right" size={14} />
          </button>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-10 flex h-[3px]" aria-hidden="true">
          <div className="flex-[2] bg-[var(--color-red)]" />
          <div className="flex-1 bg-[var(--color-white)]" />
          <div className="flex-[2] bg-[var(--color-blue)]" />
        </div>
      </div>
    </div>
  );
}
