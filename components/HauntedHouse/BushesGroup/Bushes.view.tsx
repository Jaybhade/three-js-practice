const Bushes = () => {

  return <group castShadow>
    <mesh position={[0.8, 0.2, 2.2]} castShadow>
      <sphereGeometry args={[0.5, 16, 16]} />
      <meshStandardMaterial color='#89c854' />
    </mesh>
    <mesh position={[1.4, 0.1, 2.2]} castShadow>
      <sphereGeometry args={[0.2, 16, 16]} />
      <meshStandardMaterial color='#89c854' />
    </mesh>
    <mesh position={[-1, 0.1, 2.2]} castShadow>
      <sphereGeometry args={[0.4, 16, 16]} />
      <meshStandardMaterial color='#89c854' />
    </mesh>
    <mesh position={[-1.3, 0.1, 2.5]} castShadow>
      <sphereGeometry args={[0.2, 16, 16]} />
      <meshStandardMaterial color='#89c854' />
    </mesh>
  </group>;
};

export default Bushes;
