import React, {Component} from 'react'

import {Link, withRouter} from 'react-router-dom'
import {Image, List, Button, Drawer} from 'antd';
import sample_pic from "../../assets/000002.jpg";
import {reqAllSensorData} from "../../api"
import BIMShow from "../../pages/bim_show/bim_show"
const data = [];
for (let i = 0; i < 30; i++) {
    data.push({
        number: `${i}`,

        cover:
        sample_pic,
        descript:
            '重建重建重建重建重建重建重建重建重建重建',
        date: "2021-10-10",
        datatype: "点云",

    });
}

function video_load(url, querySe) {
    let player = document.querySelector(querySe);
    console.log(url);
    player.src = url;
    player.play()
}

class SensorDatabaseComponent extends Component {
    state = {
        current: 'mail',
        datalist: [],
        visible_drawer:false,
        model_url_to_show:"",
        mtl_url_to_show:null,
        mtl_png_utl_to_show:null
    };

    getAllSensorData = async () => {
        let res = await reqAllSensorData();
        res = res.res;
        let all_data = [];
        for (let i = 0; i < res.length; i++) {

            const sdata = {
                number: `${i}`,

                cover: "http://" + res[i].net_path + ":" +res[i].port + res[i].cover_path,
                descript:
                res[i].description,
                date: res[i].upload_date,
                data_type: res[i].data_type,

                data_url : "http://" + res[i].net_path + ":" +res[i].port + res[i].data_path,

                model_path: "http://" + res[i].net_path + ":" +res[i].port + res[i].model_path,
                mtl_path : res[i].mtl_path? null: "http://" + res[i].net_path + ":" +res[i].port + res[i].mtl_path,
                mtl_png_path : res[i].mtl_png_path? null: "http://" + res[i].net_path + ":" +res[i].port + res[i].mtl_png_path
            };
            all_data.push(sdata);
        }

        this.setState({
            datalist: all_data
        })
    };

    componentWillMount() {
            this.getAllSensorData();
    }

    onClick = (item) =>{
        this.setState({
            visible_drawer:true,
            model_url_to_show:item.model_path,
            mtl_url_to_show:item.mtl_path,
            mtl_png_utl_to_show:item.mtl_png_path
        })
    };

    onDrawerClose = ()=>{
        this.setState({
            visible_drawer: false
        })
    };

    showComponent=(item)=>{
        console.log(item);

        const data_type = item.data_type;

        if(data_type==="视频"){
            console.log("here");
            return(
                <video height="150" width="200" controls="controls" muted id='v_left'
                       onClick={() => (video_load(item.data_url, "#v_left"))}>
                    <source src={item.data_url} type="video/mp4"/>
                </video>
            )
        }
        if(data_type==="图像"){
            return(
                <img src={item.data_url} height={150}/>
            )
        }
        if(data_type==="点云"){
            return(
                <img src={item.cover} height={150}/>
            )
        }
    };


    render() {
        const path = this.props.location.pathname;
        const {current} = this.state;
        return (
            <div>
                <Drawer
                    title="模型展示"
                    width={1200}
                    onClose={this.onDrawerClose}
                    visible={this.state.visible_drawer}
                    bodystyle={{paddingBottom: 80}}
                    extra={
                        <space>
                            <Button onClick={this.onDrawerClose}> 取消 </Button>
                            <Button onClick={this.onDrawerClose} type="primary"> 确定 </Button>
                        </space>
                    }
                >

                    <BIMShow bim_url={this.state.model_url_to_show} height={1000} width={1200}/>

                </Drawer>
                <div className="Contentbox">
                    <ul className="con_title">
                        <li style={{width: "80px"}}>编号</li>
                        <li style={{width: "280px"}}>数据预览</li>
                        <li style={{width: "280px"}}>描述</li>
                        <li style={{width: "200px"}}>上传日期</li>
                        <li style={{width: "200px"}}>数据类型</li>

                    </ul>
                    <div id="con_menu1">
                        <List
                            bordered
                            itemLayout="vertical"
                            pagination={{
                                onChange: page => {
                                    console.log(page);
                                },
                                pageSize: 10,
                            }}
                            size="large"
                            dataSource={this.state.datalist}
                            className="b_list_layout"
                            renderItem={item => (
                                <List.Item
                                >
                                    <ul className="con_li_ul">
                                        <li className="con_li_li" style={{
                                            margin: "0 auto",
                                            position: "relative",
                                            top: "40%",
                                            width: "80px"
                                        }}> {item.number}</li>
                                        <li className="con_li_li" style={{
                                            margin: "0 auto",
                                            position: "relative",
                                            top: "15%",
                                            width: "280px"
                                        }}>{this.showComponent(item)}</li>
                                        <li className="con_li_li" style={{
                                            margin: "0 auto",
                                            position: "relative",
                                            top: "40%",
                                            width: "280px"
                                        }}> {item.descript}</li>
                                        <li className="con_li_li" style={{
                                            margin: "0 auto",
                                            position: "relative",
                                            top: "40%",
                                            width: "200px"
                                        }}> {item.date}</li>
                                        <li className="con_li_li" style={{
                                            margin: "0 auto",
                                            position: "relative",
                                            top: "40%",
                                            width: "200px"
                                        }}> {item.data_type}</li>
                                        <li className="con_li_li" style={{
                                            margin: "0 auto",
                                            position: "relative",
                                            top: "40%",
                                            width: "200px"
                                        }}> <Button onClick={() => this.onClick(item)}>查看详情</Button></li>
                                    </ul>
                                </List.Item>
                            )}
                        />
                    </div>
                </div>
            </div>

        )
    }
}

export default withRouter(SensorDatabaseComponent)