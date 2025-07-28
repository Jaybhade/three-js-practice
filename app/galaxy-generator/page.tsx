"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { GUI } from "lil-gui";
import { useEffect, useRef, useState } from "react";
import { Points } from "three";

const Galaxy = () => {
  const galaxyRef = useRef<Points>(null);
  const params = useRef({
    count: 1000,
    size: 0.02,
    radius: 5,
    branches: 3,
    spin: 1,
    randomness: 0.2,
  });

  const arrayGenerator = () => {
    return Array.from({ length: params.current.count }, (_, i) => {
      const radius = Math.random() * params.current.radius;
      const branchAngle =
        ((i % params.current.branches) / params.current.branches) * Math.PI * 2;
      const spinAngle = radius * params.current.spin;
      const randomX =
        Math.pow(Math.random(), params.current.randomness) *
        (Math.random() < 0.5 ? -1 : 1);
      const randomY =
        Math.pow(Math.random(), params.current.randomness) *
        (Math.random() < 0.5 ? -1 : 1);
      const randomZ =
        Math.pow(Math.random(), params.current.randomness) *
        (Math.random() < 0.5 ? -1 : 1);

      return [
        Math.cos(branchAngle + spinAngle) * radius + randomX,
        randomY,
        Math.sin(branchAngle + spinAngle) * radius + randomZ,
      ];
    }).flat();
  };

  const [position, setPosition] = useState<number[]>(() => arrayGenerator());

  const [particleSize, setParticleSize] = useState<number>(0.02);

  const generateGalaxyPosition = (count?: number) => {
    if (count !== undefined) {
      params.current.count = count;
    }
    setPosition(arrayGenerator());
  };

  useEffect(() => {
    if (!galaxyRef.current) return;

    const gui = new GUI({ title: "Galaxy Controls" });

    gui
      .add(params.current, "count", 100, 1000000, 100)
      .onFinishChange((value: number) => generateGalaxyPosition(value));

    gui
      .add(params.current, "size", 0.001, 0.1, 0.001)
      .onChange((value: number) => {
        setParticleSize(value);
      });

    gui.add(params.current, "radius", 0.01, 20, 0.01).onFinishChange(() => {
      generateGalaxyPosition();
    });

    gui.add(params.current, "branches", 2, 20, 1).onFinishChange(() => {
      generateGalaxyPosition();
    });

    gui.add(params.current, "spin", -5, 5, 0.001).onFinishChange(() => {
      generateGalaxyPosition();
    });

    gui.add(params.current, "randomness", 0, 2, 0.001).onFinishChange(() => {
      generateGalaxyPosition();
    });

    return () => {
      gui.destroy();
    };
  }, []);

  useFrame(() => {
    if (!galaxyRef.current) return;

    galaxyRef.current.rotation.y += 0.001;
  });

  return (
    <points ref={galaxyRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[Float32Array.from(position), 3]}
          count={position.length / 3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={particleSize}
        sizeAttenuation
        transparent
        depthWrite={false}
      />
    </points>
  );
};

const Home = () => {
  return (
    <div className="w-screen h-screen">
      <Canvas>
        <OrbitControls />
        <Galaxy />
      </Canvas>
    </div>
  );
};

export default Home;
