"use client";

import { motion } from "motion/react";
import Pill from "../components/Pill";
import { CharterIcon } from "../components/CharterIcons";

export default function ClosingCTA() {
  return (
    <section className="relative border-t-[3px] border-[var(--color-blue)] px-12 py-[120px] text-center overflow-hidden max-md:px-6 max-md:py-24 bg-[var(--color-cream)]">
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(217, 163, 62, 0.1), transparent 70%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10"
      >
        <p className="font-display text-[11px] tracking-[0.25em] uppercase text-[var(--color-red)] mb-8">
          Version 1.1 · Juneteenth Release
        </p>
        <h2
          className="font-display leading-[1.0] text-[var(--color-blue)] max-w-3xl mx-auto mb-8"
          style={{ fontSize: "clamp(36px, 5.5vw, 72px)" }}
        >
          The document is alive.
          <br />
          <span className="text-[var(--color-red)]">Your voice can shape it.</span>
        </h2>
        <p className="text-[15px] leading-[1.8] text-[var(--color-ink)] max-w-[480px] mx-auto mb-12">
          Sign, propose a principle, or add context. Every contribution is saved to the public record. Two hundred fifty years from now, someone will read what this generation chose to write.
        </p>
        <div className="flex items-center justify-center gap-4 max-md:flex-col">
          <Pill variant="red" href="/contribute">
            <CharterIcon name="voice" size={14} />
            Contribute to the Document
          </Pill>
          <Pill variant="outline" href="/contribute">
            <CharterIcon name="signature" size={14} />
            Sign the Charter
          </Pill>
        </div>
      </motion.div>
    </section>
  );
}
