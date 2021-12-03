import React, {Component} from 'react'

import {Link, withRouter} from 'react-router-dom'
import {Image, List, Button, Drawer, Table} from 'antd';
import sample_pic from "../../assets/000002.jpg";
import {reqModalData} from "../../api"
import BIMShow from "../../pages/bim_show/bim_show"

import "./table_style.less"

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
            datalist: all_data
        })
    };

    componentWillMount() {
            this.getModalData();
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
                <BIMShow div_id={item.number+"input"+"sensor"} model_url={item.data_url} height={100} width={200}/>
            )
        }
    };

    onDetailClick = (item) =>{

    };

    titles = ["编号","数据预览","描述","上传日期","数据类型",""];

    columns = [
        {title: this.titles[0], dataIndex: 'number', key: 'number', width: "120px", align: "center", className: "v-center",
                    sorter: (a, b) => a.number - b.number,
        },
        {title: this.titles[1], dataIndex: 'data', key: 'data', width: '280px', align: "center", className: "v-center", render: (data) => this.showComponent(data, true)},
        {title: this.titles[2], dataIndex: 'descript', key: 'descript', width: "280px", align: "center", className: "v-center",},
        {title: this.titles[3], dataIndex: 'date', key:'date' ,width: "200px", align: "center", className: "v-center"},
        {title: this.titles[4], dataIndex: 'data_type', key:'data_type' ,width: "200px", align: "center", className: "v-center",
            filters: [{text:'图像', value:'图像' }, {text:'视频', value:'视频'},{text:'点云', value:'点云'},], onFilter: (value, record) => record.data_type.indexOf(value) === 0,
        },
        {title: this.titles[5], width: "200px", align: "center", className: "v-center", render: () => <Button onClick={() => this.onDetailClick()}>查看详情</Button>}
    ];

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
                <Table
                    columns={this.columns}
                    dataSource={this.state.datalist}
                    pagination={{position: 'bottomRight', pageSize: 10}}
                    className="b_list_layout"
                />
                {/*<div className="Contentbox">*/}
                {/*    <ul className="con_title">*/}
                {/*        <li style={{width: "80px"}}>编号</li>*/}
                {/*        <li style={{width: "280px"}}>数据预览</li>*/}
                {/*        <li style={{width: "280px"}}>描述</li>*/}
                {/*        <li style={{width: "200px"}}>上传日期</li>*/}
                {/*        <li style={{width: "200px"}}>数据类型</li>*/}

                {/*    </ul>*/}
                {/*    <div id="con_menu1">*/}
                {/*        <List*/}
                {/*            bordered*/}
                {/*            itemLayout="vertical"*/}
                {/*            pagination={{*/}
                {/*                onChange: page => {*/}
                {/*                    console.log(page);*/}
                {/*                },*/}
                {/*                pageSize: 10,*/}
                {/*            }}*/}
                {/*            size="large"*/}
                {/*            dataSource={this.state.datalist}*/}
                {/*            className="b_list_layout"*/}
                {/*            renderItem={item => (*/}
                {/*                <List.Item*/}
                {/*                >*/}
                {/*                    <ul className="con_li_ul">*/}
                {/*                        <li className="con_li_li" style={{*/}
                {/*                            margin: "0 auto",*/}
                {/*                            position: "relative",*/}
                {/*                            top: "40%",*/}
                {/*                            width: "80px"*/}
                {/*                        }}> {item.number}</li>*/}
                {/*                        <li className="con_li_li" style={{*/}
                {/*                            margin: "0 auto",*/}
                {/*                            position: "relative",*/}
                {/*                            top: "15%",*/}
                {/*                            width: "280px"*/}
                {/*                        }}>{this.showComponent(item)}</li>*/}
                {/*                        <li className="con_li_li" style={{*/}
                {/*                            margin: "0 auto",*/}
                {/*                            position: "relative",*/}
                {/*                            top: "40%",*/}
                {/*                            width: "280px"*/}
                {/*                        }}> {item.descript}</li>*/}
                {/*                        <li className="con_li_li" style={{*/}
                {/*                            margin: "0 auto",*/}
                {/*                            position: "relative",*/}
                {/*                            top: "40%",*/}
                {/*                            width: "200px"*/}
                {/*                        }}> {item.date}</li>*/}
                {/*                        <li className="con_li_li" style={{*/}
                {/*                            margin: "0 auto",*/}
                {/*                            position: "relative",*/}
                {/*                            top: "40%",*/}
                {/*                            width: "200px"*/}
                {/*                        }}> {item.data_type}</li>*/}
                {/*                        <li className="con_li_li" style={{*/}
                {/*                            margin: "0 auto",*/}
                {/*                            position: "relative",*/}
                {/*                            top: "40%",*/}
                {/*                            width: "200px"*/}
                {/*                        }}> <Button onClick={() => this.onClick(item)}>查看详情</Button></li>*/}
                {/*                    </ul>*/}
                {/*                </List.Item>*/}
                {/*            )}*/}
                {/*        />*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>

        )
    }
}

export default withRouter(SensorDatabaseComponent)