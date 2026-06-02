import { useRef, useEffect, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { IcosahedronGeometry, TorusGeometry, SphereGeometry, Vector3 } from 'three';

const PARTICLE_COUNT = 60;

interface ParticleData {
  position: Vector3;
  size: number;
  speed: number;
  axis: Vector3;
}

export default function OrbitalConstellation() {
  const groupRef = useRef<THREE.Group>(null);
  const globeRef = useRef<THREE.Mesh>(null);
  const orbitalLinesRef = useRef<THREE.Group>(null);
  const particleRefs = useRef<(THREE.Mesh | null)[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  // Memoize particles data
  const particles = useMemo<ParticleData[]>(() => {
    const data: ParticleData[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const phi = Math.acos(-1 + (2 * i) / PARTICLE_COUNT);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const radius = 1.2 + Math.random() * 0.8;
      const speed = 0.005 + Math.random() * 0.01;
      const axis = new Vector3(
        Math.random() - 0.5,
        Math.random() - 0.5,
        Math.random() - 0.5
      ).normalize();

      data.push({
        position: new Vector3(
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.sin(phi) * Math.sin(theta),
          radius * Math.cos(phi)
        ),
        size: 0.02 + Math.random() * 0.03,
        speed,
        axis,
      });
    }
    return data;
  }, []);

  // Memoize geometries
  const globeGeo = useMemo(() => new IcosahedronGeometry(1, 2), []);
  const ring1Geo = useMemo(() => new TorusGeometry(1, 0.005, 16, 100), []);
  const ring2Geo = useMemo(() => new TorusGeometry(1.2, 0.005, 16, 100), []);
  const ring3Geo = useMemo(() => new TorusGeometry(0.9, 0.005, 16, 100), []);
  const particleGeos = useMemo(
    () => particles.map((p) => new SphereGeometry(p.size, 8, 8)),
    [particles]
  );

  // Mouse listener
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animation frame
  useFrame(() => {
    if (!groupRef.current) return;

    // Mouse tilt with lerp
    groupRef.current.rotation.y +=
      (mouseRef.current.x * 0.5 - groupRef.current.rotation.y) * 0.05;
    groupRef.current.rotation.x +=
      (-mouseRef.current.y * 0.3 - groupRef.current.rotation.x) * 0.05;

    // Auto rotation
    groupRef.current.rotation.y += 0.001;

    // Particle orbits
    particleRefs.current.forEach((particle, i) => {
      if (!particle || !particles[i]) return;
      const p = particles[i].speed;
      const axis = particles[i].axis;
      particle.position.applyAxisAngle(axis, p);
      particle.position.applyAxisAngle(new Vector3(0, 1, 0), p * 0.5);
      particle.lookAt(0, 0, 0);
    });

    // Ring rotations
    if (orbitalLinesRef.current) {
      orbitalLinesRef.current.children[0].rotation.z += 0.002;
      orbitalLinesRef.current.children[1].rotation.z -= 0.001;
      orbitalLinesRef.current.children[2].rotation.z += 0.003;
    }
  });

  const globeScale = Math.min(viewport.width, viewport.height) * 0.12;

  return (
    <group ref={groupRef}>
      {/* Ambient lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#3b82f6" />

      {/* Wireframe Globe */}
      <mesh
        ref={globeRef}
        scale={globeScale}
        rotation={[0.4, 0, 0]}
      >
        <primitive object={globeGeo} attach="geometry" />
        <meshBasicMaterial
          color="#3b82f6"
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Orbital Rings */}
      <group ref={orbitalLinesRef}>
        {/* Ring 1 - Purple */}
        <mesh scale={globeScale * 1.4} rotation={[Math.PI / 2, 0, 0]}>
          <primitive object={ring1Geo} attach="geometry" />
          <meshBasicMaterial color="#8b5cf6" transparent opacity={0.25} />
        </mesh>
        {/* Ring 2 - Cyan */}
        <mesh
          scale={globeScale * 1.6}
          rotation={[Math.PI / 2, 0, Math.PI / 3]}
        >
          <primitive object={ring2Geo} attach="geometry" />
          <meshBasicMaterial color="#06b6d4" transparent opacity={0.2} />
        </mesh>
        {/* Ring 3 - Blue */}
        <mesh
          scale={globeScale * 1.3}
          rotation={[Math.PI / 2, 0, -Math.PI / 4]}
        >
          <primitive object={ring3Geo} attach="geometry" />
          <meshBasicMaterial color="#3b82f6" transparent opacity={0.15} />
        </mesh>
      </group>

      {/* Particles */}
      <group scale={globeScale}>
        {particles.map((particle, i) => (
          <mesh
            key={i}
            ref={(el) => {
              particleRefs.current[i] = el;
            }}
            position={particle.position.toArray()}
            userData={{ speed: particle.speed, axis: particle.axis }}
          >
            <primitive object={particleGeos[i]} attach="geometry" />
            <meshBasicMaterial
              color="#f8fafc"
              transparent
              opacity={0.8}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}
