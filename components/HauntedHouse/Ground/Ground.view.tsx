import { useFrame, useLoader } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

const Ground = () => {
  const ghost1 = useRef<THREE.Camera>(null);
  const ghost2 = useRef<THREE.Camera>(null);
  const ghost3 = useRef<THREE.Camera>(null);
  const groundGeometryRef = useRef<THREE.PlaneGeometry>(null);

  const [
    grassColorTexture,
    grassAmbientOcclusionTexture,
    grassNormalTexture,
    grassRoughnessTexture,
  ] = useLoader(THREE.TextureLoader, [
    "/textures/grass/color.jpg",
    "/textures/grass/ambientOcclusion.jpg",
    "/textures/grass/normal.jpg",
    "/textures/grass/roughness.jpg",
  ]);

  useEffect(() => {
    const textures = [
      grassColorTexture,
      grassAmbientOcclusionTexture,
      grassNormalTexture,
      grassRoughnessTexture,
    ];

    textures.forEach((texture) => {
      texture.repeat.set(8, 8);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.generateMipmaps = true;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      texture.magFilter = THREE.LinearFilter;
    });

    if (groundGeometryRef.current) {
      groundGeometryRef.current.setAttribute(
        "uv2",
        groundGeometryRef.current.attributes.uv
      );
    }
  }, [
    grassColorTexture,
    grassAmbientOcclusionTexture,
    grassNormalTexture,
    grassRoughnessTexture,
  ]);

  useFrame((state) => {
    const elapsedTime = state.clock.getElapsedTime();

    if (!ghost1.current || !ghost2.current || !ghost3.current) return;

    const ghost1Angle = elapsedTime * 0.5;
    ghost1.current.position.x = Math.cos(ghost1Angle) * 4;
    ghost1.current.position.z = Math.sin(ghost1Angle) * 4;
    ghost1.current.position.y = Math.sin(elapsedTime * 3);

    const ghost2Angle = -elapsedTime * 0.32;
    ghost2.current.position.x = Math.cos(ghost2Angle) * 5;
    ghost2.current.position.z = Math.sin(ghost2Angle) * 5;
    ghost2.current.position.y =
      Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5);

    const ghost3Angle = -elapsedTime * 0.18;
    ghost3.current.position.x =
      Math.cos(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.32));
    ghost3.current.position.z =
      Math.sin(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.5));
    ghost3.current.position.y =
      Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5);
  });

  return (
    <group>
      <mesh rotation-x={-Math.PI * 0.5} receiveShadow>
        <planeGeometry ref={groundGeometryRef} args={[20, 20]} />
        <meshStandardMaterial
          side={THREE.DoubleSide}
          map={grassColorTexture}
          aoMap={grassAmbientOcclusionTexture}
          aoMapIntensity={1}
          normalMap={grassNormalTexture}
          roughnessMap={grassRoughnessTexture}
        />
      </mesh>
      <pointLight ref={ghost1} args={["#00ffff", 2, 3]} castShadow />
      <pointLight ref={ghost2} args={["#ff00ff", 2, 3]} castShadow />
      <pointLight ref={ghost3} args={["#ffff00", 2, 3]} castShadow />
    </group>
  );
};

export default Ground;
