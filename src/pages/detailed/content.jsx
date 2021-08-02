import React, {Component} from 'react'
import "./content.css"
import {Link, withRouter} from 'react-router-dom'

import ex_video from "../../example/t1.mp4"
import ex_airplane from "../../example/airplane.ply"

import * as THREE from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { PLYLoader } from "three/examples/jsm/loaders/PLYLoader";

class MyHeader extends Component{
    state = {
        current: 'mail',
    };

    handleClick = e => {
        console.log('click ', e);
        this.setState({ current: e.key });
    };

    render(){
        const { current } = this.state;
        return (

            <div>
                <div className="detailed_info" >
                    详细信息
                    <div className="d_left">
                        场景名称：
                        <br/>
                        扫描日期：
                    </div>
                    <div className="d_middle">
                        视频时长
                        <br/>
                        场景类型：
                    </div>
                    <div className="d_right">
                        杂物数量：
                        <br/>
                        杂物类型：
                    </div>
                </div>
                <div className="input_data">
                    输入数据
                    {/*<Player
                    ref={c => { this.player = c;}}
                    poster="https://video-react.js.org/assets/poster.png"
                    >
                    <source
                      src={path}
                      type="video/mp4"
                    />
                    <ControlBar autoHide={false} disableDefaultControls={false}>
                      <ReplayControl seconds={10} order={1.1} />
                      <ForwardControl seconds={30} order={1.2} />
                      <PlayToggle />
                      <CurrentTimeDisplay order={4.1} />
                      <TimeDivider order={4.2} />
                      <PlaybackRateMenuButton rates={[5, 2, 1.5, 1, 0.5]} order={7.1} />
                      <VolumeMenuButton />
                    </ControlBar>
                    </Player>*/}
                    <div className="i_left">
                        <video width="400" height="250" controls="controls">
                          <source src={ex_video} type="video/mp4" />
                        </video>
                        <br/>
                        RGB
                    </div>

                    <div className="i_middle">
                        <video width="400" height="250" controls="controls">
                          <source src={ex_video} type="video/mp4" />
                        </video>
                        <br/>
                        深度图
                    </div>

                    <div className="i_right">
                        <video width="400" height="250" controls="controls">
                          <source src={ex_video} type="video/mp4" />
                        </video>
                        <br/>
                        激光雷达
                    </div>
                </div>
                <div className="scene_reconstruction">
                    {/*<script type="text/javascript" src="./my3d.js">aaa</script>*/}
                    场景重建
                    <button className="rec_button" type="button" onClick={()=>(draw(ex_airplane,"rec1"))}>start</button>
                    <div className="rec" id="rec1">{}</div>
                </div>
                <div className="semantic_segmentation">
                    语义分割
                    <button className="seg_button" type="button" onClick={()=>(draw(ex_airplane,"seg1"))}>start</button>
                    <div className="rec" id="seg1">{}</div>
                </div>
            </div>
        )
    }
}

// draw();
const height = 500
const width = 500
var aid;

var renderer, camera, scene, gui, light, controls;
function initRender(div_id) {
    if(document.getElementById(div_id).childNodes[0])
        document.getElementById(div_id).removeChild(document.getElementById(div_id).childNodes[0]);

    renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setSize(width, height);
    //告诉渲染器需要阴影效果
    renderer.setClearColor(0xffffff);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.getElementById(div_id).appendChild(renderer.domElement);
}

function initCamera() {
    camera = new THREE.PerspectiveCamera(45, width/height, 0.1, 1000);
    camera.position.set(1000, 1000, 1000);
    camera.lookAt(new THREE.Vector3(0,0,0));
}

function initScene() {
    scene = new THREE.Scene();
}

//初始化dat.GUI简化试验流程
function initGui() {
    //声明一个保存需求修改的相关数据的对象

    // let gui = new dat.GUI();
    //将设置属性添加到gui当中，gui.add(对象，属性，最小值，最大值）
}

