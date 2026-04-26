import { useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Line } from '@react-three/drei';
import * as THREE from 'three';
import { VIZ_CLASSES, VIZ_COLORS } from './theme';

const COLORS = {
  curve: VIZ_COLORS.geodesic,
  comparison: VIZ_COLORS.comparison,
  tangent: VIZ_COLORS.normalSection,
  normal: VIZ_COLORS.tangent,
  binormal: VIZ_COLORS.accentBlue,
  point: VIZ_COLORS.point,
};

// Helix curve with torsion
function HelixCurve({ 
  radius = 0.5, 
  pitch = 0.3, 
  turns = 3,
  color = COLORS.curve
}: { 
  radius?: number; 
  pitch?: number; 
  turns?: number;
  color?: string;
}) {
  const points = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const segments = turns * 50;
    for (let i = 0; i <= segments; i++) {
      const t = (i / segments) * turns * Math.PI * 2;
      pts.push(new THREE.Vector3(
        radius * Math.cos(t),
        radius * Math.sin(t),
        pitch * t
      ));
    }
    return pts;
  }, [radius, pitch, turns]);

  return <Line points={points} color={color} lineWidth={4} />;
}

// Plane curve (no torsion)
function PlaneCurve({ color = COLORS.comparison }: { color?: string }) {
  const points = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 100; i++) {
      const t = (i / 100) * Math.PI * 2;
      // Sine wave in a plane
      pts.push(new THREE.Vector3(t - Math.PI, Math.sin(t * 2) * 0.5, 0));
    }
    return pts;
  }, []);

  return <Line points={points} color={color} lineWidth={4} />;
}

// Frenet frame (T, N, B) visualization
function FrenetFrame({ 
  position, 
  tangent, 
  normal, 
  binormal 
}: { 
  position: THREE.Vector3;
  tangent: THREE.Vector3;
  normal: THREE.Vector3;
  binormal: THREE.Vector3;
}) {
  const len = 0.3;
  
  return (
    <>
      {/* Tangent (red) */}
      <Line 
        points={[position, position.clone().add(tangent.clone().multiplyScalar(len))]} 
        color={COLORS.tangent} 
        lineWidth={3} 
      />
      {/* Normal (green) */}
      <Line 
        points={[position, position.clone().add(normal.clone().multiplyScalar(len))]} 
        color={COLORS.normal} 
        lineWidth={3} 
      />
      {/* Binormal (blue) */}
      <Line 
        points={[position, position.clone().add(binormal.clone().multiplyScalar(len))]} 
        color={COLORS.binormal} 
        lineWidth={3} 
      />
    </>
  );
}

function TorsionScene() {
  const [time, setTime] = useState(0);
  
  useFrame(({ clock }) => {
    setTime(clock.getElapsedTime());
  });

  // Animate position along helix
  const t = (time * 0.5) % (3 * Math.PI * 2);
  const radius = 0.5;
  const pitch = 0.3;
  
  const position = new THREE.Vector3(
    radius * Math.cos(t),
    radius * Math.sin(t),
    pitch * t
  );
  
  // Frenet frame for helix
  const tangent = new THREE.Vector3(
    -radius * Math.sin(t),
    radius * Math.cos(t),
    pitch
  ).normalize();
  
  const ddot = new THREE.Vector3(
    -radius * Math.cos(t),
    -radius * Math.sin(t),
    0
  );
  
  const normal = ddot.clone().normalize();
  const binormal = new THREE.Vector3().crossVectors(tangent, normal);

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      
      {/* Helix curve */}
      <HelixCurve radius={radius} pitch={pitch} turns={3} />
      
      {/* Moving point */}
      <mesh position={position}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color={COLORS.point} emissive={COLORS.point} emissiveIntensity={0.65} />
      </mesh>
      
      {/* Frenet frame */}
      <FrenetFrame 
        position={position}
        tangent={tangent}
        normal={normal}
        binormal={binormal}
      />
      
      {/* Osculating plane indicator */}
      <group position={position}>
        {(() => {
          const size = 0.25;
          const pts = [
            position.clone().add(tangent.clone().multiplyScalar(size)).add(normal.clone().multiplyScalar(size)),
            position.clone().add(tangent.clone().multiplyScalar(-size)).add(normal.clone().multiplyScalar(size)),
            position.clone().add(tangent.clone().multiplyScalar(-size)).add(normal.clone().multiplyScalar(-size)),
            position.clone().add(tangent.clone().multiplyScalar(size)).add(normal.clone().multiplyScalar(-size)),
            position.clone().add(tangent.clone().multiplyScalar(size)).add(normal.clone().multiplyScalar(size)),
          ];
          return <Line points={pts} color={VIZ_COLORS.point} lineWidth={1} />;
        })()}
      </group>
      
      <OrbitControls enableZoom={true} enablePan={false} />
    </>
  );
}

