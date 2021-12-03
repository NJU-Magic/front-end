import React, {Component} from 'react'
import {Input, Button, Image, Card, List, Tabs, Drawer, message} from 'antd';
import {withRouter} from 'react-router-dom';
import demopic from "../../assets/000002.jpg"
import "./single_modal_process_detection.less"
import BIMShow from "../bim_show/bim_show"
import memoryUtils from "../../utils/memoryUtils"
import {reqModalData} from "../../api";

function video_load(url, querySe) {
    let player = document.querySelector(querySe);
    // console.log(url);
    player.src = url;
    player.play()
}

let sample_data = {
    number: 0,
    data_url : demopic,
    descript: "sample",
    date: "00",
    data_type: "图像",
}


class SingleModalProcessRecognition extends Component {
    dict_trans = {
        "rgb": "RGB",
        "depth": "深度图",
        "nir": "红外",
        "recx": "热成像",
        "pc": "点云",
    }

    state = {
        visible_data_drawer: false,
        visible_res_drawer: false,
        image_gallery_lists: [],
        datalist: [],
        sensor_datalist: [],
        tmpdatalist: [],

        input_video_url: "",
        output_video_url:"",
        resultlist:[],
        output:{},

        selected_data_rgb: sample_data,
        selected_data_depth:sample_data,
        selected_data_nir:sample_data,
        selected_data_recx:sample_data,
        selected_data_pc:sample_data,

    };

    getModalData = async () => {
        let res = await reqModalData();
        res = res.res;
        let all_data = [];
        for (let i = 0; i < res.length; i++) {

            const sdata = {
                number: res[i].Sensor_ID,
                data_url : "http://" + res[i].net_path + ":" +res[i].port + res[i].Data_Location,
                descript: res[i].Name,
                date: res[i].Date,
                data_type: res[i].Data_Type,
                data: {number: res[i].Sensor_ID, data_url : "http://" + res[i].net_path + ":" +res[i].port + res[i].Data_Location, data_type: res[i].Data_Type,}
            };
            all_data.push(sdata);
        }

        this.setState({
            tmpdatalist: all_data
        })
    };

    select_data_from_database = async (title) => {
        await this.getModalData();
        let all_data = this.state.tmpdatalist;
        let show_data = [];
        // console.log(all_data, title);
        if (title === "rgb") {
            for (let i = 0; i < all_data.length; i++) {
                if (all_data[i].data_type === "图像" || all_data[i].data_type === "视频") {
                    let tmp_data = all_data[i]
                    tmp_data["title"] = title
                    show_data.push(tmp_data)
                }
            }
        }else if(title === "pc"){
            for (let i = 0; i < all_data.length; i++) {
                if (all_data[i].data_type === "点云") {
                    let tmp_data = all_data[i]
                    tmp_data["title"] = title
                    show_data.push(tmp_data)
                }
            }
        }

        this.setState({
            visible_data_drawer: true,
            sensor_datalist: show_data
        })
    };

    _submit = () => {

    };

    onDataListClick = (item) => {
        console.log(item.data_url);
        let title = item.title;
        // const tmp_data = {
        //     number: item.number,
        //     data_url : item.data_url,
        //     descript: item.descript,
        //     date: item.date,
        //     data_type: item.data_type,
        // };
        console.log(item)
        if(title === "rgb"){
            this.setState((item)=>({
                // data_url: item.data_url,
                visible_data_drawer: false,
                selected_data_rgb: item,
            }))
            console.log("rgb");
        }
        console.log(this.state.selected_data_rgb);
    };

    onClose = () => {
        this.setState({
            visible_res_drawer: false,
            visible_data_drawer: false
        })
    };

    onCheckHistory = (sensor_type) => {
        var path = {
            pathname: "/nju/modal_results_history",
            state: {
                sensor_type: sensor_type,
                current_task: "检测",
                module: "单模态"
            },
        };
        this.props.history.push(path)
    };

