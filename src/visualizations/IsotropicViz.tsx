import { useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Line, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { VIZ_CLASSES, VIZ_COLORS } from './theme';

const COLORS = {
  isotropic: VIZ_COLORS.geodesic,
  comparison: VIZ_COLORS.comparison,
  tangent: VIZ_COLORS.tangent,
  point: VIZ_COLORS.point,
  surface: VIZ_COLORS.surface,
};

// Isotropic visualization - h(u,u) has same length in all directions
function IsotropicScene() {
  const [time, setTime] = useState(0);
  
  useFrame(({ clock }) => {
    setTime(clock.getElapsedTime());
  });

  // On a sphere, h(u,u) has same magnitude in all directions
  const numArrows = 8;
  const arrows = useMemo(() => {
    const result: { start: THREE.Vector3; end: THREE.Vector3 }[] = [];
    const point = new THREE.Vector3(0, 0, 1);
    const normal = point.clone().normalize();
    
    for (let i = 0; i < numArrows; i++) {
      const angle = (i / numArrows) * Math.PI * 2;
      // Direction in tangent plane (used to show the direction, not the value)
      const _u = new THREE.Vector3(Math.cos(angle), Math.sin(angle), 0);
      void _u; // Direction indicator
      // h(u,u) points along normal with constant magnitude (for sphere)
      const huu = normal.clone().multiplyScalar(0.3);
      result.push({
        start: point.clone(),
        end: point.clone().add(huu)
      });
    }
    return result;
  }, []);

  // Animate rotation to show all directions
  const rotationAngle = time * 0.3;

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      
      {/* Sphere (isotropic example) */}
      <Sphere args={[1, 32, 32]}>
        <meshStandardMaterial
          color={COLORS.surface}
          emissive={VIZ_COLORS.surfaceDeep}
          emissiveIntensity={0.06}
          transparent
          opacity={0.42}
          roughness={0.74}
          metalness={0.02}
          side={THREE.DoubleSide}
        />
      </Sphere>
      <Sphere args={[1.001, 16, 16]}>
        <meshBasicMaterial color={VIZ_COLORS.surfaceWire} wireframe transparent opacity={0.62} />
      </Sphere>
      
      {/* Point at top */}
      <mesh position={[0, 0, 1]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color={COLORS.point} emissive={COLORS.point} emissiveIntensity={0.65} />
      </mesh>
      
      {/* h(u,u) arrows - all same length (isotropic) */}
      {arrows.map((arrow, idx) => (
        <Line 
          key={idx} 
          points={[arrow.start, arrow.end]} 
          color={COLORS.isotropic} 
          lineWidth={3}
        />
      ))}
      
      {/* Rotating direction indicator */}
      <group rotation={[0, 0, rotationAngle]}>
        <Line 
          points={[
            new THREE.Vector3(0, 0, 1),
            new THREE.Vector3(0.5, 0, 1)
          ]} 
          color={COLORS.tangent} 
          lineWidth={4}
        />
      </group>
      
      {/* Circle showing |h(u,u)| = const */}
      <group position={[0, 0, 1.3]}>
        {(() => {
          const pts: THREE.Vector3[] = [];
          for (let i = 0; i <= 32; i++) {
            const a = (i / 32) * Math.PI * 2;
            pts.push(new THREE.Vector3(0.15 * Math.cos(a), 0.15 * Math.sin(a), 0));
          }
          return <Line points={pts} color={COLORS.isotropic} lineWidth={2} />;
        })()}
      </group>
      
      <OrbitControls enableZoom={true} enablePan={false} />
    </>
  );
}

// Non-isotropic (ellipsoid) - h(u,u) varies with direction
function NonIsotropicScene() {
  const [, setTime] = useState(0);
  
  useFrame(({ clock }) => {
    setTime(clock.getElapsedTime());
  });

  // Ellipsoid shape
  const ellipsoidPoints = useMemo(() => {
    const pts: THREE.Vector3[][] = [];
    for (let i = 0; i <= 16; i++) {
      const row: THREE.Vector3[] = [];
      const phi = (i / 16) * Math.PI;
      for (let j = 0; j <= 32; j++) {
        const theta = (j / 32) * Math.PI * 2;
        // Ellipsoid with different radii
        row.push(new THREE.Vector3(
          0.5 * Math.sin(phi) * Math.cos(theta),
          1.0 * Math.sin(phi) * Math.sin(theta),
          0.8 * Math.cos(phi)
        ));
      }
      pts.push(row);
    }
    return pts;
  }, []);

  // h(u,u) arrows at top - different lengths in different directions
  const arrows = useMemo(() => {
    const result: { start: THREE.Vector3; end: THREE.Vector3; length: number }[] = [];
    const point = new THREE.Vector3(0, 0, 0.8);
    
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      // Curvature varies with direction on ellipsoid
      const curvatureX = 1.6; // High curvature in x
      const curvatureY = 0.8; // Lower in y
      const curvature = curvatureX * Math.cos(angle) * Math.cos(angle) + 
                        curvatureY * Math.sin(angle) * Math.sin(angle);
      const length = 0.15 + 0.15 * curvature;
      const huu = new THREE.Vector3(0, 0, length);
      result.push({
        start: point.clone(),
        end: point.clone().add(huu),
        length
      });
    }
    return result;
  }, []);

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      
      {/* Ellipsoid wireframe */}
      {ellipsoidPoints.map((row, i) => (
        <Line key={`row-${i}`} points={row} color={VIZ_COLORS.comparison} lineWidth={1} transparent opacity={0.58} />
      ))}
      
      {/* Point at top */}
      <mesh position={[0, 0, 0.8]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color={COLORS.point} emissive={COLORS.point} emissiveIntensity={0.65} />
      </mesh>
      
      {/* h(u,u) arrows - different lengths (non-isotropic) */}
      {arrows.map((arrow, idx) => (
        <Line 
          key={idx} 
          points={[arrow.start, arrow.end]} 
          color={COLORS.comparison} 
          lineWidth={3}
        />
      ))}
      
      {/* Ellipse showing |h(u,u)| varies */}
      <group position={[0, 0, 1.1]}>
        {(() => {
          const pts: THREE.Vector3[] = [];
          for (let i = 0; i <= 32; i++) {
            const a = (i / 32) * Math.PI * 2;
            pts.push(new THREE.Vector3(0.2 * Math.cos(a), 0.1 * Math.sin(a), 0));
          }
          return <Line points={pts} color={COLORS.comparison} lineWidth={2} />;
        })()}
      </group>
      
      <OrbitControls enableZoom={true} enablePan={false} />
    </>
  );
}

