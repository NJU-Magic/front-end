import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import "./bim_show.less"
import {Button, Drawer} from 'antd';

import * as THREE from "three"
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";
import {OBJLoader} from "three/examples/jsm/loaders/OBJLoader.js";
import {List} from "antd/lib/list";
import demo_pic from "../../assets/000002.jpg";


class BIMShow extends Component {
    componentWillMount (){
      var bim_url = this.props.bim_url;
      console.log(bim_url);

    };

    componentDidMount(){
              draw();

    }

    render(){

        return(
            <div className="bim_show">

                <div className="bim_show_layer2">
                    <div className="bim_show_region">
                        <div className="region" id="bim_show_region" >{}</div>
                    </div>
                </div>
            </div>

        )
    }
}

/*
* <div className="bim_show_layer1">
                    <div className="bim_show_button">
                        <Button className="bim_button" type="primary" onClick={this.showDrawer}> 加载BIM模型 </Button>
                    </div>
                </div>
* */

// const width = window.innerWidth;
// const height = window.innerHeight;
const width = 1200;
const height = 800;

let camera, scene, renderer, controls;

const objects = [];

let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
let moveUp = false;
let moveDown = false;

let moveSpeed = 1.0;

let scale;
let prevTime = performance.now();
const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();
const vertex = new THREE.Vector3();
const color = new THREE.Color();

function draw() {
    init();
    animate();
}

function init() {
    // document.getElementById( 'bim_show_region' ).width = width;
    // document.getElementById( 'bim_show_region' ).height = height;
    camera = new THREE.PerspectiveCamera( 75, width / height, 0.01, 1000 );
    // camera.position.y = 0;
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xffffff );
    scene.fog = new THREE.Fog( 0xffffff, 0, 750 );
    const light = new THREE.HemisphereLight( 0xeeeeff, 0x777788, 0.75 );
    light.position.set( 0.5, 1, 0.75 );
    scene.add( light );
    controls = new PointerLockControls( camera, document.body );
    const region = document.getElementById( 'bim_show_region' );
    region.addEventListener( 'click', function () {
        controls.lock();
    } );

    scene.add( controls.getObject() );
        const onKeyDown = function ( event ) {
            switch ( event.code ) {
            case 'ArrowUp':
            case 'KeyW':
            moveForward = true;
            break;
            case 'ArrowLeft':
            case 'KeyA':
            moveLeft = true;
            break;
            case 'ArrowDown':
            case 'KeyS':
            moveBackward = true;
            break;
            case 'ArrowRight':
            case 'KeyD':
            moveRight = true;
            break;
            case 'Space':
            // if ( canJump === true ) velocity.y += 350;
            // canJump = false;
            moveUp = true;
            break;
            case 'ShiftLeft':
            moveDown = true;
            break;
        }
    };

    const onKeyUp = function ( event ) {
        switch ( event.code ) {
            case 'ArrowUp':
            case 'KeyW':
            moveForward = false;
            break;
            case 'ArrowLeft':
            case 'KeyA':
            moveLeft = false;
            break;
            case 'ArrowDown':
            case 'KeyS':
            moveBackward = false;
            break;
            case 'ArrowRight':
            case 'KeyD':
            moveRight = false;
            break;
            case 'Space':
            moveUp = false;
            break;
            case 'ShiftLeft':
            moveDown = false;
            break;
            case 'KeyZ':
            moveSpeed = Math.max(0.1, moveSpeed-0.25);
            break;
            case 'KeyX':
            moveSpeed = 1.0;
            break;
            case 'KeyC':
            moveSpeed = Math.min(3.0, moveSpeed+0.5);
            break;
        }
    };

    document.addEventListener( 'keydown', onKeyDown );
    document.addEventListener( 'keyup', onKeyUp );

    // ifc
    var loader;
    var mtlLoader = new MTLLoader();
    mtlLoader.load('http://114.212.81.162:4100/Data/test.mtl', function(materials) {
        materials.preload();
        loader = new OBJLoader();
        loader.setMaterials(materials);
        loader.load( 'http://114.212.81.162:4100/Data/test.obj', function ( obj ) {
            // 旋转
            obj.rotateOnAxis(new THREE.Vector3(1, 0, 0), - Math.PI / 2);
            obj.rotateOnAxis(new THREE.Vector3(0, 0, 1), Math.PI / 2);
            // 平移到中心
            var box = new THREE.Box3();
            box.expandByObject(obj);
            var mdlen = box.max.x - box.min.x;
            var mdwid = box.max.z - box.min.z;
            var mdhei = box.max.y - box.min.y;
            var centerpoint = new THREE.Vector3();
            var x1 = box.min.x + mdlen / 2;
            var y1 = box.min.y + mdhei / 2;
            var z1 = box.min.z + mdwid / 2;
            obj.position.set(-x1, -y1, -z1);
            scale = Math.max(mdlen, mdwid, mdhei) / 30;
            scene.add(obj);
        });
    });
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( width, height );
    // document.body.appendChild( renderer.domElement );
    region.appendChild(renderer.domElement);
    window.addEventListener( 'resize', onWindowResize );
}

function onWindowResize() {
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize( width, height );

}

function animate() {
    requestAnimationFrame( animate );
    const time = performance.now();
    if ( controls.isLocked === true ) {
        const delta = ( time - prevTime ) / 1000;
        direction.z = Number( moveForward ) - Number( moveBackward );
        direction.x = Number( moveRight ) - Number( moveLeft );
        direction.y = Number( moveDown ) - Number( moveUp );
        direction.normalize(); // this ensures consistent movements in all directions
        if ( moveForward || moveBackward ) velocity.z -= direction.z * scale * delta * moveSpeed;
        if ( moveLeft || moveRight ) velocity.x -= direction.x * scale * delta * moveSpeed;
        if ( moveUp || moveDown ) velocity.y -= direction.y * scale * delta * moveSpeed;
        controls.moveRight( - velocity.x );
        controls.moveForward( - velocity.z );
        controls.getObject().position.y += velocity.y; // new behavior
        velocity.x = 0;
        velocity.y = 0;
        velocity.z = 0;
    }
    prevTime = time;
    renderer.render( scene, camera );
}

export default withRouter(BIMShow)