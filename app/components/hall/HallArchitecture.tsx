"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { HALL } from "./colors";
import { CHAMBER_MARKERS, ERA_MARKERS } from "./hallPath";

function HallExterior() {
  return (
    <group position={[0, 0, 0]}>
      <mesh position={[0, 3.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[14, 7, 4]} />
        <meshStandardMaterial color={HALL.brick} roughness={0.85} />
      </mesh>
      <mesh position={[0, 7.4, 0]}>
        <boxGeometry args={[14.4, 0.5, 4.4]} />
        <meshStandardMaterial color={HALL.brown} roughness={0.9} />
      </mesh>
      <mesh position={[0, 7.1, 2.05]}>
        <boxGeometry args={[14.6, 0.35, 0.3]} />
        <meshStandardMaterial color={HALL.cream} roughness={0.7} />
      </mesh>

      <mesh position={[0, 10.5, -0.5]} castShadow>
        <boxGeometry args={[3.2, 6, 3.2]} />
        <meshStandardMaterial color={HALL.cream} roughness={0.75} />
      </mesh>
      <mesh position={[0, 14.2, -0.5]}>
        <boxGeometry args={[3.6, 0.4, 3.6]} />
        <meshStandardMaterial color={HALL.cream} />
      </mesh>
      <mesh position={[0, 16.8, -0.5]}>
        <coneGeometry args={[1.6, 3.5, 4]} />
        <meshStandardMaterial color={HALL.brown} roughness={0.85} />
      </mesh>
      <mesh position={[0, 18.6, -0.5]}>
        <sphereGeometry args={[0.18, 8, 8]} />
        <meshStandardMaterial color={HALL.gold} metalness={0.4} roughness={0.4} />
      </mesh>

      <mesh position={[0, 11.2, 1.1]}>
        <circleGeometry args={[0.55, 24]} />
        <meshStandardMaterial color={HALL.gold} />
      </mesh>

      <mesh position={[0, 1.4, 2.02]}>
        <boxGeometry args={[2.4, 2.8, 0.15]} />
        <meshStandardMaterial color={HALL.cream} />
      </mesh>
      <mesh position={[0, 0.35, 2.05]}>
        <boxGeometry args={[1.6, 0.7, 0.2]} />
        <meshStandardMaterial color={HALL.brown} />
      </mesh>

      {[-4.5, -2.2, 2.2, 4.5].map((x) => (
        <group key={x}>
          <mesh position={[x, 4.2, 2.02]}>
            <boxGeometry args={[1.2, 1.6, 0.1]} />
            <meshStandardMaterial color={HALL.brown} />
          </mesh>
          <mesh position={[x, 2.2, 2.02]}>
            <boxGeometry args={[1.2, 1.6, 0.1]} />
            <meshStandardMaterial color={HALL.brown} />
          </mesh>
        </group>
      ))}

      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[0, -0.15 - i * 0.18, 2.8 + i * 0.5]}>
          <boxGeometry args={[8 - i * 0.6, 0.18, 0.55]} />
          <meshStandardMaterial color={HALL.cream} roughness={0.8} />
        </mesh>
      ))}
    </group>
  );
}

