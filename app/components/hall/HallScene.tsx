"use client";

import { Canvas } from "@react-three/fiber";
import { useRef, type RefObject } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { interpolateHallPath } from "./hallPath";
import HallArchitecture from "./HallArchitecture";
import { HALL } from "./colors";

function CameraRig({ scrollRef }: { scrollRef: RefObject<number> }) {
  const { camera } = useThree();
  const lookAt = useRef(new THREE.Vector3());

  useFrame(() => {
    const progress = scrollRef.current ?? 0;
    const { position, lookAt: target } = interpolateHallPath(progress);
    camera.position.set(position[0], position[1], position[2]);
    lookAt.current.set(target[0], target[1], target[2]);
    camera.lookAt(lookAt.current);
  });

  return null;
}

function AmbientDust({ scrollRef }: { scrollRef: RefObject<number> }) {
  const ref = useRef<THREE.Points>(null);
  const count = 120;
  const positions = useRef(
    (() => {
      const arr = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        arr[i * 3] = (Math.random() - 0.5) * 8;
        arr[i * 3 + 1] = Math.random() * 4 + 0.5;
        arr[i * 3 + 2] = -Math.random() * 80;
      }
      return arr;
    })()
  );

  useFrame((state) => {
    const pts = ref.current;
    if (!pts) return;
    const t = state.clock.elapsedTime;
    const progress = scrollRef.current ?? 0;
    pts.rotation.y = Math.sin(t * 0.05) * 0.02;
    const mat = pts.material as THREE.PointsMaterial;
    mat.opacity = 0.15 + (1 - progress) * 0.2;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions.current, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color={HALL.gold} transparent opacity={0.25} depthWrite={false} />
    </points>
  );
}

function SceneContent({
  scrollRef,
  reducedMotion,
}: {
  scrollRef: RefObject<number>;
  reducedMotion: boolean;
}) {
  return (
    <>
      <color attach="background" args={["#d8d4cc"]} />
      <fog attach="fog" args={[HALL.fog, 18, 55]} />

      <ambientLight intensity={0.55} />
      <directionalLight position={[6, 12, 8]} intensity={1.1} castShadow />
      <directionalLight position={[-4, 6, -20]} intensity={0.35} color={HALL.blue} />
      <hemisphereLight args={[HALL.cream, HALL.floor, 0.4]} />

      <CameraRig scrollRef={scrollRef} />
      <HallArchitecture scrollRef={scrollRef} />

      {!reducedMotion && <AmbientDust scrollRef={scrollRef} />}
    </>
  );
}

interface Props {
  scrollRef: RefObject<number>;
  reducedMotion: boolean;
}

export default function HallScene({ scrollRef, reducedMotion }: Props) {
  return (
    <Canvas
      camera={{ position: [0, 2.2, 14], fov: 52, near: 0.1, far: 120 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      style={{ width: "100%", height: "100%" }}
    >
      <SceneContent scrollRef={scrollRef} reducedMotion={reducedMotion} />
    </Canvas>
  );
}
