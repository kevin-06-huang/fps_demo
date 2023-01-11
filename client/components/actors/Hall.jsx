import React from 'react';

import { useGLTF } from '@react-three/drei';

const Hall = ({ ...props }) => {
    const { scene } = useGLTF('../assets/hall-transformed.glb')
    return <primitive object={scene} {...props} />
}

export default Hall;
