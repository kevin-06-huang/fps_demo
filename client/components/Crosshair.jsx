// Code courtesy of https://stackoverflow.com/questions/72724523/how-to-add-crosshair-using-threejs-react
import {useFrame, useThree} from "@react-three/fiber";
import React, {useEffect, useRef} from "react";
import {Line, Vector3} from "three";

const Crosshair = () => {
    const dot = useRef();
    const lines = useRef();
    const { camera } = useThree();

    useFrame(() => {
        const vector = new Vector3(0, 0, -0.8).unproject(camera);
        const [x, y, z] = vector
        dot.current.position.set(x, y, z);
        lines.current.position.set(x, y, z);
        lines.current.rotation.set(camera.rotation._x, camera.rotation._y, camera.rotation._z, camera.rotation._order);
    })

    const Line = (props) => {
        const ref = useRef()

        useEffect(() => {
            if(ref.current){
                ref.current.geometry.setFromPoints([props.start, props.end].map((point) => new Vector3(...point)));
            }
        });

        return (
            <line ref={ref}>
                <bufferGeometry />
                <lineBasicMaterial color="red"/>
            </line>
        )
    }

    return (
        <group>
            <group ref={lines}>
                <Line start={[0.0020,0,0]} end={[0.0036,0,0]} />
                <Line start={[0,0.0020,0]} end={[0,0.0036,0]} />
                <Line start={[-0.0020,0,0]} end={[-0.0036,0,0]} />
                <Line start={[0,-0.0020,0]} end={[0,-0.0036,0]} />
            </group>
            <mesh ref={dot}>
                <sphereGeometry args={[0.0005, 64, 32]} />
                <meshBasicMaterial color={'red'} />
            </mesh>
        </group>
    )
}

export default Crosshair;
