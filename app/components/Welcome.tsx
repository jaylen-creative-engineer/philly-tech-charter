"use client";

import { useCallback, useEffect, useState } from "react";

interface Props {
  onComplete: () => void;
}

const SEEN_KEY = "ptc-welcomed";

type Phase = "intro" | "exit" | "done";

export default function Welcome({ onComplete }: Props) {
  const [phase, setPhase] = useState<Phase>("intro");

  // Skip for repeat visitors this session, and for reduced-motion users
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduceMotion && !sessionStorage.getItem(SEEN_KEY)) return;
    const t = setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 0);
    return () => clearTimeout(t);
  }, [onComplete]);

  // Auto-advance into the page
  useEffect(() => {
    if (phase !== "intro") return;
    const t = setTimeout(() => setPhase("exit"), 3800);
    return () => clearTimeout(t);
  }, [phase]);

  // Unmount once the curtain has lifted
  useEffect(() => {
    if (phase !== "exit") return;
    sessionStorage.setItem(SEEN_KEY, "1");
    const t = setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 1000);
    return () => clearTimeout(t);
  }, [phase, onComplete]);

  // Lock scroll while the overlay is up
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

  if (phase === "done") return null;

  const exiting = phase === "exit";
  const panel =
    "absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.18,1)]";
  const lift = exiting ? "-translate-y-full" : "translate-y-0";

  return (
    <div
      className="fixed inset-0 z-[100] cursor-pointer overflow-hidden"
      role="button"
      tabIndex={0}
      aria-label="Enter the Philly Tech Charter"
      onClick={enter}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") enter();
      }}
    >
      {/* Curtain layers — lift in sequence: blue, then cream, then red */}
      <div className={`${panel} ${lift} z-[1] bg-[var(--color-red)]`} style={{ transitionDelay: exiting ? "240ms" : "0ms" }} />
      <div className={`${panel} ${lift} z-[2] bg-[var(--color-cream)]`} style={{ transitionDelay: exiting ? "120ms" : "0ms" }} />
      <div className={`${panel} ${lift} z-[3] bg-[var(--color-blue)]`}>
        <div className="h-full flex flex-col items-center justify-center text-center px-8 gap-6">
          <span className="animate-star-pop text-[var(--color-gold)] text-[44px] leading-none select-none" aria-hidden="true">
            ★
          </span>

          <p className="animate-rise-1 font-display uppercase tracking-[0.3em] text-[11px] text-[var(--color-gold)]">
            Philadelphia · 1776 — 2026
          </p>

          <h1
            className="animate-rise-2 font-display leading-[1.05] text-[var(--color-cream)] max-w-3xl"
            style={{ fontSize: "clamp(34px, 6.5vw, 72px)" }}
          >
            We are living
            <br />
            through history.
          </h1>

          <p className="animate-rise-3 text-[15px] leading-[1.7] text-[var(--color-cream)]/80 max-w-md">
            Philadelphia helped write the last 250 years. This charter is how we
            write the next.
          </p>

          <p className="animate-rise-5 font-display uppercase tracking-[0.25em] text-[10px] text-[var(--color-cream)]/60 mt-6">
            ★ Click anywhere to enter ★
          </p>
        </div>
      </div>
    </div>
  );
}
