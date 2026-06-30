"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import HallCanvas from "./HallCanvas";
import { HallScrollProvider } from "./HallScrollContext";
import JourneyHero from "../../sections/journey/JourneyHero";
import JourneyHistory from "../../sections/journey/JourneyHistory";
import JourneyStatement from "../../sections/journey/JourneyStatement";
import JourneyDocument, { JourneyPrinciples } from "../../sections/journey/JourneyDocument";
import JourneyContribute from "../../sections/journey/JourneyContribute";

interface Props {
  children: ReactNode;
  enabled?: boolean;
}

export default function HallJourney({ children, enabled = true }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const [canvasActive, setCanvasActive] = useState(enabled);

  const updateProgress = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const start = track.offsetTop;
    const scrollable = track.offsetHeight - window.innerHeight;
    const raw = scrollable > 0 ? (window.scrollY - start) / scrollable : 0;
    progressRef.current = Math.min(1, Math.max(0, raw));

    const pastTrack = window.scrollY > start + scrollable + window.innerHeight * 0.2;
    setCanvasActive(enabled && !pastTrack);
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, [enabled, updateProgress]);

  if (!enabled) {
    return <>{children}</>;
  }

  return (
    <HallScrollProvider progressRef={progressRef} trackRef={trackRef}>
      <HallCanvas scrollRef={progressRef} active={canvasActive} />

      <HallProgressBar progressRef={progressRef} />

      <div ref={trackRef} className="hall-journey-track relative z-10">
        <section id="top">
          <JourneyHero />
        </section>
        <JourneyHistory />
        <JourneyStatement />
        <JourneyDocument />
        <JourneyPrinciples />
        <JourneyContribute />
      </div>

      <div className="hall-journey-content relative z-10 bg-[var(--color-white)]">{children}</div>
    </HallScrollProvider>
  );
}

function HallProgressBar({ progressRef }: { progressRef: React.RefObject<number> }) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      const bar = barRef.current;
      if (!bar) return;
      bar.style.transform = `scaleX(${progressRef.current ?? 0})`;
      bar.style.opacity = (progressRef.current ?? 0) > 0.98 ? "0" : "1";
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [progressRef]);

  return (
    <div
      ref={barRef}
      aria-hidden="true"
      className="hall-journey-progress fixed bottom-0 left-0 right-0 z-40 h-[2px] origin-left bg-[var(--color-red)] pointer-events-none transition-opacity duration-300"
    />
  );
}
