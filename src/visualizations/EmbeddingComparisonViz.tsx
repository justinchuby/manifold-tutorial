import { useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Line, Text } from '@react-three/drei';
import * as THREE from 'three';
import { useTranslation } from 'react-i18next';
import { VIZ_CLASSES, VIZ_COLORS } from './theme';

// Circle geometry helper
function createCirclePoints(radius: number, segments: number = 64): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
  for (let i = 0; i <= segments; i++) {
    const theta = (i / segments) * Math.PI * 2;
    points.push(new THREE.Vector3(
      radius * Math.cos(theta),
      radius * Math.sin(theta),
      0
    ));
  }
  return points;
}

// Flat embedding - circle in xy-plane
function FlatEmbedding({ showNormal, animating }: { showNormal: boolean; animating: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const normalRef = useRef<THREE.Group>(null);
  const [pointAngle, setPointAngle] = useState(0);

  useFrame((_, delta) => {
    if (animating && normalRef.current) {
      setPointAngle(prev => (prev + delta * 0.5) % (Math.PI * 2));
    }
  });

  const circlePoints = useMemo(() => createCirclePoints(1), []);
  const pointOnCircle = useMemo(
    () => new THREE.Vector3(Math.cos(pointAngle), Math.sin(pointAngle), 0),
    [pointAngle]
  );

  // Normal section plane (contains the point, tangent direction, and normal)
  // For flat embedding, normal is always z-axis
  const tangent = useMemo(
    () => new THREE.Vector3(-Math.sin(pointAngle), Math.cos(pointAngle), 0),
    [pointAngle]
  );
  const normal = useMemo(() => new THREE.Vector3(0, 0, 1), []);

  // Create normal section plane geometry (spanned by tangent and normal)
  const planeGeometry = useMemo(() => {
    const u = tangent.clone().normalize();
    const n = normal.clone().normalize();
    const size = 0.6;
    const center = pointOnCircle.clone();

    const vertices = new Float32Array([
      ...center.clone().add(u.clone().multiplyScalar(size)).add(n.clone().multiplyScalar(size)).toArray(),
      ...center.clone().add(u.clone().multiplyScalar(-size)).add(n.clone().multiplyScalar(size)).toArray(),
      ...center.clone().add(u.clone().multiplyScalar(-size)).add(n.clone().multiplyScalar(-size)).toArray(),
      ...center.clone().add(u.clone().multiplyScalar(size)).add(n.clone().multiplyScalar(-size)).toArray(),
    ]);
    const indices = new Uint16Array([0, 1, 2, 0, 2, 3]);

    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geom.setIndex(new THREE.BufferAttribute(indices, 1));
    return geom;
  }, [pointOnCircle, tangent, normal]);

  return (
    <group ref={groupRef} position={[-2.5, 0, 0]}>
      {/* Circle */}
      <Line points={circlePoints} color={VIZ_COLORS.geodesic} lineWidth={3} />

      {/* xy-plane (faded) */}
      <mesh rotation={[0, 0, 0]} position={[0, 0, -0.01]}>
        <planeGeometry args={[3, 3]} />
        <meshBasicMaterial color={VIZ_COLORS.plane} transparent opacity={0.22} side={THREE.DoubleSide} />
      </mesh>

      {/* Point on circle */}
      <mesh position={pointOnCircle}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color={VIZ_COLORS.point} />
      </mesh>

      {showNormal && (
        <group ref={normalRef}>
          {/* Normal vector (z-direction) */}
          <Line
            points={[pointOnCircle, pointOnCircle.clone().add(normal.clone().multiplyScalar(0.8))]}
            color={VIZ_COLORS.normalSection}
            lineWidth={4}
          />

          {/* Normal section plane - spanned by tangent and normal */}
          <mesh geometry={planeGeometry}>
            <meshBasicMaterial color={VIZ_COLORS.normalSection} transparent opacity={0.18} side={THREE.DoubleSide} />
          </mesh>

          {/* Tangent vector */}
          <Line
            points={[pointOnCircle, pointOnCircle.clone().add(tangent.clone().multiplyScalar(0.6))]}
            color={VIZ_COLORS.tangent}
            lineWidth={3}
          />
        </group>
      )}

      {/* Label */}
      <Text position={[0, -1.8, 0]} fontSize={0.25} color={VIZ_COLORS.inkText}>
        Flat (xy-plane)
      </Text>
      <Text position={[0, -2.1, 0]} fontSize={0.18} color={VIZ_COLORS.mutedText}>
        Normal = z-axis
      </Text>
    </group>
  );
}

// Tilted embedding - same circle but tilted 45 degrees
function TiltedEmbedding({ showNormal, animating }: { showNormal: boolean; animating: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const [pointAngle, setPointAngle] = useState(0);

  useFrame((_, delta) => {
    if (animating) {
      setPointAngle(prev => (prev + delta * 0.5) % (Math.PI * 2));
    }
  });

  const circlePoints = useMemo(() => createCirclePoints(1), []);

  // Apply tilt transformation
  const tiltAngle = Math.PI / 4; // 45 degrees
  const tiltMatrix = useMemo(() => new THREE.Matrix4().makeRotationX(tiltAngle), [tiltAngle]);
  const tiltedCirclePoints = useMemo(
    () => circlePoints.map(p => p.clone().applyMatrix4(tiltMatrix)),
    [circlePoints, tiltMatrix]
  );

  const pointOnCircle = useMemo(
    () => new THREE.Vector3(Math.cos(pointAngle), Math.sin(pointAngle), 0).applyMatrix4(tiltMatrix),
    [pointAngle, tiltMatrix]
  );

  // Tangent and normal in tilted frame
  const tangent = useMemo(
    () => new THREE.Vector3(-Math.sin(pointAngle), Math.cos(pointAngle), 0).applyMatrix4(tiltMatrix),
    [pointAngle, tiltMatrix]
  );
  // Normal to tilted plane
  const normal = useMemo(
    () => new THREE.Vector3(0, -Math.sin(tiltAngle), Math.cos(tiltAngle)),
    [tiltAngle]
  );

  // Create normal section plane geometry (spanned by tangent and normal)
  const planeGeometry = useMemo(() => {
    const u = tangent.clone().normalize();
    const n = normal.clone().normalize();
    const size = 0.6;
    const center = pointOnCircle.clone();

    const vertices = new Float32Array([
      ...center.clone().add(u.clone().multiplyScalar(size)).add(n.clone().multiplyScalar(size)).toArray(),
      ...center.clone().add(u.clone().multiplyScalar(-size)).add(n.clone().multiplyScalar(size)).toArray(),
      ...center.clone().add(u.clone().multiplyScalar(-size)).add(n.clone().multiplyScalar(-size)).toArray(),
      ...center.clone().add(u.clone().multiplyScalar(size)).add(n.clone().multiplyScalar(-size)).toArray(),
    ]);
    const indices = new Uint16Array([0, 1, 2, 0, 2, 3]);

    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geom.setIndex(new THREE.BufferAttribute(indices, 1));
    return geom;
  }, [pointOnCircle, tangent, normal]);

  return (
    <group ref={groupRef} position={[2.5, 0, 0]}>
      {/* Tilted circle */}
      <Line points={tiltedCirclePoints} color={VIZ_COLORS.geodesic} lineWidth={3} />

      {/* Tilted plane (faded) */}
      <mesh rotation={[tiltAngle, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[3, 3]} />
        <meshBasicMaterial color={VIZ_COLORS.plane} transparent opacity={0.22} side={THREE.DoubleSide} />
      </mesh>

      {/* Point on circle */}
      <mesh position={pointOnCircle}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color={VIZ_COLORS.point} />
      </mesh>

      {showNormal && (
        <group>
          {/* Normal vector (tilted) */}
          <Line
            points={[pointOnCircle, pointOnCircle.clone().add(normal.clone().multiplyScalar(0.8))]}
            color={VIZ_COLORS.accentBlue}
            lineWidth={4}
          />

          {/* Normal section plane - spanned by tangent and normal */}
          <mesh geometry={planeGeometry}>
            <meshBasicMaterial color={VIZ_COLORS.accentBlue} transparent opacity={0.18} side={THREE.DoubleSide} />
          </mesh>

          {/* Tangent vector */}
          <Line
            points={[pointOnCircle, pointOnCircle.clone().add(tangent.clone().multiplyScalar(0.6))]}
            color={VIZ_COLORS.tangent}
            lineWidth={3}
          />
        </group>
      )}

      {/* Label */}
      <Text position={[0, -1.8, 0]} fontSize={0.25} color={VIZ_COLORS.inkText}>
        Tilted (45°)
      </Text>
      <Text position={[0, -2.1, 0]} fontSize={0.18} color={VIZ_COLORS.mutedText}>
        Normal = tilted
      </Text>
    </group>
  );
}

function Scene({ showNormal, animating }: { showNormal: boolean; animating: boolean }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />

      <FlatEmbedding showNormal={showNormal} animating={animating} />
      <TiltedEmbedding showNormal={showNormal} animating={animating} />

      {/* Axes helper */}
      <group position={[0, -2.5, 0]}>
        <Line points={[[0, 0, 0], [0.5, 0, 0]]} color={VIZ_COLORS.normalSection} lineWidth={2} />
        <Line points={[[0, 0, 0], [0, 0.5, 0]]} color={VIZ_COLORS.tangent} lineWidth={2} />
        <Line points={[[0, 0, 0], [0, 0, 0.5]]} color={VIZ_COLORS.accentBlue} lineWidth={2} />
        <Text position={[0.6, 0, 0]} fontSize={0.15} color={VIZ_COLORS.normalSection}>x</Text>
        <Text position={[0, 0.6, 0]} fontSize={0.15} color={VIZ_COLORS.tangent}>y</Text>
        <Text position={[0, 0, 0.6]} fontSize={0.15} color={VIZ_COLORS.accentBlue}>z</Text>
      </group>

      <OrbitControls enableZoom={true} enablePan={false} />
    </>
  );
}

export default function EmbeddingComparisonViz() {
  const { i18n } = useTranslation();
  const isZh = i18n.language === 'zh';
  const [showNormal, setShowNormal] = useState(true);
  const [animating, setAnimating] = useState(true);

  return (
    <div className={VIZ_CLASSES.panel}>
      <div className={`h-80 ${VIZ_CLASSES.canvas}`}>
        <Canvas camera={{ position: [0, 2, 6], fov: 50 }}>
          <Scene showNormal={showNormal} animating={animating} />
        </Canvas>
      </div>

      <div className="mt-4 flex flex-wrap gap-3 justify-center">
        <button
          onClick={() => setShowNormal(!showNormal)}
          className={`px-3 py-1.5 rounded text-sm transition-colors ${
            showNormal ? 'bg-teal-700 text-white' : 'bg-white/50 text-stone-700 border border-amber-900/20'
          }`}
        >{isZh ? '显示法向量' : 'Show Normals'}
        </button>
        <button
          onClick={() => setAnimating(!animating)}
          className={`px-3 py-1.5 rounded text-sm transition-colors ${
            animating ? 'bg-emerald-700 text-white' : 'bg-white/50 text-stone-700 border border-amber-900/20'
          }`}
        >
          {animating ? (isZh ? '暂停' : 'Pause') : (isZh ? '播放' : 'Play')}
        </button>
      </div>

      <div className="mt-4 grid md:grid-cols-2 gap-3 text-sm">
        <div className="rounded-xl border border-amber-900/10 bg-white/45 p-3">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-3 h-3 bg-[#c75f52] rounded-full"></div>
            <span className="text-rose-800 font-semibold">{isZh ? '左：平面嵌入' : 'Left: Flat Embedding'}</span>
          </div>
          <p className="text-stone-600 text-xs">{isZh ? '法向量始终指向z轴方向' : 'Normal vector always points in z-direction'}
          </p>
        </div>
        <div className="rounded-xl border border-amber-900/10 bg-white/45 p-3">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-3 h-3 bg-[#456f86] rounded-full"></div>
            <span className="text-teal-800 font-semibold">{isZh ? '右：倾斜嵌入' : 'Right: Tilted Embedding'}</span>
          </div>
          <p className="text-stone-600 text-xs">{isZh ? '法向量指向倾斜平面的垂直方向' : 'Normal vector perpendicular to tilted plane'}
          </p>
        </div>
      </div>

      <p className="text-center text-stone-500 text-xs mt-3">{isZh
          ? '同一个圆，不同的嵌入方式 → 不同的法空间 → 不同的法截线！'
          : 'Same circle, different embeddings → different normal spaces → different normal sections!'}
      </p>
    </div>
  );
}

// With labels wrapper
export function EmbeddingComparisonVizWithLabels() {
  const { i18n } = useTranslation();
  const isZh = i18n.language === 'zh';

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-semibold text-teal-800">{isZh ? '可视化：同一流形的不同嵌入' : 'Visualization: Same Manifold, Different Embeddings'}
        </h3>
      </div>
      <EmbeddingComparisonViz />
    </div>
  );
}
