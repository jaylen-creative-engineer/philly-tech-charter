import { Contribution } from "../../lib/types";

interface Props {
  contributions: Contribution[];
}

export default function Voices({ contributions }: Props) {
  return (
    <section id="voices" className="border-t border-[var(--color-hairline)] py-24 px-12 max-w-[1200px] mx-auto max-md:px-6">
      <div className="flex items-baseline gap-4 mb-14">
        <h2
          className="font-serif tracking-[-0.02em] text-[var(--color-off-white)]"
          style={{ fontSize: "clamp(28px, 3.5vw, 48px)" }}
        >
          Voices
        </h2>
        <span className="text-[12px] font-medium text-[var(--color-volt)] tracking-[0.1em] bg-[var(--color-volt)]/10 border border-[var(--color-volt)]/20 px-3 py-1 rounded-full">
          {contributions.length} contribution{contributions.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="grid gap-0.5" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}>
        {contributions.map((c) => (
          <div
            key={c.id}
            className="bg-[var(--color-ash)] p-8"
            style={{
              animation: c.id.startsWith("contrib-") ? "riseIn 0.6s ease forwards" : "none",
            }}
          >
            <p className="text-[9px] font-semibold tracking-[0.25em] uppercase text-[var(--color-volt)] mb-3.5">
              {c.type}
            </p>
            <p className="font-serif text-[16px] italic leading-[1.7] text-[var(--color-off-white)] mb-5">
              &ldquo;{c.text}&rdquo;
            </p>
            <p className="text-[12px] text-[var(--color-mute)] font-medium">
              {c.name}
              {c.context ? ` · ${c.context}` : ""}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
