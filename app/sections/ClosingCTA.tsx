"use client";

import { motion } from "motion/react";
import Pill from "../components/Pill";

export default function ClosingCTA() {
  return (
    <section className="relative border-t border-[var(--color-hairline)] px-12 py-[140px] text-center overflow-hidden max-md:px-6 max-md:py-24">
      {/* Ghost glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(200,241,53,0.07), transparent 70%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 40 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="text-[11px] font-medium tracking-[0.22em] uppercase text-[var(--color-volt)] mb-8">
          Version 1.1 is unwritten
        </p>
        <h2
          className="font-serif leading-[1.0] tracking-[-0.025em] text-[var(--color-off-white)] max-w-3xl mx-auto mb-8"
          style={{ fontSize: "clamp(40px, 6vw, 88px)" }}
        >
          History is watching.
          <br />
          <em className="text-[var(--color-volt)]">The pen is in your hand.</em>
        </h2>
        <p className="text-[15px] font-light leading-[1.8] text-[var(--color-mute)] max-w-[480px] mx-auto mb-12">
          Two hundred fifty years from now, someone will read what this generation chose to write. Add your voice while the ink is still wet.
        </p>
        <div className="flex items-center justify-center gap-6 max-md:flex-col">
          <Pill variant="volt" href="#contribute">Contribute to the Document</Pill>
          <Pill variant="outline" href="#sign">Sign the Charter</Pill>
        </div>
      </motion.div>
    </section>
  );
}
