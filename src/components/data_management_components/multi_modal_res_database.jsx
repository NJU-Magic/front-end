import React, {Component} from 'react'

import {Link, withRouter} from 'react-router-dom'
import {Button, Drawer, Image, List, Table} from 'antd';
import sample_pic from "../../assets/000002.jpg";
import {reqMultiModalData} from "../../api";
import BIMShow from "../../pages/bim_show/bim_show"

import "./table_style.less"

function video_load(url, querySe) {
    let player = document.querySelector(querySe);
    console.log(url);
    player.src = url;
    player.play()
}

class MultiModalResDatabaseComponent extends Component{
    state = {
        current: 'mail',
        datalist:[],
        visible_drawer: false,
        drawer_item: {number: 0, data_url: sample_pic, data_type: "图像"}
    };

    getMultiModalData = async () => {
        let res = await reqMultiModalData();
        res = res.res;
        let all_data = [];
        for (let i = 0; i < res.length; i++) {

            let modal_list = []

            for (let j = 0; j < res[i]["SingleModalList"].length; j++){
                const s_list = {
                    data_type: res[i]["SingleModalList"][j].Data_Type,
                    data_name: res[i]["SingleModalList"][j].Name,
                    // data_name: "ttt",
                    data_url: "http://" + res[i].net_path + ":" + res[i].port + res[i]["SingleModalList"][j].Data_Location,
                }
                modal_list.push(s_list)
            }

            const sdata = {
                number: res[i].Multimode_ID,
                task_type: res[i].Task,
                algrithm_name: res[i].Algorithm,
                date: res[i].Date,

                data_type: res[i].Data_Type,
                data_url: "http://" + res[i].net_path + ":" + res[i].port + res[i].Data_Location,

                data: {number: res[i].Multimode_ID, data_type: res[i].Data_Type, data_url: "http://" + res[i].net_path + ":" + res[i].port + res[i].Data_Location,},

                multi_modal_list: modal_list
            };
            all_data.push(sdata);
        }

        this.setState({
            datalist: all_data
        })
    };

    componentWillMount() {
        this.getMultiModalData();
    }


    showComponent=(item, input)=>{
        console.log(item);

        const data_type = item.data_type;

        const bim_show_sufix = input?"input":"output";

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
                <BIMShow div_id={item.number+bim_show_sufix+"multi"} model_url={item.data_url} height={100} width={200}/>
            )
        }
    };

    onDrawerClose = ()=>{
        this.setState({
            visible_drawer: false
        })
    };

    onDetailClick = (item) =>{

    };

    onModalDetailClick = (item) =>{
        this.setState({
            visible_drawer:true,
            drawer_item:item
        })
    };

    titles = ["编号","输入","输出","任务","处理日期","融合方式",""];

    columns = [
        {title: this.titles[0], dataIndex: 'number', key: 'number', width: "120px", align: "center", className: "v-center",
            sorter: (a, b) => a.number - b.number,
        },
        {title: this.titles[1], dataIndex: 'multi_modal_list', key: 'multi_modal_list', width: '280px', align: "center", className: "v-center",
                                        render: (multi_modal_list) =>
                                            <List
                                                itemLayout="vertical"
                                                size="small"
                                                dataSource={multi_modal_list}
                                                className="bb_list_layout"
                                                renderItem={item_2 => (
                                            <List.Item>
                                                <Button onClick={() => this.onModalDetailClick(item_2)} style={{border: "0", background:"none", color: "#147ab8", font:"bold"}}>
                                                    {item_2.data_name}
                                                </Button>
                                            </List.Item>
                                                )}
                                            />},
        {title: this.titles[2], dataIndex: 'data', key: 'data', width: "280px", align: "center", className: "v-center", render: (data) => this.showComponent(data, false)},
        {title: this.titles[3], dataIndex: 'task_type', key: 'task_type', width: "200px", align: "center", className: "v-center",},
        {title: this.titles[4], dataIndex: 'date', key:'date' ,width: "200px", align: "center", className: "v-center"},
        {title: this.titles[5], dataIndex: 'algrithm_name', key:'algrithm_name' ,width: "200px", align: "center", className: "v-center"},
        {title: this.titles[6], width: "200px", align: "center", className: "v-center", render: () => <Button onClick={() => this.onDetailClick()}>查看详情</Button>}
    ];

    render(){
        const path = this.props.location.pathname;
        const { current } = this.state;

        return (
            <div>
                <Drawer
                    title="数据预览"
                    width={600}
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
                    {this.showComponent(this.state.drawer_item, true)}
                </Drawer>

                <div className="Contentbox">
                     <Table
                        columns={this.columns}
                        dataSource={this.state.datalist}
                        pagination={{position: 'bottomRight', pageSize: 10}}
                        className="b_list_layout"
                    />
                    {/*<ul className="con_title">*/}
                    {/*    <li style={{ width:"80px"}}>编号</li>*/}
                    {/*    <li style={{ width:"280px"}}>输入</li>*/}
                    {/*    <li style={{ width:"280px"}}>输出</li>*/}
                    {/*    <li style={{ width:"200px"}}>任务</li>*/}
                    {/*    <li style={{ width:"200px"}}>处理日期</li>*/}
                    {/*    <li style={{ width:"200px"}}>融合方式</li>*/}
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
                    {/*            <List.Item>*/}
                    {/*                <ul className="con_li_ul">*/}
                    {/*                    <li className = "con_li_li" style={{margin: "0 auto", position: "relative", top: "40%", width:"80px"}}> {item.number}</li>*/}
                    {/*                    <li className = "con_li_li" style={{margin: "0 auto", position: "relative", top: "6%", width:"280px"}}>*/}
                    {/*                        <List*/}
                    {/*                            itemLayout="vertical"*/}
                    {/*                            size="small"*/}
                    {/*                            dataSource={item.multi_modal_list}*/}
                    {/*                            className="bb_list_layout"*/}
                    {/*                            renderItem={item_2 => (*/}
                    {/*                        <List.Item>*/}
                    {/*                            <Button onClick={() => this.onModalDetailClick(item_2)} style={{border: "0", background:"none", color: "#147ab8", font:"bold"}}>*/}
                    {/*                                {item_2.data_name}*/}
                    {/*                            </Button>*/}
                    {/*                        </List.Item>*/}
                    {/*                            )}*/}
                    {/*                        />*/}
                    {/*                    </li>*/}
                    {/*                    <li className = "con_li_li" style={{margin: "0 auto", position: "relative", top: "12%", width:"280px"}}> {this.showComponent(item, false)}</li>*/}
                    {/*                    <li className = "con_li_li" style={{margin: "0 auto", position: "relative", top: "40%", width:"200px"}}> {item.task_type}</li>*/}
                    {/*                    <li className = "con_li_li" style={{margin: "0 auto", position: "relative", top: "40%", width:"200px"}}> {item.date}</li>*/}
                    {/*                    <li className = "con_li_li" style={{margin: "0 auto", position: "relative", top: "40%", width:"200px"}}> {item.algrithm_name}</li>*/}
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

export default withRouter(MultiModalResDatabaseComponent)