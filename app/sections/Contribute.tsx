import Link from "next/link";
import ScrollReveal from "../components/ScrollReveal";
import SectionLabel from "../components/SectionLabel";
import Pill from "../components/Pill";
import ImagePlaceholder from "../components/ImagePlaceholder";
import { CharterIcon, type CharterIconName } from "../components/CharterIcons";

const PATHS = [
  {
    kind: "signature",
    label: "Signature",
    icon: "signature" as CharterIconName,
    title: "Stand with the charter.",
    body: "Add your name to the public record of people who believe this work should move forward.",
  },
  {
    kind: "principle",
    label: "Principle",
    icon: "principle" as CharterIconName,
    title: "Write a commitment.",
    body: "Propose a guiding idea that could shape the next version of the declaration.",
  },
  {
    kind: "other",
    label: "Other",
    icon: "voice" as CharterIconName,
    title: "Add context.",
    body: "Offer a refinement, challenge, question, example, or piece of evidence for v1.1.",
  },
] as const;

export default function Contribute() {
  return (
    <section id="contribute" className="py-[120px] px-12 max-w-[1100px] mx-auto max-md:px-6">
      <div className="text-center mb-14">
        <ScrollReveal>
          <SectionLabel icon={<CharterIcon name="voice" size={18} />}>
            Add Your Voice
          </SectionLabel>
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <h2
            className="font-display leading-[1.05] text-[var(--color-blue)] mb-4"
            style={{ fontSize: "clamp(32px, 4.6vw, 58px)" }}
          >
            Choose how you want to participate.
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={120}>
          <p className="text-[16px] leading-[1.8] text-[var(--color-ink)] max-w-[520px] mx-auto">
            Signature, principle, or another contribution: each path now has its own focused
            experience before it joins the public record.
          </p>
        </ScrollReveal>
      </div>

      <ScrollReveal delay={140}>
        <ImagePlaceholder
          variant="community"
          aspect="wide"
          label="Community · Participation"
          className="mb-8 shadow-[0_12px_40px_rgba(224,46,53,0.1)] max-md:aspect-[16/9]"
        />
      </ScrollReveal>

      <ScrollReveal delay={160}>
        <div className="card-surface border-[3px] border-[var(--color-blue)] bg-[var(--color-paper)] p-8 text-left max-md:p-6">
          <div className="grid gap-3 md:grid-cols-3">
            {PATHS.map((path) => (
              <Link
                key={path.label}
                href={`/contribute?kind=${path.kind}`}
                className="type-card block p-5 text-left no-underline"
              >
                <span className="icon-badge mb-4 h-10 w-10 text-[var(--color-red)]">
                  <CharterIcon name={path.icon} size={20} />
                </span>
                <p className="font-display mb-2 text-[10px] uppercase tracking-[0.2em] text-[var(--color-red)]">
                  {path.label}
                </p>
                <p className="font-display mb-3 text-[18px] leading-tight text-[var(--color-blue)]">
                  {path.title}
                </p>
                <p className="text-[13px] leading-[1.65] text-[var(--color-mute)]">
                  {path.body}
                </p>
              </Link>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--color-rule-light)] pt-6">
            <p className="max-w-[560px] text-[13px] leading-[1.7] text-[var(--color-mute)]">
              The full contribution flow helps you pick the right path, preview how it will appear,
              and confirm when it has been submitted.
            </p>
            <Pill variant="red" href="/contribute">
              <CharterIcon name="pen" size={14} />
              Start contributing
            </Pill>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