function PlanarCurveScene() {
  const [time, setTime] = useState(0);
  
  useFrame(({ clock }) => {
    setTime(clock.getElapsedTime());
  });

  const t = ((time * 0.3) % 1) * Math.PI * 2;
  const position = new THREE.Vector3(t - Math.PI, Math.sin(t * 2) * 0.5, 0);
  
  // For planar curve, binormal is constant
  const tangent = new THREE.Vector3(1, Math.cos(t * 2), 0).normalize();
  const binormal = new THREE.Vector3(0, 0, 1);
  const normal = new THREE.Vector3().crossVectors(binormal, tangent);

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      
      {/* Plane curve */}
      <PlaneCurve />
      
      {/* XY plane indicator */}
      {(() => {
        const pts = [
          new THREE.Vector3(-4, -1, 0),
          new THREE.Vector3(4, -1, 0),
          new THREE.Vector3(4, 1, 0),
          new THREE.Vector3(-4, 1, 0),
          new THREE.Vector3(-4, -1, 0),
        ];
        return <Line points={pts} color={VIZ_COLORS.plane} lineWidth={1} />;
      })()}
      
      {/* Moving point */}
      <mesh position={position}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color={COLORS.point} emissive={COLORS.point} emissiveIntensity={0.65} />
      </mesh>
      
      {/* Frenet frame */}
      <FrenetFrame 
        position={position}
        tangent={tangent}
        normal={normal}
        binormal={binormal}
      />
      
      <OrbitControls enableZoom={true} enablePan={false} />
    </>
  );
}

export function TorsionViz() {
  return (
    <div className={`w-full h-64 ${VIZ_CLASSES.canvas}`}>
      <Canvas camera={{ position: [3, 2, 3], fov: 45 }}>
        <TorsionScene />
      </Canvas>
    </div>
  );
}

export function PlanarCurveViz() {
  return (
    <div className={`w-full h-64 ${VIZ_CLASSES.canvas}`}>
      <Canvas camera={{ position: [0, 3, 5], fov: 45 }}>
        <PlanarCurveScene />
      </Canvas>
    </div>
  );
}

export function TorsionComparisonViz() {
  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <p className="text-teal-800 font-semibold text-center mb-2">
            螺旋线 (τ ≠ 0)
          </p>
          <TorsionViz />
          <p className="text-stone-600 text-xs text-center mt-2">
            Frenet标架不断"翻滚"，挠率τ恒定
          </p>
        </div>
        <div>
          <p className="text-amber-800 font-semibold text-center mb-2">
            平面曲线 (τ = 0)
          </p>
          <PlanarCurveViz />
          <p className="text-stone-600 text-xs text-center mt-2">
            副法向量B保持不变，τ = 0
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 text-sm justify-center">
        <div className="flex items-center gap-2">
          <div className="w-4 h-1 rounded bg-[#c75f52]"></div>
          <span className="text-stone-700">T 切向量</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-1 rounded bg-[#0f8f71]"></div>
          <span className="text-stone-700">N 主法向量</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-1 rounded bg-[#456f86]"></div>
          <span className="text-stone-700">B 副法向量</span>
        </div>
      </div>
    </div>
  );
}
