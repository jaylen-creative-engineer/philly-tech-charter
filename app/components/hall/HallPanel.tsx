"use client";

import { ReactNode } from "react";

interface Props {
  id?: string;
  children: ReactNode;
  /** Tailwind min-height class, default 100svh */
  heightClass?: string;
  className?: string;
}

export default function HallPanel({
  id,
  children,
  heightClass = "min-h-[100svh]",
  className = "",
}: Props) {
  return (
    <section
      id={id}
      className={`hall-panel relative flex items-center justify-center px-6 py-20 md:px-12 ${heightClass} ${className}`}
    >
      <div className="hall-panel-inner relative z-10 w-full max-w-[720px]">{children}</div>
    </section>
  );
}
