import { CameraControls, ContactShadows, RoundedBox } from "@react-three/drei";
import { Canvas, type ThreeEvent } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import * as THREE from "three";
import { PARTS } from "@/content/parts";
import type { ModelArea } from "@/content/types";

// Procedural, illustrative model of a 6M-series tractor (forward = +x).
// Dimensions follow the manual roughly (wheelbase 2.58 m, cab roof ≈ 2.75 m),
// but shapes are simplified stand-ins — not factory geometry.

import type { ViewPreset } from "./support";

const VIEWS: Record<ViewPreset, [number, number, number, number, number, number]> = {
  standard: [5.2, 3.2, 5.6, 0, 1.1, 0],
  foran: [7.2, 1.8, 0, 0, 1.2, 0],
  bak: [-7.2, 2.0, 0, 0, 1.2, 0],
  venstre: [0, 1.8, 7.4, 0, 1.2, 0],
  hoyre: [0, 1.8, -7.4, 0, 1.2, 0],
  ovenfra: [0.01, 9.5, 0.01, 0, 0, 0],
  forerhus: [-0.2, 2.6, 2.2, -0.85, 1.9, 0],
};

const AREA_VIEW: Record<ModelArea, ViewPreset> = {
  utvendig: "standard",
  "motor-foraksel": "foran",
  forerhus: "forerhus",
  instrumenter: "forerhus",
  hydraulikk: "standard",
  bakre: "bak",
};

const GREEN = "#367c2b";
const YELLOW = "#f2c500";
const TYRE = "#1d1f1c";
const STEEL = "#5d6560";
const DARK = "#2c312d";

const PART_AREA = Object.fromEntries(PARTS.map((p) => [p.id, p.area]));

interface PartProps {
  id: string;
  selected?: string;
  hovered?: string;
  area?: ModelArea | "";
  onHover: (id?: string) => void;
  onSelect: (id: string) => void;
  children: ReactNode;
}

/** A selectable group. Highlighting is done by tinting materials of its meshes. */
function Part({ id, selected, hovered, area, onHover, onSelect, children }: PartProps) {
  const ref = useRef<THREE.Group>(null);
  const isSel = selected === id;
  const isHov = hovered === id;
  const dimmed = !!area && PART_AREA[id] !== area;

  useEffect(() => {
    ref.current?.traverse((o) => {
      const m = (o as THREE.Mesh).material as THREE.MeshStandardMaterial | undefined;
      if (!m || !("emissive" in m)) return;
      if (!m.userData.base) m.userData.base = { opacity: m.opacity, transparent: m.transparent };
      m.emissive = new THREE.Color(isSel ? "#ffcf00" : isHov ? "#7fd36b" : "#000000");
      m.emissiveIntensity = isSel ? 0.55 : isHov ? 0.35 : 0;
      m.transparent = dimmed || m.userData.base.transparent;
      m.opacity = dimmed ? Math.min(0.18, m.userData.base.opacity) : m.userData.base.opacity;
      m.depthWrite = !dimmed;
    });
  }, [isSel, isHov, dimmed]);

  return (
    <group
      ref={ref}
      name={id}
      onPointerOver={(e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();
        onHover(id);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        onHover(undefined);
        document.body.style.cursor = "";
      }}
      onClick={(e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation();
        onSelect(id);
      }}
    >
      {children}
    </group>
  );
}

function Mat({ color, metal = 0.2, rough = 0.55, opacity = 1 }: { color: string; metal?: number; rough?: number; opacity?: number }) {
  return <meshStandardMaterial color={color} metalness={metal} roughness={rough} transparent={opacity < 1} opacity={opacity} />;
}

