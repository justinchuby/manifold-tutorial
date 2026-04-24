import { useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Line, Sphere, Html } from '@react-three/drei';
import * as THREE from 'three';
import { VIZ_CLASSES, VIZ_COLORS } from './theme';

const NORMAL_SECTION_LOOP_SECONDS = 7;
const COLORS = {
  geodesic: VIZ_COLORS.geodesic,
  normalSection: VIZ_COLORS.normalSection,
  tangent: VIZ_COLORS.tangent,
  normal: VIZ_COLORS.normal,
  point: VIZ_COLORS.point,
  surface: VIZ_COLORS.surface,
  surfaceWire: VIZ_COLORS.surfaceWire,
  cuttingPlane: VIZ_COLORS.cuttingPlane,
};

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function smoothstep(value: number) {
  const t = clamp01(value);
  return t * t * (3 - 2 * t);
}

function stageProgress(time: number, start: number, duration: number) {
  return smoothstep((time - start) / duration);
}

function revealFromVectorPoint(points: THREE.Vector3[], anchor: THREE.Vector3, progress: number): THREE.Vector3[] {
  if (points.length < 2) return points;

  let center = 0;
  let bestDistance = Infinity;
  points.forEach((point, index) => {
    const d = point.distanceToSquared(anchor);
    if (d < bestDistance) {
      bestDistance = d;
      center = index;
    }
  });

  const maxSpan = Math.max(center, points.length - 1 - center);
  const span = Math.max(1, Math.ceil(maxSpan * clamp01(progress)));
  return points.slice(Math.max(0, center - span), Math.min(points.length, center + span + 1));
}

// The cutting plane visualization - plane containing tangent u and normal space
function CuttingPlane({ 
  tangent, 
  surfaceNormal, 
  show,
  opacity = 0.32,
}: { 
  tangent: THREE.Vector3;
  surfaceNormal: THREE.Vector3;
  show: boolean;
  opacity?: number;
}) {
  // The cutting plane E(p,u) contains: the tangent direction u and the normal space
  // For a surface in E³, normal space is 1D (just the surface normal)
  // So E(p,u) is spanned by u and the surface normal n
  // For a unit sphere, this plane passes through the origin
  
  const geometry = useMemo(() => {
    const u = tangent.clone().normalize();
    const n = surfaceNormal.clone().normalize();
    
    // Create a quad in the plane spanned by u and n, centered at origin
    const size = 1.5;
    const center = new THREE.Vector3(0, 0, 0);
    const vertices = new Float32Array([
      // Four corners of the plane
      ...center.clone().add(u.clone().multiplyScalar(size)).add(n.clone().multiplyScalar(size)).toArray(),
      ...center.clone().add(u.clone().multiplyScalar(-size)).add(n.clone().multiplyScalar(size)).toArray(),
      ...center.clone().add(u.clone().multiplyScalar(-size)).add(n.clone().multiplyScalar(-size)).toArray(),
      ...center.clone().add(u.clone().multiplyScalar(size)).add(n.clone().multiplyScalar(-size)).toArray(),
    ]);
    
    const indices = new Uint16Array([0, 1, 2, 0, 2, 3]);
    
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geom.setIndex(new THREE.BufferAttribute(indices, 1));
    geom.computeVertexNormals();
    
    return geom;
  }, [tangent, surfaceNormal]);

  if (!show) return null;

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial 
        color={COLORS.cuttingPlane} 
        emissive="#b96d5c"
        emissiveIntensity={0.04}
        transparent 
        opacity={opacity} 
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// The intersection curve (normal section)
function NormalSectionCurve({ 
  point,
  tangent, 
  surfaceNormal,
  color = COLORS.normalSection,
  progress = 1,
}: { 
  point: THREE.Vector3;
  tangent: THREE.Vector3;
  surfaceNormal: THREE.Vector3;
  color?: string;
  progress?: number;
}) {
  const points = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    // The normal section is the intersection of sphere with the plane E(p,u)
    // E(p,u) is spanned by tangent direction u and surface normal n
    // For a unit sphere centered at origin, this plane passes through origin
    // So the intersection is a great circle
    
    // The great circle lies in the plane spanned by u and n
    // We can parameterize it as: cos(θ)*u + sin(θ)*n
    const u = tangent.clone().normalize();
    const n = surfaceNormal.clone().normalize();
    
    for (let i = 0; i <= 64; i++) {
      const theta = (i / 64) * Math.PI * 2;
      const p = u.clone().multiplyScalar(Math.cos(theta))
                 .add(n.clone().multiplyScalar(Math.sin(theta)));
      pts.push(p);
    }
    return pts;
  }, [tangent, surfaceNormal]);

  const visiblePoints = revealFromVectorPoint(points, point, progress);

  return visiblePoints.length > 1 ? (
    <Line points={visiblePoints} color={color} lineWidth={3} transparent opacity={0.35 + 0.65 * progress} />
  ) : null;
}