export function IsotropicViz() {
  return (
    <div className={`w-full h-64 ${VIZ_CLASSES.canvas}`}>
      <Canvas camera={{ position: [2, 2, 2.5], fov: 45 }}>
        <IsotropicScene />
      </Canvas>
    </div>
  );
}

export function NonIsotropicViz() {
  return (
    <div className={`w-full h-64 ${VIZ_CLASSES.canvas}`}>
      <Canvas camera={{ position: [2, 2, 2], fov: 45 }}>
        <NonIsotropicScene />
      </Canvas>
    </div>
  );
}

export function IsotropyComparisonViz() {
  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <p className="text-teal-800 font-semibold text-center mb-2">
            各向同性 (Isotropic) - c# ≥ 3
          </p>
          <IsotropicViz />
          <p className="text-stone-600 text-xs text-center mt-2">
            球面：|h(u,u)| 在所有方向相同
          </p>
        </div>
        <div>
          <p className="text-amber-800 font-semibold text-center mb-2">
            非各向同性 (Non-isotropic) - c# = 2
          </p>
          <NonIsotropicViz />
          <p className="text-stone-600 text-xs text-center mt-2">
            椭球：|h(u,u)| 随方向变化
          </p>
        </div>
      </div>
      <div className={`${VIZ_CLASSES.panel} text-sm`}>
        <p className="text-teal-800 font-semibold mb-2">核心定理</p>
        <p className="text-stone-700">
          c#(M) ≥ 3 ⟺ M 是各向同性的 ⟺ |h(u,u)| 与方向 u 无关
        </p>
      </div>
    </div>
  );
}
