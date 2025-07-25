import { useLoader } from "@react-three/fiber";
import * as THREE from "three";
import Bushes from "../BushesGroup";

const wallDimensions: number[] = [4, 2.5, 4]; // width height depth
const coneHeight = 2;

const HouseGroup = () => {
  const alphaTexture = useLoader(
    THREE.TextureLoader,
    "/textures/door/alpha.jpg"
  );
  const ambientOcclusionTexture = useLoader(
    THREE.TextureLoader,
    "/textures/door/ambientOcclusion.jpg"
  );
  const colorTexture = useLoader(
    THREE.TextureLoader,
    "/textures/door/color.jpg"
  );
  const heightTexture = useLoader(
    THREE.TextureLoader,
    "/textures/door/height.jpg"
  );
  const metalnessTexture = useLoader(
    THREE.TextureLoader,
    "/textures/door/metalness.jpg"
  );
  const normalTexture = useLoader(
    THREE.TextureLoader,
    "/textures/door/normal.jpg"
  );
  const roughnessTexture = useLoader(
    THREE.TextureLoader,
    "/textures/door/roughness.jpg"
  );

  // bricks texture

  const bricksColorTexture = useLoader(
    THREE.TextureLoader,
    "/textures/bricks/color.jpg"
  );
  const bricksAmbientOcclusionTexture = useLoader(
    THREE.TextureLoader,
    "/textures/bricks/ambientOcclusion.jpg"
  );
  const bricksNormalTexture = useLoader(
    THREE.TextureLoader,
    "/textures/bricks/normal.jpg"
  );
  const bricksRoughnessTexture = useLoader(
    THREE.TextureLoader,
    "/textures/bricks/roughness.jpg"
  );

  return (
    <group>
      {/* door light */}
      <pointLight args={["#ff7d46", 2, 7]} position={[0, 2.2, 2.7]} />
      {/* gate */}
      <mesh
        position={[0, 2 * 0.5 - 0.1, wallDimensions[2] * 0.5 + 0.01]}
        receiveShadow
      >
        <planeGeometry args={[wallDimensions[0] * 0.5, 2, 100, 100]} />
        <meshStandardMaterial
          transparent
          displacementScale={0.1}
          map={colorTexture}
          alphaMap={alphaTexture}
          aoMap={ambientOcclusionTexture}
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
          args={[wallDimensions[0], wallDimensions[1], wallDimensions[2]]}
        />
        <meshStandardMaterial 
          transparent
          map={bricksColorTexture}
          aoMap={bricksAmbientOcclusionTexture}
          normalMap={bricksNormalTexture}
          roughnessMap={bricksRoughnessTexture}
        />
      </mesh>
      <Bushes />
    </group>
  );
};

export default HouseGroup;
