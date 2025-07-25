import { useLoader } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import Bushes from "../BushesGroup";

const wallDimensions: number[] = [4, 2.5, 4]; // width height depth
const coneHeight = 2;

const HouseGroup = () => {
  const doorGeometryRef = useRef<THREE.PlaneGeometry>(null);
  const wallGeometryRef = useRef<THREE.BoxGeometry>(null);
  const [
    alphaTexture,
    ambientOcclusionTexture,
    colorTexture,
    heightTexture,
    metalnessTexture,
    normalTexture,
    roughnessTexture,
  ] = useLoader(THREE.TextureLoader, [
    "/textures/door/alpha.jpg",
    "/textures/door/ambientOcclusion.jpg",
    "/textures/door/color.jpg",
    "/textures/door/height.jpg",
    "/textures/door/metalness.jpg",
    "/textures/door/normal.jpg",
    "/textures/door/roughness.jpg",
  ]);

  const [
    bricksColorTexture,
    bricksAmbientOcclusionTexture,
    bricksNormalTexture,
    bricksRoughnessTexture,
  ] = useLoader(THREE.TextureLoader, [
    "/textures/bricks/color.jpg",
    "/textures/bricks/ambientOcclusion.jpg",
    "/textures/bricks/normal.jpg",
    "/textures/bricks/roughness.jpg",
  ]);

  useEffect(() => {
    const doorTextures = [alphaTexture, ambientOcclusionTexture, colorTexture, heightTexture, metalnessTexture, normalTexture, roughnessTexture];
    doorTextures.forEach(texture => {
      texture.generateMipmaps = true;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      texture.magFilter = THREE.LinearFilter;
    });

    const brickTextures = [bricksColorTexture, bricksAmbientOcclusionTexture, bricksNormalTexture, bricksRoughnessTexture];
    brickTextures.forEach(texture => {
      texture.generateMipmaps = true;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      texture.magFilter = THREE.LinearFilter;
    });

    if (doorGeometryRef.current) {
      doorGeometryRef.current.setAttribute('uv2', doorGeometryRef.current.attributes.uv);
    }
    if (wallGeometryRef.current) {
      wallGeometryRef.current.setAttribute('uv2', wallGeometryRef.current.attributes.uv);
    }
  }, [alphaTexture, ambientOcclusionTexture, colorTexture, heightTexture, metalnessTexture, normalTexture, roughnessTexture, bricksColorTexture, bricksAmbientOcclusionTexture, bricksNormalTexture, bricksRoughnessTexture]);

  return (
    <group>
      {/* door light */}
      <pointLight args={["#ff7d46", 2, 7]} position={[0, 2.2, 2.7]} />
      {/* gate */}
      <mesh
        position={[0, 2 * 0.5 - 0.1, wallDimensions[2] * 0.5 + 0.01]}
        receiveShadow
      >
        <planeGeometry ref={doorGeometryRef} args={[wallDimensions[0] * 0.5, 2, 100, 100]} />
        <meshStandardMaterial
          transparent
          displacementScale={0.1}
          map={colorTexture}
          alphaMap={alphaTexture}
          aoMap={ambientOcclusionTexture}
          aoMapIntensity={1}
          displacementMap={heightTexture}
          normalMap={normalTexture}
          metalnessMap={metalnessTexture}
          roughnessMap={roughnessTexture}
        />
      </mesh>
      {/* roof */}
      <mesh
        position={[0, coneHeight * 0.5 + (wallDimensions[1] + 0.01), 0]}
        rotation={[0, Math.PI / 4, 0]}
        castShadow
      >
        <coneGeometry args={[3.5, coneHeight, 4]} />
        <meshStandardMaterial color="#b35f45" />
      </mesh>
      {/* walls */}
      <mesh
        position={[0, wallDimensions[1] * 0.5 + 0.01, 0]}
        castShadow
        receiveShadow
      >
        <boxGeometry
          ref={wallGeometryRef}
          args={[wallDimensions[0], wallDimensions[1], wallDimensions[2]]}
        />
        <meshStandardMaterial 
          map={bricksColorTexture}
          aoMap={bricksAmbientOcclusionTexture}
          aoMapIntensity={1}
          normalMap={bricksNormalTexture}
          roughnessMap={bricksRoughnessTexture}
        />
      </mesh>
      <Bushes />
    </group>
  );
};

export default HouseGroup;
