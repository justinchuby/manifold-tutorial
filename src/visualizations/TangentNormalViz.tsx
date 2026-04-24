import { useMemo, useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Line, Sphere, Html } from '@react-three/drei';
import * as THREE from 'three';
import { VIZ_COLORS } from './theme';

type ShapeType = 'sphere' | 'torus' | 'cylinder';

const SURFACE_COLOR = VIZ_COLORS.surfaceDeep;
const SURFACE_EMISSIVE = VIZ_COLORS.surfaceWire;
const WIREFRAME_COLOR = VIZ_COLORS.mutedText;

// Tangent plane at a point on surface
function TangentPlane({ point, normal, size = 0.6 }: { point: THREE.Vector3; normal: THREE.Vector3; size?: number }) {
  const geometry = useMemo(() => {
    const n = normal.clone().normalize();
    
    let u = new THREE.Vector3(1, 0, 0);
    if (Math.abs(n.dot(u)) > 0.9) u = new THREE.Vector3(0, 1, 0);
    u.sub(n.clone().multiplyScalar(n.dot(u))).normalize();
    const v = new THREE.Vector3().crossVectors(n, u);
    
    const p = point.clone().add(n.clone().multiplyScalar(0.01));
    
    const vertices = new Float32Array([
      ...p.clone().add(u.clone().multiplyScalar(size)).add(v.clone().multiplyScalar(size)).toArray(),
      ...p.clone().add(u.clone().multiplyScalar(-size)).add(v.clone().multiplyScalar(size)).toArray(),
      ...p.clone().add(u.clone().multiplyScalar(-size)).add(v.clone().multiplyScalar(-size)).toArray(),
      ...p.clone().add(u.clone().multiplyScalar(size)).add(v.clone().multiplyScalar(-size)).toArray(),
    ]);
    
    const indices = new Uint16Array([0, 1, 2, 0, 2, 3]);
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geom.setIndex(new THREE.BufferAttribute(indices, 1));
    return geom;
  }, [point, normal, size]);

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial 
        color={VIZ_COLORS.tangent} emissive={VIZ_COLORS.tangent} emissiveIntensity={0.1}
        transparent opacity={0.38} side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// Normal vector arrow
function NormalArrow({ point, normal, length = 0.5 }: { point: THREE.Vector3; normal: THREE.Vector3; length?: number }) {
  const n = normal.clone().normalize();
  const start = point.clone().add(n.clone().multiplyScalar(0.01));
  const end = start.clone().add(n.clone().multiplyScalar(length));
  
  return (
    <>
      <Line points={[start, end]} color={VIZ_COLORS.normalSection} lineWidth={4} />
      <mesh position={end}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshStandardMaterial color={VIZ_COLORS.normalSection} emissive={VIZ_COLORS.normalSection} emissiveIntensity={0.35} />
      </mesh>
    </>
  );
}

// Tangent vectors at point
function TangentVectors({ point, normal }: { point: THREE.Vector3; normal: THREE.Vector3 }) {
  const { u, v } = useMemo(() => {
    const n = normal.clone().normalize();
    let u = new THREE.Vector3(1, 0, 0);
    if (Math.abs(n.dot(u)) > 0.9) u = new THREE.Vector3(0, 1, 0);
    u.sub(n.clone().multiplyScalar(n.dot(u))).normalize();
    const v = new THREE.Vector3().crossVectors(n, u);
    return { u, v };
  }, [normal]);

  const start = point.clone().add(normal.clone().normalize().multiplyScalar(0.01));
  const endU = start.clone().add(u.clone().multiplyScalar(0.4));
  const endV = start.clone().add(v.clone().multiplyScalar(0.4));

  return (
    <>
      <Line points={[start, endU]} color={VIZ_COLORS.geodesic} lineWidth={3} />
      <Line points={[start, endV]} color={VIZ_COLORS.point} lineWidth={3} />
    </>
  );
}

// Torus mesh
function TorusSurface({ R = 1, r = 0.4 }: { R?: number; r?: number }) {
  return (
    <group>
      <mesh>
        <torusGeometry args={[R, r, 32, 48]} />
        <meshStandardMaterial
          color={SURFACE_COLOR}
          emissive={SURFACE_EMISSIVE}
          emissiveIntensity={0.08}
          roughness={0.72}
          transparent
          opacity={0.58}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh>
        <torusGeometry args={[R, r, 16, 24]} />
        <meshBasicMaterial color={WIREFRAME_COLOR} wireframe transparent opacity={0.34} />
      </mesh>
    </group>
  );
}

// Cylinder mesh (open-ended)
function CylinderSurface({ radius = 1, height = 2.5 }: { radius?: number; height?: number }) {
  return (
    <group>
      <mesh>
        <cylinderGeometry args={[radius, radius, height, 48, 1, true]} />
        <meshStandardMaterial
          color={SURFACE_COLOR}
          emissive={SURFACE_EMISSIVE}
          emissiveIntensity={0.08}
          roughness={0.72}
          transparent
          opacity={0.58}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh>
        <cylinderGeometry args={[radius, radius, height, 24, 1, true]} />
        <meshBasicMaterial color={WIREFRAME_COLOR} wireframe transparent opacity={0.34} />
      </mesh>
    </group>
  );
}

// Compute surface point and normal for each shape
function getSurfacePointAndNormal(shape: ShapeType, time: number): { point: THREE.Vector3; normal: THREE.Vector3 } {
  if (shape === 'sphere') {
    const theta = time * 0.3;
    const phi = Math.PI / 3 + Math.sin(time * 0.2) * 0.3;
    const p = new THREE.Vector3(
      Math.sin(phi) * Math.cos(theta),
      Math.sin(phi) * Math.sin(theta),
      Math.cos(phi)
    );
    return { point: p, normal: p.clone().normalize() };
  } else if (shape === 'torus') {
    const R = 1, r = 0.4;
    const u = time * 0.25;
    const v = time * 0.4;
    const p = new THREE.Vector3(
      (R + r * Math.cos(v)) * Math.cos(u),
      (R + r * Math.cos(v)) * Math.sin(u),
      r * Math.sin(v)
    );
    // Normal = derivative direction pointing outward from torus surface
    const n = new THREE.Vector3(
      Math.cos(v) * Math.cos(u),
      Math.cos(v) * Math.sin(u),
      Math.sin(v)
    ).normalize();
    return { point: p, normal: n };
  } else {
    // Cylinder: radius 1, axis along y
    const theta = time * 0.3;
    const y = Math.sin(time * 0.2) * 0.8;
    const p = new THREE.Vector3(Math.cos(theta), y, Math.sin(theta));
    const n = new THREE.Vector3(Math.cos(theta), 0, Math.sin(theta)).normalize();
    return { point: p, normal: n };
  }
}

function TangentNormalScene({ shape }: { shape: ShapeType }) {
  const groupRef = useRef<THREE.Group>(null);
  const [time, setTime] = useState(0);
  
  useFrame(({ clock }) => {
    setTime(clock.getElapsedTime());
  });

  const { point, normal } = getSurfacePointAndNormal(shape, time);

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      
      {/* Surface */}
      {shape === 'sphere' && (
        <group>
          <Sphere args={[1, 32, 32]}>
            <meshStandardMaterial
              color={SURFACE_COLOR}
              emissive={SURFACE_EMISSIVE}
              emissiveIntensity={0.08}
              roughness={0.72}
              transparent
              opacity={0.58}
            />
          </Sphere>
          <Sphere args={[1.001, 16, 16]}>
            <meshBasicMaterial color={WIREFRAME_COLOR} wireframe transparent opacity={0.34} />
          </Sphere>
        </group>
      )}
      {shape === 'torus' && <TorusSurface />}
      {shape === 'cylinder' && <CylinderSurface />}
      
      {/* Point on surface */}
      <mesh position={point}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color={VIZ_COLORS.paper} emissive={VIZ_COLORS.paper} emissiveIntensity={0.25} />
      </mesh>
      
      {/* Labels */}
      <Html position={point.clone().add(normal.clone().normalize().multiplyScalar(0.65))} style={{ pointerEvents: 'none' }}>
        <div className="rounded-md border border-red-200 bg-[#fffaf1]/95 px-1.5 py-0.5 text-xs font-semibold text-red-600 shadow-sm whitespace-nowrap">n</div>
      </Html>
      <Html position={point.clone().add(new THREE.Vector3(0.12, -0.12, 0))} style={{ pointerEvents: 'none' }}>
        <div className="rounded-md border border-stone-300 bg-[#fffaf1]/95 px-1.5 py-0.5 text-xs font-semibold text-stone-800 shadow-sm">p</div>
      </Html>
      
      {/* Tangent plane */}
      <TangentPlane point={point} normal={normal} />
      
      {/* Normal vector */}
      <NormalArrow point={point} normal={normal} />
      
      {/* Tangent vectors */}
      <TangentVectors point={point} normal={normal} />
      
      <OrbitControls enableZoom={true} enablePan={false} />
    </group>
  );
}

