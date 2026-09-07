'use client';

import * as THREE from 'three';
import React, { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

export function EarthModel(props: React.ComponentProps<'group'>) {
  const { scene } = useGLTF('/models/earth.glb');
  const groupRef = useRef<THREE.Group>(null!);
  const mouseTarget = useRef({ x: 0, y: 0 });
  const currentRotation = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Enhance materials: Glowing night city lights on dark side
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.material) {
          const mat = mesh.material as THREE.MeshStandardMaterial;
          if (mat.name === 'phong1' || mat.emissiveMap) {
            mat.emissiveIntensity = 3.8; // High contrast night lights
            mat.toneMapped = true;
          }
        }
      }
    });

    // Global window pointer listener ensures mouse movement is detected everywhere on the screen
    const handlePointerMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseTarget.current = { x, y };
    };

    window.addEventListener('mousemove', handlePointerMove);
    return () => window.removeEventListener('mousemove', handlePointerMove);
  }, [scene]);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      // 1. Constant spin speed unaffected by mouse movement
      const constantSpin = clock.getElapsedTime() * 0.22;

      // 2. Sweet-spot sensitivity: clear responsive tilt with smooth inertia
      currentRotation.current.x = THREE.MathUtils.lerp(
        currentRotation.current.x,
        mouseTarget.current.x * 0.75, // Responsive horizontal range
        0.05
      );
      currentRotation.current.y = THREE.MathUtils.lerp(
        currentRotation.current.y,
        mouseTarget.current.y * 0.5, // Responsive vertical range
        0.05
      );

      // Apply constant spin + sweet-spot mouse angular steering
      groupRef.current.rotation.y = constantSpin + currentRotation.current.x;
      groupRef.current.rotation.x = 0.35 + currentRotation.current.y;
    }
  });

  return (
    <group {...props} dispose={null}>
      <group ref={groupRef} rotation={[0.35, 0, 0]}>
        {/* Compact scale 0.028 for refined corner arc */}
        <primitive object={scene} scale={0.028} />
      </group>
    </group>
  );
}

useGLTF.preload('/models/earth.glb');
