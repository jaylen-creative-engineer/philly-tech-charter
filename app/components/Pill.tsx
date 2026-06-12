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
    "inline-flex items-center gap-2 font-display text-[12px] uppercase tracking-[0.12em] px-8 py-3.5 rounded-[var(--radius-md)] transition-all duration-200 cursor-pointer select-none hover:translate-y-[-1px]";

  const variants = {
    red: "bg-[var(--color-red)] text-[var(--color-cream)] hover:bg-[var(--color-red-deep)]",
    blue: "bg-[var(--color-blue)] text-[var(--color-cream)] hover:bg-[var(--color-blue-deep)]",
    cream:
      "bg-[var(--color-cream)] text-[var(--color-blue)] hover:bg-[var(--color-paper)]",
    outline:
      "bg-transparent text-[var(--color-blue)] border-[3px] border-[var(--color-blue)] hover:bg-[var(--color-blue)] hover:text-[var(--color-cream)]",
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