// Tangent vector visualization
function TangentVector({ position, direction, color = COLORS.tangent, length = 0.5, progress = 1 }: { 
  position: THREE.Vector3; 
  direction: THREE.Vector3; 
  color?: string;
  length?: number;
  progress?: number;
}) {
  const end = position.clone().add(direction.clone().normalize().multiplyScalar(length * progress));
  
  return (
    <>
      <Line 
        points={[position, end]} 
        color={color} 
        lineWidth={4}
        transparent
        opacity={progress}
      />
      {/* Arrow head */}
      <mesh position={end}>
        <coneGeometry args={[0.03, 0.08, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </>
  );
}

// Normal vector
function NormalVector({ position, color = COLORS.normal, progress = 1 }: { position: THREE.Vector3; color?: string; progress?: number }) {
  const normal = position.clone().normalize();
  const end = position.clone().add(normal.multiplyScalar(0.4 * progress));
  
  return (
    <>
      <Line 
        points={[position, end]} 
        color={color} 
        lineWidth={3}
        transparent
        opacity={progress}
      />
      <mesh position={end}>
        <coneGeometry args={[0.025, 0.06, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </>
  );
}

function NormalSectionScene() {
  const [showPlane] = useState(true);
  const [time, setTime] = useState(0);
  
  useFrame(({ clock }) => {
    setTime(clock.getElapsedTime());
  });

  const loopTime = time % NORMAL_SECTION_LOOP_SECONDS;
  const pointReveal = stageProgress(loopTime, 0.1, 0.6);
  const vectorReveal = stageProgress(loopTime, 0.9, 1.0);
  const planeReveal = stageProgress(loopTime, 1.9, 1.0);
  const curveReveal = stageProgress(loopTime, 3.0, 1.8);
  const currentStep = loopTime < 1.1
    ? '① 定点 p'
    : loopTime < 2.1
      ? '② 选切向量与法向量'
      : loopTime < 3.2
        ? '③ 展开切割平面'
        : '④ 得到法截线 β';

  // Point on sphere
  const phi = Math.PI / 4;
  const theta = time * 0.3;
  const point = new THREE.Vector3(
    Math.sin(phi) * Math.cos(theta),
    Math.sin(phi) * Math.sin(theta),
    Math.cos(phi)
  );
  
  // Tangent direction (along longitude)
  const tangent = new THREE.Vector3(
    -Math.sin(theta),
    Math.cos(theta),
    0
  ).normalize();
  
  // Normal is just the position for a unit sphere
  const normal = point.clone().normalize();

  return (
    <>
      <ambientLight intensity={0.4} />
      <hemisphereLight args={['#fff3d8', '#b9d7d2', 0.9]} />
      <pointLight position={[10, 10, 10]} intensity={0.65} />
      
      {/* Sphere */}
      <Sphere args={[1, 32, 32]}>
        <meshStandardMaterial 
          color={COLORS.surface} 
          emissive="#294f52"
          emissiveIntensity={0.06}
          transparent 
          opacity={0.42}
          roughness={0.74}
          metalness={0.02}
          side={THREE.DoubleSide}
        />
      </Sphere>
      
      {/* Wireframe */}
      <Sphere args={[1.001, 16, 16]}>
        <meshBasicMaterial color={COLORS.surfaceWire} wireframe transparent opacity={0.62} />
      </Sphere>
      
      {/* The cutting plane E(p,u) - contains tangent u and surface normal */}
      <CuttingPlane 
        tangent={tangent} 
        surfaceNormal={normal} 
        show={showPlane} 
        opacity={0.05 + 0.15 * planeReveal}
      />
      
      {/* Normal section curve */}
      <NormalSectionCurve point={point} tangent={tangent} surfaceNormal={normal} progress={curveReveal} />
      
      {/* Point on surface */}
      <mesh position={point} scale={0.7 + 0.3 * pointReveal}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color={COLORS.point} emissive={COLORS.point} emissiveIntensity={0.7} />
      </mesh>
      
      {/* Tangent vector */}
      {vectorReveal > 0.02 && <TangentVector position={point} direction={tangent} progress={vectorReveal} />}
      
      {/* Normal vector */}
      {vectorReveal > 0.02 && <NormalVector position={point} progress={vectorReveal} />}

      <Html position={[-1.1, -1.55, 0]} style={{ pointerEvents: 'none' }}>
        <div className={VIZ_CLASSES.labelPill}>
          {currentStep}
        </div>
      </Html>
      
      <OrbitControls enableZoom={true} enablePan={false} />
    </>
  );
}

export default function NormalSectionViz() {
  return (
    <div className={`h-80 w-full ${VIZ_CLASSES.canvas}`}>
      <Canvas camera={{ position: [2.5, 2, 2.5], fov: 45 }}>
        <NormalSectionScene />
      </Canvas>
    </div>
  );
}

export function NormalSectionVizWithLabels() {
  return (
    <div className="space-y-4">
      <NormalSectionViz />
      <div className="flex flex-wrap gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="h-1 w-4 rounded bg-[#c75f52]"></div>
          <span className="text-stone-700">法截线 (Normal Section)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-1 w-4 rounded bg-[#0f8f71]"></div>
          <span className="text-stone-700">切向量 u (Tangent)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-1 w-4 rounded bg-[#c76f28]"></div>
          <span className="text-stone-700">法向量 (Normal)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded border border-[#b96d5c] bg-[#d7a08c]/35"></div>
          <span className="text-stone-700">切割平面 E(p,u)</span>
        </div>
      </div>
    </div>
  );
}
