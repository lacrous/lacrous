import { lazy, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';

const OrbitalConstellation = lazy(() => import('./OrbitalConstellation'));

export default function HeroCanvas() {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <OrbitalConstellation />
        </Suspense>
      </Canvas>
    </div>
  );
}
