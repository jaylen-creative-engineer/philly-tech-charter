import { Signatory } from "../../lib/types";
import { CharterIcon } from "../components/CharterIcons";

interface Props {
  signatories: Signatory[];
}

export default function SignatoryWall({ signatories }: Props) {
  if (signatories.length === 0) return null;

  return (
    <section
      id="signatories"
      className="py-24 px-12 max-w-[1200px] mx-auto max-md:px-6"
    >
      {/* Header */}
      <div className="flex flex-wrap items-center gap-4 mb-16">
        <span className="icon-badge h-12 w-12 text-[var(--color-gold)]">
          <CharterIcon name="signature" size={24} />
        </span>
        <h2
          className="font-display text-[var(--color-blue)]"
          style={{ fontSize: "clamp(26px, 3.2vw, 44px)" }}
        >
          Signatories
        </h2>
        <span className="font-display text-[11px] text-[var(--color-cream)] tracking-[0.1em] bg-[var(--color-red)] px-3 py-1">
          {signatories.length.toLocaleString()} signed
        </span>
      </div>

      {/* Dense multi-column name wall */}
      <div
        className="columns-2 gap-x-12 max-md:columns-1"
        style={{ columnCount: "auto", columnWidth: "260px" }}
      >
        {signatories.map((s) => (
          <div
            key={s.id}
            className="break-inside-avoid mb-5"
            style={{
              animation: s.id.startsWith("sig-") ? "riseIn 0.6s ease forwards" : "none",
            }}
          >
            <p className="text-[16px] font-semibold text-[var(--color-blue)] leading-tight">
              {s.name}
            </p>
            {s.context && (
              <p className="text-[11px] text-[var(--color-mute)] mt-0.5">
                {s.context}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Decorative rule */}
      <div className="mt-16 flex items-center gap-6">
        <div className="flex-1 h-[3px] bg-[var(--color-red)]" />
        <p className="font-display text-[10px] tracking-[0.2em] uppercase text-[var(--color-blue)] inline-flex items-center gap-2">
          <CharterIcon name="star" size={12} className="text-[var(--color-gold)]" />
          Philadelphia · {new Date().getFullYear()}
          <CharterIcon name="star" size={12} className="text-[var(--color-gold)]" />
        </p>
        <div className="flex-1 h-[3px] bg-[var(--color-blue)]" />
      </div>
    </section>
  );
}
