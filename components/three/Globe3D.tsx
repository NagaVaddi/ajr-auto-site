'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function WireGlobe() {
  const outerRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock, mouse }) => {
    if (outerRef.current) {
      outerRef.current.rotation.y = clock.getElapsedTime() * 0.1;
      outerRef.current.rotation.x += (mouse.y * 0.2 - outerRef.current.rotation.x) * 0.03;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = -clock.getElapsedTime() * 0.07;
      innerRef.current.rotation.z = clock.getElapsedTime() * 0.03;
    }
    if (ringRef.current) {
      ringRef.current.rotation.x = Math.PI / 3;
      ringRef.current.rotation.y = clock.getElapsedTime() * 0.15;
    }
  });

  return (
    <group>
      <mesh ref={outerRef}>
        <sphereGeometry args={[2.6, 48, 48]} />
        <meshBasicMaterial color="#E60012" wireframe transparent opacity={0.10} />
      </mesh>
      <mesh ref={innerRef}>
        <sphereGeometry args={[1.8, 24, 24]} />
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.04} />
      </mesh>
      <mesh ref={ringRef}>
        <torusGeometry args={[3.2, 0.015, 2, 120]} />
        <meshBasicMaterial color="#E60012" transparent opacity={0.25} />
      </mesh>
      <mesh rotation={[Math.PI / 2.5, 0, 0]}>
        <torusGeometry args={[2.4, 0.01, 2, 80]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.08} />
      </mesh>
    </group>
  );
}

export default function Globe3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7.5], fov: 45 }}
      gl={{ alpha: true, antialias: true }}
      style={{ background: 'transparent' }}
    >
      <WireGlobe />
    </Canvas>
  );
}
