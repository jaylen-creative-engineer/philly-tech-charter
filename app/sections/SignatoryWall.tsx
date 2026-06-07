import { Signatory } from "../../lib/types";

interface Props {
  signatories: Signatory[];
}

export default function SignatoryWall({ signatories }: Props) {
  if (signatories.length === 0) return null;

  return (
    <section
      id="signatories"
      className="border-t border-[var(--color-hairline)] py-24 px-12 max-w-[1200px] mx-auto max-md:px-6"
    >
      {/* Header */}
      <div className="flex flex-wrap items-baseline gap-4 mb-16">
        <h2
          className="font-serif tracking-[-0.02em] text-[var(--color-off-white)]"
          style={{ fontSize: "clamp(28px, 3.5vw, 48px)" }}
        >
          Signatories
        </h2>
        <span className="text-[12px] font-medium text-[var(--color-volt)] tracking-[0.1em] bg-[var(--color-volt)]/10 border border-[var(--color-volt)]/20 px-3 py-1 rounded-full">
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
            <p className="font-serif text-[17px] text-[var(--color-off-white)] leading-tight">
              {s.name}
            </p>
            {s.context && (
              <p className="text-[11px] text-[var(--color-mute)] mt-0.5 font-light">
                {s.context}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Decorative rule */}
      <div className="mt-16 flex items-center gap-6">
        <div className="flex-1 h-px bg-[var(--color-hairline)]" />
        <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[var(--color-mute)]">
          Philadelphia · {new Date().getFullYear()}
        </p>
        <div className="flex-1 h-px bg-[var(--color-hairline)]" />
      </div>
    </section>
  );
}