function Wheel({ x, z, r, w, rim }: { x: number; z: number; r: number; w: number; rim: number }) {
  return (
    <group position={[x, r, z]} rotation={[Math.PI / 2, 0, 0]}>
      <mesh castShadow>
        <cylinderGeometry args={[r, r, w, 40]} />
        <Mat color={TYRE} rough={0.9} metal={0} />
      </mesh>
      {Array.from({ length: 18 }, (_, i) => (
        <mesh key={i} rotation={[0, (i / 18) * Math.PI * 2, 0]} position={[0, 0, 0]}>
          <boxGeometry args={[r * 2 + 0.04, w * 0.9, 0.08]} />
          <Mat color={TYRE} rough={0.95} metal={0} />
        </mesh>
      ))}
      <mesh position={[0, z > 0 ? w / 2 + 0.005 : -w / 2 - 0.005, 0]}>
        <cylinderGeometry args={[rim, rim, 0.04, 32]} />
        <Mat color={YELLOW} metal={0.3} rough={0.4} />
      </mesh>
    </group>
  );
}

function Tractor(props: Omit<PartProps, "id" | "children">) {
  const P = (id: string, children: ReactNode) => (
    <Part key={id} id={id} {...props}>
      {children}
    </Part>
  );

  // geometry anchors
  const FX = 1.29; // front axle x
  const RX = -1.29; // rear axle x
  const RR = 0.86; // rear wheel radius
  const FRR = 0.62; // front wheel radius

  return (
    <group>
      {/* Non-selectable chassis: frame, transmission housing, rear fenders */}
      <mesh position={[0.1, 0.78, 0]} castShadow>
        <boxGeometry args={[3.2, 0.42, 0.62]} />
        <Mat color={DARK} metal={0.4} />
      </mesh>
      <mesh position={[RX, 0.95, 0]} castShadow>
        <boxGeometry args={[0.9, 0.7, 1.2]} />
        <Mat color={DARK} metal={0.4} />
      </mesh>
      {[1, -1].map((s) => (
        <mesh key={s} position={[RX + 0.05, 1.78, s * 0.98]} castShadow>
          <boxGeometry args={[1.5, 0.08, 0.55]} />
          <Mat color={GREEN} />
        </mesh>
      ))}

      {P("panser", (
        <>
          <RoundedBox args={[1.85, 0.78, 0.92]} radius={0.12} position={[1.12, 1.42, 0]} castShadow>
            <Mat color={GREEN} rough={0.4} />
          </RoundedBox>
          <mesh position={[0.6, 1.05, 0]} castShadow>
            <boxGeometry args={[1.2, 0.5, 0.8]} />
            <Mat color={STEEL} metal={0.5} />
          </mesh>
        </>
      ))}

      {P("radiator", (
        <mesh position={[2.06, 1.3, 0]}>
          <boxGeometry args={[0.06, 0.55, 0.78]} />
          <Mat color="#1a1d1a" rough={0.7} />
        </mesh>
      ))}

      {P("frontlys", (
        <>
          {[0.27, -0.27].map((z) => (
            <mesh key={`hb${z}`} position={[2.07, 1.62, z]}>
              <boxGeometry args={[0.04, 0.1, 0.22]} />
              <meshStandardMaterial color="#f8fbff" emissive="#e8f2ff" emissiveIntensity={0.6} />
            </mesh>
          ))}
          {[0.3, -0.3].map((z) => (
            <mesh key={`lb${z}`} position={[2.09, 0.98, z]}>
              <boxGeometry args={[0.04, 0.09, 0.14]} />
              <meshStandardMaterial color="#f8fbff" emissive="#e8f2ff" emissiveIntensity={0.6} />
            </mesh>
          ))}
        </>
      ))}

      {P("foraksel", (
        <>
          <mesh position={[FX, FRR, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.11, 0.11, 1.75, 16]} />
            <Mat color={STEEL} metal={0.6} />
          </mesh>
          <mesh position={[FX - 0.05, 0.9, 0]} castShadow>
            <cylinderGeometry args={[0.07, 0.07, 0.42, 14]} />
            <Mat color="#c98a00" metal={0.5} />
          </mesh>
        </>
      ))}

      {P("forhjul", (
        <>
          <Wheel x={FX} z={0.92} r={FRR} w={0.45} rim={0.36} />
          <Wheel x={FX} z={-0.92} r={FRR} w={0.45} rim={0.36} />
        </>
      ))}

      {P("bakhjul", (
        <>
          <Wheel x={RX} z={1.02} r={RR} w={0.6} rim={0.5} />
          <Wheel x={RX} z={-1.02} r={RR} w={0.6} rim={0.5} />
        </>
      ))}

      {P("forerhus", (
        <>
          {/* glass shell */}
          <mesh position={[-0.9, 2.12, 0]}>
            <boxGeometry args={[1.5, 1.22, 1.5]} />
            <meshStandardMaterial color="#bcd9e6" transparent opacity={0.28} roughness={0.05} metalness={0.1} />
          </mesh>
          {/* pillars */}
          {[[-0.16, 0.74], [-0.16, -0.74], [-1.64, 0.74], [-1.64, -0.74]].map(([x, z]) => (
            <mesh key={`${x}${z}`} position={[x, 2.12, z]} castShadow>
              <boxGeometry args={[0.07, 1.24, 0.07]} />
              <Mat color={DARK} />
            </mesh>
          ))}
          <RoundedBox args={[1.72, 0.12, 1.66]} radius={0.04} position={[-0.9, 2.77, 0]} castShadow>
            <Mat color={GREEN} rough={0.4} />
          </RoundedBox>
          <mesh position={[-0.9, 1.5, 0]}>
            <boxGeometry args={[1.5, 0.06, 1.5]} />
            <Mat color={DARK} />
          </mesh>
        </>
      ))}

      {P("forerhusfjaering", (
        <>
          {[0.6, -0.6].map((z) => (
            <mesh key={z} position={[-1.55, 1.45, z]}>
              <cylinderGeometry args={[0.06, 0.06, 0.2, 12]} />
              <Mat color="#d97706" metal={0.4} />
            </mesh>
          ))}
        </>
      ))}

      {P("sete", (
        <>
          <mesh position={[-1.15, 1.75, 0]}>
            <boxGeometry args={[0.48, 0.12, 0.5]} />
            <Mat color="#3b3f3b" rough={0.8} />
          </mesh>
          <mesh position={[-1.38, 2.05, 0]}>
            <boxGeometry args={[0.1, 0.55, 0.48]} />
            <Mat color="#3b3f3b" rough={0.8} />
          </mesh>
        </>
      ))}

      {P("ratt", (
        <>
          <mesh position={[-0.5, 2.18, 0]} rotation={[0, 0, Math.PI / 3]}>
            <torusGeometry args={[0.2, 0.025, 10, 32]} />
            <Mat color="#1d201d" />
          </mesh>
          <mesh position={[-0.42, 1.9, 0]} rotation={[0, 0, Math.PI / 3]}>
            <cylinderGeometry args={[0.035, 0.035, 0.6, 10]} />
            <Mat color="#30352f" />
          </mesh>
        </>
      ))}

      {P("instrumentpanel", (
        <mesh position={[-0.3, 2.13, 0]} rotation={[0, 0, Math.PI / 5]}>
          <boxGeometry args={[0.06, 0.22, 0.42]} />
          <meshStandardMaterial color="#20251f" emissive="#3e5a39" emissiveIntensity={0.3} />
        </mesh>
      ))}

      {P("konsoll", (
        <mesh position={[-0.95, 1.85, -0.5]}>
          <boxGeometry args={[0.7, 0.18, 0.22]} />
          <Mat color="#4d564c" />
        </mesh>
      ))}

      {P("taklys", (
        <>
          {[0.66, -0.66].map((z) => (
            <mesh key={`f${z}`} position={[-0.04, 2.77, z]}>
              <boxGeometry args={[0.05, 0.07, 0.16]} />
              <meshStandardMaterial color="#ffa000" emissive="#ff8f00" emissiveIntensity={0.5} />
            </mesh>
          ))}
          {[0.32, -0.32].map((z) => (
            <mesh key={`w${z}`} position={[-0.04, 2.77, z]}>
              <boxGeometry args={[0.05, 0.09, 0.12]} />
              <meshStandardMaterial color="#f8fbff" emissive="#dfefff" emissiveIntensity={0.5} />
            </mesh>
          ))}
        </>
      ))}

      {P("speil", (
        <>
          {[1, -1].map((s) => (
            <group key={s}>
              <mesh position={[-0.12, 2.45, s * 1.0]} rotation={[s * 0.3, 0, 0]}>
                <boxGeometry args={[0.03, 0.03, 0.5]} />
                <Mat color={DARK} />
              </mesh>
              <mesh position={[-0.1, 2.38, s * 1.23]}>
                <boxGeometry args={[0.04, 0.32, 0.2]} />
                <Mat color="#111" metal={0.8} rough={0.2} />
              </mesh>
            </group>
          ))}
        </>
      ))}

      {P("eksos", (
        <mesh position={[0.05, 2.3, -0.62]} castShadow>
          <cylinderGeometry args={[0.07, 0.07, 1.6, 14]} />
          <Mat color="#3a3a3a" metal={0.7} rough={0.35} />
        </mesh>
      ))}

      {P("tanker", (
        <>
          <RoundedBox args={[0.9, 0.42, 0.32]} radius={0.06} position={[-0.25, 0.95, 0.56]} castShadow>
            <Mat color={DARK} />
          </RoundedBox>
          <mesh position={[0.15, 0.95, 0.73]}>
            <boxGeometry args={[0.18, 0.18, 0.04]} />
            <Mat color="#1f6fbf" />
          </mesh>
        </>
      ))}

      {P("trinn", (
        <>
          {[0.85, 1.15, 1.42].map((y, i) => (
            <mesh key={y} position={[-0.25 - i * 0.05, y, 0.78]}>
              <boxGeometry args={[0.35, 0.04, 0.22]} />
              <Mat color={STEEL} metal={0.6} />
            </mesh>
          ))}
        </>
      ))}

      {P("frontlift", (
        <>
          <mesh position={[2.15, 0.95, 0]}>
            <boxGeometry args={[0.18, 0.45, 0.9]} />
            <Mat color={DARK} />
          </mesh>
          {[0.36, -0.36].map((z) => (
            <mesh key={z} position={[2.42, 0.7, z]} rotation={[0, 0, -0.35]}>
              <boxGeometry args={[0.55, 0.07, 0.07]} />
              <Mat color={STEEL} metal={0.6} />
            </mesh>
          ))}
          {[0.2, 0.08].map((z) => (
            <mesh key={z} position={[2.26, 1.2, z]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.03, 0.03, 0.08, 10]} />
              <Mat color="#1f6fbf" />
            </mesh>
          ))}
        </>
      ))}

      {P("bakre-koplinger", (
        <>
          {[0.32, 0.18, 0.04, -0.1, -0.24, -0.38].map((z, i) => (
            <mesh key={z} position={[RX - 0.5, 1.45 - (i % 2) * 0.1, z]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.03, 0.03, 0.1, 10]} />
              <Mat color={["#2e7d32", "#2e7d32", "#1565c0", "#1565c0", "#6d4c41", "#6d4c41"][i]} />
            </mesh>
          ))}
        </>
      ))}

      {P("bakloft", (
        <>
          {[0.42, -0.42].map((z) => (
            <mesh key={z} position={[RX - 0.75, 0.62, z]} rotation={[0, 0, 0.12]}>
              <boxGeometry args={[0.9, 0.08, 0.08]} />
              <Mat color={STEEL} metal={0.6} />
            </mesh>
          ))}
          <mesh position={[RX - 0.75, 1.3, 0]} rotation={[0, 0, -0.1]}>
            <cylinderGeometry args={[0.04, 0.04, 0.7, 10]} />
            <Mat color={YELLOW} />
          </mesh>
          {[0.42, -0.42].map((z) => (
            <mesh key={`l${z}`} position={[RX - 0.55, 1.0, z]}>
              <boxGeometry args={[0.05, 0.6, 0.05]} />
              <Mat color={STEEL} metal={0.6} />
            </mesh>
          ))}
        </>
      ))}

      {P("kraftuttak", (
        <>
          <mesh position={[RX - 0.55, 0.78, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.035, 0.035, 0.22, 12]} />
            <Mat color="#b0b6b1" metal={0.8} rough={0.3} />
          </mesh>
          <mesh position={[RX - 0.5, 0.92, 0]}>
            <boxGeometry args={[0.18, 0.04, 0.36]} />
            <Mat color={YELLOW} />
          </mesh>
        </>
      ))}

      {P("trekkstang", (
        <mesh position={[RX - 0.55, 0.5, 0]}>
          <boxGeometry args={[0.6, 0.06, 0.18]} />
          <Mat color={STEEL} metal={0.6} />
        </mesh>
      ))}

      {P("baklys", (
        <>
          {[1, -1].map((s) => (
            <mesh key={s} position={[RX - 0.74, 1.78, s * 1.1]}>
              <boxGeometry args={[0.04, 0.1, 0.18]} />
              <meshStandardMaterial color="#d32f2f" emissive="#b71c1c" emissiveIntensity={0.5} />
            </mesh>
          ))}
          <mesh position={[RX - 0.5, 1.25, 0.5]}>
            <boxGeometry args={[0.06, 0.1, 0.1]} />
            <Mat color="#111" />
          </mesh>
        </>
      ))}
    </group>
  );
}

