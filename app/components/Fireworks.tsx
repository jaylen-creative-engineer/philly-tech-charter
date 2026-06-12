"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

const COLORS = [
  "#d9a33e",
  "#d7282f",
  "#f6f0e4",
  "#ff6b6b",
  "#ffd166",
  "#4ecdc4",
];

function burst(cx: number, cy: number, count: number): Particle[] {
  const color = COLORS[Math.floor(Math.random() * COLORS.length)];
  return Array.from({ length: count }, () => {
    const angle = Math.random() * Math.PI * 2;
    const speed = 1.5 + Math.random() * 4;
    return {
      x: cx,
      y: cy,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 0,
      maxLife: 50 + Math.random() * 40,
      color,
      size: 1.5 + Math.random() * 2,
    };
  });
}

interface Props {
  active?: boolean;
  className?: string;
}

export default function Fireworks({ active = true, className = "" }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!active || reduceMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      canvas!.width = canvas!.offsetWidth * dpr;
      canvas!.height = canvas!.offsetHeight * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    resize();
    window.addEventListener("resize", resize);

    let burstTimer = 0;
    const initialBursts = [
      { x: 0.3, y: 0.35, delay: 400 },
      { x: 0.7, y: 0.3, delay: 900 },
      { x: 0.5, y: 0.45, delay: 1400 },
      { x: 0.25, y: 0.55, delay: 2000 },
      { x: 0.75, y: 0.5, delay: 2600 },
    ];

    const scheduled = initialBursts.map(({ x, y, delay }) =>
      setTimeout(() => {
        const w = canvas!.offsetWidth;
        const h = canvas!.offsetHeight;
        particlesRef.current.push(...burst(w * x, h * y, 40 + Math.floor(Math.random() * 20)));
      }, delay)
    );

    function loop() {
      const w = canvas!.offsetWidth;
      const h = canvas!.offsetHeight;
      ctx!.clearRect(0, 0, w, h);

      burstTimer++;
      if (burstTimer % 90 === 0) {
        particlesRef.current.push(
          ...burst(
            w * (0.2 + Math.random() * 0.6),
            h * (0.2 + Math.random() * 0.4),
            30 + Math.floor(Math.random() * 15)
          )
        );
      }

      particlesRef.current = particlesRef.current.filter((p) => {
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.04;
        p.vx *= 0.98;

        const alpha = 1 - p.life / p.maxLife;
        if (alpha <= 0) return false;

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.size * alpha, 0, Math.PI * 2);
        ctx!.fillStyle = p.color;
        ctx!.globalAlpha = alpha * 0.85;
        ctx!.fill();
        ctx!.globalAlpha = 1;
        return true;
      });

      rafRef.current = requestAnimationFrame(loop);
    }

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
      scheduled.forEach(clearTimeout);
      particlesRef.current = [];
    };
  }, [active]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 w-full h-full ${className}`}
      aria-hidden="true"
    />
  );
}
