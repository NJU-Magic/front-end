import React, {useRef, useState, Component} from 'react'
import { Canvas, useFrame, useLoader} from '@react-three/fiber'
import {withRouter, Redirect} from "react-router-dom";
import {PLYLoader} from 'three/examples/jsm/loaders/PLYLoader'
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader'
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { VOXLoaderpp } from "../Voxloader/Voxloader";
import {Environment,
    OrbitControls, Html, useProgress } from '@react-three/drei'
import { Suspense } from "react";
import BIMShow from "../../pages/bim_show/bim_show"

import * as ndarray from 'ndarray'

function Box(props) {
    // This reference will give us direct access to the mesh
    const mesh = useRef();
    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false);
    const [active, setActive] = useState(false);
    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame((state, delta) => (mesh.current.rotation.x += 0.01));
    // Return view, these are regular three.js elements expressed in JSX
    return (
        <mesh
            {...props}
            ref={mesh}
            scale={active ? 1.5 : 1}
            onClick={(event) => setActive(!active)}
            onPointerOver={(event) => setHover(true)}
            onPointerOut={(event) => setHover(false)}
        >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
        </mesh>
    )
}

const model_url =  "http://114.212.87.191:4000/Data/ssc_output/spsg/ZMojNkEp431_room9__0__target-mesh.ply"
const vox_url = "http://114.212.87.191:4000/Data/test.vox"
function Loader(){
    const { progress } = useProgress()
    return <Html center>{progress} % loaded</Html>
}

function voxLoad(temp){
    console.log(temp);
}

const Scene = () => {
    /*
    const materials = useLoader(MTLLoader, "http://114.212.87.191:4000/Data/lst_test/SenD/PC/0/model.mtl");
    const obj = useLoader(OBJLoader, "http://114.212.87.191:4000/Data/lst_test/SenD/PC/0/normalized_model.obj", (loader) => {
        materials.preload();
        loader.setMaterials(materials);
    });*/
    var voxloader = new VOXLoaderpp();
    voxloader.load(vox_url, voxLoad);
    return <></>
    //const obj = useLoader(VOXLoader, vox_url)

    //console.log(obj);
    //return <primitive object={obj} scale={1} />;
}

const Voxel = () =>{

    return <></>;
}

class TestsViewer extends Component{
    render(){
        return (
            <div>
                <BIMShow model_url={vox_url} width={2200} height={1200}/>
            </div>
        )
    }
}
/*
<Canvas style={{height: "400px"}}>
                    <Suspense fallback={<Loader/>}>
                        <ambientLight/>
                        <Scene/>
                        <OrbitControls />
                    </Suspense>
                </Canvas>
 */

export default withRouter(TestsViewer)