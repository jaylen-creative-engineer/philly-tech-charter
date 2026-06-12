"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, animate, useReducedMotion } from "motion/react";

interface Props {
  value: number;
  className?: string;
}

export default function CountUp({ value, className = "" }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const [display, setDisplay] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!inView || reduced) return;
    const controls = animate(0, value, {
      duration: Math.min(1.6, 0.4 + value * 0.05),
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, reduced]);

  return (
    <span ref={ref} className={className}>
      {(reduced ? value : display).toLocaleString()}
    </span>
  );
}
