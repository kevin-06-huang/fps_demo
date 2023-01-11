import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei'

import Player from './Player';

const Game = (props) => {
  return (
            <div id="canvas-container">
            <Canvas>
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                <Player position={[0, 0, 0]} />
                <OrbitControls />
            </Canvas>
            </div>
        );
}

export default Game;
