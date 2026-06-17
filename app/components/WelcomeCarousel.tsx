"use client";

import { useEffect, useState } from "react";
import { PLACEHOLDER_GRADIENTS, type PlaceholderVariant } from "./ImagePlaceholder";

/** Placeholder slides — swap for city portrait photography later */
const SLIDES: PlaceholderVariant[] = [
  "community",
  "history",
  "signature",
  "tech",
  "liberty",
  "document",
];

const INTERVAL_MS = 4500;

function CarouselPanel({
  side,
  active,
  reduceMotion,
}: {
  side: "left" | "right";
  active: number;
  reduceMotion: boolean;
}) {
  const offset = side === "right" ? 1 : 0;

  return (
    <div
      className={`welcome-carousel-panel welcome-carousel-panel--${side} welcome-animate-rise-1 hidden lg:block`}
      style={{ animationDelay: side === "right" ? "0.45s" : "0.3s" }}
      aria-hidden="true"
    >
      {SLIDES.map((variant, i) => {
        const slideIndex = (active + offset) % SLIDES.length;
        const isActive = i === slideIndex;

        return (
          <div
            key={`${side}-${variant}`}
            className="absolute inset-0 transition-opacity duration-[1400ms] ease-in-out"
            style={{ opacity: isActive ? 1 : 0 }}
          >
            <div
              className={`welcome-carousel-panel-inner absolute inset-0 ${reduceMotion ? "" : `welcome-carousel-panel-inner--${side}`}`}
              style={{ background: PLACEHOLDER_GRADIENTS[variant] }}
            />
            <div className="image-placeholder-grain absolute inset-0 opacity-30 mix-blend-overlay" />
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-white/10"
              aria-hidden="true"
            />
          </div>
        );
      })}
    </div>
  );
}

/**
 * Flanking portrait panels — sit deepest in the stack, behind BlueTexture and Fireworks.
 * Full saturation where visible; the atmospheric layers above carry the original welcome weight.
 */
export default function WelcomeCarousel() {
  const [active, setActive] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % SLIDES.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  return (
    <div className="welcome-carousel pointer-events-none absolute inset-0 z-[0]" aria-hidden="true">
      <CarouselPanel side="left" active={active} reduceMotion={reduceMotion} />
      <CarouselPanel side="right" active={active} reduceMotion={reduceMotion} />
    </div>
  );
}
