import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  variant?: "red" | "blue" | "outline" | "cream";
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
}

export default function Pill({
  children,
  variant = "outline",
  href,
  onClick,
  className = "",
  type = "button",
}: Props) {
  const base =
    "inline-flex items-center gap-2 transition-all duration-200 cursor-pointer select-none";

  const variants = {
    red:
      "font-display text-[12px] uppercase tracking-[0.12em] px-8 py-3.5 rounded-[var(--radius-md)] bg-[var(--color-red)] text-[var(--color-cream)] hover:bg-[var(--color-red-deep)] hover:translate-y-[-1px]",
    blue:
      "font-display text-[12px] uppercase tracking-[0.12em] px-8 py-3.5 rounded-[var(--radius-md)] bg-[var(--color-blue)] text-[var(--color-cream)] hover:bg-[var(--color-blue-deep)] hover:translate-y-[-1px]",
    cream:
      "font-display text-[12px] uppercase tracking-[0.12em] px-8 py-3.5 rounded-[var(--radius-md)] bg-[var(--color-cream)] text-[var(--color-blue)] hover:bg-[var(--color-paper)] hover:translate-y-[-1px]",
    outline:
      "font-display text-[12px] uppercase tracking-[0.12em] px-8 py-3.5 rounded-[var(--radius-md)] bg-transparent text-[var(--color-blue)] border-[3px] border-[var(--color-blue)] hover:bg-[var(--color-blue)] hover:text-[var(--color-cream)] hover:translate-y-[-1px]",
  };

  const cls = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={cls}>
      {children}
    </button>
  );
}
