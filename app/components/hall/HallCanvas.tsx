"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, type RefObject } from "react";

const HallScene = dynamic(() => import("./HallScene"), { ssr: false });

interface Props {
  scrollRef: RefObject<number>;
  active: boolean;
}

export default function HallCanvas({ scrollRef, active }: Props) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!active) {
      setOpacity(0);
      return;
    }

    const update = () => {
      const progress = scrollRef.current ?? 0;
      const fade = progress > 0.88 ? Math.max(0, 1 - (progress - 0.88) / 0.12) : 1;
      setOpacity(fade);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [scrollRef, active]);

  if (!mounted || !active) return null;

  return (
    <div
      aria-hidden="true"
      className="hall-canvas fixed inset-0 z-0 pointer-events-none transition-opacity duration-500"
      style={{ opacity }}
    >
      <HallScene scrollRef={scrollRef} reducedMotion={reducedMotion} />
    </div>
  );
}
