import React, {Component} from 'react'
import {Input, Button, Image, Card, List, Tabs, Drawer, message} from 'antd';
import {withRouter} from 'react-router-dom';
import demopic from "../../assets/000002.jpg"
import "./single_modal_process_detection.less"
import BIMShow from "../bim_show/bim_show"
import memoryUtils from "../../utils/memoryUtils"
import {reqModalData, algorithmCall} from "../../api";

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


class SingleModalProcessSegmentation extends Component {
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
        selected_data_depth: sample_data,
        selected_data_nir: sample_data,
        selected_data_recx: sample_data,
        selected_data_pc: sample_data,

        selected_data_rgb_output: sample_data,
        selected_data_depth_output: sample_data,
        selected_data_nir_output: sample_data,
        selected_data_recx_output: sample_data,
        selected_data_pc_output: sample_data,

    };

    getModalData = async () => {
        let res = await reqModalData();
        res = res.res;
        let all_data = [];
        for (let i = 0; i < res.length; i++) {

            const sdata = {
                number: res[i].Sensor_ID,
                data_url : "http://" + res[i].net_path + ":" + res[i].port + res[i].Data_Location,
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

    _submit = async (title) => {
        message.success("提交成功")
        if (title === 'rgb') {
            ;
        } else if (title === 'pc') {
            console.log(this.state.selected_data_pc);
            let data = {"algorithm": "SYC1", 'method_name': "MinkowskiEngine", 'input_path': this.state.selected_data_pc.data_url, 'Sensor_ID': this.state.selected_data_pc.number};
            let res = await algorithmCall(data);
            console.log(res)

            if(res.success === 1) {
                message.success("处理成功")
                let temp_item = {
                    number: this.state.selected_data_pc.number,
                    data_url: res.result_path,
                    descript: this.state.selected_data_pc.descript,
                    date: this.state.selected_data_pc.date,
                    data_type: this.state.selected_data_pc.data_type,
                }
                this.setState({
                    // data_url: item.data_url,
                    visible_data_drawer: false,
                    selected_data_pc_output: temp_item })
            } else {
                message.error("处理失败")
            }
        }
    };

    onDataListClick = (item) => {
        console.log("choose", item.number, item.title)
        // console.log(item.data_url);
        let title = item.title;
        // const tmp_data = {
        //     number: item.number,
        //     data_url : item.data_url,
        //     descript: item.descript,
        //     date: item.date,
        //     data_type: item.data_type,
        // };
        // console.log(item)
        if(title === "rgb"){
            console.log(item)
            this.setState({
                // data_url: item.data_url,
                visible_data_drawer: false,
                selected_data_rgb: item,},
            () => {console.log("pc")
                console.log(this.state.visible_data_drawer)
                console.log(this.state.selected_data_pc)})
            // console.log("rgb");
        } else if (title === "pc") {
            // this.setState((item)=>({
            //     // data_url: item.data_url,
            //     visible_data_drawer: false,
            //     selected_data_pc: item,
            // }))
            console.log(item)
            this.setState({
                visible_data_drawer: false,
                selected_data_pc: item,},
                () => {console.log("pc")
                console.log(this.state.visible_data_drawer)
                console.log(this.state.selected_data_pc)}
            )
        }
        // console.log(this.state.selected_data_rgb);
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
                <BIMShow div_id={item.number+bim_show_sufix+"process_seg"} model_url={item.data_url} height={144} width={256}/>
            )
        }
    };

    showComponent2=(item, bim_show_sufix)=>{
        console.log(bim_show_sufix);

        const data_type = item.data_type;

        if(data_type==="视频"){
            // console.log("here");
            return(
                <video height="250" width="400" controls="controls" muted id='v_left'
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
                <BIMShow div_id={bim_show_sufix+"process_seg"} model_url={item.data_url} height={250} width={400}/>
            )
        }
    };


    get2DLayout = (title) => {
        console.log("render_Layout")
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
                                        <Button onClick={() => this._submit(title)} type="primary"
                                                className="button_submit">提交</Button>

                                    </div>
                                </div>
                                <div className="img_layout">
                                    {this.showComponent2(this.state["selected_data_" + title], "input" + title)}
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
                                    {this.showComponent2(this.state["selected_data_" + title + "_output"], "output" + title)}
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

    renderMain(){
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
        return this.getTotalLayout(sensor_config);
    }


    // componentWillMount() {
    //     let sensor_config = {
    //         "rgb": false,
    //         "depth": false,
    //         "nir": false,
    //         "recx": false,
    //         "pc": false
    //     };
    //     let e = memoryUtils.system_config["sensor_type_options_chosen"];
    //     for (let i=0;i<e.length;i++){
    //         if(e[i]==='RGB'){
    //             sensor_config["rgb"] = true;
    //         }
    //         if(e[i]==='深度图'){
    //             sensor_config["depth"] = true;
    //         }
    //         if(e[i]==='红外光'){
    //             sensor_config["nir"] = true;
    //         }
    //         if(e[i]==='热成像'){
    //             sensor_config["recx"] = true;
    //         }
    //         if(e[i]==='点云'){
    //             sensor_config["pc"] = true;
    //         }
    //     }
    //     //console.log(memoryUtils.system_config["sensor_type_options_chosen"]);
    //     this.mainLayout = this.getTotalLayout(sensor_config);
    //
    // }

    render() {
        console.log("render")
        // let mainLayout = this.mainLayout;
        return (

            <div>
                {this.renderMain()}

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

export default withRouter(SingleModalProcessSegmentation)