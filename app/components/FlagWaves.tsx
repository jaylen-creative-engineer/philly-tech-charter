"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  className?: string;
}

/** One point on a band boundary, with the cloth's slope (dy/dx) at that point. */
interface Sample {
  x: number;
  y: number;
  slope: number;
}

const COLORS = ["var(--color-red)", "var(--color-cream)", "var(--color-red)"] as const;
const SWAY_MS = 9000;

const FLAG_LEFT = -120;
const FLAG_RIGHT = 1560;
const FLAG_WIDTH = FLAG_RIGHT - FLAG_LEFT;
const SAMPLE_STEP = 120;

/** Resting y for each of the four band boundaries. */
const BASE_YS = [22, 80, 138, 196] as const;

/** Stable string formatting so SSR and client hydration produce identical path data. */
function fmt(n: number): string {
  return n.toFixed(2);
}

/**
 * Vertical displacement of the cloth at horizontal position x and time t.
 *
 * Models a flag pinned at the hoist (left): a traveling wave moves left → right
 * (phase k·x − ω·t) and its amplitude grows toward the free fly end, which is
 * what produces the S-curve silhouette of a flag in wind. `lag` lets each band
 * boundary trail the one above it slightly, like thickness in real cloth.
 */
function flagWave(x: number, tSec: number, lag: number): number {
  const u = (x - FLAG_LEFT) / FLAG_WIDTH; // 0 at hoist, 1 at fly end
  const envelope = 0.25 + 0.75 * u;

  // ~1 wavelength across the flag → a single clean S at any instant
  const primary = Math.sin(x / 240 - tSec * 1.5 - lag) * 21;
  // longer, slower swell layered on top for organic variation
  const secondary = Math.sin(x / 130 - tSec * 2.2 - lag * 1.5) * 5;

  return (primary + secondary) * envelope;
}

/**
 * Sample one boundary line, recording the wave's slope at each point so the
 * Bezier handles can follow the true tangent — this is what keeps every join
 * rounded instead of kinking.
 */
function sampleBoundary(base: number, tSec: number, lag: number): Sample[] {
  const samples: Sample[] = [];
  for (let x = FLAG_LEFT; x <= FLAG_RIGHT; x += SAMPLE_STEP) {
    samples.push({
      x,
      y: base + flagWave(x, tSec, lag),
      slope: (flagWave(x + 1, tSec, lag) - flagWave(x - 1, tSec, lag)) / 2,
    });
  }
  return samples;
}

/**
 * Closed band between two boundaries. Each cubic segment's handles sit on the
 * tangent line of the sampled wave, so adjacent segments always share a
 * tangent at the join (C1 continuity) — no sharp corners at any frame.
 */
function bandPath(top: Sample[], bottom: Sample[]): string {
  const h = SAMPLE_STEP / 3;
  let d = `M${top[0].x},${fmt(top[0].y)}`;

  for (let i = 0; i < top.length - 1; i++) {
    const a = top[i];
    const b = top[i + 1];
    d += ` C${a.x + h},${fmt(a.y + a.slope * h)} ${b.x - h},${fmt(b.y - b.slope * h)} ${b.x},${fmt(b.y)}`;
  }

  const last = bottom[bottom.length - 1];
  d += ` L${last.x},${fmt(last.y)}`;

  for (let i = bottom.length - 1; i > 0; i--) {
    const a = bottom[i];
    const b = bottom[i - 1];
    d += ` C${a.x - h},${fmt(a.y - a.slope * h)} ${b.x + h},${fmt(b.y + b.slope * h)} ${b.x},${fmt(b.y)}`;
  }

  return d + " Z";
}

function computeBandPaths(elapsed: number): string[] {
  const t = elapsed * 0.001;
  const boundaries = BASE_YS.map((base, band) => sampleBoundary(base, t, band * 0.3));
  return [0, 1, 2].map((i) => bandPath(boundaries[i], boundaries[i + 1]));
}

function buildTransform(elapsed: number): string {
  const swayPhase = (elapsed % SWAY_MS) / SWAY_MS;
  const angle = Math.PI * 2 * swayPhase;

  const swayX = Math.sin(angle) * 20 + Math.sin(angle * 2.1 + 0.6) * 6;
  const swayY = Math.sin(angle + Math.PI / 3) * 5 + Math.cos(angle * 1.8) * 2;
  const rotate = Math.sin(elapsed * 0.00055) * 1.1;
  const scale = 1 + Math.sin(elapsed * 0.00085) * 0.012;

  return `translate(${fmt(swayX)} ${fmt(swayY)}) rotate(${fmt(rotate)} 720 120) scale(${fmt(scale)})`;
}

export default function FlagWaves({ className = "" }: Props) {
  const [paths, setPaths] = useState(() => computeBandPaths(0));
  const [transform, setTransform] = useState(() => buildTransform(0));
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
      setPaths(computeBandPaths(0));
      setTransform("translate(0 0)");
      startRef.current = null;
      return;
    }

    const tick = (now: number) => {
      if (startRef.current === null) startRef.current = now;
      const elapsed = now - startRef.current;

      setPaths(computeBandPaths(elapsed));
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
