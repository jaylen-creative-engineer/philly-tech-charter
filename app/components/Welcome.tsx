"use client";

import { useCallback, useEffect, useState } from "react";
import Fireworks from "./Fireworks";
import BlueTexture from "./BlueTexture";

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
        <BlueTexture variant="hero" />
        <Fireworks active={!exiting} />

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-8">
          <div className="welcome-animate-rise-1 flex items-center gap-4 mb-10">
            <span className="font-display text-[clamp(28px,5vw,48px)] text-[var(--color-cream)]/40 tabular-nums">
              1776
            </span>
            <div className="flex flex-col items-center gap-1">
              <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-[var(--color-gold)] to-transparent" />
              <span className="animate-star-pop text-[var(--color-gold)] text-[32px] leading-none select-none animate-glow-pulse rounded-full" aria-hidden="true">
                ★
              </span>
              <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-[var(--color-gold)] to-transparent" />
            </div>
            <span
              className="welcome-year-end font-display text-[clamp(28px,5vw,48px)] tabular-nums"
              aria-label={`Present day, ${CURRENT_YEAR}`}
            >
              <span className="welcome-year-end-shimmer">{CURRENT_YEAR}</span>
            </span>
          </div>

          <h1
            className="welcome-animate-rise-2 font-display leading-[0.95] text-[var(--color-cream)] max-w-4xl tracking-tight"
            style={{ fontSize: "clamp(40px, 8vw, 88px)" }}
          >
            Living
            <br />
            <span className="text-[var(--color-gold)]">Through</span>
            <br />
            History
          </h1>

          <p className="welcome-animate-rise-3 font-display uppercase tracking-[0.35em] text-[10px] text-[var(--color-cream)]/50 mt-8">
            Philadelphia · America&apos;s 250th
          </p>

          <button
            type="button"
            className="welcome-animate-rise-4 welcome-enter-btn mt-12 font-display uppercase tracking-[0.2em] text-[11px] text-[var(--color-cream)] border-2 border-[var(--color-cream)]/30 px-10 py-4 hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] transition-colors duration-300 pointer-events-none"
            tabIndex={-1}
          >
            Enter the Charter →
          </button>
        </div>
      </div>
    </div>
  );
}
