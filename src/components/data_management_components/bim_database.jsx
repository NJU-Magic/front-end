import React, {Component} from 'react'

import {Link, withRouter} from 'react-router-dom'
import {Button, Image, List} from 'antd';
import sample_pic from "../../assets/000002.jpg";
import {reqAllSMResData} from "../../api";
import BIMShow from "../../pages/bim_show/bim_show"

const data=[];
for(let i=0;i<30;i++){
    data.push({
        number: `${i}`,
        name: `BIM模型 RCF${i}`,
        input_image_url: sample_pic,
        description:
            '隧道BIM模型',
        content:
            'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
        scene_type: '隧道',
        input_type: 'input',
        task_type: "图像"
    });
}

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

    getAllSMResData = async () => {
        let res = await reqAllSMResData();
        res = res.res;
        let all_data = [];
        for (let i = 0; i < res.length; i++) {

            const sdata = {
                number: `${i}`,

                task_type: res[i].task_type,
                input_type: res[i].input_type,
                output_type: res[i].output_type,
                algrithm_name:res[i].algrithm_name,

                date: res[i].process_date,

                input_video_url : "http://"+res[i].net_path+":"+res[i].port+res[i].input_video_url,
                output_video_url : "http://"+res[i].net_path+":"+res[i].port+res[i].output_video_url,

                input_image_url:"http://"+res[i].net_path+":"+res[i].port+res[i].input_image_url,
                output_image_url:"http://"+res[i].net_path+":"+res[i].port+res[i].output_image_url,

                input_model_url:"http://"+res[i].net_path+":"+res[i].port+res[i].input_model_url,
                output_model_url:"http://"+res[i].net_path+":"+res[i].port+res[i].input_model_url,

                output_detail: "http://"+res[i].net_path+":"+res[i].port+res[i].output_detail,

                description: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
                scene_type: '隧道',
                model_name: `BIM模型 RCF${i}`,
                };
            all_data.push(sdata);
        }

        this.setState({
            datalist: all_data
        })
    };

    componentWillMount() {
        this.getAllSMResData();
    }


    showComponent=(item, input)=>{
        console.log(item);

        const task_type = input?item.input_type:item.output_type;

        const bim_show_sufix = input?"input":"output";

        if(task_type==="视频"){
            console.log("here");
            return(
                <video height="130" width="180" controls="controls" muted id='v_left'
                       onClick={() => (video_load(input?item.input_video_url:item.output_video_url, "#v_left"))}>
                    <source src={input?item.input_video_url:item.output_video_url} type="video/mp4"/>
                </video>
            )
        }
        if(task_type==="图像"){
            return(
                <img src={input?item.input_image_url:item.output_image_url} height={130}/>
            )
        }
        if(task_type==="点云"){
            return(
                <BIMShow div_id={item.number+bim_show_sufix} model_url={input?item.input_model_url:item.output_model_url} height={100} width={200}/>
            )
        }
    };

    onDetailClick = (item) =>{

    };

    render(){
        const path = this.props.location.pathname;
        const { current } = this.state;

        return (
            <div>
                <div className="Contentbox">
                    <ul className="con_title">
                        <li style={{ width:"80px"}}>编号</li>
                        <li style={{ width:"280px"}}>BIM模型预览</li>
                        <li style={{ width:"280px"}}>模型名称</li>
                        <li style={{ width:"200px"}}>描述</li>
                        <li style={{ width:"200px"}}>场景类型</li>
                        <li style={{ width:"200px"}}> </li>
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
                                        <li className = "con_li_li" style={{margin: "0 auto", position: "relative", top: "40%", width:"80px"}}> {item.number}</li>
                                        <li className = "con_li_li" style={{margin: "0 auto", position: "relative", top: "12%", width:"280px"}}> {this.showComponent(item, true)}</li>
                                        <li className = "con_li_li" style={{margin: "0 auto", position: "relative", top: "40%", width:"280px"}}> {item.model_name}</li>
                                        <li className = "con_li_li" style={{margin: "0 auto", position: "relative", top: "6%", width:"200px", height:"200px", overflow:"hidden", fontSize:"small", lineHeight:"20px"}}> {item.description}</li>
                                        <li className = "con_li_li" style={{margin: "0 auto", position: "relative", top: "40%", width:"200px"}}> {item.scene_type}</li>
                                        <li className = "con_li_li" style={{margin: "0 auto", position: "relative", top: "40%", width:"200px"}}> <Button onClick={() => this.onDetailClick(item)}>查看详情</Button></li>

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

export default withRouter(BimDatabase)