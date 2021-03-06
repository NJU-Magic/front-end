import React, {Component} from 'react'

import {Link, withRouter} from 'react-router-dom'
import {Button, Image, List, Table} from 'antd';
import sample_pic from "../../assets/000002.jpg";
import {reqSingleModalAlgData} from "../../api";
import BIMShow from "../../pages/bim_show/bim_show"

import "./table_style.less"

function video_load(url, querySe) {
    let player = document.querySelector(querySe);
    console.log(url);
    player.src = url;
    player.play()
}

class SingleModalResDatabaseComponent extends Component{
    state = {
        current: 'mail',
        datalist:[]
    };

    getSingleModalAlgData = async () => {
        let res = await reqSingleModalAlgData();
        res = res.res;
        let all_data = [];
        for (let i = 0; i < res.length; i++) {

            const sdata = {
                number: res[i].Singlemode_ID,
                task_type: res[i].Task,
                algrithm_name:res[i].Algorithm,

                date: res[i].Date,

                input_type: res[i].InputData_Type,
                output_type: res[i].Data_Type,
                input_data_url : "http://"+res[i].net_path+":"+res[i].port+res[i].InputData_Location,
                output_data_url : "http://"+res[i].net_path+":"+res[i].port+res[i].Data_Location,

                input_data: {number: res[i].Singlemode_ID, input_type: res[i].InputData_Type, input_data_url: "http://"+res[i].net_path+":"+res[i].port+res[i].InputData_Location,},
                output_data: {number: res[i].Singlemode_ID, output_type: res[i].Data_Type, output_data_url : "http://"+res[i].net_path+":"+res[i].port+res[i].Data_Location,}
                };
            all_data.push(sdata);
        }

        this.setState({
            datalist: all_data
        })
    };

    componentWillMount() {
        this.getSingleModalAlgData();
    }


    showComponent=(item, input)=>{
        console.log(item);

        const task_type = input?item.input_type:item.output_type;

        const bim_show_sufix = input?"input":"output";

        if(task_type==="??????"){
            console.log("here");
            return(
                <video height="130" width="180" controls="controls" muted id='v_left'
                       onClick={() => (video_load(input?item.input_data_url:item.output_data_url, "#v_left"))}>
                    <source src={input?item.input_data_url:item.output_data_url} type="video/mp4"/>
                </video>
            )
        }
        if(task_type==="??????"){
            return(
                <img src={input?item.input_data_url:item.output_data_url} height={130}/>
            )
        }
        if(task_type==="??????"){
            return(
                <BIMShow div_id={item.number+bim_show_sufix+"single"} model_url={input?item.input_data_url:item.output_data_url} height={100} width={200}/>
            )
        }
    };

    onDetailClick = (item) =>{

    };

    titles = ["??????","??????","??????","??????","????????????","????????????",""];

    columns = [
        {title: this.titles[0], dataIndex: 'number', key: 'number', width: "120px", align: "center", className: "v-center",
            sorter: (a, b) => a.number - b.number,
        },
        {title: this.titles[1], dataIndex: 'input_data', key: 'input_data', width: '280px', align: "center", className: "v-center", render: (input_data) => this.showComponent(input_data, true)},
        {title: this.titles[2], dataIndex: 'output_data', key: 'output_data', width: "280px", align: "center", className: "v-center", render: (output_data) => this.showComponent(output_data, false)},
        {title: this.titles[3], dataIndex: 'task_type', key: 'task_type', width: "200px", align: "center", className: "v-center",},
        {title: this.titles[4], dataIndex: 'date', key:'date' ,width: "200px", align: "center", className: "v-center"},
        {title: this.titles[5], dataIndex: 'algrithm_name', key:'algrithm_name' ,width: "200px", align: "center", className: "v-center"},
        {title: this.titles[6], width: "200px", align: "center", className: "v-center", render: () => <Button onClick={() => this.onDetailClick()}>????????????</Button>}
    ];

    render(){
        const path = this.props.location.pathname;
        const { current } = this.state;



        return (
            <div>
                <div className="Contentbox">
                    <Table
                        columns={this.columns}
                        dataSource={this.state.datalist}
                        pagination={{position: 'bottomRight', pageSize: 10}}
                        className="b_list_layout"
                    />
                    {/*<ul className="con_title">*/}
                    {/*    <li style={{ width:"80px"}}>??????</li>*/}
                    {/*    <li style={{ width:"280px"}}>??????</li>*/}
                    {/*    <li style={{ width:"280px"}}>??????</li>*/}
                    {/*    <li style={{ width:"200px"}}>??????</li>*/}
                    {/*    <li style={{ width:"200px"}}>????????????</li>*/}
                    {/*    <li style={{ width:"200px"}}>????????????</li>*/}
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
                    {/*                    <li className = "con_li_li" style={{margin: "0 auto", position: "relative", top: "12%", width:"280px"}}> {this.showComponent(item, false)}</li>*/}
                    {/*                    <li className = "con_li_li" style={{margin: "0 auto", position: "relative", top: "40%", width:"200px"}}> {item.task_type}</li>*/}
                    {/*                    <li className = "con_li_li" style={{margin: "0 auto", position: "relative", top: "40%", width:"200px"}}> {item.date}</li>*/}
                    {/*                    <li className = "con_li_li" style={{margin: "0 auto", position: "relative", top: "40%", width:"200px"}}> {item.algrithm_name}</li>*/}
                    {/*                    <li className = "con_li_li" style={{margin: "0 auto", position: "relative", top: "40%", width:"200px"}}> <Button onClick={() => this.onDetailClick(item)}>????????????</Button></li>*/}

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

export default withRouter(SingleModalResDatabaseComponent)