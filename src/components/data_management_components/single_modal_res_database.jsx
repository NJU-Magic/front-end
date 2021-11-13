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
        input_data_name: `$数据{i}`,
        cover:
        sample_pic,
        descript:
            '重建重建重建重建重建重建重建重建重建重建',
        date:"2021-10-10",
        alg_name:"点云",

    });
}

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

                output_detail: "http://"+res[i].net_path+":"+res[i].port+res[i].output_detail

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
                        <li style={{ width:"280px"}}>输入</li>
                        <li style={{ width:"280px"}}>输出</li>
                        <li style={{ width:"200px"}}>任务</li>
                        <li style={{ width:"200px"}}>处理日期</li>
                        <li style={{ width:"200px"}}>处理算法</li>
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
                                        <li className = "con_li_li" style={{margin: "0 auto", position: "relative", top: "12%", width:"280px"}}> {this.showComponent(item, false)}</li>
                                        <li className = "con_li_li" style={{margin: "0 auto", position: "relative", top: "40%", width:"200px"}}> {item.task_type}</li>
                                        <li className = "con_li_li" style={{margin: "0 auto", position: "relative", top: "40%", width:"200px"}}> {item.date}</li>
                                        <li className = "con_li_li" style={{margin: "0 auto", position: "relative", top: "40%", width:"200px"}}> {item.algrithm_name}</li>
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

export default withRouter(SingleModalResDatabaseComponent)