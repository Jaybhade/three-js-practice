const createGraves = () => {
  const graves = [];

  for (let i = 0; i < 50; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = 4 + Math.random() * 5;
    graves[i] = {
      x: Math.sin(angle) * radius,
      z: Math.cos(angle) * radius,
      rotationY: (Math.random() - 0.5) * 0.4,
      rotationZ: (Math.random() - 0.5) * 0.4,
    };
  }

  return graves;
};

const Graves = () => {
  return (
    <group>
      {createGraves().map((grave, index) => (
        <mesh
          key={index}
          position={[grave.x, 0.3, grave.z]}
          rotation={[0, grave.rotationY, grave.rotationZ]}
          castShadow
        >
          <boxGeometry args={[0.6, 0.8, 0.2]} />
          <meshStandardMaterial color="#b2b6b1" />
        </mesh>
      ))}
    </group>
  );
};

export default Graves;
