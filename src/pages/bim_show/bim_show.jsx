import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import "./bim_show.less"
import {Progress } from 'antd';

import * as THREE from "three"
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";
import {OBJLoader} from "three/examples/jsm/loaders/OBJLoader.js";
import {PLYLoader} from "three/examples/jsm/loaders/PLYLoader.js";
import {PCDLoader} from "three/examples/jsm/loaders/PCDLoader.js";
import {List} from "antd/lib/list";
import demo_pic from "../../assets/000002.jpg";


class BIMShow extends Component {
    state = {
        timer: null,
        load_percent: 0,
        last_model_url:null,
        div_id: null,


    };

    drawing = false;
    model_url = null;
    mtl_url= null;
    mtlpng_url=null;

    init_variable = () =>{
        this.moveForward=false;
        this.moveBackward=false;
        this.moveLeft=false;
        this.moveRight=false;
        this.moveUp=false;
        this.moveDown=false;

        this.moveSpeed= 1.0;
        this.velocity= new THREE.Vector3();
        this.direction= new THREE.Vector3();
        this.camera= new THREE.PerspectiveCamera( 75, this.props.width / this.props.height, 0.01, 1000 );
        this.scene= new THREE.Scene();
        this.light= new THREE.HemisphereLight(0xeeeeff, 0x777788, 0.75);
        this.region= document.getElementById(this.state.div_id);
        this.controls= new PointerLockControls( this.camera, this.region );
        this.renderer= new THREE.WebGLRenderer( { antialias: true } );
        this.scale= 1.0;
        this.model= null;

        this.prevTime= performance.now();

        this.box_list = [];
        this.translation = [0, 0, 0];

        this.rotate_X = 0;
        this.rotate_Y = 0;
        this.rotate_Z = 0;
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
            (div_id = this.props.div_id):(div_id = "bim_show_region");

        this.model_url = model_url;
        this.mtl_url= mtl_url;
        this.mtlpng_url= mtlpng_url;
        this.setState({div_id:div_id}
        );

        // console.log("componentWillMount", this.state);
    };

    // 根据width height和state加载模型
    // 先init，初始化scene、camera和render
    componentDidMount(){
        var width = this.props.width;
        var height = this.props.height;
        // console.log(this.model_url?"true":"false");
        // console.log(this.model_url);
        if (this.model_url) {
            if(this.drawing === false){
                this.drawing = true;
                this.init_variable();
                this.init(width, height);
                this.load_model();
                this.animate();
            }
        }
    }

    onProgress1 = (xhr) =>{
        let load_percent = xhr.loaded/xhr.total*100;
        this.setState({
            load_percent: load_percent
        });
        if(load_percent===100){
            // console.log("drawing set to false");
            this.drawing = false;
        }
        //console.log('mtl 加载完成的百分比'+(xhr.loaded/xhr.total*100)+'%');
    };

    load_model = () =>{
        this.camera.position.set( 0, 0, 0 );
        this.camera.lookAt(0, 0, 0);
        var stri = this.model_url.substring(this.model_url.length-3);
        // 判断是加载obj还是ply，调用不同的加载函数
        if (stri === 'obj') {
            this.load_obj();
        } else if (stri === "ply") {
            this.load_ply();
        } else if (stri === "pcd") {
            this.load_pcd();
        }
    };

