"use client";

import { useEffect, useState } from "react";

interface Props {
  className?: string;
}

interface Wave {
  from: string;
  to: string;
  color: string;
  width: number;
  dur: string;
}

// Each wave morphs between two control-point configurations (same command
// structure, required for SMIL path interpolation) to ripple like a flag.
const WAVES: Wave[] = [
  {
    from: "M-60,40 C260,-80 480,300 820,140 C1080,20 1300,160 1500,60",
    to: "M-60,80 C260,-10 480,220 820,180 C1080,70 1300,100 1500,100",
    color: "var(--color-red)",
    width: 130,
    dur: "7s",
  },
  {
    from: "M-60,140 C280,20 520,380 880,200 C1120,80 1320,220 1500,140",
    to: "M-60,110 C280,70 520,300 880,160 C1120,140 1320,160 1500,100",
    color: "var(--color-cream)",
    width: 64,
    dur: "5.5s",
  },
  {
    from: "M-60,250 C300,140 560,420 940,260 C1160,170 1340,280 1500,230",
    to: "M-60,220 C300,190 560,350 940,300 C1160,130 1340,230 1500,260",
    color: "var(--color-red)",
    width: 90,
    dur: "8.5s",
  },
];

export default function FlagWaves({ className = "" }: Props) {
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setAnimate(!mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <svg
      viewBox="0 0 1440 300"
      preserveAspectRatio="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {WAVES.map((w, i) => (
        <path key={i} d={w.from} stroke={w.color} strokeWidth={w.width} fill="none">
          {animate && (
            <animate
              attributeName="d"
              dur={w.dur}
              repeatCount="indefinite"
              calcMode="spline"
              keyTimes="0;0.5;1"
              keySplines="0.42 0 0.58 1;0.42 0 0.58 1"
              values={`${w.from};${w.to};${w.from}`}
            />
          )}
        </path>
      ))}
    </svg>
  );
}