    showComponent=(item, bim_show_sufix)=>{
        // console.log(item);

        const data_type = item.data_type;

        if(data_type==="视频"){
            // console.log("here");
            return(
                <video height="144" width="256" controls="controls" muted id='v_left'
                       onClick={() => (video_load(item.data_url, "#v_left"))}>
                    <source src={item.data_url} type="video/mp4"/>
                </video>
            )
        }
        if(data_type==="图像"){
            return(
                <img src={item.data_url} width={256} height={144}/>
            )
        }
        if(data_type==="点云"){
            return(
                <BIMShow div_id={item.number+bim_show_sufix+"process_rec"} model_url={item.data_url} height={144} width={256}/>
            )
        }
    };

    showComponent2=(item, bim_show_sufix)=>{
        // console.log(item);

        const data_type = item.data_type;

        if(data_type==="视频"){
            // console.log("here");
            return(
                <video height="400" width="250" controls="controls" muted id='v_left'
                       onClick={() => (video_load(item.data_url, "#v_left"))}>
                    <source src={item.data_url} type="video/mp4"/>
                </video>
            )
        }
        if(data_type==="图像"){
            return(
                <img src={item.data_url} width={400} height={250}/>
            )
        }
        if(data_type==="点云"){
            return(
                <BIMShow div_id={item.number+bim_show_sufix+"process_rec"} model_url={item.data_url} height={400} width={250}/>
            )
        }
    };


