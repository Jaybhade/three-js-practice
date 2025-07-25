import { OrbitControls, useHelper } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import {
  BufferGeometry,
  DirectionalLight,
  DirectionalLightHelper,
  DoubleSide,
  Mesh,
} from "three";

const CustomObject = () => {
  const geometryRef = useRef<BufferGeometry>(null);
  const verticesCount = 10 * 3;

  const positions = useMemo(() => {
    const positions = new Float32Array(verticesCount * 3);

    for (let i = 0; i < verticesCount * 3; i++) {
      positions[i] = Math.random() * 0.5 * 3;
    }

    return positions;
  }, []);

  useEffect(() => {
    if (geometryRef.current) {
      geometryRef.current.computeVertexNormals();
    }
  }, [positions]);

  return (
    <mesh position={[0, 0, 2.5]}>
      <bufferGeometry ref={geometryRef}>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <meshStandardMaterial side={DoubleSide} color="red" />
    </mesh>
  );
};

const Environment = () => {
  const cubeRef = useRef<Mesh>(null);
  const directionalLightRef = useRef<DirectionalLight>(null!);

  useFrame((state, delta) => {
    const angle = state.clock.elapsedTime;

    state.camera.position.x = Math.sin(angle) * 8;
    state.camera.position.z = Math.cos(angle) * 8;

    state.camera.lookAt(0, 0, 0);

    if (cubeRef.current) {
      cubeRef.current.rotation.x += delta;
      cubeRef.current.rotation.y += delta;
    }
  });

  useHelper(directionalLightRef, DirectionalLightHelper, 2, "orange");

  return (
    <>
      <directionalLight
        ref={directionalLightRef}
        position={[1, 2, 3]}
        castShadow
      />
      {/* <OrbitControls enableDamping /> */}
      <mesh position={[-2.5, 0, 0]} castShadow>
        <sphereGeometry args={[1]} />
        <meshStandardMaterial color="orange" />
      </mesh>
      <mesh ref={cubeRef} castShadow>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="red" />
      </mesh>
      <mesh position={[2.5, 0, 0]} castShadow>
        <torusKnotGeometry args={[0.5]} />
        <meshStandardMaterial />
      </mesh>
      <mesh
        rotation={[Math.PI * 0.5, 0, 0]}
        position={[0, -2, -2]}
        receiveShadow
      >
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial side={DoubleSide} />
      </mesh>
      <CustomObject />
    </>
  );
};

export default Environment;
