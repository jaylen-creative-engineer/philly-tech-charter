"use client";

import { useCallback, useEffect, useState } from "react";
import Fireworks from "./Fireworks";
import BlueTexture from "./BlueTexture";
import WelcomeCarousel from "./WelcomeCarousel";
import { CharterIcon } from "./CharterIcons";

interface Props {
  onComplete: () => void;
}

const SEEN_KEY = "ptc-welcomed-v2";
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
    const t = setTimeout(() => setPhase("exit"), 4500);
    return () => clearTimeout(t);
  }, [shouldShow, phase]);

  useEffect(() => {
    if (phase !== "exit") return;
    sessionStorage.setItem(SEEN_KEY, "1");
    const t = setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 1000);
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
    "absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.18,1)]";
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
      <div className={`${panel} ${lift} z-[1] bg-[var(--color-red)]`} style={{ transitionDelay: exiting ? "240ms" : "0ms" }} />
      <div className={`${panel} ${lift} z-[2] bg-[var(--color-cream)]`} style={{ transitionDelay: exiting ? "120ms" : "0ms" }} />
      <div className={`${panel} ${lift} z-[3] bg-[var(--color-blue)] overflow-hidden`}>
        {/* Deepest layer — city portrait panels cycle behind everything else */}
        <WelcomeCarousel />

        <BlueTexture variant="hero" />
        <Fireworks active={!exiting} />

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-8 text-center">
          <div className="welcome-animate-rise-1 mb-10 flex items-center gap-4">
            <span className="font-display text-[clamp(28px,5vw,48px)] text-[var(--color-cream)]/40 tabular-nums">
              1776
            </span>
            <div className="flex flex-col items-center gap-1">
              <div className="h-[2px] w-16 bg-gradient-to-r from-transparent via-[var(--color-gold)] to-transparent" />
              <span className="animate-star-pop animate-glow-pulse rounded-full text-[var(--color-gold)] leading-none select-none" aria-hidden="true">
                <CharterIcon name="star" size={32} />
              </span>
              <div className="h-[2px] w-16 bg-gradient-to-r from-transparent via-[var(--color-gold)] to-transparent" />
            </div>
            <span
              className="welcome-year-end font-display text-[clamp(28px,5vw,48px)] tabular-nums"
              aria-label={`Present day, ${CURRENT_YEAR}`}
            >
              <span className="welcome-year-end-shimmer">{CURRENT_YEAR}</span>
            </span>
          </div>

          <h1
            className="welcome-animate-rise-2 font-display max-w-4xl leading-[0.95] tracking-tight text-[var(--color-cream)]"
            style={{ fontSize: "clamp(40px, 8vw, 88px)" }}
          >
            Living
            <br />
            <span className="text-[var(--color-gold)]">Through</span>
            <br />
            History
          </h1>

          <p className="welcome-animate-rise-3 mt-8 font-display text-[10px] uppercase tracking-[0.35em] text-[var(--color-cream)]/50">
            Philadelphia · America&apos;s 250th
          </p>

          <button
            type="button"
            className="welcome-animate-rise-4 welcome-enter-btn pointer-events-none mt-12 inline-flex items-center gap-2 border-2 border-[var(--color-cream)]/30 px-10 py-4 font-display text-[11px] uppercase tracking-[0.2em] text-[var(--color-cream)] transition-colors duration-300 hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
            tabIndex={-1}
          >
            Enter the Charter
            <CharterIcon name="chevron-right" size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
