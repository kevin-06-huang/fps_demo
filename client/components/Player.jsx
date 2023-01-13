import * as THREE from "three"
import * as RAPIER from "@dimforge/rapier3d-compat"
import React, { useRef } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { useKeyboardControls } from "@react-three/drei"
import { CapsuleCollider, RigidBody, useRapier } from "@react-three/rapier"
import Blaster from "./actors/Blaster"
import Crosshair from "./Crosshair"
import Sword from "./actors/Sword"

import blasterSound from "../assets/blaster.mp3"
const pew = new Audio(blasterSound)

import swordSound from "../assets/clean-fast-swooshaiff-14784.mp3"
const whoosh = new Audio(swordSound)

import as_you_wish from "../assets/as_you_wish.mp3"
const wish = new Audio(as_you_wish);

const SPEED = 5
const direction = new THREE.Vector3()
const frontVector = new THREE.Vector3()
const sideVector = new THREE.Vector3()
const rotation = new THREE.Vector3()

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

const  Player = ({ addProjectile, useForce, weapon, switchWeapon, forcePowerToFire, setNextForcePower, addForceProjectile, lerp = THREE.MathUtils.lerp }) => {
  const weaponRef = useRef()
  const ref = useRef()
  const rapier = useRapier()
  //const { scene } = useThree();
  const [, get] = useKeyboardControls()
  let throttlePause;
  const throttle = (callback, time) => {
  //don't run the function if throttlePause is true 
  if (throttlePause) return;
  //set throttlePause to true after the if condition. This allows the function to be run once 
  throttlePause = true;
  
  //setTimeout runs the callback within the specified time 
  setTimeout(() => {
    callback();
    
    //throttlePause is set to false once the function has been called, allowing the throttle function to loop 
    throttlePause = false;
  }, time);
  };
  const fireProjectile = () => {
    const [x, y, z] = weaponRef.current.position;
    const [_x, _y, _z] = weaponRef.current.rotation;
    addProjectile(x+0.42, y-0.95, z+0.7, _x, _y + Math.PI / 2, _z);
    /*const geometry = new THREE.BoxGeometry(1,1,10);
    const material = new THREE.MeshBasicMaterial( { color: '#BADA55' } );
    const projectile = new THREE.Mesh(geometry, material);
    console.log(projectile.position);
    projectile.position.set(blaster.current.position.x,blaster.current.position.y,blaster.current.position.z + 2)
    scene.add(projectile);
    console.log();*/
    //console.log(this.);
   // console.log(cube.position);
   // setTimeout(()=>{cube.position.set(0,1,0);
    //console.log(cube.position)}, 1000);
  }
  const fireForceprojectile = () => {
      const [x, y, z] = weaponRef.current.position;
      const [_x, _y, _z] = weaponRef.current.rotation;
      addForceProjectile(x+0.42, y-0.95, z+0.7, _x, _y + Math.PI / 2, _z);
    
    /*const geometry = new THREE.BoxGeometry(1,1,10);
    const material = new THREE.MeshBasicMaterial( { color: '#BADA55' } );
    const projectile = new THREE.Mesh(geometry, material);
    console.log(projectile.position);
    projectile.position.set(blaster.current.position.x,blaster.current.position.y,blaster.current.position.z + 2)
    scene.add(projectile);
    console.log();*/
    //console.log(this.);
   // console.log(cube.position);
   // setTimeout(()=>{cube.position.set(0,1,0);
    //console.log(cube.position)}, 1000);
  }
  const { scene,raycaster, mouse, camera } = useThree();

  useFrame((state) => {
    if (forcePowerToFire === "push") {
      raycaster.setFromCamera( mouse, camera );
      const intersects = raycaster.intersectObjects( scene.children );
      const first = intersects[0].object.parent
      first.position.set(first.position.x, first.position.y + 0.1, first.position.z);
      //console.log(first.position.set(first.position.x - 0.1, first.position.y, first.position.z - 0.1));
      //throttle(fireForceprojectile, 1000);
      //fireForceprojectile();
      setNextForcePower("none");
    }
    const { forward, backward, left, right, jump, force, one, two } = get()
    if (force) { 
      wish.play();
      useForce();
    }
    if (one) switchWeapon(1);
    if (two) switchWeapon(2);
    const velocity = ref.current.linvel()
    // update camera
    state.camera.position.set(...ref.current.translation())
    // update blaster
    weaponRef.current.children[0].rotation.x = lerp(weaponRef.current.children[0].rotation.x, Math.sin((velocity.length() > 1) * state.clock.elapsedTime * 10) / 40, 0.1)
    weaponRef.current.rotation.copy(state.camera.rotation)
    weaponRef.current.position.copy(state.camera.position).add(state.camera.getWorldDirection(rotation).multiplyScalar(1))
    // movement
    frontVector.set(0, 0, backward - forward)
    if(weapon === 1) {
      if ((forward - backward) != 0) weaponRef.current.children[0].rotation.x = 1.5;
      if ((right - left) != 0) weaponRef.current.children[0].rotation.x = 1.5;
    }
    sideVector.set(left - right, 0, 0)
    direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(SPEED).applyEuler(state.camera.rotation)
    ref.current.setLinvel({ x: direction.x, y: velocity.y, z: direction.z })
    // jumping
    const world = rapier.world.raw()
    const ray = world.castRay(new RAPIER.Ray(ref.current.translation(), { x: 0, y: -1, z: 0 }))
    const grounded = ray && ray.collider && Math.abs(ray.toi) <= 1.75
    if (jump && grounded) ref.current.setLinvel({ x: 0, y: 2.5, z: 0 })
  })
  return (
    <>
      <RigidBody ref={ref} colliders={false} mass={1} type="dynamic" position={[0, 10, 0]} enabledRotations={[false, false, false]}>
        <CapsuleCollider args={[0.75, 0.5]} />
      </RigidBody>
      {weapon === 1 ? 
      <>
        <Crosshair/>
        <group ref={weaponRef} onPointerMissed={(e) => {
          weaponRef.current.children[0].rotation.x = 0.5;
          pew.play();
          fireProjectile();
        }}>
          <Blaster rotation={[0,-Math.PI / 2,0]} position={[0.3, -0.25, 0.5]} scale={[0.001,0.001,0.001]}/>
        </group>
      </> :
      <>
        <group ref={weaponRef} onPointerMissed={(e) => {
          weaponRef.current.children[0].rotation.x = -3.14;
          whoosh.play();
        }}>
          <Sword position={[1,0,0]} rotation={[0, 12, Math.PI ]} scale={[0.12,0.12,0.12]}/>
        </group>
      </>}
      
    </>
  )
}

export default Player;
