"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useEffect, useMemo, useRef, useState } from "react";

const VOLT = new THREE.Color("#c8f135");
const PAPER = new THREE.Color("#e8e6df");

/** Deterministic PRNG (mulberry32) — keeps render pure and the cloud stable across re-renders. */
function makeRng(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Rasterize text and sample filled pixels into world-space target positions. */
function sampleGlyph(text: string, rand: () => number): Float32Array {
  const w = 960;
  const h = 440;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new Float32Array(0);

  ctx.fillStyle = "#fff";
  ctx.font = `400 ${Math.floor(h * 0.95)}px 'Instrument Serif', Georgia, serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, w / 2, h / 2 + h * 0.04);

  const data = ctx.getImageData(0, 0, w, h).data;
  const pts: number[] = [];
  const step = 5;
  const worldWidth = 11.5;
  const yOffset = 0.9; // keep the glyph clear of the bottom-anchored headline
  for (let y = 0; y < h; y += step) {
    for (let x = 0; x < w; x += step) {
      if (data[(y * w + x) * 4 + 3] > 120) {
        pts.push(
          ((x - w / 2) / w) * worldWidth + (rand() - 0.5) * 0.05,
          (-(y - h / 2) / w) * worldWidth + yOffset + (rand() - 0.5) * 0.05,
          (rand() - 0.5) * 0.6
        );
      }
    }
  }
  return new Float32Array(pts);
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

/** Soft radial dot sprite so points render as glows, not squares. */
function makeDotTexture(): THREE.Texture {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.4, "rgba(255,255,255,0.7)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

interface ParticlesProps {
  scrollRef: React.RefObject<number>;
  reducedMotion: boolean;
}

function Particles({ scrollRef, reducedMotion }: ParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const { viewport } = useThree();
  // Shrink the whole constellation on narrow viewports so "250" stays in frame
  const glyphScale = Math.min(1, viewport.width / 12.5);

  const { targets, scatter, seeds, colors, count } = useMemo(() => {
    const rand = makeRng(1776);
    const targets = sampleGlyph("250", rand);
    const count = targets.length / 3;
    const scatter = new Float32Array(count * 3);
    const seeds = new Float32Array(count * 2);
    const colors = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Scattered start: a wide, shallow cloud the glyph condenses out of
      const r = 9 + rand() * 8;
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);
      scatter[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      scatter[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6;
      scatter[i * 3 + 2] = r * Math.cos(phi) * 0.4 - 2;
      seeds[i * 2] = rand() * Math.PI * 2; // wobble phase
      seeds[i * 2 + 1] = rand(); // formation stagger
      // Mostly volt, a scattering of paper-white sparks
      const c = rand() < 0.82 ? VOLT : PAPER;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { targets, scatter, seeds, colors, count };
  }, []);

  const positions = useMemo(() => new Float32Array(scatter), [scatter]);
  const dotTexture = useMemo(() => makeDotTexture(), []);
  const startTime = useRef<number | null>(null);
  const mouse = useRef(new THREE.Vector2(99, 99));

  useFrame((state) => {
    const points = pointsRef.current;
    if (!points) return;
    const t = state.clock.elapsedTime;
    if (startTime.current === null) startTime.current = t;
    const elapsed = t - startTime.current;

    const scroll = Math.min(Math.max(scrollRef.current ?? 0, 0), 1);
    const mat = points.material as THREE.PointsMaterial;
    mat.opacity = (1 - scroll * scroll) * 0.9;

    // World-space pointer on the glyph plane, in the points' local (scaled) space
    mouse.current.set(
      (state.pointer.x * viewport.width) / 2 / glyphScale,
      (state.pointer.y * viewport.height) / 2 / glyphScale
    );

    const pos = points.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const stagger = seeds[i * 2 + 1];
      const phase = seeds[i * 2];

      // Per-particle formation progress (staggered over ~2s)
      const form = reducedMotion
        ? 1
        : easeOutCubic(Math.min(Math.max((elapsed - stagger * 1.4) / 1.8, 0), 1));
      // Scroll pulls particles back apart
      const mix = form * (1 - easeOutCubic(scroll));

      let x = scatter[i3] + (targets[i3] - scatter[i3]) * mix;
      let y = scatter[i3 + 1] + (targets[i3 + 1] - scatter[i3 + 1]) * mix;
      const z = scatter[i3 + 2] + (targets[i3 + 2] - scatter[i3 + 2]) * mix;

      if (!reducedMotion) {
        // Gentle breathing wobble once formed
        const w = 0.04 + (1 - mix) * 0.25;
        x += Math.sin(t * 0.7 + phase) * w;
        y += Math.cos(t * 0.9 + phase * 1.3) * w;

        // Mouse repulsion
        const dx = x - mouse.current.x;
        const dy = y - mouse.current.y;
        const distSq = dx * dx + dy * dy;
        const radius = 1.6;
        if (distSq < radius * radius && distSq > 0.0001) {
          const dist = Math.sqrt(distSq);
          const force = ((radius - dist) / radius) * 0.9;
          x += (dx / dist) * force;
          y += (dy / dist) * force;
        }
      }

      pos[i3] = x;
      pos[i3 + 1] = y;
      pos[i3 + 2] = z;
    }
    points.geometry.attributes.position.needsUpdate = true;

    // Slow drift of the whole constellation
    points.rotation.y = Math.sin(t * 0.08) * 0.04;
  });

  // On narrow screens the text stack fills the lower half — float the glyph up
  const yLift = glyphScale < 1 ? viewport.height * 0.22 : 0;

  return (
    <points ref={pointsRef} scale={glyphScale} position={[0, yLift, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.085}
        map={dotTexture}
        alphaMap={dotTexture}
        vertexColors
        transparent
        opacity={0.9}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

export default function HeroCanvas() {
  const scrollRef = useRef(0);
  const [hidden, setHidden] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Wait for the serif webfont so the rasterized glyph matches the page type
    let cancelled = false;
    const arm = () => {
      if (cancelled) return;
      setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
      setReady(true);
    };
    if (document.fonts?.load) {
      Promise.race([
        document.fonts.load("400 100px 'Instrument Serif'"),
        new Promise((res) => setTimeout(res, 1200)),
      ]).then(arm);
    } else {
      setTimeout(arm, 0);
    }

    const onScroll = () => {
      const p = window.scrollY / (window.innerHeight * 0.9);
      scrollRef.current = p;
      setHidden(p >= 1.15);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelled = true;
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  if (!ready) return null;

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none"
      style={{ display: hidden ? "none" : "block" }}
    >
      <Canvas
        camera={{ position: [0, 0, 9], fov: 50 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}
        style={{ pointerEvents: "none" }}
        eventSource={typeof document !== "undefined" ? document.body : undefined}
      >
        <Particles scrollRef={scrollRef} reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}
