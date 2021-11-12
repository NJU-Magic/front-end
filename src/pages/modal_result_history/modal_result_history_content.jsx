import React, {Component} from 'react'
import "./modal_result_history.css"
import {Link, withRouter} from 'react-router-dom'
import sample_pic from "../../assets/000002.jpg"
import {Input, Button, Image, Card, List, Tabs, Drawer} from 'antd';
import { SmileTwoTone, HeartTwoTone, CheckCircleTwoTone } from '@ant-design/icons';
const data=[];
for(let i=0;i<30;i++){
    data.push({
        number: `${i}`,

        cover:
            sample_pic,
        descript:
            '重建重建重建重建重建重建重建重建重建重建',
        date:"2021-10-10",
        alg_name:"psgn",
        pro_state:"success"
    });
}

const style_select={
    display:'block'
}

const style_unselect={
    display:'none'
};

class ModalResultHistoryBody extends Component{
    state = {
        num1: 3,
    };

    render(){
        const { current } = this.state;
        return (
            <div>
                <div id="Tab">
                    <div className="Contentbox">
                       <ul className="con_title">
                            <li style={{ width:"80px"}}>编号</li>
                            <li style={{ width:"280px"}}>结果预览</li>
                            <li style={{ width:"280px"}}>描述</li>
                            <li style={{ width:"200px"}}>处理日期</li>
                            <li style={{ width:"200px"}}>算法名称</li>
                            <li style={{ width:"150px"}}>处理状态</li>
                        </ul>
                        <div id="con_menu1" style={style_select}>
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
                                dataSource={data}
                                className="b_list_layout"
                                renderItem={item => (
                                    <List.Item
                                    >
                                        <ul className="con_li_ul">
                                            <li className = "con_li_li" style={{margin: "0 auto", position: "relative", top: "40%", width:"80px"}}> {item.number}</li>
                                            <li className = "con_li_li" style={{margin: "0 auto", position: "relative", top: "12%", width:"280px"}}> <img src={item.cover} width={200}/></li>
                                            <li className = "con_li_li" style={{margin: "0 auto", position: "relative", top: "30%", width:"280px"}}> {item.descript}</li>
                                            <li className = "con_li_li" style={{margin: "0 auto", position: "relative", top: "40%", width:"200px"}}> {item.date}</li>
                                            <li className = "con_li_li" style={{margin: "0 auto", position: "relative", top: "40%", width:"200px"}}> {item.alg_name}</li>
                                            <li className = "con_li_li" style={{margin: "0 auto", position: "relative", top: "40%", width:"150px"}}> <CheckCircleTwoTone twoToneColor="#52c41a" /></li>
                                        </ul>
                                    </List.Item>
                                )}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function menu_turn(id, num, thisnum){
    for(let i = 1; i <= num; i++){
        if(id===i){
            document.getElementById("menu" + i.toString()).className="select";
            document.getElementById("con_menu" + i.toString()).style.display = 'block';
        }else {
            document.getElementById("menu" + i.toString()).className="unselect";
            document.getElementById("con_menu" + i.toString()).style.display = 'none';
        }
    }
}

function add_lilist(num, id) {
    for(let i = 0; i < num; i++){
        var li_1=document.createElement("li");
        addli(li_1, i + 1)
        document.getElementById(id).appendChild(li_1);
    }
}

function addli(obj, idx){
    var ul = document.createElement("ul");
    ul.className = "con_li_ul"
    obj.appendChild(ul)

    var li_1=document.createElement("li");
    li_1.className = "con_li_li"
    li_1.innerText = idx;
    var li_2=document.createElement("li");
    li_2.className = "con_li_li"
    li_2.innerText = idx + 1;
    var li_3=document.createElement("li");
    li_3.className = "con_li_li"
    li_3.innerText = idx;
    var li_4=document.createElement("li");
    li_4.className = "con_li_li"
    li_4.innerText = idx;
    var li_5=document.createElement("li");
    li_5.className = "con_li_li"
    li_5.innerText = idx;
    var li_6=document.createElement("li");
    li_6.className = "con_li_li"
    li_6.innerText = idx;
    ul.appendChild(li_1);
    ul.appendChild(li_2);
    ul.appendChild(li_3);
    ul.appendChild(li_4);
    ul.appendChild(li_5);
    ul.appendChild(li_6);
}

export default withRouter(ModalResultHistoryBody)