"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";

const SECTIONS = [
  { id: "document", label: "Charter" },
  { id: "principles", label: "Principles" },
  { id: "voices", label: "Voices" },
] as const;

interface Props {
  visible: boolean;
  sectionHrefPrefix?: "#" | "/#";
}

export default function Nav({ visible, sectionHrefPrefix = "#" }: Props) {
  const [active, setActive] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const menuId = useId();
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const scriptRef = useRef<HTMLSpanElement>(null);
  const blockRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLSpanElement>(null);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    if (!visible) return;

    const onScroll = () => setScrolled(window.scrollY > 48);
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

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
        menuBtnRef.current?.focus();
      }
    };

    const onResize = () => {
      if (window.matchMedia("(min-width: 768px)").matches) {
        closeMenu();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);

    const drawer = drawerRef.current;
    const focusable = drawer?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    focusable?.[0]?.focus();

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen, closeMenu]);

  useEffect(() => {
    if (!visible) return;

    const block = blockRef.current;
    const script = scriptRef.current;
    const title = titleRef.current;
    if (!block || !script || !title) return;

    const fitBrand = () => {
      block.style.width = "auto";
      script.style.fontSize = "28px";
      script.style.letterSpacing = "";

      const targetWidth = Math.max(title.scrollWidth, script.scrollWidth);
      if (targetWidth <= 0) return;

      block.style.width = `${targetWidth}px`;
    };

    fitBrand();
    const observer = new ResizeObserver(fitBrand);
    observer.observe(title);
    observer.observe(script);

    document.fonts?.ready.then(fitBrand).catch(() => {});
    window.addEventListener("resize", fitBrand);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", fitBrand);
    };
  }, [visible]);

  if (!visible) return null;

  const onHero = !scrolled;
  const linkClass = (isActive: boolean) =>
    [
      "nav-link",
      isActive ? "nav-link--active" : "",
      onHero ? "nav-link--hero" : "nav-link--surface",
    ]
      .filter(Boolean)
      .join(" ");

  const renderSectionLink = (id: string, label: string, index: number) => {
    const isActive = active === id && pathname !== "/contribute";
    return (
      <li key={id}>
        <a
          href={`${sectionHrefPrefix}${id}`}
          className={linkClass(isActive)}
          aria-current={isActive ? "location" : undefined}
          onClick={closeMenu}
        >
          <span className="nav-link-index" aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
          {label}
        </a>
      </li>
    );
  };

  const participateActive = pathname === "/contribute";

  return (
    <header
      className={`nav-bar ${onHero ? "nav-bar--hero" : "nav-bar--surface"}`}
      style={{ animation: "navSlide 0.6s 0.2s ease forwards", opacity: 0 }}
    >
      <div className="nav-stripe" aria-hidden="true">
        <span className="bg-[var(--color-red)]" />
        <span className="bg-[var(--color-white)]" />
        <span className="bg-[var(--color-blue)]" />
      </div>

      <nav className="nav-inner" aria-label="Primary">
        <Link
          href="/"
          className={`nav-brand ${onHero ? "nav-brand--hero" : "nav-brand--surface"}`}
          aria-label="Philly Tech Charter, return to top"
          onClick={(e) => {
            if (window.location.pathname === "/") {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
            closeMenu();
          }}
        >
          <span className="nav-brand-lockup">
            <span className="nav-brand-block" ref={blockRef}>
              <span className="nav-brand-script-wrap">
                <span className="nav-brand-script" ref={scriptRef}>
                  Philadelphia
                </span>
                <span className="nav-brand-rule" aria-hidden="true" />
              </span>
              <span className="nav-brand-title" ref={titleRef}>
                <span className="nav-brand-title-primary">Philly Tech</span>
                <span className="nav-brand-title-secondary">Charter</span>
              </span>
            </span>
            <span className="nav-brand-era" aria-label="1776 to 2026">
              <span className="nav-brand-era-year">1776</span>
              <span className="nav-brand-era-line" aria-hidden="true" />
              <span className="nav-brand-era-year">2026</span>
            </span>
          </span>
        </Link>

        <ul className="nav-links nav-links--desktop">
          {SECTIONS.map(({ id, label }, index) => renderSectionLink(id, label, index))}
          <li>
            <Link
              href="/contribute"
              className={`nav-cta ${participateActive ? "opacity-90" : ""}`}
              aria-current={participateActive ? "page" : undefined}
            >
              Participate
            </Link>
          </li>
        </ul>

        <button
          ref={menuBtnRef}
          type="button"
          className={`nav-menu-btn ${menuOpen ? "nav-menu-btn--open" : ""}`}
          aria-expanded={menuOpen}
          aria-controls={menuId}
          aria-haspopup="true"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
          <span className="nav-menu-icon" aria-hidden="true">
            <span />
            <span />
          </span>
        </button>
      </nav>

      <div
        ref={drawerRef}
        id={menuId}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={`nav-drawer ${menuOpen ? "nav-drawer--open" : ""}`}
        hidden={!menuOpen}
      >
        <ul className="nav-drawer-links">
          {SECTIONS.map(({ id, label }, index) => renderSectionLink(id, label, index))}
          <li>
            <Link
              href="/contribute"
              className={linkClass(participateActive)}
              aria-current={participateActive ? "page" : undefined}
              onClick={closeMenu}
            >
              <span className="nav-link-index" aria-hidden="true">
                04
              </span>
              Participate
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
