"use client";

import { ReactNode, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "motion/react";

interface ArtifactProps {
  children: ReactNode;
  className?: string;
  /** Parallax depth: higher moves more with the mouse */
  depth: number;
  /** CSS float animation duration in seconds */
  drift: number;
  rotate?: number;
  mx: ReturnType<typeof useSpring>;
  my: ReturnType<typeof useSpring>;
}

function Artifact({ children, className = "", depth, drift, rotate = 0, mx, my }: ArtifactProps) {
  const x = useTransform(mx, (v: number) => v * depth);
  const y = useTransform(my, (v: number) => v * depth);

  return (
    <motion.div
      className={`absolute ${className}`}
      style={{ x, y, rotate }}
      initial={{ opacity: 0, y: 40, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, delay: 0.9 + depth * 0.015, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="animate-drift" style={{ animationDuration: `${drift}s` }}>
        {children}
      </div>
    </motion.div>
  );
}

export default function FloatingArtifacts() {
  const reduced = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mx = useSpring(rawX, { stiffness: 50, damping: 20, mass: 0.8 });
  const my = useSpring(rawY, { stiffness: 50, damping: 20, mass: 0.8 });

  useEffect(() => {
    if (reduced) return;
    function onMove(e: PointerEvent) {
      rawX.set((e.clientX / window.innerWidth - 0.5) * 2);
      rawY.set((e.clientY / window.innerHeight - 0.5) * 2);
    }
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [rawX, rawY, reduced]);

  const labelCls =
    "text-[8px] font-sans font-semibold tracking-[0.25em] uppercase";

  return (
    <div aria-hidden="true" className="absolute inset-0 pointer-events-none select-none max-lg:hidden">
      {/* Parchment scrap — preamble fragment */}
      <Artifact mx={mx} my={my} depth={-14} drift={9} rotate={-5} className="top-[16%] right-[7%] w-[230px]">
        <div className="bg-[var(--color-canvas)] text-[var(--color-ink)] p-5 shadow-[0_24px_60px_rgba(0,0,0,0.55)]">
          <p className={`${labelCls} text-[var(--color-ink)]/45 mb-2.5`}>Preamble · v1.0</p>
          <p className="font-serif italic text-[15px] leading-[1.5]">
            &ldquo;We choose to be authors. We choose intention over reaction.&rdquo;
          </p>
        </div>
      </Artifact>

      {/* Contribution card */}
      <Artifact mx={mx} my={my} depth={22} drift={12} rotate={3} className="top-[40%] right-[13%] w-[250px]">
        <div className="bg-[var(--color-ash)] border border-white/[0.07] p-5 shadow-[0_24px_60px_rgba(0,0,0,0.55)]">
          <p className={`${labelCls} text-[var(--color-volt)] mb-2.5`}>A challenge · D. Okonkwo</p>
          <p className="font-serif italic text-[13px] leading-[1.6] text-[var(--color-off-white)]/90">
            &ldquo;Intention is not enough. We need enforcement…&rdquo;
          </p>
        </div>
      </Artifact>

      {/* Principle mini-card */}
      <Artifact mx={mx} my={my} depth={-26} drift={10.5} rotate={-2} className="top-[68%] right-[6%] w-[210px]">
        <div className="bg-[var(--color-ink)] border border-[var(--color-volt)]/25 p-5 shadow-[0_24px_60px_rgba(0,0,0,0.55)]">
          <p className={`${labelCls} text-[var(--color-volt)] mb-2`}>Principle 01</p>
          <div className="w-5 h-0.5 bg-[var(--color-volt)] mb-2.5" />
          <p className="font-serif text-[14px] leading-[1.3] text-[var(--color-off-white)]">
            Intention before implementation
          </p>
        </div>
      </Artifact>

      {/* Signature scrap */}
      <Artifact mx={mx} my={my} depth={16} drift={13.5} rotate={6} className="top-[12%] right-[26%] w-[180px]">
        <div className="bg-[var(--color-canvas)] text-[var(--color-ink)] px-5 py-4 shadow-[0_24px_60px_rgba(0,0,0,0.55)]">
          <p className="font-serif italic text-[19px] leading-none">S. Park</p>
          <p className={`${labelCls} text-[var(--color-ink)]/45 mt-2`}>Signed · Oakland, CA</p>
        </div>
      </Artifact>
    </div>
  );
}
