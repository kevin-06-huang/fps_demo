import React, { Suspense, useRef, useState } from 'react';
import { Physics, usePlane, useSphere } from '@react-three/cannon'
import { useFrame } from '@react-three/fiber';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useGLTF } from '@react-three/drei';

const Player = (props) => {
    // This reference gives us direct access to the THREE.Mesh object
    //const ref = useRef()
    const [ref] = useSphere(
        () => ({ args: [0.75], mass: 1, ...props }),
        useRef()
      )
    // Hold state for hovered and clicked events
   // const [hovered, hover] = useState(false)
    const [clicked, click] = useState(false)
    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame((state, delta) => (ref.current.rotation.x += delta))
    // Return the view, these are regular Threejs elements expressed in JSX
   // const gltf = useLoader(GLTFLoader, '../assets/darth_vader.gltf')
    /*return (
        <Suspense fallback={null}>
          <primitive object={gltf.scene} />
        </Suspense>
    )*/

    
    return (
      <mesh
        {...props}
        ref={ref}>
        <sphereGeometry args={[0.75]} geometry={[0, 0, 0]} material={ {color: 0xffff00 }}/>
        <meshPhysicalMaterial transmission={1} roughness={0} thickness={10} envMapIntensity={1} />
      </mesh>
    )
  }

  export default Player;
  //useGLTF.preload('../assets/darth_vader.gltf')
