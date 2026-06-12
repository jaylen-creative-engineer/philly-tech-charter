"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const STATEMENT =
  "AI is a tool for our collective growth. Culture is a tool for our collective growth. Both need to work as an integrated system — so we can solve the problems that sit at the core of the systems we all live inside.";

export default function Statement() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Subtle depth: the panel eases up while its text settles
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  const words = STATEMENT.split(" ");

  return (
    <div ref={ref} className="bg-[var(--color-volt)] px-12 py-28 overflow-hidden max-md:px-6">
      <motion.div style={{ y }} className="max-w-4xl mx-auto text-center">
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          transition={{ staggerChildren: 0.018 }}
          className="font-serif italic leading-[1.15] tracking-[-0.02em] text-[var(--color-ink)]"
          style={{ fontSize: "clamp(28px, 4.5vw, 64px)" }}
        >
          <span aria-hidden="true">&ldquo;</span>
          {words.map((word, i) => (
            <motion.span
              key={i}
              variants={{
                hidden: { opacity: 0.12, y: 8 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
              }}
              className="inline-block whitespace-pre"
            >
              {word}
              {i < words.length - 1 ? " " : ""}
            </motion.span>
          ))}
          <span aria-hidden="true">&rdquo;</span>
        </motion.p>
      </motion.div>
    </div>
  );
}
