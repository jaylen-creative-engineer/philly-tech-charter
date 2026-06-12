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

interface Keyframe {
  boundaries: [WaveY, WaveY, WaveY, WaveY];
}

const KEYFRAMES: Keyframe[] = [
  {
    boundaries: [
      [18, 0, 48, 24, 4, 40, 18, 12, 22, 18],
      [78, 58, 108, 84, 64, 100, 78, 72, 82, 78],
      [138, 118, 168, 144, 124, 160, 138, 132, 142, 138],
      [196, 178, 208, 192, 172, 198, 188, 184, 192, 188],
    ],
  },
  {
    boundaries: [
      [30, 14, 34, 40, 22, 56, 36, 30, 40, 38],
      [90, 74, 94, 100, 82, 116, 96, 92, 100, 98],
      [150, 134, 154, 160, 142, 176, 156, 152, 160, 158],
      [208, 190, 220, 204, 184, 210, 200, 196, 204, 200],
    ],
  },
  {
    boundaries: [
      [22, 4, 44, 30, 8, 46, 24, 16, 26, 22],
      [82, 62, 102, 88, 68, 104, 84, 76, 86, 82],
      [142, 122, 162, 148, 128, 164, 144, 136, 146, 142],
      [200, 182, 212, 196, 176, 202, 192, 188, 196, 192],
    ],
  },
];

const COLORS = ["var(--color-red)", "var(--color-cream)", "var(--color-red)"] as const;
const MORPH_MS = 5200;
const SWAY_MS = 9000;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function easeInOutSine(t: number) {
  return -(Math.cos(Math.PI * t) - 1) / 2;
}

/** Loop through keyframes with smooth easing between each pair. */
function morphBoundaries(elapsed: number, duration: number): Keyframe["boundaries"] {
  const count = KEYFRAMES.length;
  const segment = duration / count;
  const raw = (elapsed % duration) / segment;
  const index = Math.floor(raw) % count;
  const next = (index + 1) % count;
  const localT = easeInOutSine(raw - index);

  const from = KEYFRAMES[index].boundaries;
  const to = KEYFRAMES[next].boundaries;
  return from.map((wave, i) =>
    wave.map((v, j) => lerp(v, to[i][j], localT))
  ) as Keyframe["boundaries"];
}

/** Continuous ripple that travels left → right across the whole flag stack. */
function applyTravelingRipple(
  boundaries: Keyframe["boundaries"],
  elapsed: number
): Keyframe["boundaries"] {
  const t = elapsed * 0.001;
  return boundaries.map((wave) =>
    wave.map((y, i) => {
      const phase = i * 0.62;
      const primary = Math.sin(t * 2.4 + phase) * 5.5;
      const secondary = Math.sin(t * 3.7 + phase * 1.35) * 3;
      const tertiary = Math.sin(t * 1.3 + phase * 0.45) * 2;
      return y + primary + secondary + tertiary;
    })
  ) as Keyframe["boundaries"];
}

function bandPath(top: WaveY, bottom: WaveY): string {
  return (
    `M-120,${top[0]} C180,${top[1]} 420,${top[2]} 660,${top[3]} ` +
    `C900,${top[4]} 1140,${top[5]} 1380,${top[6]} C1460,${top[7]} 1520,${top[8]} 1560,${top[9]} ` +
    `L1560,${bottom[9]} C1520,${bottom[8]} 1460,${bottom[7]} 1380,${bottom[6]} ` +
    `C1140,${bottom[5]} 900,${bottom[4]} 660,${bottom[3]} C420,${bottom[2]} 180,${bottom[1]} -120,${bottom[0]} Z`
  );
}

function pathsFromBoundaries(b: [WaveY, WaveY, WaveY, WaveY]): string[] {
  return [bandPath(b[0], b[1]), bandPath(b[1], b[2]), bandPath(b[2], b[3])];
}

function buildTransform(elapsed: number): string {
  const swayPhase = (elapsed % SWAY_MS) / SWAY_MS;
  const angle = Math.PI * 2 * swayPhase;

  const swayX = Math.sin(angle) * 20 + Math.sin(angle * 2.1 + 0.6) * 6;
  const swayY = Math.sin(angle + Math.PI / 3) * 5 + Math.cos(angle * 1.8) * 2;
  const rotate = Math.sin(elapsed * 0.00055) * 1.1;
  const scale = 1 + Math.sin(elapsed * 0.00085) * 0.012;

  return `translate(${swayX} ${swayY}) rotate(${rotate} 720 120) scale(${scale})`;
}

export default function FlagWaves({ className = "" }: Props) {
  const [paths, setPaths] = useState(() =>
    pathsFromBoundaries(KEYFRAMES[0].boundaries)
  );
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
      setPaths(pathsFromBoundaries(KEYFRAMES[0].boundaries));
      setTransform("translate(0 0)");
      startRef.current = null;
      return;
    }

    const tick = (now: number) => {
      if (startRef.current === null) startRef.current = now;
      const elapsed = now - startRef.current;

      const morphed = morphBoundaries(elapsed, MORPH_MS);
      const boundaries = applyTravelingRipple(morphed, elapsed);
      setPaths(pathsFromBoundaries(boundaries));
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
