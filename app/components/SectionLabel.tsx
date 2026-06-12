interface Props {
  children: string;
  color?: "red" | "cream";
}

export default function SectionLabel({ children, color = "red" }: Props) {
  const text =
    color === "cream" ? "text-[var(--color-cream)]" : "text-[var(--color-red)]";
  const bar =
    color === "cream" ? "bg-[var(--color-cream)]" : "bg-[var(--color-red)]";

  return (
    <p
      className={`font-display inline-flex items-center gap-3 text-[11px] tracking-[0.25em] uppercase ${text} mb-6`}
    >
      <span className={`w-8 h-[3px] ${bar}`} />
      {children}
    </p>
  );
}