export default function TangentNormalViz({ shape = 'sphere' as ShapeType }) {
  return (
    <div className="h-80 w-full overflow-hidden rounded-2xl border border-amber-900/10 bg-[#fff6e4] shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_18px_45px_rgba(120,83,39,0.12)]">
      <Canvas camera={{ position: [2.5, 2, 2.5], fov: 45 }}>
        <TangentNormalScene shape={shape} />
      </Canvas>
    </div>
  );
}

export function TangentNormalVizWithLabels() {
  const [shape, setShape] = useState<ShapeType>('sphere');
  
  const shapeInfo: Record<ShapeType, { zh: string; en: string; dim_zh: string; dim_en: string }> = {
    sphere: { zh: '球面 S²', en: 'Sphere S²', dim_zh: '切空间 2维，法空间 1维', dim_en: 'Tangent: 2D, Normal: 1D' },
    torus: { zh: '环面 T²', en: 'Torus T²', dim_zh: '切空间 2维，法空间 1维', dim_en: 'Tangent: 2D, Normal: 1D' },
    cylinder: { zh: '圆柱面', en: 'Cylinder', dim_zh: '切空间 2维，法空间 1维', dim_en: 'Tangent: 2D, Normal: 1D' },
  };

  return (
    <div className="space-y-4">
      <TangentNormalViz shape={shape} />
      
      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded border border-emerald-500 bg-emerald-400/35"></div>
          <span className="text-stone-700">切平面 T<sub>p</sub>M</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-1 w-4 rounded bg-red-500"></div>
          <span className="text-stone-700">法向量 n (Normal)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-1 w-4 rounded bg-[#1f6f78]"></div>
          <div className="h-1 w-4 rounded bg-[#d7b84f]"></div>
          <span className="text-stone-700">切向量 (Tangent vectors)</span>
        </div>
      </div>
      
      {/* Shape selector */}
      <div className="rounded-2xl border border-amber-900/10 bg-[#fffaf1]/80 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.75),0_12px_30px_rgba(120,83,39,0.08)]">
        <p className="mb-3 text-sm font-semibold text-stone-700">
          选择曲面 / Choose surface:
        </p>
        <div className="grid grid-cols-3 gap-2">
          {(['sphere', 'torus', 'cylinder'] as ShapeType[]).map((s) => (
            <button
              key={s}
              onClick={() => setShape(s)}
              className={`rounded-xl border-2 px-3 py-2 text-left text-sm transition-all ${
                shape === s 
                  ? 'border-teal-600 bg-teal-700/[0.12] text-teal-900 shadow-[0_10px_24px_rgba(31,111,120,0.14)]' 
                  : 'border-amber-900/20 bg-white/45 text-stone-700 hover:border-teal-700/45 hover:bg-white/70'
              }`}
            >
              <div className="font-semibold">{shapeInfo[s].zh}</div>
              <div className="mt-0.5 text-xs opacity-75">{shapeInfo[s].dim_zh}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
