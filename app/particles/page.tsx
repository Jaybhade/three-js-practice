"use client";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useRef } from "react";

const position = Array.from({ length: 1000 }, () => [
  (Math.random() - 0.5) * 10,
  (Math.random() - 0.5) * 10,
  (Math.random() - 0.5) * 10,
]);

const colors = Array.from({ length: 1000 }, () => [
  Math.random(),
  Math.random(),
  Math.random(),
]);

const Particles = () => {
  const texture = useLoader(THREE.TextureLoader, "/textures/particles/2.png");

  const particlesRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    const elapsedTime = state.clock.getElapsedTime();

    if (particlesRef.current) {
      //   particlesRef.current.rotation.y = elapsedTime * 0.2;

      const particlePositionArray =
        particlesRef.current.geometry.attributes.position.array;

      for (let i=0; i<particlePositionArray.length; i++) {
        const i3 = i * 3;

        const x = particlePositionArray[i3];
        particlePositionArray[i3+1] = Math.sin(elapsedTime + x);
      }

      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          args={[Float32Array.from(position.flat()), 3]}
          attach="attributes-position"
          count={position.length}
        />
        <bufferAttribute
          args={[Float32Array.from(colors.flat()), 3]}
          attach="attributes-color"
          count={colors.length}
        />
      </bufferGeometry>
      <pointsMaterial
        vertexColors
        size={0.3}
        sizeAttenuation
        transparent
        alphaMap={texture}
        depthTest={false}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

const Home = () => {
  return (
    <div className="w-screen h-screen">
      <Canvas>
        <OrbitControls />
        <Particles />
      </Canvas>
    </div>
  );
};

export default Home;
