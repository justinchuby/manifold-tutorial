import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Line, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { VIZ_CLASSES, VIZ_COLORS } from './theme';

const COLORS = {
  geodesic: VIZ_COLORS.geodesic,
  comparison: VIZ_COLORS.comparison,
  point: VIZ_COLORS.point,
  surface: VIZ_COLORS.surface,
};

// Geodesic (great circle) on a sphere
function GeodesicOnSphere({ color = COLORS.geodesic, phase = 0, tilt = 0, opacity = 1 }: { color?: string; phase?: number; tilt?: number; opacity?: number }) {
  const points = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 64; i++) {
      const theta = (i / 64) * Math.PI * 2;
      const x = Math.cos(theta);
      const y = Math.sin(theta) * Math.cos(tilt);
      const z = Math.sin(theta) * Math.sin(tilt);
      // Rotate by phase
      const cosP = Math.cos(phase);
      const sinP = Math.sin(phase);
      pts.push(new THREE.Vector3(
        x * cosP - y * sinP,
        x * sinP + y * cosP,
        z
      ));
    }
    return pts;
  }, [phase, tilt]);

  return <Line points={points} color={color} lineWidth={3} transparent opacity={opacity} />;
}

// Non-geodesic (latitude circle)
function LatitudeCircle({ lat = 45, color = COLORS.comparison }: { lat?: number; color?: string }) {
  const points = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const phi = (lat * Math.PI) / 180;
    const r = Math.cos(phi);
    const z = Math.sin(phi);
    for (let i = 0; i <= 64; i++) {
      const theta = (i / 64) * Math.PI * 2;
      pts.push(new THREE.Vector3(r * Math.cos(theta), r * Math.sin(theta), z));
    }
    return pts;
  }, [lat]);

  return <Line points={points} color={color} lineWidth={2} dashed dashScale={20} />;
}

// Animated point traveling along geodesic
function TravelingPoint({ tilt = 0, color = COLORS.point }: { tilt?: number; color?: string }) {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.getElapsedTime() * 0.5;
      const theta = t % (Math.PI * 2);
      const x = Math.cos(theta);
      const y = Math.sin(theta) * Math.cos(tilt);
      const z = Math.sin(theta) * Math.sin(tilt);
      ref.current.position.set(x * 1.02, y * 1.02, z * 1.02);
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.05, 16, 16]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
    </mesh>
  );
}

function GeodesicScene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      
      {/* Transparent sphere */}
      <Sphere args={[1, 32, 32]}>
        <meshStandardMaterial 
          color={COLORS.surface} 
          emissive={VIZ_COLORS.surfaceDeep}
          emissiveIntensity={0.06}
          transparent 
          opacity={0.42} 
          wireframe={false}
          roughness={0.74}
          metalness={0.02}
          side={THREE.DoubleSide}
        />
      </Sphere>
      
      {/* Wireframe */}
      <Sphere args={[1.001, 16, 16]}>
        <meshBasicMaterial color={VIZ_COLORS.surfaceWire} wireframe transparent opacity={0.62} />
      </Sphere>
      
      {/* Geodesics (great circles) */}
      <GeodesicOnSphere phase={0} tilt={0} opacity={1} />
      <GeodesicOnSphere phase={Math.PI / 3} tilt={Math.PI / 4} opacity={0.72} />
      <GeodesicOnSphere phase={Math.PI / 2} tilt={Math.PI / 2} opacity={0.48} />
      
      {/* Non-geodesic latitude circles */}
      <LatitudeCircle lat={45} />
      <LatitudeCircle lat={-30} color={VIZ_COLORS.normalSection} />
      
      {/* Traveling point */}
      <TravelingPoint tilt={Math.PI / 4} color={VIZ_COLORS.point} />
      
      <OrbitControls enableZoom={true} enablePan={false} />
    </>
  );
}

export default function GeodesicViz() {
  return (
    <div className={`w-full h-80 ${VIZ_CLASSES.canvas}`}>
      <Canvas camera={{ position: [2.5, 2, 2.5], fov: 45 }}>
        <GeodesicScene />
      </Canvas>
    </div>
  );
}

export function GeodesicVizWithLabels() {
  return (
    <div className="space-y-4">
      <GeodesicViz />
      <div className="flex flex-wrap gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-1 rounded bg-[#1f6f78]"></div>
          <span className="text-stone-700">大圆/测地线 (Geodesics)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-1 rounded bg-[#9b6a3a] border-dashed"></div>
          <span className="text-stone-700">纬线圈 (Latitude - not geodesic)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#d7b84f]"></div>
          <span className="text-stone-700">沿测地线移动的点</span>
        </div>
      </div>
    </div>
  );
}
