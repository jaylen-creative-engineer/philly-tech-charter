"use client";

import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useMotionValueEvent,
} from "motion/react";
import ScrollReveal from "../components/ScrollReveal";
import SectionLabel from "../components/SectionLabel";

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
];

export default function Intro() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 0.65", "end 0.55"],
  });
  const lineProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(ERAS.length - 1, Math.floor(v * ERAS.length)));
  });

  return (
    <section className="max-w-[1200px] mx-auto px-12 py-[120px] max-md:px-6 max-md:py-20">
      {/* Framing */}
      <div className="max-w-[720px] mb-24">
        <ScrollReveal>
          <SectionLabel>Why This. Why Now.</SectionLabel>
          <h2
            className="font-serif leading-[1.05] tracking-[-0.02em] text-[var(--color-off-white)] mb-10"
            style={{ fontSize: "clamp(36px, 4vw, 56px)" }}
          >
            Technology and culture
            <br />
            <em className="text-[var(--color-volt)]">have always been one system.</em>
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <p className="font-serif text-[19px] italic leading-[1.75] text-[var(--color-off-white)]">
            Every transformative technology in human history reshaped not just what we could do — but how we lived, what we valued, and who we became. The pattern is old. Our response to it doesn&apos;t have to be.
          </p>
        </ScrollReveal>
      </div>

      {/* Scroll-driven era timeline */}
      <div ref={timelineRef} className="grid grid-cols-[1fr_1.4fr] gap-16 max-md:grid-cols-1 max-md:gap-8">
        {/* Sticky era year */}
        <div className="max-md:hidden">
          <div className="sticky top-[28vh]">
            <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-[var(--color-mute)] mb-4">
              The pattern repeats
            </p>
            <div className="relative h-[140px]">
              <AnimatePresence mode="popLayout">
                <motion.p
                  key={ERAS[active].year}
                  initial={{ opacity: 0, y: 36 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -36 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className={`absolute font-serif leading-none tracking-[-0.03em] ${
                    ERAS[active].accent ? "text-[var(--color-volt)]" : "text-[var(--color-off-white)]"
                  }`}
                  style={{ fontSize: "clamp(80px, 9vw, 130px)" }}
                >
                  {ERAS[active].year}
                </motion.p>
              </AnimatePresence>
            </div>
            <p className="font-serif italic text-[20px] text-[var(--color-mute)] mt-2">
              {ERAS[active].title}
            </p>
          </div>
        </div>

        {/* Timeline rail + chapters */}
        <div className="relative pl-12 max-md:pl-9">
          {/* Rail */}
          <div className="absolute left-0 top-2 bottom-2 w-px bg-[var(--color-hairline)]" />
          <motion.div
            className="absolute left-0 top-2 bottom-2 w-px bg-[var(--color-volt)] origin-top"
            style={{ scaleY: lineProgress }}
          />

          <div className="space-y-28 max-md:space-y-16">
            {ERAS.map((era, i) => (
              <motion.div
                key={era.year}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -25% 0px" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                {/* Node */}
                <span
                  className={`absolute -left-12 max-md:-left-9 top-2 w-[9px] h-[9px] rounded-full -translate-x-1/2 ml-px transition-all duration-500 ${
                    active >= i
                      ? "bg-[var(--color-volt)] shadow-[0_0_14px_rgba(200,241,53,0.7)]"
                      : "bg-[var(--color-hairline)]"
                  }`}
                />
                <p className="md:hidden font-serif text-[40px] leading-none mb-2 text-[var(--color-off-white)]">
                  <span className={era.accent ? "text-[var(--color-volt)]" : ""}>{era.year}</span>
                </p>
                <h3
                  className={`font-serif text-[26px] leading-[1.15] tracking-[-0.01em] mb-4 ${
                    era.accent ? "text-[var(--color-volt)]" : "text-[var(--color-off-white)]"
                  }`}
                >
                  {era.title}
                </h3>
                <p className="text-[15px] font-light leading-[1.8] text-[var(--color-mute)] max-w-[480px]">
                  {era.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Closing thought */}
      <ScrollReveal className="max-w-[720px] mx-auto mt-32 text-center max-md:mt-20">
        <p className="font-serif text-[22px] italic leading-[1.7] text-[var(--color-off-white)]">
          This document is not a law. It is not a policy. It is an act of collective design — written in the city where America first dared to write down what it believed, and offered to anyone willing to add their voice to the work of shaping what comes next.
        </p>
      </ScrollReveal>
    </section>
  );
}
