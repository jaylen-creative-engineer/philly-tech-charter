import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  variant?: "red" | "blue" | "outline" | "cream" | "ghost";
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
  const cls = `pill-btn pill-btn--${variant} ${className}`;

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