function Corridor() {
  const length = 88;
  return (
    <group position={[0, 0, -4]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, -length / 2]} receiveShadow>
        <planeGeometry args={[10, length]} />
        <meshStandardMaterial color={HALL.floor} roughness={0.95} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, -length / 2]}>
        <planeGeometry args={[2.4, length]} />
        <meshStandardMaterial color={HALL.cream} roughness={0.9} />
      </mesh>

      <mesh position={[-5, 2.5, -length / 2]}>
        <boxGeometry args={[0.35, 5, length]} />
        <meshStandardMaterial color={HALL.brick} roughness={0.9} />
      </mesh>
      <mesh position={[5, 2.5, -length / 2]}>
        <boxGeometry args={[0.35, 5, length]} />
        <meshStandardMaterial color={HALL.brick} roughness={0.9} />
      </mesh>

      {Array.from({ length: 12 }, (_, i) => (
        <mesh key={i} position={[0, 4.8, -4 - i * 7]}>
          <boxGeometry args={[10, 0.2, 0.5]} />
          <meshStandardMaterial color={HALL.brown} roughness={0.85} />
        </mesh>
      ))}

      {[-28, -38, -48, -58, -66].map((z) => (
        <group key={z} position={[0, 2.2, z]}>
          <mesh position={[-3.2, 0, 0]}>
            <boxGeometry args={[3.5, 4.4, 0.4]} />
            <meshStandardMaterial color={HALL.brick} />
          </mesh>
          <mesh position={[3.2, 0, 0]}>
            <boxGeometry args={[3.5, 4.4, 0.4]} />
            <meshStandardMaterial color={HALL.brick} />
          </mesh>
          <mesh position={[0, 2.1, 0]}>
            <boxGeometry args={[7, 0.5, 0.45]} />
            <meshStandardMaterial color={HALL.cream} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function EraMarker({
  year,
  z,
  color,
  scrollRef,
}: {
  year: string;
  z: number;
  color: string;
  scrollRef: React.RefObject<number>;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const mat = useRef(new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.15 }));

  useFrame(() => {
    const g = groupRef.current;
    if (!g) return;
    const progress = scrollRef.current ?? 0;
    const targetZ = -8 - progress * 58;
    const dist = Math.abs(g.position.z - targetZ);
    const glow = Math.max(0, 1 - dist / 6);
    mat.current.emissiveIntensity = 0.1 + glow * 0.45;
  });

  return (
    <group ref={groupRef} position={[-3.8, 2.2, z]}>
      <mesh material={mat.current}>
        <boxGeometry args={[0.15, 2.8, 1.8]} />
      </mesh>
      <mesh position={[0, 1.8, 0]}>
        <boxGeometry args={[0.2, 0.5, 2]} />
        <meshStandardMaterial color={HALL.cream} />
      </mesh>
      <mesh position={[0.5, 1.2, 0]} rotation={[0, -0.4, 0]}>
        <planeGeometry args={[1.4, 0.7]} />
        <meshStandardMaterial color={HALL.cream} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0.5, 0.4, 0]} rotation={[0, -0.4, 0]}>
        <planeGeometry args={[1.8, 0.35]} />
        <meshStandardMaterial color={color} transparent opacity={0.85} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function ChamberAlcove({
  z,
  color,
  scrollRef,
}: {
  z: number;
  color: string;
  scrollRef: React.RefObject<number>;
}) {
  const lightRef = useRef<THREE.PointLight>(null);
  const panelRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    const progress = scrollRef.current ?? 0;
    const targetZ = -8 - progress * 58;
    const dist = Math.abs(z - targetZ);
    const glow = Math.max(0, 1 - dist / 8);
    if (lightRef.current) lightRef.current.intensity = 0.3 + glow * 1.8;
    if (panelRef.current) {
      const m = panelRef.current.material as THREE.MeshStandardMaterial;
      m.emissiveIntensity = glow * 0.35;
    }
  });

  return (
    <group position={[3.8, 0, z]}>
      <mesh position={[0, 2.5, 0]}>
        <boxGeometry args={[3.5, 5, 4]} />
        <meshStandardMaterial color={HALL.brick} roughness={0.92} />
      </mesh>
      <mesh ref={panelRef} position={[-0.3, 2.2, -1.95]}>
        <planeGeometry args={[2.8, 3.2]} />
        <meshStandardMaterial
          color={HALL.cream}
          emissive={color}
          emissiveIntensity={0}
          side={THREE.DoubleSide}
        />
      </mesh>
      <pointLight ref={lightRef} position={[-1, 2.5, -1]} color={color} intensity={0.4} distance={8} />
    </group>
  );
}

function ContributionGlow({ scrollRef }: { scrollRef: React.RefObject<number> }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(() => {
    const m = ref.current;
    if (!m) return;
    const progress = scrollRef.current ?? 0;
    const glow = Math.max(0, (progress - 0.85) / 0.15);
    m.scale.setScalar(0.5 + glow * 1.2);
    const mat = m.material as THREE.MeshStandardMaterial;
    mat.opacity = 0.25 + glow * 0.55;
    mat.emissiveIntensity = glow * 0.8;
  });

  return (
    <mesh ref={ref} position={[0, 2.5, -78]}>
      <sphereGeometry args={[2.5, 24, 24]} />
      <meshStandardMaterial
        color={HALL.red}
        emissive={HALL.red}
        emissiveIntensity={0}
        transparent
        opacity={0.3}
      />
    </mesh>
  );
}

interface Props {
  scrollRef: React.RefObject<number>;
}

export default function HallArchitecture({ scrollRef }: Props) {
  return (
    <>
      <HallExterior />
      <Corridor />
      {ERA_MARKERS.map((era) => (
        <EraMarker key={era.year} year={era.year} z={era.z} color={era.color} scrollRef={scrollRef} />
      ))}
      {CHAMBER_MARKERS.map((chamber) => (
        <ChamberAlcove key={chamber.id} z={chamber.z} color={chamber.color} scrollRef={scrollRef} />
      ))}
      <ContributionGlow scrollRef={scrollRef} />
    </>
  );
}
