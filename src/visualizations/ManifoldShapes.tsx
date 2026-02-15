import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Torus } from '@react-three/drei';
import * as THREE from 'three';
import type { Mesh } from 'three';

export function RotatingSphere({ position = [0, 0, 0] as [number, number, number] }) {
  const ref = useRef<Mesh>(null);
  
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <Sphere ref={ref} args={[1, 64, 64]} position={position}>
      <meshStandardMaterial color="#06b6d4" wireframe />
    </Sphere>
  );
}

export function RotatingTorus({ position = [0, 0, 0] as [number, number, number] }) {
  const ref = useRef<Mesh>(null);
  
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.2;
      ref.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <Torus ref={ref} args={[1, 0.4, 32, 64]} position={position}>
      <meshStandardMaterial color="#8b5cf6" wireframe />
    </Torus>
  );
}

export function RotatingKleinBottle({ position = [0, 0, 0] as [number, number, number] }) {
  const ref = useRef<Mesh>(null);
  
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.15;
      ref.current.rotation.y += delta * 0.25;
    }
  });

  // Create Klein bottle geometry using figure-8 immersion
  const geometry = useMemo(() => {
    const segments = 64;
    const tubeSegments = 32;
    const vertices: number[] = [];
    const indices: number[] = [];
    
    // Figure-8 Klein bottle parametrization (immersion in R³)
    for (let i = 0; i <= segments; i++) {
      const u = (i / segments) * Math.PI * 2;
      for (let j = 0; j <= tubeSegments; j++) {
        const v = (j / tubeSegments) * Math.PI * 2;
        
        // Figure-8 Klein bottle equations
        const r = 1;
        const a = 0.3;
        
        // Standard figure-8 immersion
        const x = (r + a * Math.cos(v / 2) * Math.sin(u) - a * Math.sin(v / 2) * Math.sin(2 * u)) * Math.cos(u);
        const y = (r + a * Math.cos(v / 2) * Math.sin(u) - a * Math.sin(v / 2) * Math.sin(2 * u)) * Math.sin(u);
        const z = a * Math.sin(v / 2) * Math.sin(u) + a * Math.cos(v / 2) * Math.sin(2 * u);
        
        vertices.push(x, y, z);
      }
    }
    
    // Create indices for triangles
    for (let i = 0; i < segments; i++) {
      for (let j = 0; j < tubeSegments; j++) {
        const a = i * (tubeSegments + 1) + j;
        const b = a + 1;
        const c = (i + 1) * (tubeSegments + 1) + j;
        const d = c + 1;
        
        indices.push(a, b, c);
        indices.push(b, d, c);
      }
    }
    
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geom.setIndex(indices);
    geom.computeVertexNormals();
    return geom;
  }, []);

  return (
    <mesh ref={ref} geometry={geometry} position={position}>
      <meshStandardMaterial color="#f59e0b" wireframe side={THREE.DoubleSide} />
    </mesh>
  );
}

export function MobiusStrip({ position = [0, 0, 0] as [number, number, number] }) {
  const ref = useRef<Mesh>(null);
  
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.3;
    }
  });

  // Create Möbius strip geometry using parametric equations
  const geometry = useMemo(() => {
    const segments = 64;
    const widthSegments = 16;
    const vertices: number[] = [];
    const indices: number[] = [];
    
    const R = 1; // Major radius
    const w = 0.4; // Half-width of strip
    
    for (let i = 0; i <= segments; i++) {
      const u = (i / segments) * Math.PI * 2; // 0 to 2π
      for (let j = 0; j <= widthSegments; j++) {
        const s = (j / widthSegments) * 2 - 1; // -1 to 1 (across width)
        
        // Möbius strip parametric equations
        // x = (R + s * cos(u/2)) * cos(u)
        // y = (R + s * cos(u/2)) * sin(u)
        // z = s * sin(u/2)
        const x = (R + s * w * Math.cos(u / 2)) * Math.cos(u);
        const y = (R + s * w * Math.cos(u / 2)) * Math.sin(u);
        const z = s * w * Math.sin(u / 2);
        
        vertices.push(x, y, z);
      }
    }
    
    // Create indices for triangles
    for (let i = 0; i < segments; i++) {
      for (let j = 0; j < widthSegments; j++) {
        const a = i * (widthSegments + 1) + j;
        const b = a + 1;
        const c = (i + 1) * (widthSegments + 1) + j;
        const d = c + 1;
        
        indices.push(a, b, c);
        indices.push(b, d, c);
      }
    }
    
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geom.setIndex(indices);
    geom.computeVertexNormals();
    return geom;
  }, []);

  return (
    <mesh ref={ref} geometry={geometry} position={position}>
      <meshStandardMaterial color="#10b981" wireframe side={THREE.DoubleSide} />
    </mesh>
  );
}

// Tangent space visualization
export function TangentPlane({ 
  position = [0, 0, 0] as [number, number, number],
  normal = [0, 1, 0] as [number, number, number]
}) {
  return (
    <group position={position}>
      {/* Tangent plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.5, 1.5]} />
        <meshStandardMaterial color="#06b6d4" opacity={0.3} transparent side={2} />
      </mesh>
      {/* Normal vector */}
      <arrowHelper args={[
        { x: normal[0], y: normal[1], z: normal[2] } as any,
        { x: 0, y: 0, z: 0 } as any,
        0.8,
        0xff6b6b
      ]} />
    </group>
  );
}