export default function TractorScene({
  selected,
  onSelect,
  area,
  view,
  viewToken,
}: {
  selected?: string;
  onSelect: (id: string) => void;
  area?: ModelArea | "";
  view: ViewPreset;
  /** Changes whenever the same view should be re-applied (e.g. reset). */
  viewToken: number;
}) {
  const controls = useRef<CameraControls>(null);
  const [hovered, setHovered] = useState<string>();
  const reduced = useMemo(() => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches, []);

  useEffect(() => {
    const v = VIEWS[area ? AREA_VIEW[area] : view] ?? VIEWS.standard;
    controls.current?.setLookAt(v[0], v[1], v[2], v[3], v[4], v[5], !reduced);
  }, [view, area, viewToken, reduced]);

  return (
    <Canvas
      shadows
      dpr={[1, 1.75]}
      camera={{ position: VIEWS.standard.slice(0, 3) as [number, number, number], fov: 40, near: 0.1, far: 100 }}
      onPointerMissed={() => setHovered(undefined)}
      gl={{ antialias: true, preserveDrawingBuffer: false }}
      aria-label="3D-modell av traktoren"
    >
      <color attach="background" args={["#eef2ea"]} />
      <hemisphereLight args={["#ffffff", "#b9c4b2", 0.9]} />
      <directionalLight position={[6, 9, 5]} intensity={1.6} castShadow shadow-mapSize={[1024, 1024]} />
      <directionalLight position={[-6, 4, -4]} intensity={0.5} />
      <Tractor selected={selected} hovered={hovered} area={area} onHover={setHovered} onSelect={onSelect} />
      <ContactShadows position={[0, 0.001, 0]} opacity={0.45} scale={12} blur={2.4} far={4} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[9, 48]} />
        <meshStandardMaterial color="#dfe6d8" />
      </mesh>
      <CameraControls ref={controls} minDistance={2} maxDistance={16} maxPolarAngle={Math.PI / 2 - 0.03} />
    </Canvas>
  );
}
