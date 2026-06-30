"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useSpring, useMotionValueEvent } from "motion/react";
import HallPanel from "../../components/hall/HallPanel";

const ERAS = [
  {
    year: "1440",
    title: "The printing press",
    body: "It didn't just print books. It democratized knowledge and fractured the authority of institutions. Nobody planned that. It simply happened — to everyone.",
  },
  {
    year: "1879",
    title: "Electric light",
    body: "It didn't just light rooms. It restructured labor, lengthened the day, and redrew the boundary between public and private life. Again: unplanned, reactive, irreversible.",
  },
  {
    year: "1969",
    title: "The internet",
    body: "It didn't just connect computers. It remade how we form identity, relationship, and truth itself. We are still absorbing the consequences of letting that happen to us.",
  },
  {
    year: "2026",
    title: "Intelligence",
    body: "Now comes the most rapid technological shift in human history. For the first time, we can see the transformation while it is happening — which means, for the first time, we can design our intention before the moment designs us.",
    accent: true,
  },
] as const;

export default function JourneyHistory() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 0.7", "end 0.4"],
  });
  const lineProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(ERAS.length - 1, Math.floor(v * ERAS.length)));
  });

  return (
    <HallPanel id="history" heightClass="min-h-[400svh]" className="items-start pt-[18vh]">
      <div className="mb-16 max-w-[640px]">
        <p className="hall-kicker mb-4">Innovation corridor</p>
        <h2
          className="font-display leading-[1.05] text-[var(--color-blue)]"
          style={{ fontSize: "clamp(28px, 3.6vw, 46px)" }}
        >
          Technology and culture
          <br />
          <span className="text-[var(--color-red)]">have always been one system.</span>
        </h2>
      </div>

      <div ref={timelineRef} className="grid w-full max-w-[960px] grid-cols-1 gap-12 md:grid-cols-[1fr_1.4fr]">
        <div className="max-md:hidden">
          <div className="sticky top-[28vh]">
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--color-mute)]">
              The pattern repeats
            </p>
            <p
              className="font-display leading-none text-[var(--color-blue)] transition-opacity duration-300"
              style={{ fontSize: "clamp(48px, 6vw, 88px)" }}
            >
              {ERAS[active].year}
            </p>
            <div className="mt-6 h-1 w-24 bg-[var(--color-red)]" />
          </div>
        </div>

        <div className="relative space-y-[60vh] pb-[20vh]">
          <div
            aria-hidden="true"
            className="absolute left-0 top-0 bottom-0 w-px bg-[var(--color-rule-light)] max-md:hidden overflow-hidden"
          >
            <motion.div
              className="hall-timeline-fill w-full origin-top bg-[var(--color-red)]"
              style={{ height: "100%", scaleY: lineProgress }}
            />
          </div>

          {ERAS.map((era, i) => (
            <article
              key={era.year}
              className={`hall-era-card pl-0 md:pl-10 transition-opacity duration-500 ${
                i === active ? "opacity-100" : "opacity-40"
              }`}
            >
              <p className="font-display text-[32px] text-[var(--color-blue)] md:hidden">{era.year}</p>
              <h3
                className={`font-display text-[22px] mb-4 ${
                  "accent" in era && era.accent ? "text-[var(--color-red)]" : "text-[var(--color-blue)]"
                }`}
              >
                {era.title}
              </h3>
              <p className="text-[15px] leading-[1.8] text-[var(--color-ink)]">{era.body}</p>
            </article>
          ))}
        </div>
      </div>
    </HallPanel>
  );
}
