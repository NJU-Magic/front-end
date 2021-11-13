import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import "./bim_show.less"
import {Progress } from 'antd';

import * as THREE from "three"
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";
import {OBJLoader} from "three/examples/jsm/loaders/OBJLoader.js";
import {PLYLoader} from "three/examples/jsm/loaders/PLYLoader.js";
import {List} from "antd/lib/list";
import demo_pic from "../../assets/000002.jpg";


class BIMShow extends Component {
    state = {
        timer: null,
        load_percent: 0,
        model_url : null,
        mtl_url: null,
        mtlpng_url: null,
    };

    // 从props中获取model_url, mtl_url, mtlpng_url，并写入自己的state
    componentWillMount (){
        var model_url, mtl_url, mtlpng_url;
        this.props.model_url?
            (model_url = this.props.model_url):(model_url = null);
        this.props.mtl_url?
            (mtl_url = this.props.mtl_url):(mtl_url = null);
        this.props.mtlpng_url?
            (mtlpng_url = this.props.mtlpng_url):(mtlpng_url = null);
        this.setState({
            model_url : model_url,
            mtl_url: mtl_url,
            mtlpng_url: mtlpng_url,
        });
        console.log("model", model_url);
    };

    iTimer = () => {
        this.setState({
            timer: setInterval(() => {
                this.setState({
                    load_percent: load_percent
                })
            }, 100),
        });
    };

    // 根据width height和state加载模型
    // 先init，初始化scene、camera和render
    componentDidMount(){
        var width = this.props.width;
        var height = this.props.height;
        console.log(this.state.model_url?"true":"false");
        console.log(this.state.model_url);
        if (this.state.model_url) {
            setTimeout(this.iTimer,0);
            init(width, height);
            load_model(this.state.model_url, this.state.mtl_url, this.state.mtlpng_url);
            animate();
        }
    }

    componentWillUnmount() {
        clearInterval(this.state.timer && this.state.timer);
    }

    // 当props的model_url出现变化时，说明需要加载其他的模型
    // 更新state，删除上一个模型（这里scene、camera和render不需要重新初始化。重新初始化scene会导致双重scene） 
    // 重新加载模型，渲染
    componentDidUpdate(prevProps) {
        if(prevProps.model_url != this.props.model_url) {
            var model_url, mtl_url, mtlpng_url;
            this.props.model_url?
                (model_url = this.props.model_url):(model_url = null);
            this.props.mtl_url?
                (mtl_url = this.props.mtl_url):(mtl_url = null);
            this.props.mtlpng_url?
                (mtlpng_url = this.props.mtlpng_url):(mtlpng_url = null);
            this.setState({
                model_url : model_url,
                mtl_url: mtl_url,
                mtlpng_url: mtlpng_url,
            });
            setTimeout(this.iTimer,0);
            // draw(width, height);
            remove_model();
            load_model(this.state.model_url, this.state.mtl_url, this.state.mtlpng_url);
            animate();
        }  
    }

    render(){

        return(
            <div className="bim_show">

                <div className="bim_show_layer2">
                    <div className="bim_show_region">
                        <Progress percent={this.state.load_percent} showInfo={false}/>
                        <div className="region" id="bim_show_region"  style={{width: this.props.width, height:this.props.height}}>{}</div>

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

var load_percent = 0;
let camera, scene, renderer, controls, light;
let model;

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

function onProgress1(xhr){
    load_percent = xhr.loaded/xhr.total*100;
    //console.log('mtl 加载完成的百分比'+(xhr.loaded/xhr.total*100)+'%');
}

// 初始化scene，camera，render
function init(width, height) {
    // document.getElementById( 'bim_show_region' ).width = width;
    // document.getElementById( 'bim_show_region' ).height = height;
    camera = new THREE.PerspectiveCamera( 75, width / height, 0.01, 1000 );
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xffffff );
    scene.fog = new THREE.Fog( 0xffffff, 0, 750 );
    light = new THREE.HemisphereLight( 0xeeeeff, 0x777788, 0.75 );
    light.position.set( 0.5, 1, 0.75 );
    // light = new THREE.PointLight(0xffffff);
    // light.position.set(0, 0, 0);
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

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( width, height );
    // document.body.appendChild( renderer.domElement );
    region.appendChild(renderer.domElement);
    window.addEventListener( 'resize', onWindowResize(width, height) );
}

// 加载模型
function load_model(model_url, mtl_url, mtlpng_url) {
    camera.position.set( 0, 0, 0 );
    var str = model_url.substring(model_url.length-3);
    // 判断是加载obj还是ply，调用不同的加载函数
    if (str == 'obj') {
        load_obj(model_url, mtl_url, mtlpng_url);
    } else if (str == "ply") {
        load_ply(model_url);
    }

}

// 加载obj
function load_obj(model_url, mtl_url, mtlpng_url) {
    // ifc
    var mtlLoader = new MTLLoader();
    var objLoader = new OBJLoader();
    // 判断是否存在mtl，存在才加载
    if (mtl_url) {
        mtlLoader.load(mtl_url, function(materials) {
            materials.preload();
            objLoader.setMaterials(materials);
        });
    }
    objLoader.load(model_url, function (temp) {
        // 旋转
        // temp.rotateOnAxis(new THREE.Vector3(1, 0, 0), - Math.PI / 2);
        // temp.rotateOnAxis(new THREE.Vector3(0, 0, 1), Math.PI / 2);
        // 平移到中心
        var box = new THREE.Box3();
        box.expandByObject(temp);
        var mdlen = box.max.x - box.min.x;
        var mdwid = box.max.z - box.min.z;
        var mdhei = box.max.y - box.min.y;
        var x1 = box.min.x + mdlen / 2;
        var y1 = box.min.y + mdhei / 2;
        var z1 = box.min.z + mdwid / 2;
        temp.position.set(-x1, -y1, -z1);
        scale = Math.max(mdlen, mdwid, mdhei) / 30;
        // 使用model将函数内部的模型引用复制一份，可以用来删除模型
        model = temp;
        scene.add(temp);
    }, onProgress1);
}

// 加载ply
function load_ply(model_url) {
    var plyLoader = new PLYLoader();
    plyLoader.load(model_url, function (geometry) {

        //更新顶点的法向量
        geometry.computeVertexNormals();

        //创建纹理，并将模型添加到场景道中
        var material = new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0x111111, shininess: 200, vertexColors: THREE.VertexColors} );
        var temp = new THREE.Mesh( geometry, material );
        // mesh.rotation.y = Math.PI;

        var box = new THREE.Box3();
        box.expandByObject(temp);
        var mdlen = box.max.x - box.min.x;
        var mdwid = box.max.z - box.min.z;
        var mdhei = box.max.y - box.min.y;
        var x1 = box.min.x + mdlen / 2;
        var y1 = box.min.y + mdhei / 2;
        var z1 = box.min.z + mdwid / 2;
        temp.position.set(-x1, -y1, -z1);
        scale = Math.max(mdlen, mdwid, mdhei) / 30;

        model = temp;
        scene.add( temp );
    }, onProgress1);
}

function remove_model() {
    scene.remove(model);
}


function onWindowResize(width, height) {
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