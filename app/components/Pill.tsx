import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  variant?: "volt" | "outline" | "ghost";
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
    "inline-flex items-center gap-2 font-sans text-[13px] font-medium tracking-[0.05em] px-7 py-3.5 rounded-full transition-all duration-200 cursor-pointer select-none";

  const variants = {
    volt: "bg-[var(--color-volt)] text-[var(--color-ink)] border-0 hover:bg-[var(--color-volt-dim)] active:scale-95",
    outline:
      "bg-transparent text-[var(--color-off-white)] border border-white/25 hover:border-white/50",
    ghost:
      "bg-white/5 text-[var(--color-off-white)] border border-[var(--color-hairline)] hover:bg-white/10",
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
