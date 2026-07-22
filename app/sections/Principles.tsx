import ScrollReveal from "../components/ScrollReveal";
import BlueTexture from "../components/BlueTexture";
import { PRINCIPLES } from "../../lib/data";
import { CharterIcon, type CharterIconName } from "../components/CharterIcons";

const PRINCIPLE_ICONS: CharterIconName[] = [
  "access",
  "public",
  "measure",
];

export default function Principles() {
  return (
    <section
      id="principles"
      className="blue-surface py-24 px-12 max-md:px-6"
    >
      <BlueTexture />
      <div className="max-w-[1100px] mx-auto relative z-10">
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
              <div className="card-surface bg-[var(--color-cream)] p-9 h-full border-b-[6px] border-[var(--color-red)]">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <span className="icon-badge h-11 w-11 text-[var(--color-blue)]">
                    <CharterIcon name={PRINCIPLE_ICONS[i]} size={22} />
                  </span>
                  <p className="font-display text-[26px] leading-none text-[var(--color-red)]">
                    {p.num}
                  </p>
                </div>
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
