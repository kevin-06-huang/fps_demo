import React, { useEffect, useRef } from 'react';

import Projectile from './actors/Projectile';

import { create } from "zustand"


const useStateStore = create((set) => ({
    projectiles: [],
    addProjectile: (x, y, z) => {
        set((state) => ({ projectiles: [...state.projectiles, [x, y, z]] }));
    },
  }))

export const Projectiles = () => {
    console.log('projectiles')
    const projectiles = useStateStore((state) => state.projectiles);
    return projectiles.map((coords, index) => <Projectile key={index} position={coords} />);
};

export const addProjectile = useStateStore((state) => state.addProjectile);
/*
const GameState = (props) => {
    console.log('state');
    //const ref = useRef()
   // return(<Projectiles ref={ref}/>);
};

export default GameState;*/
