import React from 'react';
import { usePlane } from '@react-three/cannon'

const GroundCannon = (props) => {
    const [ref] = usePlane(() => ({ type: 'Static', material: 'ground', ...props }))
    return (
      <group ref={ref}>
        <mesh receiveShadow>
          <planeGeometry args={[50, 50]} />
          <meshStandardMaterial color="#303030" />
        </mesh>
      </group>
    )
}

export default GroundCannon;
