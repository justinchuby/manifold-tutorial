import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Suspense } from 'react';
import type { ReactNode } from 'react';

interface ThreeCanvasProps {
  children: ReactNode;
  className?: string;
  cameraPosition?: [number, number, number];
}

export default function ThreeCanvas({
  children,
  className = 'w-full h-96 rounded-lg overflow-hidden',
  cameraPosition = [3, 3, 3],
}: ThreeCanvasProps) {
  return (
    <div className={className}>
      <Canvas>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={cameraPosition} />
          <OrbitControls enableDamping dampingFactor={0.05} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          {children}
        </Suspense>
      </Canvas>
    </div>
  );
}
