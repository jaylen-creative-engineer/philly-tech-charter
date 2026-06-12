"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  className?: string;
}

/** Ten y-coordinates for the four cubic segments of one wave edge (left → right). */
type WaveY = [
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
];

type Boundaries = [WaveY, WaveY, WaveY, WaveY];

const X_COORDS = [-120, 180, 420, 660, 900, 1140, 1380, 1460, 1520, 1560] as const;
const BASE_Y = [18, 78, 138, 198] as const;
const COLORS = ["var(--color-red)", "var(--color-cream)", "var(--color-red)"] as const;

/** Flag width from pole (x = -120) to free edge (x = 1560). */
const FLAG_SPAN = 1680;
const WAVE_LENGTH = 720;
const MAX_AMPLITUDE = 30;
const WAVE_SPEED = 0.75;
const SWAY_MS = 10000;

function smoothstep(t: number) {
  return t * t * (3 - 2 * t);
}

/** Amplitude grows toward the free edge; pole stays anchored. */
function amplitudeAt(x: number) {
  const t = Math.max(0, Math.min(1, (x + 120) / FLAG_SPAN));
  return smoothstep(t) * MAX_AMPLITUDE;
}

/** Shared wave offset — all stripes follow the same S-curve. */
function waveOffset(x: number, elapsed: number) {
  const phase = (x / WAVE_LENGTH) * Math.PI * 2 - elapsed * 0.001 * WAVE_SPEED;
  return amplitudeAt(x) * Math.sin(phase);
}

function waveDerivative(x: number, elapsed: number) {
  const t = Math.max(0, Math.min(1, (x + 120) / FLAG_SPAN));
  const envelope = smoothstep(t);
  const envelopeDeriv = (6 * t * (1 - t)) / FLAG_SPAN;
  const phase = (x / WAVE_LENGTH) * Math.PI * 2 - elapsed * 0.001 * WAVE_SPEED;
  const k = (Math.PI * 2) / WAVE_LENGTH;
  const omega = WAVE_SPEED * 0.001;

  return (
    envelopeDeriv * MAX_AMPLITUDE * Math.sin(phase) +
    envelope * MAX_AMPLITUDE * Math.cos(phase) * k -
    envelope * MAX_AMPLITUDE * Math.sin(phase) * omega
  );
}

/** Build one boundary with tangent-aligned control points for smooth S-curves. */
function buildBoundary(baseY: number, elapsed: number): WaveY {
  const anchors = [0, 3, 6, 9];
  const ys: number[] = new Array(10);

  for (const i of anchors) {
    ys[i] = baseY + waveOffset(X_COORDS[i], elapsed);
  }

  const segments: [number, number, number, number][] = [
    [0, 1, 2, 3],
    [3, 4, 5, 6],
    [6, 7, 8, 9],
  ];

  for (const [i0, i1, i2, i3] of segments) {
    const x0 = X_COORDS[i0];
    const x3 = X_COORDS[i3];
    const y0 = ys[i0];
    const y3 = ys[i3];
    const m0 = waveDerivative(x0, elapsed);
    const m3 = waveDerivative(x3, elapsed);

    ys[i1] = y0 + (X_COORDS[i1] - x0) * m0;
    ys[i2] = y3 - (x3 - X_COORDS[i2]) * m3;
  }

  return ys as WaveY;
}

function buildBoundaries(elapsed: number): Boundaries {
  return BASE_Y.map((baseY) => buildBoundary(baseY, elapsed)) as Boundaries;
}

function bandPath(top: WaveY, bottom: WaveY): string {
  return (
    `M-120,${top[0]} C180,${top[1]} 420,${top[2]} 660,${top[3]} ` +
    `C900,${top[4]} 1140,${top[5]} 1380,${top[6]} C1460,${top[7]} 1520,${top[8]} 1560,${top[9]} ` +
    `L1560,${bottom[9]} C1520,${bottom[8]} 1460,${bottom[7]} 1380,${bottom[6]} ` +
    `C1140,${bottom[5]} 900,${bottom[4]} 660,${bottom[3]} C420,${bottom[2]} 180,${bottom[1]} -120,${bottom[0]} Z`
  );
}

function pathsFromBoundaries(b: Boundaries): string[] {
  return [bandPath(b[0], b[1]), bandPath(b[1], b[2]), bandPath(b[2], b[3])];
}

function buildTransform(elapsed: number): string {
  const swayPhase = (elapsed % SWAY_MS) / SWAY_MS;
  const angle = Math.PI * 2 * swayPhase;
  const swayX = Math.sin(angle) * 14;
  const swayY = Math.sin(angle + Math.PI / 2) * 4;
  return `translate(${swayX} ${swayY}) rotate(${Math.sin(angle) * 0.6} 720 120)`;
}

export default function FlagWaves({ className = "" }: Props) {
  const [paths, setPaths] = useState(() => pathsFromBoundaries(buildBoundaries(0)));
  const [transform, setTransform] = useState("translate(0 0)");
  const [animate, setAnimate] = useState(true);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setAnimate(!mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!animate) {
      setPaths(pathsFromBoundaries(buildBoundaries(0)));
      setTransform("translate(0 0)");
      startRef.current = null;
      return;
    }

    const tick = (now: number) => {
      if (startRef.current === null) startRef.current = now;
      const elapsed = now - startRef.current;

      setPaths(pathsFromBoundaries(buildBoundaries(elapsed)));
      setTransform(buildTransform(elapsed));

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [animate]);

  return (
    <svg
      viewBox="0 0 1440 240"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      shapeRendering="geometricPrecision"
    >
      <defs>
        <linearGradient id="flag-wave-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="white" stopOpacity="1" />
          <stop offset="52%" stopColor="white" stopOpacity="1" />
          <stop offset="68%" stopColor="white" stopOpacity="0.82" />
          <stop offset="80%" stopColor="white" stopOpacity="0.48" />
          <stop offset="90%" stopColor="white" stopOpacity="0.18" />
          <stop offset="97%" stopColor="white" stopOpacity="0.04" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <mask id="flag-wave-mask">
          <rect width="100%" height="100%" fill="url(#flag-wave-fade)" />
        </mask>
      </defs>

      <g mask="url(#flag-wave-mask)" transform={transform}>
        {paths.map((d, i) => (
          <path key={i} d={d} fill={COLORS[i]} />
        ))}
      </g>
    </svg>
  );
}
