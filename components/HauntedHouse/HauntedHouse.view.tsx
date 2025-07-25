import HouseGroup from "./HouseGroup";
import Graves from "./GravesGroup";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";
import Ground from "./Ground";

const HauntedHouse = () => {
  const [dpr, setDpr] = useState<number>(2);

  useEffect(() => {
    setDpr(window.devicePixelRatio);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 10, 20], fov: 45 }}
      shadows
      dpr={Math.min(dpr, 2)}
      onCreated={({ gl }) => {
        gl.setClearColor("#262837");
      }}
    >
      <fog attach="fog" args={["#262837", 5, 30]} />
      <OrbitControls enableDamping />
      <directionalLight
        color="#9bbcf9"
        position={[5, 10, 5]}
        intensity={0.6}
        castShadow
      />
      <ambientLight intensity={0.2} color="#9bbcf9" />
      <HouseGroup />
      <Ground />
      <Graves />
    </Canvas>
  );
};

export default HauntedHouse;
