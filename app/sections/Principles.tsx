"use client";

import { motion } from "motion/react";
import ScrollReveal from "../components/ScrollReveal";
import TiltCard from "../components/TiltCard";
import { PRINCIPLES } from "../../lib/data";

export default function Principles() {
  return (
    <section
      id="principles"
      className="py-24 px-12 bg-white/[0.02] border-y border-[var(--color-hairline)] max-md:px-6"
    >
      <div className="max-w-[1100px] mx-auto">
        {/* Header */}
        <ScrollReveal className="flex items-end justify-between gap-12 mb-16 max-md:flex-col max-md:items-start">
          <h2
            className="font-serif leading-[1.0] tracking-[-0.02em] text-[var(--color-off-white)]"
            style={{ fontSize: "clamp(36px, 4.5vw, 60px)" }}
          >
            Core
            <br />
            <em className="text-[var(--color-volt)]">Commitments</em>
          </h2>
          <p className="text-[14px] font-light text-[var(--color-mute)] max-w-[280px] leading-[1.7] text-right max-md:text-left max-md:max-w-none">
            These principles form the spine of this document. They will grow as more voices are added.
          </p>
        </ScrollReveal>

        {/* Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -15% 0px" }}
          transition={{ staggerChildren: 0.08 }}
          className="grid grid-cols-3 gap-0.5 max-md:grid-cols-1"
        >
          {PRINCIPLES.map((p) => (
            <motion.div
              key={p.num}
              variants={{
                hidden: { opacity: 0, y: 36 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
              }}
            >
              <TiltCard className="h-full">
                <div className="bg-[var(--color-ash)] p-10 h-full transition-colors duration-300 hover:bg-[#41413e]">
                  <p className="text-[9px] font-semibold tracking-[0.3em] text-[var(--color-volt)] uppercase mb-5">
                    {p.num}
                  </p>
                  <div className="w-6 h-0.5 bg-[var(--color-volt)] mb-5 transition-all duration-500 group-hover:w-12" />
                  <h3 className="font-serif text-[22px] leading-[1.2] tracking-[-0.01em] text-[var(--color-off-white)] mb-3.5">
                    {p.title}
                  </h3>
                  <p className="text-[13px] font-light leading-[1.75] text-[var(--color-mute)]">
                    {p.body}
                  </p>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
