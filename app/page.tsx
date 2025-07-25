"use client";

import { Canvas } from "@react-three/fiber";
import Environment from "@/components/Environment";

const Home = () => {

  return (
    <div className="w-screen h-screen">
      <Canvas flat shadows gl={{antialias: true}} camera={{ position: [6, 6, 15], fov: 45 }}>
        <Environment />
      </Canvas>
    </div>
  );
};

export default Home;
