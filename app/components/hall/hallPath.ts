export type Vec3 = [number, number, number];

export interface HallWaypoint {
  /** Normalized scroll progress 0–1 */
  t: number;
  position: Vec3;
  lookAt: Vec3;
}

/** Camera path from exterior approach through interior chambers to contribution threshold. */
export const HALL_WAYPOINTS: HallWaypoint[] = [
  { t: 0, position: [0, 2.2, 14], lookAt: [0, 3.2, 0] },
  { t: 0.07, position: [0, 1.9, 9], lookAt: [0, 2.8, 0] },
  { t: 0.14, position: [0, 1.65, 4.5], lookAt: [0, 2.2, -6] },
  { t: 0.22, position: [0, 1.6, -2], lookAt: [0, 1.9, -12] },
  { t: 0.32, position: [0, 1.6, -10], lookAt: [0, 1.9, -18] },
  { t: 0.42, position: [0, 1.6, -18], lookAt: [0, 2, -26] },
  { t: 0.52, position: [0, 1.6, -28], lookAt: [0, 2.1, -32] },
  { t: 0.62, position: [0, 1.6, -38], lookAt: [0, 2.2, -42] },
  { t: 0.72, position: [0, 1.6, -48], lookAt: [0, 2.2, -52] },
  { t: 0.82, position: [0, 1.65, -58], lookAt: [0, 2.3, -62] },
  { t: 0.92, position: [0, 1.7, -66], lookAt: [0, 2.5, -72] },
  { t: 1, position: [0, 1.85, -72], lookAt: [0, 2.8, -82] },
];

export const ERA_MARKERS = [
  { year: "1440", label: "Printing press", z: -8, color: "#c49a2e" },
  { year: "1879", label: "Electric light", z: -13, color: "#1a3580" },
  { year: "1969", label: "The internet", z: -18, color: "#d42b32" },
  { year: "2026", label: "Intelligence", z: -23, color: "#c8f135" },
] as const;

export const CHAMBER_MARKERS = [
  { id: "statement", label: "Statement", z: -28, color: "#d42b32" },
  { id: "document", label: "Document", z: -38, color: "#1a3580" },
  { id: "principles", label: "Principles", z: -48, color: "#c49a2e" },
  { id: "contribute", label: "Contribute", z: -66, color: "#d42b32" },
] as const;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function lerpVec3(a: Vec3, b: Vec3, t: number): Vec3 {
  return [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];
}

export function interpolateHallPath(progress: number): { position: Vec3; lookAt: Vec3 } {
  const t = Math.min(Math.max(progress, 0), 1);
  const points = HALL_WAYPOINTS;

  if (t <= points[0].t) {
    return { position: points[0].position, lookAt: points[0].lookAt };
  }
  if (t >= points[points.length - 1].t) {
    const last = points[points.length - 1];
    return { position: last.position, lookAt: last.lookAt };
  }

  for (let i = 0; i < points.length - 1; i++) {
    const a = points[i];
    const b = points[i + 1];
    if (t >= a.t && t <= b.t) {
      const local = (t - a.t) / (b.t - a.t);
      const eased = local * local * (3 - 2 * local);
      return {
        position: lerpVec3(a.position, b.position, eased),
        lookAt: lerpVec3(a.lookAt, b.lookAt, eased),
      };
    }
  }

  const last = points[points.length - 1];
  return { position: last.position, lookAt: last.lookAt };
}
