import ScrollReveal from "../components/ScrollReveal";
import { PRINCIPLES } from "../../lib/data";

export default function Principles() {
  return (
    <section
      id="principles"
      className="py-24 px-12 bg-[var(--color-blue)] max-md:px-6"
    >
      <div className="max-w-[1100px] mx-auto">
        {/* Header */}
        <ScrollReveal className="flex items-end justify-between gap-12 mb-16 max-md:flex-col max-md:items-start">
          <h2
            className="font-display leading-[1.0] text-[var(--color-cream)]"
            style={{ fontSize: "clamp(32px, 4vw, 54px)" }}
          >
            Core
            <br />
            <span className="text-[var(--color-red)]" style={{ WebkitTextStroke: "1px var(--color-cream)" }}>
              Commitments
            </span>
          </h2>
          <p className="text-[14px] text-[var(--color-cream)]/80 max-w-[280px] leading-[1.7] text-right max-md:text-left max-md:max-w-none">
            These principles form the spine of this document. They will grow as more voices are added.
          </p>
        </ScrollReveal>

        {/* Grid */}
        <div className="grid grid-cols-3 gap-3 max-md:grid-cols-1">
          {PRINCIPLES.map((p, i) => (
            <ScrollReveal key={p.num} delay={i * 60}>
              <div className="bg-[var(--color-cream)] p-9 h-full border-b-[6px] border-[var(--color-red)]">
                <p className="font-display text-[26px] leading-none text-[var(--color-red)] mb-4">
                  {p.num}
                </p>
                <h3 className="font-display text-[18px] leading-[1.25] text-[var(--color-blue)] mb-3.5">
                  {p.title}
                </h3>
                <p className="text-[13px] leading-[1.75] text-[var(--color-ink)]">
                  {p.body}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
