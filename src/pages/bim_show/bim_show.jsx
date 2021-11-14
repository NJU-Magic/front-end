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
        div_id: null,
    };

    // 从props中获取model_url, mtl_url, mtlpng_url，并写入自己的state
    componentWillMount (){
        var model_url, mtl_url, mtlpng_url, div_id;
        this.props.model_url?
            (model_url = this.props.model_url):(model_url = null);
        this.props.mtl_url?
            (mtl_url = this.props.mtl_url):(mtl_url = null);
        this.props.mtlpng_url?
            (mtlpng_url = this.props.mtlpng_url):(mtlpng_url = null);
        this.props.div_id?
            (div_id = this.props.div_id):(div_id = "bim_show_region")
        this.setState({
            model_url : model_url,
            mtl_url: mtl_url,
            mtlpng_url: mtlpng_url,
            div_id: div_id,
        });
        console.log("model", div_id);
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
        new_div(this.state.model_url, this.state.mtl_url, this.state.mtlpng_url, this.state.div_id);
        var width = this.props.width;
        var height = this.props.height;
        console.log(this.state.model_url?"true":"false");
        console.log(this.state.model_url);
        if (this.state.model_url) {
            setTimeout(this.iTimer,0);
            init(width, height, this.state.div_id);
            load_model(this.state.div_id);
            console.log(this.state.div_id);
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

            remove_model(this.state.div_id);
            load_model(this.state.div_id);
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

let divs = [];
let div_ids = new Array();
function new_div(model_url, mtl_url, mtlpng_url, div_id) {
    divs[div_id] = {
        model_url: model_url,
        mtl_url: mtl_url,
        mtlpng_url: mtlpng_url,

        region: null,
        camera: null,
        scene: null,
        renderer: null,
        controls: null,
        light: null,
        model: null,
        scale: null,
        prevTime: performance.now(),
        width: null,
        height: null,
    };
    div_ids.push(div_id);
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
// let camera, scene, renderer, controls, light;
// let model;
// let scale;
// let prevTime = performance.now();
const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();

let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
let moveUp = false;
let moveDown = false;

let moveSpeed = 1.0;


function onProgress1(xhr){
    load_percent = xhr.loaded/xhr.total*100;
    //console.log('mtl 加载完成的百分比'+(xhr.loaded/xhr.total*100)+'%');
}

// 初始化scene，camera，render
function init(width, height, div_id) {
    divs[div_id].width = width;
    divs[div_id].height = height;
    divs[div_id].camera = new THREE.PerspectiveCamera( 75, width / height, 0.01, 1000 );
    divs[div_id].scene = new THREE.Scene();
    divs[div_id].scene.background = new THREE.Color( 0xffffff );
    divs[div_id].scene.fog = new THREE.Fog( 0xffffff, 0, 750 );
    divs[div_id].light = new THREE.HemisphereLight( 0xeeeeff, 0x777788, 0.75 );
    divs[div_id].light.position.set( 0.5, 1, 0.75 );
    // light = new THREE.PointLight(0xffffff);
    // light.position.set(0, 0, 0);
    if(div_id != 'bim_show_region'){
        document.getElementById("bim_show_region").id = div_id;
    }
    divs[div_id].region = document.getElementById( div_id );
    divs[div_id].scene.add( divs[div_id].light );
    divs[div_id].controls = new PointerLockControls( divs[div_id].camera, divs[div_id].region );
    divs[div_id].region.addEventListener( 'click', function () {
        divs[div_id].controls.lock();
    } );

    divs[div_id].scene.add( divs[div_id].controls.getObject() );
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

    divs[div_id].renderer = new THREE.WebGLRenderer( { antialias: true } );
    divs[div_id].renderer.setPixelRatio( window.devicePixelRatio );
    divs[div_id].renderer.setSize( divs[div_id].width, divs[div_id].height );
    // document.body.appendChild( renderer.domElement );
    divs[div_id].region.appendChild(divs[div_id].renderer.domElement);
    window.addEventListener( 'resize', onWindowResize(div_id) );
}

// 加载模型
function load_model(div_id) {
    divs[div_id].camera.position.set( 0, 0, 0 );
    var str = divs[div_id].model_url.substring(divs[div_id].model_url.length-3);
    // 判断是加载obj还是ply，调用不同的加载函数
    if (str == 'obj') {
        load_obj(div_id);
    } else if (str == "ply") {
        load_ply(div_id);
    }

}

// 加载obj
function load_obj(div_id) {
    // ifc
    var mtlLoader = new MTLLoader();
    var objLoader = new OBJLoader();
    // 判断是否存在mtl，存在才加载
    if (divs[div_id].mtl_url) {
        mtlLoader.load(divs[div_id].mtl_url, function(materials) {
            materials.preload();
            objLoader.setMaterials(materials);
        });
    }
    objLoader.load(divs[div_id].model_url, function (temp) {
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
        divs[div_id].scale = Math.max(mdlen, mdwid, mdhei) / 30;
        // 使用model将函数内部的模型引用复制一份，可以用来删除模型
        divs[div_id].model = temp;
        divs[div_id].scene.add(temp);
    }, onProgress1);
}

// 加载ply
function load_ply(div_id) {
    var plyLoader = new PLYLoader();
    plyLoader.load(divs[div_id].model_url, function (geometry) {

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
        divs[div_id].scale = Math.max(mdlen, mdwid, mdhei) / 30;

        divs[div_id].model = temp;
        divs[div_id].scene.add( temp );
    }, onProgress1);
}

function remove_model(div_id) {
    divs[div_id].scene.remove(divs[div_id].model);
}


function onWindowResize(div_id) {
    divs[div_id].camera.aspect = divs[div_id].width / divs[div_id].height;
    divs[div_id].camera.updateProjectionMatrix();
    divs[div_id].renderer.setSize( divs[div_id].width, divs[div_id].height );

}

function animate() {
    requestAnimationFrame( animate );
    const time = performance.now();
    // console.log(div_id);

    for(var i = 0; i < div_ids.length; i++) {
        var div_id = div_ids[i];
        try {
            if ( divs[div_id].controls.isLocked === true ) {
                console.log(div_id);
                const delta = ( time - divs[div_id].prevTime ) / 1000;
                direction.z = Number( moveForward ) - Number( moveBackward );
                direction.x = Number( moveRight ) - Number( moveLeft );
                direction.y = Number( moveDown ) - Number( moveUp );
                direction.normalize(); // this ensures consistent movements in all directions
                if ( moveForward || moveBackward ) velocity.z -= direction.z * divs[div_id].scale * delta * moveSpeed;
                if ( moveLeft || moveRight ) velocity.x -= direction.x * divs[div_id].scale * delta * moveSpeed;
                if ( moveUp || moveDown ) velocity.y -= direction.y * divs[div_id].scale * delta * moveSpeed;
                divs[div_id].controls.moveRight( - velocity.x );
                divs[div_id].controls.moveForward( - velocity.z );
                divs[div_id].controls.getObject().position.y += velocity.y; // new behavior
                velocity.x = 0;
                velocity.y = 0;
                velocity.z = 0;
            }
            divs[div_id].prevTime = time;
            divs[div_id].renderer.render( divs[div_id].scene, divs[div_id].camera );
        }catch (e) {

        }

    }
}

export default withRouter(BIMShow)