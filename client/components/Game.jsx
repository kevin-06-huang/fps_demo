import React, { useEffect, useRef, useState, useTexture } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { usePlane, useSphere } from '@react-three/cannon'
import { Physics } from "@react-three/rapier"
import { KeyboardControls, OrbitControls, PerspectiveCamera, PointerLockControls, Sky } from '@react-three/drei'

//import Hall from './Hall';
import Ground from './Ground';
import Player from './Player';
//import Vehicle from './Vehicle';
// import GroundCannon from './GroundCannon';
//<PerspectiveCamera position={[0, 1, 5]} rotation={[0, - 0.5 * Math.PI / 10, 0]} makeDefault/>
// <Ground rotation={[-Math.PI / 2, 0, 0]} userData={{ id: 'floor' }} />
// import { Physics, usePlane, useSphere } from '@react-three/cannon'
// <Vehicle position={[3, 3, 0]} rotation={[0, -Math.PI / 4, 0]} angularVelocity={[0, 0.5, 0]} wheelRadius={0.3} />
// <GroundCannon rotation={[-Math.PI / 2, 0, 0]} userData={{ id: 'floor' }} />
const Game = (props) => {
  return (
            <div id="canvas-container" style={{height: window.innerHeight, width: window.innerWidth}}>
            <KeyboardControls
                map={[
                { name: "forward", keys: ["ArrowUp", "w", "W"] },
                { name: "backward", keys: ["ArrowDown", "s", "S"] },
                { name: "left", keys: ["ArrowLeft", "a", "A"] },
                { name: "right", keys: ["ArrowRight", "d", "D"] },
                { name: "jump", keys: ["Space"] },
            ]}>
                <Canvas>
                    <Sky sunPosition={[100, 20, 100]} />
                    <ambientLight />
                    <pointLight position={[10, 10, 10]} />
                    <spotLight
                        angle={0.12}
                        penumbra={0.1}
                        position={[10, 0, -10]}
                        intensity={40}
                        onUpdate={(self) => {
                        self.target.position.set(-10, 0, 0)
                        self.target.updateMatrixWorld()
                        }}
                    />
                    <Physics gravity={[0, -5, 0]} >
                        <Ground />
                        <Player />
                    </Physics>
                    <PointerLockControls />
                </Canvas>
            </KeyboardControls>
            </div>
        );
}

export default Game;