    get2DLayout = (title) => {
        return (
            <div>
                <div className="title">
                    {this.dict_trans[title]}
                </div>
                <div className="layout_outer2D">
                    <div className="layout">
                        <div className="l_title">
                            算法输入
                        </div>
                        <div className="disp_layout">
                            <div className="disp_inner_layout">
                                <div className="button_layout">
                                    <div>
                                        <Button onClick={() => this.select_data()} type="primary"
                                                className="button_selectdata">从本地选择</Button>

                                    </div>
                                    <div>
                                        <Button onClick={() => this.select_data_from_database(title)} type="primary"
                                                className="button_selectdata">从数据库中选择</Button>

                                    </div>
                                    <div>
                                        <Button onClick={() => this.onCheckHistory(title)} type="primary"
                                                className="button_selectdata">查看历史结果</Button>

                                    </div>
                                    <div>
                                        <Button onClick={() => this._submit()} type="primary"
                                                className="button_submit">提交</Button>

                                    </div>
                                </div>
                                <div className="img_layout">
                                    {this.showComponent2(this.state["selected_data_" + title], "input")}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="b_layout">
                        <div className="b_title">
                            算法输出
                        </div>
                        <div className="output_layout">
                            <div className="b_img_layout">
                                <div style={{paddingLeft: "15px", paddingRight: "15px"}}>
                                    {this.showComponent2(this.state["selected_data_" + title], "output")}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    };

    getTotalLayout = (sensor_config) => {
        var layout = [];
        if (sensor_config["rgb"] === true) {
            layout.push(<div key={1}>{this.get2DLayout("rgb")}</div>)
        }
        if (sensor_config["depth"] === true) {
            layout.push(<div key={2}>{this.get2DLayout("depth")}</div>)
        }
        if (sensor_config["nir"] === true) {
            layout.push(<div key={3}>{this.get2DLayout("nir")}</div>)
        }
        if (sensor_config["recx"] === true) {
            layout.push(<div key={4}>{this.get2DLayout("recx")}</div>)
        }
        if (sensor_config["pc"] === true) {
            layout.push(<div>key={5}{this.get2DLayout("pc")}</div>)
        }
        return layout;
    };

    componentWillMount() {
        let sensor_config = {
            "rgb": false,
            "depth": false,
            "nir": false,
            "recx": false,
            "pc": false
        };
        let e = memoryUtils.system_config["sensor_type_options_chosen"];
        for (let i=0;i<e.length;i++){
            if(e[i]==='RGB'){
                sensor_config["rgb"] = true;
            }
            if(e[i]==='深度图'){
                sensor_config["depth"] = true;
            }
            if(e[i]==='红外光'){
                sensor_config["nir"] = true;
            }
            if(e[i]==='热成像'){
                sensor_config["recx"] = true;
            }
            if(e[i]==='点云'){
                sensor_config["pc"] = true;
            }
        }
        //console.log(memoryUtils.system_config["sensor_type_options_chosen"]);
        this.mainLayout = this.getTotalLayout(sensor_config);

    }

    render() {
        console.log("render")
        const mainLayout = this.mainLayout;
        return (

            <div>
                {mainLayout}

                <Drawer
                    title="单模态数据库"
                    width={720}
                    onClose={this.onClose}
                    visible={this.state.visible_data_drawer}
                    bodystyle={{paddingBottom: 80}}
                    extra={
                        <space>
                            <Button onClick={this.onClose}> 取消 </Button>
                            <Button onClick={this.onClose} type="primary"> 确定 </Button>
                        </space>
                    }
                >
                    <List
                        bordered
                        itemLayout="vertical"
                        size="large"
                        dataSource={this.state.sensor_datalist}
                        className="datalist"
                        renderItem={item => (
                            <List.Item
                                key={item.number}
                                actions={[
                                    <a key="option" onClick={e => {
                                        e.preventDefault();
                                        this.onDataListClick(item);
                                    }}> 选择该数据 </a>]}
                            >
                                <div style={{display: "flex"}}>
                                    <div>{this.showComponent(item, "draw")}</div>

                                    <div>
                                        <div style={{display: "flex", marginLeft: "20px", fontSize: "20px"}}>
                                            <div>数据名称：</div>
                                            <div>{item.descript}</div>
                                        </div>
                                        <div style={{display: "flex", marginLeft: "20px", fontSize: "20px"}}>
                                            <div>数据类型：</div>
                                            <div>{item.data_type}</div>
                                        </div>
                                        <div style={{display: "flex", marginLeft: "20px", fontSize: "20px"}}>
                                            <div>上传日期：</div>
                                            <div>{item.date}</div>
                                        </div>
                                    </div>
                                </div>
                            </List.Item>
                        )}
                    />
                </Drawer>
            </div>
        )
    }
}

export default withRouter(SingleModalProcessRecognition)

// import React, {Component} from 'react'
// import {Input, Button, Image, Card, List, Tabs, Drawer, message} from 'antd';
// import {withRouter} from 'react-router-dom';
// import demopic from "../../assets/000002.jpg"
// import "./single_modal_process_detection.less"
// import BIMShow from "../bim_show/bim_show"
// import memoryUtils from "../../utils/memoryUtils"
// import {reqAllSensorData, reqAllSMResData, reqDetectionVideo, reqModalData} from "../../api";
// import {NearestMipmapLinearFilter} from "three";
//
//
// const data = [];
// for (let i = 0; i < 15; i++) {
//
//     let image_gallery = [];
//     for (let j = 0; j < 30; j++) {
//         image_gallery.push(demopic);
//     }
//     data.push({
//         title: `检测结果 ${i}`,
//
//         classname:
//             '桌子',
//         time:
//             '99.9%',
//         image_gallery: image_gallery
//     });
// }
//
// const database = [];
// for (let i = 0; i < 15; i++) {
//     database.push({
//         title: `检测结果 ${i}`,
//         dataname: `数据 ${i}`,
//         datatype: `点云`,
//         date: "2021-10-10"
//     });
// }
//
//
// const test_video_url = "http://114.212.81.162:4100/Data/Test/t1.mp4";
//
// function v_left_load(url, querySe) {
//     let player = document.querySelector(querySe);
//     console.log(url);
//     player.src = url;
//     player.play()
// }
//
//
// function video_load(url, querySe) {
//     let player = document.querySelector(querySe);
//     console.log(url);
//     player.src = url;
//     player.play()
// }
//
// class SingleModalProcessRecognition extends Component {
//     state = {
//         visible_data_drawer: false,
//         visible_res_drawer: false,
//         image_gallery_lists: [],
//         datalist: [],
//         sensor_datalist: [],
//         tmpdatalist: [],
//
//         input_video_url: "",
//         output_video_url:"",
//         resultlist:[],
//         output:{}
//
//     };
//
//
//     select_data = () => {
//
//     };
//
//     select_data_from_database = async (title) => {
//         await this.getModalData();
//         let all_data = this.state.tmpdatalist;
//         let show_data = [];
//         console.log(all_data, title);
//         if (title === "rgb") {
//             for (let i = 0; i < all_data.length; i++) {
//                 if (all_data[i].data_type === "图像" || all_data[i].data_type === "视频") {
//                     show_data.push(all_data[i])
//                 }
//             }
//         }else if(title === "点云"){
//             for (let i = 0; i < all_data.length; i++) {
//                 if (all_data[i].data_type === "点云") {
//                     show_data.push(all_data[i])
//                 }
//             }
//         }
//
//         this.setState({
//             visible_data_drawer: true,
//             sensor_datalist: show_data
//         })
//     };
//
//
//     _submit = async (title) => {
//         let res = await reqDetectionVideo();
//
//         res = res.res;
//         console.log(res);
//         let output_detail = [];
//
//         for (let k = 0; k < res.output_detail.length; k++) {
//             let image_gallery = [];
//             for (let j = 0; j < res.output_detail[k].image_gallery.length; j++) {
//                 image_gallery.push("http://" + res.net_path + ":" + res.port + res.output_detail[k].image_gallery[j])
//             }
//
//             output_detail.push({
//                 number:`${k}`,
//                 image_gallery: image_gallery,
//                 classname: res.output_detail[k].class,
//                 time: res.output_detail[k].time,
//             })
//         }
//
//         const sdata = {
//
//             task_type: res.task_type,
//             input_type: res.input_type,
//             output_type: res.output_type,
//             algrithm_name: res.algrithm_name,
//
//             date: res.process_date,
//
//             input_video_url: "http://" + res.net_path + ":" + res.port + res.input_video_url,
//             output_video_url: "http://" + res.net_path + ":" + res.port + res.output_video_url,
//
//             input_image_url: "http://" + res.net_path + ":" + res.port + res.input_image_url,
//             output_image_url: "http://" + res.net_path + ":" + res.port + res.output_image_url,
//
//             input_model_url: "http://" + res.net_path + ":" + res.port + res.input_model_url,
//             output_model_url: "http://" + res.net_path + ":" + res.port + res.input_model_url,
//
//             output_detail: output_detail
//         };
//
//         this.setState({
//             output: sdata,
//             output_video_url: sdata.output_video_url,
//             resultlist: sdata.output_detail
//         });
//
//     };
//
//     onResultListClick = (item) => {
//         console.log(item);
//         this.setState({
//             visible_res_drawer: true,
//             image_gallery_lists: item.image_gallery
//         })
//     };
//
//     onDataListClick = (item) => {
//         if (item.data_type !== "视频") {
//             message.warning("目前只支持加载视频");
//         } else {
//             console.log(item.data_url);
//             this.setState({
//                 data_url: item.data_url,
//                 visible_data_drawer: false
//             })
//         }
//         console.log(this.state);
//     };
//
//     onClose = () => {
//         this.setState({
//             visible_res_drawer: false,
//             visible_data_drawer: false
//         })
//     };
//
//     getModalData = async () => {
//         let res = await reqModalData();
//         res = res.res;
//         let all_data = [];
//         for (let i = 0; i < res.length; i++) {
//
//             const sdata = {
//                 number: res[i].Sensor_ID,
//                 data_url : "http://" + res[i].net_path + ":" +res[i].port + res[i].Data_Location,
//                 descript: res[i].Name,
//                 date: res[i].Date,
//                 data_type: res[i].Data_Type,
//                 data: {number: res[i].Sensor_ID, data_url : "http://" + res[i].net_path + ":" +res[i].port + res[i].Data_Location, data_type: res[i].Data_Type,}
//             };
//             all_data.push(sdata);
//         }
//
//         this.setState({
//             tmpdatalist: all_data
//         })
//     };
//
//     getAllSMResData = async () => {
//         let res = await reqAllSMResData();
//         res = res.res;
//         let all_data = [];
//         for (let i = 0; i < res.length; i++) {
//             if (res[i].task_type !== "检测") {
//                 continue
//             }
//
//             let output_detail = [];
//
//             for (let k = 0; k < res[i].output_detail.length; k++) {
//                 let image_gallery = [];
//                 for (let j = 0; j < res[i].output_detail[k].image_gallery.length; j++) {
//                     image_gallery.push("http://" + res[i].net_path + ":" + res[i].port + res[i].output_detail[k].image_gallery[j])
//                 }
//
//                 output_detail.push({
//                     image_gallery: image_gallery,
//                     classname: res[i].output_detail[k].class,
//                     time: res[i].output_detail[k].time,
//                 })
//             }
//
//
//             const sdata = {
//                 number: `${i}`,
//
//                 task_type: res[i].task_type,
//                 input_type: res[i].input_type,
//                 output_type: res[i].output_type,
//                 algrithm_name: res[i].algrithm_name,
//
//                 date: res[i].process_date,
//
//                 input_video_url: "http://" + res[i].net_path + ":" + res[i].port + res[i].input_video_url,
//                 output_video_url: "http://" + res[i].net_path + ":" + res[i].port + res[i].output_video_url,
//
//                 input_image_url: "http://" + res[i].net_path + ":" + res[i].port + res[i].input_image_url,
//                 output_image_url: "http://" + res[i].net_path + ":" + res[i].port + res[i].output_image_url,
//
//                 input_model_url: "http://" + res[i].net_path + ":" + res[i].port + res[i].input_model_url,
//                 output_model_url: "http://" + res[i].net_path + ":" + res[i].port + res[i].input_model_url,
//
//                 output_detail: output_detail
//
//             };
//             all_data.push(sdata);
//         }
//
//         this.setState({
//             datalist: all_data
//         })
//     };
//
//     onCheckHistory = (sensor_type) => {
//         var path = {
//             pathname: "/nju/modal_results_history",
//             state: {
//                 sensor_type: sensor_type,
//                 current_task: "检测",
//                 module: "单模态"
//             },
//         };
//         this.props.history.push(path)
//     };
//
//     get2DLayout = (title) => {
//         return (
//             <div>
//                 <div className="title">
//                     {title}
//                 </div>
//                 <div className="layout_outer2D">
//                     <div className="layout">
//                         <div className="l_title">
//                             算法输入
//                         </div>
//                         <div className="disp_layout">
//                             <div className="disp_inner_layout">
//                                 <div className="button_layout">
//                                     <div>
//                                         <Button onClick={() => this.select_data()} type="primary"
//                                                 className="button_selectdata">从本地选择</Button>
//
//                                     </div>
//                                     <div>
//                                         <Button onClick={() => this.select_data_from_database(title)} type="primary"
//                                                 className="button_selectdata">从数据库中选择</Button>
//
//                                     </div>
//                                     <div>
//                                         <Button onClick={() => this.onCheckHistory(title)} type="primary"
//                                                 className="button_selectdata">查看历史结果</Button>
//
//                                     </div>
//                                     <div>
//                                         <Button onClick={() => this._submit(title)} type="primary"
//                                                 className="button_submit">提交</Button>
//
//                                     </div>
//                                 </div>
//                                 <div className="img_layout">>
//                                     <video width="400" height="250" controls="controls" muted id='v_left'
//                                            onClick={() => (v_left_load(this.state.input_video_url, "#v_left"))}>
//                                         <source src={this.state.input_video_url} type="video/mp4"/>
//                                     </video>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="b_layout">
//                         <div className="b_title">
//                             算法输出
//                         </div>
//                         <div className="output_layout">
//                             <div className="b_img_layout">>
//                                 <video width="400" height="250" controls="controls" muted id='l_left'
//                                        onClick={() => (v_left_load(this.state.output_video_url, "#l_left"))}>
//                                     <source src={this.state.output_video_url} type="video/mp4"/>
//                                 </video>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//
//             </div>
//         )
//     };
//
//     get3DLayout = (title) => {
//         return (
//             <div>
//                 <div className="title">
//                     {title}
//                 </div>
//                 <div className="layout_outer3D">
//                     <div className="layout3D">
//                         <div className="l_title3D">
//                             算法输入
//                         </div>
//                         <div className="disp_layout3D">
//                             <div className="disp_inner_layout3D">
//                                 <div className="button_layout3D">
//                                     <div>
//                                         <Button onClick={() => this.select_data()} type="primary"
//                                                 className="button_selectdata3D">从本地选择</Button>
//
//                                     </div>
//                                     <div>
//                                         <Button onClick={() => this.select_data()} type="primary"
//                                                 className="button_selectdata3D">从数据库中选择</Button>
//
//                                     </div>
//                                     <div>
//                                         <Button onClick={() => this.select_data()} type="primary"
//                                                 className="button_selectdata3D">查看历史结果</Button>
//
//                                     </div>
//                                     <div>
//                                         <Button onClick={() => this._submit()} type="primary"
//                                                 className="button_submit3D">提交</Button>
//
//                                     </div>
//                                 </div>
//                                 <div>
//                                     <div style={{paddingLeft: "15px", paddingRight: "15px", marginTop: "20px"}}>
//                                         <BIMShow bim_url={this.state.bim_url} width={650} height={410}/>
//                                     </div>
//                                 </div>
//
//                             </div>
//                         </div>
//                     </div>
//                     <div className="b_layout3D">
//                         <div className="b_title3D">
//                             算法输出
//                         </div>
//                         <div className="output_layout3D">
//                             <div style={{paddingLeft: "15px", paddingRight: "15px"}}>
//                                 <BIMShow bim_url={this.state.bim_url} width={650} height={410}/>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//
//             </div>
//         )
//     };
//
//     getTotalLayout = (sensor_config) => {
//         var layout = [];
//         if (sensor_config["rgb"] === true) {
//             layout.push(<div>{this.get2DLayout("rgb")}</div>)
//         }
//         if (sensor_config["depth"] === true) {
//             layout.push(<div>{this.get2DLayout("深度图")}</div>)
//         }
//         if (sensor_config["nir"] === true) {
//             layout.push(<div>{this.get2DLayout("红外")}</div>)
//         }
//         if (sensor_config["recx"] === true) {
//             layout.push(<div>{this.get2DLayout("热成像")}</div>)
//         }
//         if (sensor_config["pc"] === true) {
//             layout.push(<div>{this.get3DLayout("点云")}</div>)
//         }
//         return layout;
//     };
//
//     componentWillMount() {
//         let sensor_config = {
//             "rgb": false,
//             "depth": false,
//             "nir": false,
//             "recx": false,
//             "pc": false
//         };
//         let e = memoryUtils.system_config["sensor_type_options_chosen"];
//         for (let i = 0; i < e.length; i++) {
//             if (e[i] === 'RGB') {
//                 sensor_config["rgb"] = true;
//             }
//             if (e[i] === '深度图') {
//                 sensor_config["depth"] = true;
//             }
//             if (e[i] === '红外光') {
//                 sensor_config["nir"] = true;
//             }
//             if (e[i] === '热成像') {
//                 sensor_config["recx"] = true;
//             }
//             if (e[i] === '点云') {
//                 sensor_config["pc"] = true;
//             }
//         }
//
//
//         //console.log(memoryUtils.system_config["sensor_type_options_chosen"]);
//         //this.mainLayout = this.getTotalLayout(sensor_config);
//         this.sensor_config = sensor_config;
//         //this.getAllSMResData();
//         //this.getAllSensorData();
//     }
//
//     showComponent = (item) => {
//         const data_type = item.data_type;
//
//         if (data_type === "视频") {
//             return (
//                 <video height="200" width="270" controls="controls" muted id='v_left'
//                        onClick={() => (video_load(item.data_url, "#v_left"))}>
//                     <source src={item.data_url} type="video/mp4"/>
//                 </video>
//             )
//         }
//         if (data_type === "图像") {
//             return (
//                 <img src={item.data_url} width={270}/>
//             )
//         }
//         if(data_type === "点云"){
//             return(
//                 <BIMShow div_id={item.number+"detection"} model_url={item.data_url} height={100} width={200}/>
//             )
//         }
//     };
//
//     render() {
//         let mainLayout = this.mainLayout;
//         return (
//
//             <div>
//                 {this.getTotalLayout(this.sensor_config)}
//                 <Drawer
//                     title="图片细节"
//                     width={520}
//                     onClose={this.onClose}
//                     visible={this.state.visible_res_drawer}
//                     bodystyle={{paddingBottom: 80}}
//                     extra={
//                         <space>
//                             <Button onClick={this.onClose}> 取消 </Button>
//                             <Button onClick={this.onClose} type="primary"> 确定 </Button>
//                         </space>
//                     }
//                 >
//                     <List
//                         grid={{gutter: 16, column: 4}}
//                         dataSource={this.state.image_gallery_lists}
//                         renderItem={item => (
//                             <List.Item>
//                                 {<img width={100} src={item}/>}
//                             </List.Item>
//                         )}
//                     />
//                 </Drawer>
//
//                 <Drawer
//                     title="单模态数据库"
//                     width={720}
//                     onClose={this.onClose}
//                     visible={this.state.visible_data_drawer}
//                     bodystyle={{paddingBottom: 80}}
//                     extra={
//                         <space>
//                             <Button onClick={this.onClose}> 取消 </Button>
//                             <Button onClick={this.onClose} type="primary"> 确定 </Button>
//                         </space>
//                     }
//                 >
//                     <List
//                         bordered
//                         itemLayout="vertical"
//                         size="large"
//                         dataSource={this.state.sensor_datalist}
//                         className="datalist"
//                         renderItem={item => (
//                             <List.Item
//                                 key={item.title}
//                                 actions={[
//                                     <a key="option" onClick={e => {
//                                         e.preventDefault();
//                                         this.onDataListClick(item);
//                                     }}> 选择该数据 </a>]}
//                             >
//                                 <div style={{display: "flex"}}>
//                                     <div>
//                                         {this.showComponent(item)}
//                                     </div>
//                                     <div>
//                                         <div style={{display: "flex", marginLeft: "20px", fontSize: "15px"}}>
//                                             <div>数据名称：</div>
//                                             <div>{item.descript}</div>
//                                         </div>
//                                         <div style={{display: "flex", marginLeft: "20px", fontSize: "15px"}}>
//                                             <div>数据类型：</div>
//                                             <div>{item.data_type}</div>
//                                         </div>
//                                         <div style={{display: "flex", marginLeft: "20px", fontSize: "15px"}}>
//                                             <div>上传日期：</div>
//                                             <div>{item.date}</div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </List.Item>
//                         )}
//                     />
//                 </Drawer>
//             </div>
//         )
//     }
// }
//
// export default withRouter(SingleModalProcessRecognition)