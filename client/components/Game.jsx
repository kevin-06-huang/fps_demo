import React, { useEffect, useRef, useState, useTexture } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { usePlane, useSphere } from '@react-three/cannon'
import { Physics } from "@react-three/rapier"
import { KeyboardControls, OrbitControls, PerspectiveCamera, PointerLockControls, Sky } from '@react-three/drei'

//import Hall from './Hall';
import Ground from './Ground';
import Player from './Player';
import Hall from './actors/Hall';
import Carbonite from './actors/Carbonite';
import Darth from './actors/Darth';
import Force from './force/Force';
import ATAT from './actors/ATAT';
import { create } from "zustand"
import Projectile from './actors/Projectile';
//import Vehicle from './Vehicle';
// import GroundCannon from './GroundCannon';
//<PerspectiveCamera position={[0, 1, 5]} rotation={[0, - 0.5 * Math.PI / 10, 0]} makeDefault/>
// <Ground rotation={[-Math.PI / 2, 0, 0]} userData={{ id: 'floor' }} />
// import { Physics, usePlane, useSphere } from '@react-three/cannon'
// <Vehicle position={[3, 3, 0]} rotation={[0, -Math.PI / 4, 0]} angularVelocity={[0, 0.5, 0]} wheelRadius={0.3} />
// <GroundCannon rotation={[-Math.PI / 2, 0, 0]} userData={{ id: 'floor' }} />
// 
const useGameStore = create((set) => ({
    force: false,
    projectiles: [],
    addProjectile: (x, y, z) => {
        set((state) => ({ projectiles: [...state.projectiles, [x, y, z]] }));
    },
    useForce: () => set((state) => ({ force: !state.force })),
  }))

const Game = (props) => {
  const webcamRef = useRef(null);

  const addProjectile = useGameStore((state) => state.addProjectile);
  const force = useGameStore((state) => state.force);
  const useForce = useGameStore((state) => state.useForce);

  const Projectiles = () => {
    const projectiles = useGameStore((state) => state.projectiles);
    return projectiles.map((coords, index) => <Projectile key={index} position={coords} />);
  }

  return (
            <div id="canvas-container" style={{height: window.innerHeight, width: window.innerWidth}}>
            {force ? <Force ref={webcamRef} /> : <></>}
            <KeyboardControls
                map={[
                { name: "forward", keys: ["ArrowUp", "w", "W"] },
                { name: "backward", keys: ["ArrowDown", "s", "S"] },
                { name: "left", keys: ["ArrowLeft", "a", "A"] },
                { name: "right", keys: ["ArrowRight", "d", "D"] },
                { name: "jump", keys: ["Space"] },
                { name: "force", keys: ["f", "F"] },
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
                        <Player addProjectile={addProjectile} useForce={useForce}/>
                        <Hall position={[0, 1.5, 1]}/>
                        <Carbonite/>
                        <Darth position={[0, 0, 1]} scale={[0.01,0.01,0.01]}/>
                        <ATAT position={[5, -0.5, 10]}/>
                        <Projectiles/>
                    </Physics>
                    <PointerLockControls />
                </Canvas>
            </KeyboardControls>
            </div>
        );
}

export default Game;
