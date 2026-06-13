"use client";

import { useScroll, useSpring, useTransform, useMotionValueEvent, motion } from "motion/react";
import { useState } from "react";
import Pill from "./Pill";

const LINKS = [
  { href: "#document", label: "Document" },
  { href: "#principles", label: "Principles" },
  { href: "#voices", label: "Voices" },
  { href: "/contribute", label: "Participate" },
];

export default function StickyNav() {
  const { scrollY, scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    setVisible(y > window.innerHeight * 0.85);
  });

  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const scaleX = useTransform(progress, (v) => Math.max(v, 0.001));

  return (
    <motion.header
      initial={false}
      animate={{ y: visible ? 0 : -72, opacity: visible ? 1 : 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 32 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[var(--color-ink)]/80 border-b border-[var(--color-hairline)]"
    >
      <div className="flex items-center justify-between px-8 py-3 max-md:px-4">
        <a href="#top" className="font-serif italic text-[16px] text-[var(--color-off-white)] whitespace-nowrap">
          Philadelphia Declaration <span className="text-[var(--color-volt)] not-italic">· 250</span>
        </a>

        <nav className="flex items-center gap-7 max-md:hidden">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[11px] font-medium tracking-[0.18em] uppercase text-[var(--color-mute)] hover:text-[var(--color-off-white)] transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <Pill variant="red" href="/contribute" className="!px-5 !py-2 text-[11px]">
          Participate
        </Pill>
      </div>

      {/* Reading progress */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--color-volt)] origin-left"
        style={{ scaleX }}
      />
    </motion.header>
  );
}
