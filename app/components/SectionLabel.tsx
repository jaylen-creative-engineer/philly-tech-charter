import { ReactNode } from "react";

interface Props {
  children: string;
  color?: "red" | "cream";
  icon?: ReactNode;
}

export default function SectionLabel({ children, color = "red", icon }: Props) {
  const text =
    color === "cream" ? "text-[var(--color-cream)]" : "text-[var(--color-red)]";
  const bar =
    color === "cream" ? "bg-[var(--color-cream)]" : "bg-[var(--color-red)]";
  const badgeStyle =
    color === "cream"
      ? "border-[var(--color-cream)]/25 bg-[var(--color-blue-deep)] text-[var(--color-gold)]"
      : "text-[var(--color-blue)]";

  return (
    <p
      className={`font-display inline-flex items-center gap-3 text-[11px] tracking-[0.25em] uppercase ${text} mb-6`}
    >
      {icon ? (
        <span className={`icon-badge h-9 w-9 ${badgeStyle}`}>{icon}</span>
      ) : (
        <span className={`w-8 h-[3px] ${bar}`} />
      )}
      {children}
    </p>
  );
}
