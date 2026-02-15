import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Line, Sphere } from '@react-three/drei';
import * as THREE from 'three';

// Geodesic (great circle) on a sphere
function GeodesicOnSphere({ color = '#00ffff', phase = 0, tilt = 0 }: { color?: string; phase?: number; tilt?: number }) {
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

  return <Line points={points} color={color} lineWidth={3} />;
}

// Non-geodesic (latitude circle)
function LatitudeCircle({ lat = 45, color = '#ff6600' }: { lat?: number; color?: string }) {
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
function TravelingPoint({ tilt = 0, color = '#ffff00' }: { tilt?: number; color?: string }) {
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
          color="#1a3a5c" 
          transparent 
          opacity={0.3} 
          wireframe={false}
          side={THREE.DoubleSide}
        />
      </Sphere>
      
      {/* Wireframe */}
      <Sphere args={[1.001, 16, 16]}>
        <meshBasicMaterial color="#334455" wireframe />
      </Sphere>
      
      {/* Geodesics (great circles) */}
      <GeodesicOnSphere color="#00ffff" phase={0} tilt={0} />
      <GeodesicOnSphere color="#00ff88" phase={Math.PI / 3} tilt={Math.PI / 4} />
      <GeodesicOnSphere color="#88ff00" phase={Math.PI / 2} tilt={Math.PI / 2} />
      
      {/* Non-geodesic latitude circles */}
      <LatitudeCircle lat={45} color="#ff6600" />
      <LatitudeCircle lat={-30} color="#ff3366" />
      
      {/* Traveling point */}
      <TravelingPoint tilt={Math.PI / 4} color="#ffff00" />
      
      <OrbitControls enableZoom={true} enablePan={false} />
    </>
  );
}

export default function GeodesicViz() {
  return (
    <div className="w-full h-80 bg-slate-900 rounded-xl overflow-hidden">
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
          <div className="w-4 h-1 bg-cyan-400 rounded"></div>
          <span className="text-slate-300">大圆/测地线 (Geodesics)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-1 bg-orange-500 rounded border-dashed"></div>
          <span className="text-slate-300">纬线圈 (Latitude - not geodesic)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
          <span className="text-slate-300">沿测地线移动的点</span>
        </div>
      </div>
    </div>
  );
}
