"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "document", label: "Charter" },
  { id: "principles", label: "Principles" },
  { id: "contribute", label: "Contribute" },
  { id: "voices", label: "Voices" },
  { id: "sign", label: "Sign" },
] as const;

interface Props {
  visible: boolean;
}

export default function Nav({ visible }: Props) {
  const [active, setActive] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!visible) return;

    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5] }
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[var(--color-cream)]/90 backdrop-blur-md shadow-[0_1px_0_var(--color-rule-light)]"
          : "bg-transparent"
      }`}
      style={{ animation: "navSlide 0.6s 0.2s ease forwards", opacity: 0 }}
    >
      {/* Tri-color stripe */}
      <div className="flex h-[3px]" aria-hidden="true">
        <div className="flex-1 bg-[var(--color-red)]" />
        <div className="flex-1 bg-[var(--color-cream)]" />
        <div className="flex-1 bg-[var(--color-blue)]" />
      </div>

      <nav className="flex items-center justify-between px-6 py-3 max-md:px-4">
        <a
          href="#"
          className="font-display text-[13px] leading-tight tracking-tight group"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <span className="text-[var(--color-red)] group-hover:text-[var(--color-red-deep)] transition-colors">
            Philly Tech
          </span>
          <span className="text-[var(--color-blue)] group-hover:text-[var(--color-blue-deep)] transition-colors">
            {" "}
            Charter
          </span>
        </a>

        <ul className="flex items-center gap-1 max-md:gap-0">
          {SECTIONS.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`font-display text-[10px] uppercase tracking-[0.12em] px-3 py-2 transition-all duration-200 max-md:px-2 max-md:text-[9px] ${
                  active === id
                    ? "text-[var(--color-red)] bg-[var(--color-red)]/8"
                    : scrolled
                      ? "text-[var(--color-blue)] hover:text-[var(--color-red)]"
                      : "text-[var(--color-cream)]/90 hover:text-[var(--color-gold)]"
                }`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contribute"
          className="font-display text-[10px] uppercase tracking-[0.1em] px-4 py-2 rounded-[var(--radius-md)] bg-[var(--color-red)] text-[var(--color-cream)] hover:bg-[var(--color-red-deep)] transition-colors max-md:hidden"
        >
          Add Voice
        </a>
      </nav>
    </header>
  );
}
