'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { EarthModel } from './EarthModel';

export default function HeroScene() {
  return (
    <div className="w-full h-full absolute inset-0 overflow-hidden pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5.0], fov: 45 }}
        className="w-full h-full"
      >
        {/* Zero ambient for pitch black deep shadow */}
        <ambientLight intensity={0.003} />

        {/* Primary Sunlight on the top-right day side */}
        <directionalLight position={[9, 5, 5]} intensity={5.0} color="#fffef7" />

        {/* Earth fixed at bottom-right corner [2.0, -0.9, 0], reacting to global mouse movement */}
        <Suspense fallback={null}>
          <EarthModel position={[2.0, -0.9, 0]} />
        </Suspense>
      </Canvas>
    </div>
  );
}
