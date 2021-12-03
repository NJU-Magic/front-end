import React, {Component} from 'react'

import {Link, withRouter} from 'react-router-dom'
import {Button, Image, List, Table} from 'antd';
import sample_pic from "../../assets/000002.jpg";
import {reqBIMSence} from "../../api";
import BIMShow from "../../pages/bim_show/bim_show"

import "./table_style.less"

function video_load(url, querySe) {
    let player = document.querySelector(querySe);
    console.log(url);
    player.src = url;
    player.play()
}

class BimDatabase extends Component{
    state = {
        current: 'mail',
        datalist:[]
    };

    getBIMSence = async () => {
        let res = await reqBIMSence();
        res = res.res;
        let all_data = [];
        for (let i = 0; i < res.length; i++) {

            const sdata = {
                number: res[i].Scene_ID,
                date: res[i].Date,

                // data_type: res[i].Data_Type,
                // data_url : "http://"+res[i].net_path+":" + res[i].port + res[i].Data_Location,
                data : {data_type: res[i].Data_Type, data_url: "http://"+res[i].net_path+":" + res[i].port + res[i].Data_Location},

                description: res[i].Description,
                scene_type: res[i].Type,
                model_name: res[i].Name,
                };
            all_data.push(sdata);
        }

        this.setState({
            datalist: all_data
        })
    };

    componentWillMount() {
        this.getBIMSence();
    }


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
                <BIMShow div_id={item.number+"input"+"bim"} model_url={item.data_url} height={100} width={200}/>
            )
        }
    };

    onDetailClick = () =>{

    };

    titles = ["编号","BIM模型预览","模型名称","描述","场景类型",""];

    columns = [
        {title: this.titles[0], dataIndex: 'number', key: 'number', width: "120px", align: "center", className: "v-center",
            sorter: (a, b) => a.number - b.number,
        },
        {title: this.titles[1], dataIndex: 'data', key: 'data', width: '280px', align: "center", className: "v-center", render: (data) => this.showComponent(data)},
        {title: this.titles[2], dataIndex: 'model_name', key: 'model_name', width: "280px", align: "center", className: "v-center",},
        {title: this.titles[3], dataIndex: 'description', key: 'description', width: "200px", align: "center", className: "v-center",},
        {title: this.titles[4], dataIndex: 'scene_type', key:'scene_type' ,width: "200px", align: "center", className: "v-center"},
        {title: this.titles[5], width: "200px", align: "center", className: "v-center", render: () => <Button onClick={() => this.onDetailClick()}>查看详情</Button>},
    ];

    render(){
        const path = this.props.location.pathname;
        const { current } = this.state;

        return (
            <div>
                <div className="Contentbox" >
                    <Table
                        columns={this.columns}
                        dataSource={this.state.datalist}
                        pagination={{position: 'bottomRight', pageSize: 10}}
                        className="b_list_layout"
                    />
                    {/*<ul className="con_title">*/}
                    {/*    <li style={{ width:"80px"}}>编号</li>*/}
                    {/*    <li style={{ width:"280px"}}>BIM模型预览</li>*/}
                    {/*    <li style={{ width:"280px"}}>模型名称</li>*/}
                    {/*    <li style={{ width:"200px"}}>描述</li>*/}
                    {/*    <li style={{ width:"200px"}}>场景类型</li>*/}
                    {/*    <li style={{ width:"200px"}}> </li>*/}
                    {/*</ul>*/}
                    {/*<div id="con_menu1">*/}
                    {/*    <List*/}
                    {/*        bordered*/}
                    {/*        itemLayout="vertical"*/}
                    {/*        pagination={{*/}
                    {/*            onChange: page => {*/}
                    {/*                console.log(page);*/}
                    {/*            },*/}
                    {/*            pageSize: 10,*/}
                    {/*        }}*/}
                    {/*        size="large"*/}
                    {/*        dataSource={this.state.datalist}*/}
                    {/*        className="b_list_layout"*/}
                    {/*        renderItem={item => (*/}
                    {/*            <List.Item*/}
                    {/*            >*/}
                    {/*                <ul className="con_li_ul">*/}
                    {/*                    <li className = "con_li_li" style={{margin: "0 auto", position: "relative", top: "40%", width:"80px"}}> {item.number}</li>*/}
                    {/*                    <li className = "con_li_li" style={{margin: "0 auto", position: "relative", top: "12%", width:"280px"}}> {this.showComponent(item, true)}</li>*/}
                    {/*                    <li className = "con_li_li" style={{margin: "0 auto", position: "relative", top: "40%", width:"280px"}}> {item.model_name}</li>*/}
                    {/*                    <li className = "con_li_li" style={{margin: "0 auto", position: "relative", top: "6%", width:"200px", height:"200px", overflow:"hidden", fontSize:"small", lineHeight:"20px"}}> {item.description}</li>*/}
                    {/*                    <li className = "con_li_li" style={{margin: "0 auto", position: "relative", top: "40%", width:"200px"}}> {item.scene_type}</li>*/}
                    {/*                    <li className = "con_li_li" style={{margin: "0 auto", position: "relative", top: "40%", width:"200px"}}> <Button onClick={() => this.onDetailClick(item)}>查看详情</Button></li>*/}
                    {/*                </ul>*/}
                    {/*            </List.Item>*/}
                    {/*        )}*/}
                    {/*    />*/}
                    {/*</div>*/}
                </div>
            </div>

        )
    }
}

export default withRouter(BimDatabase)