function initLight() {
    scene.add(new THREE.AmbientLight(0x444444));

    light = new THREE.PointLight(0xffffff);
    light.position.set(0,0,50);

    //告诉平行光需要开启阴影投射
    light.castShadow = true;

    scene.add(light);
}

function initModel(url) {

    // 辅助工具
    var helper = new THREE.AxesHelper(50);
    scene.add(helper);

    var loader = new PLYLoader();
    loader.load(url, function (geometry) {
    // loader.load(ex_ply_rec, function (geometry) {
        // console.log('显示信息')

        //更新顶点的法向量
        geometry.computeVertexNormals();

        // //创建纹理，并将模型添加到场景中
        var material = new THREE.MeshStandardMaterial( { color: 0x0055ff, flatShading: true } );
        var mesh = new THREE.Mesh( geometry, material );
        // console.log(mesh);
        mesh.position.set(-25, 0, 0)
        // mesh.rotation.y = Math.PI;
        var t = 0.02
        mesh.scale.set(t, t, t);
        // mesh.castShadow = true;
        scene.add( mesh );

        // // 展示自建几何体
        // // var meshMaterial = new THREE.MeshNormalMaterial({ color: 0xff4500 });
        // var sphereGeometry = new THREE.SphereGeometry(14, 10, 10);
        // // console.log(sphereGeometry)
        // var sphere = new THREE.Mesh(sphereGeometry, material);
        // sphere.position.x = 40;
        // sphere.position.y = 0;
        // sphere.position.z = 0;
        // scene.add(sphere)
    }, (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded')
        console.log(xhr.total)
    },
    (error) => {
        console.log(error);
    });
    // loader.setPropertyNameMapping('red')
    // var modelObj;
    //    var loader = new ColladaLoader();
    //     loader.load( "../../example/airplane.ply", function ( collada ) {
    //       //找到模型中需要的对象。将相机看向这个对象是为了让这个对象显示在屏幕中心
    //       collada.scene.traverse( function ( child ) {
    //          if ( child instanceof THREE.SkinnedMesh ) {
    //             modelObj = child;
    //             camera.lookAt( child.position );
    //          }
    //       } );
    //       //将模型的场景加入到整体的场景
    //       modelObj.material.opacity = 0.8;
    //       scene.add( collada.scene );
    //
    //    } );

}

//初始化性能插件
// var stats;
// function initStats() {
//     stats = new Stats();
//     document.body.appendChild(stats.dom);
// }

//用户交互插件 鼠标左键按住旋转，右键按住平移，滚轮缩放
function initControls() {

    controls = new OrbitControls( camera, renderer.domElement );

    // 如果使用animate方法时，将此函数删除
    //controls.addEventListener( 'change', render );
    // 使动画循环使用时阻尼或自转 意思是否有惯性
    controls.enableDamping = true;
    //动态阻尼系数 就是鼠标拖拽旋转灵敏度
    //controls.dampingFactor = 0.25;
    //是否可以缩放
    controls.enableZoom = true;
    //是否自动旋转
    controls.autoRotate = true;
    controls.autoRotateSpeed = 20;
    //设置相机距离原点的最远距离
    controls.minDistance  = 1;
    //设置相机距离原点的最远距离
    controls.maxDistance  = 200;
    //是否开启右键拖拽
    controls.enablePan = true;
}

function render() {

    renderer.render( scene, camera );
    renderer.shadowMap.enabled = true;
}

//窗口变动触发的函数
function onWindowResize() {

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    render();
    renderer.setSize( width, height );

}

function animate() {
    render();
    //更新性能插件
    // stats.update();
    //更新控制器
    controls.update();
    cancelAnimationFrame(aid);
    aid = requestAnimationFrame(animate);
}

function draw(url, div_id) {
    initGui();
    initRender(div_id);
    initScene();
    initCamera();
    initLight();
    initModel(url);
    initControls();
    // initStats();
    animate();
    window.onresize = onWindowResize;
}

export default withRouter(MyHeader)