    plyLoad = (geometry) =>{
        // console.log(geometry)
        geometry.computeVertexNormals();

        //创建纹理，并将模型添加到场景道中
        var material = new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0x111111, shininess: 200, vertexColors: THREE.VertexColors} );
        // material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        var temp = new THREE.Mesh( geometry, material );
        // mesh.rotation.y = Math.PI;

        // temp.rotateOnAxis(new THREE.Vector3(1, 0, 0), - Math.PI / 2);

        var box = new THREE.Box3();
        box.expandByObject(temp);
        var mdlen = box.max.x - box.min.x;
        var mdwid = box.max.z - box.min.z;
        var mdhei = box.max.y - box.min.y;
        this.translation[0] = -(box.min.x + mdlen / 2);
        this.translation[1] = -(box.min.y + mdhei / 2);
        this.translation[2] = -(box.min.z + mdwid / 2);
        temp.position.set(this.translation[0], this.translation[1], this.translation[2]);
        this.scale = Math.max(mdlen, mdwid, mdhei) / 10;


        this.model = temp;
        this.scene.add( temp );
        this.boxLoad();

        // this.scene.rotateOnAxis(new THREE.Vector3(1, 0, 0), - Math.PI / 2);
    };

    objLoad = (temp) =>{
        var box = new THREE.Box3();
        box.expandByObject(temp);
        var mdlen = box.max.x - box.min.x;
        var mdwid = box.max.z - box.min.z;
        var mdhei = box.max.y - box.min.y;
        this.translation[0] = -(box.min.x + mdlen / 2);
        this.translation[1] = -(box.min.y + mdhei / 2);
        this.translation[2] = -(box.min.z + mdwid / 2);
        temp.position.set(this.translation[0], this.translation[1], this.translation[2]);
        this.scale = Math.max(mdlen, mdwid, mdhei) / 10;
        
        // 使用model将函数内部的模型引用复制一份，可以用来删除模型
        this.model = temp;
        this.scene.add(temp);
        this.boxLoad();
    };

    pcdLoad = (temp) => {
        var box = new THREE.Box3();
        box.expandByObject(temp);
        var mdlen = box.max.x - box.min.x;
        var mdwid = box.max.z - box.min.z;
        var mdhei = box.max.y - box.min.y;
        this.translation[0] = -(box.min.x + mdlen / 2);
        this.translation[1] = -(box.min.y + mdhei / 2);
        this.translation[2] = -(box.min.z + mdwid / 2);
        temp.position.set(this.translation[0], this.translation[1], this.translation[2]);
        this.scale = Math.max(mdlen, mdwid, mdhei) / 10;

        this.model = temp;
        this.scene.add(temp);
    }

    load_ply = () => {
        var plyLoader = new PLYLoader();
        plyLoader.load(this.model_url, this.plyLoad, this.onProgress1)

    };

    load_obj = () => {
        var mtlLoader = new MTLLoader();
        var objLoader = new OBJLoader();
        // 判断是否存在mtl，存在才加载
        if (this.mtl_url) {
            mtlLoader.load(this.mtl_url, function(materials) {
                materials.preload();
                objLoader.setMaterials(materials);
            });
        }
        objLoader.load(this.model_url, this.objLoad, this.onProgress1);
    };

    load_pcd = () => {
        // console.log("load pcd", this.model_url);
        var pcdLoader = new PCDLoader();
        pcdLoader.load(this.model_url, this.pcdLoad, this.onProgress1);
    }

    boxLoad = () => {
        // 判断是否需要添加包围框
        if (this.props.box_bound) {
            // console.log("need Box3", this.props.box_bound);
            for (var i = 0; i < this.props.box_bound.length; i++) {
                // console.log(i);
                var max = this.props.box_bound[i][0];
                var min = this.props.box_bound[i][1];
                // console.log("max: ", max[0], max[1], max[2], "min:", min[0], min[1], min[2])
                var box = new THREE.Box3();
                
                // console.log(this.translation);
                var center = new THREE.Vector3((max[0]+min[0])/2+this.translation[0], (max[1]+min[1])/2+this.translation[1], (max[2]+min[2])/2+this.translation[2]);
                var size = new THREE.Vector3(max[0]-min[0], max[1]-min[1], max[2]-min[2]);
                box.setFromCenterAndSize(center, size); 
    
                var helper = new THREE.Box3Helper( box, 0xff0000 );
                // helper.rotateOnAxis(new THREE.Vector3(1, 0, 0), - Math.PI / 2);  
                this.box_list.push(helper);
                this.scene.add(helper);
            }
        }   
    }

    regionClickListener = () =>{
        this.controls.lock();
    };

    onKeyDown = (event) =>{
        switch ( event.code ) {
            case 'ArrowUp':
            case 'KeyW':
                this.moveForward = true;
                break;
            case 'ArrowLeft':
            case 'KeyA':
                this.moveLeft = true;
                break;
            case 'ArrowDown':
            case 'KeyS':
                this.moveBackward = true;
                break;
            case 'ArrowRight':
            case 'KeyD':
                this.moveRight = true;
                break;
            case 'KeyV':
                // if ( canJump === true ) velocity.y += 350;
                // canJump = false;
                this.moveUp = true;
                break;
            case 'ShiftLeft':
                this.moveDown = true;
                break;
        }
    };

    onKeyUp = ( event ) => {
        switch ( event.code ) {
            case 'ArrowUp':
            case 'KeyW':
                this.moveForward = false;
                break;
            case 'ArrowLeft':
            case 'KeyA':
                this.moveLeft = false;
                break;
            case 'ArrowDown':
            case 'KeyS':
                this.moveBackward = false;
                break;
            case 'ArrowRight':
            case 'KeyD':
                this.moveRight = false;
                break;
            case 'KeyV':
                this.moveUp = false;
                break;
            case 'ShiftLeft':
                this.moveDown = false;
                break;
            case 'KeyZ':
                this.moveSpeed = Math.max(0.1, this.moveSpeed-0.25);
                break;
            case 'KeyX':
                this.moveSpeed = 1.0;
                break;
            case 'KeyC':
                this.moveSpeed = Math.min(3.0, this.moveSpeed+0.5);
                break;

            // 旋转
            // case 'KeyU':
            //     this.rotate_X = 1;
            //     break;
            // case 'KeyJ':
            //     this.rotate_X = -1;
            //     break;

            // case 'KeyI':
            //     this.rotate_Y = 1;
            //     break;
            // case 'KeyK':
            //     this.rotate_Y = -1;
            //     break;

            // case 'KeyO':
            //     this.rotate_Z = 1;
            //     break;
            // case 'KeyL':
            //     this.rotate_Z = -1;
            //     break;
        }
    };


    animate =() =>{
        requestAnimationFrame( this.animate );
        const time = performance.now();
        // console.log(div_id);

        if (this.controls.isLocked === true) {


            const delta = ( time - this.prevTime ) / 1000;
            this.direction.z = Number( this.moveForward ) - Number( this.moveBackward );
            this.direction.x = Number( this.moveRight ) - Number( this.moveLeft );
            this.direction.y = Number( this.moveDown ) - Number( this.moveUp );
            this.direction.normalize(); // this ensures consistent movements in all directions
            if ( this.moveForward || this.moveBackward ) this.velocity.z -= this.direction.z * this.scale * delta * this.moveSpeed;
            if ( this.moveLeft || this.moveRight ) this.velocity.x -= this.direction.x * this.scale * delta * this.moveSpeed;
            if ( this.moveUp || this.moveDown ) this.velocity.y -= this.direction.y * this.scale * delta * this.moveSpeed;
            this.controls.moveRight( - this.velocity.x );
            this.controls.moveForward( - this.velocity.z );
            this.controls.getObject().position.y += this.velocity.y; // new behavior
            this.velocity.x = 0;
            this.velocity.y = 0;
            this.velocity.z = 0;
        }
        this.prevTime = time;
        this.renderer.render(this.scene, this.camera);

    };

    onWindowResize = () => {
        this.camera.aspect = this.width / this.height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize( this.width, this.height );

    };

    init = (width, height) => {

        this.scene.background = new THREE.Color( 0xffffff );
        this.scene.fog = new THREE.Fog( 0xffffff, 0, 750 );


        this.light.position.set( 0.5, 1, 0.75 );

        this.scene.add( this.light );

        this.region.addEventListener( 'click', this.regionClickListener);

        this.scene.add( this.controls.getObject() );

        document.addEventListener( 'keydown', this.onKeyDown );
        document.addEventListener( 'keyup', this.onKeyUp );


        this.renderer.setPixelRatio( window.devicePixelRatio );
        this.renderer.setSize( width, height );
        // document.body.appendChild( renderer.domElement );
        this.region.appendChild(this.renderer.domElement);

        // console.log(this.renderer.domElement);
        window.addEventListener( 'resize', this.onWindowResize );
    };

    // 当props的model_url出现变化时，说明需要加载其他的模型
    // 更新state，删除上一个模型（这里scene、camera和render不需要重新初始化。重新初始化scene会导致双重scene）
    // 重新加载模型，渲染

    removeModel = () =>{
        this.scene.remove(this.model);
        for (var i = 0; i < this.box_list.length; i++) {
            this.scene.remove(this.box_list[i]);
        }
        this.box_list = [];
    };

    componentDidUpdate(prevProps) {
        // console.log("pre==cur", prevProps.model_url, this.props.model_url);
        if(prevProps.model_url !== this.props.model_url) {
            // console.log("componentDidUpdate if", this.state);
            var last_model_url, model_url, mtl_url, mtlpng_url;
            last_model_url = prevProps.model_url;
            this.props.model_url?
                (model_url = this.props.model_url):(model_url = null);
            this.props.mtl_url?
                (mtl_url = this.props.mtl_url):(mtl_url = null);
            this.props.mtlpng_url?
                (mtlpng_url = this.props.mtlpng_url):(mtlpng_url = null);
            // console.log("model_url", model_url);

            this.model_url = model_url;
            this.mtl_url = mtl_url;
            this.mtlpng_url= mtlpng_url;

            if(this.drawing === false){
                // console.log("Did update start drawing");
                this.drawing = true;
                if(prevProps.model_url) {
                    this.removeModel();
                    this.load_model();
                    this.animate();
                } else {
                    this.init_variable();
                    this.init(this.props.width, this.props.height);
                    this.load_model();
                    this.animate();
                }
            }
        }

    }

    render(){

        return(
            <div className="bim_show">

                <div className="bim_show_layer2">
                    <div className="bim_show_region">
                        <Progress percent={this.state.load_percent} showInfo={false}/>
                        <div className="region" id={this.state.div_id}  style={{width: this.props.width, height:this.props.height}}>{}</div>

                    </div>
                </div>
            </div>

        )
    }
}




export default withRouter(BIMShow)