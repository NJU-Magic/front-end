import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import sample_pic from "../../assets/000002.jpg"
import { Input, Button, Image, Card, List, Tabs } from 'antd';
import "./data_management_content.less"
import SensorDatabaseComponent from "../../components/data_management_components/sensor_database"
import SingleModalResDatabaseComponent from "../../components/data_management_components/single_modal_res_database"
import MultiModalResDatabaseComponent from  "../../components/data_management_components/multi_modal_res_database"
import InspectionResDatabase from "../../components/data_management_components/inspection_res_database"
import BimDatabase from "../../components/data_management_components/bim_database"


const style_select={
    display:'block'
}

const style_unselect={
    display:'none'
};

const { TabPane } = Tabs;

function callback(key) {
    console.log(key);
}


const MyTabs = () => (
    <Tabs defaultActiveKey="1" size="large" onChange={callback}  className="tabs" style={{fontSize: '0px'}}>
        <TabPane tab="模态数据库" key="1">
            <SensorDatabaseComponent/>
        </TabPane>
        <TabPane tab="单模态算法结果数据库" key="2">
            <SingleModalResDatabaseComponent/>
        </TabPane>
        <TabPane tab="多模态算法结果数据库" key="3">
            <MultiModalResDatabaseComponent/>
        </TabPane>
        <TabPane tab="巡检结果数据库" key="4">
            <InspectionResDatabase/>
        </TabPane>
        <TabPane tab="BIM数据库" key="5">
            <BimDatabase/>
        </TabPane>
    </Tabs>
);

class DataResearchBody extends Component{
    state = {
        num1: 3,
    };

    query = () =>{

    };

    addNewData = () =>{

    };

    render(){
        const { current } = this.state;
        return (
            <div>

                <div className="query_layout">
                    <div className="query_wrapper">
                        <div className="query_input_div">
                            <Input placeholder="172.27.142.89" className="query_input"/>
                        </div>
                        <div className="button_query_div">
                            <Button onClick={() => this.query()} type="primary" className="button_query">查询</Button>
                        </div>
                        <div className="button_add_new_data_div">
                            <Button onClick={() => this.addNewData()} type="primary" className="button_add_new_data">添加新数据</Button>
                        </div>
                    </div>
                </div>

                <div className="wrapper">
                    <MyTabs/>
                </div>

            </div>


        )
    }
}

function select_change(obj){
        console.log(obj);
}

function w_close(){
    var modal = document.getElementById('dia_d');
    modal.style.display = "none";
}

function w_open(){
     var modal = document.getElementById('dia_d');
     modal.style.display = "block";
}

function add_lilist_d(num, id) {
    for(let i = 0; i < num; i++){
        var li_1=document.createElement("li");
        addli_d(li_1, i + 1)
        document.getElementById(id).appendChild(li_1);
    }
}

function addli_d(obj, idx){
    var ul = document.createElement("ul");
    ul.className = "con_li_ul_d"
    obj.appendChild(ul)

    var li_1=document.createElement("li");
    li_1.className = "con_li_li_d"
    li_1.innerText = idx;
    var li_2=document.createElement("li");
    li_2.className = "con_li_li_d"
    li_2.innerText = idx + 1;
    var li_3=document.createElement("li");
    li_3.className = "con_li_li_d"
    li_3.innerText = idx + 1;
    var li_4=document.createElement("li");
    li_4.className = "con_li_li_d"
    li_4.innerText = idx + 1;
    var li_5=document.createElement("li");
    li_5.className = "con_li_li_d"
    li_5.innerText = idx;
    var li_6=document.createElement("li");
    li_6.className = "con_li_li_d"
    li_6.innerText = idx;
    var li_7=document.createElement("li");
    li_7.className = "con_li_li_d"
    li_7.innerText = idx;

    ul.appendChild(li_1);
    ul.appendChild(li_2);
    ul.appendChild(li_3);
    ul.appendChild(li_4);
    ul.appendChild(li_5);
    ul.appendChild(li_6);
    ul.appendChild(li_7);
}


/*
<li>输入描述<textarea rows="5" cols="74"> </textarea> </li>
<li>数据类型<select><option value ="1">条目一</option><option value ="2">条目二</option></select></li>
<li>场景类型<select><option value ="1">条目一</option><option value ="2">条目二</option></select></li>
<li className="but_d"><button className="d_but_d" id="b_delete1">删除该数据</button></li>
</ul>

<ul id="input_data2" className="input_data">
    <li>Data 2</li>
    <li><input type="file"/> <img src="" alt=""/></li>

    <li>输入描述<textarea rows="5" cols="74"> </textarea> </li>
    <li>数据类型<select><option value ="1">条目一</option><option value ="2">条目二</option></select></li>
    <li>场景类型<select><option value ="1">条目一</option><option value ="2">条目二</option></select></li>
    <li className="but_d"><button className="d_but_d" id="b_delete2">删除该数据</button></li>
</ul>

<ul className="end_dia">
    <li>成组:<input type="radio" name="group" id="group"/>是<input type="radio" name="group" id="group" checked/>否</li>
<li className="but_d"> <button className="d_but_d" id="b_add">添加数据</button></li>
<p> </p>
<li className="but_d"><button className="d_but_d" id="b_submit">提交</button></li>
<li className="but_d"><button className="d_but_d" id="b_cancel" onClick={()=>(w_close())}>取消</button></li>
</ul>
</div>
</div>

<div id="DataSearch">
    <div style={{alignItems:"center",alignContent:"center"}}>
        <MyTabs/>
    </div>

    <div className="Menubox_d">

        <ul>
            <li id="menu1_d">
                按数据类型筛选
                <br/>
                <select className='m_select_d' onChange={()=>(select_change(this))}>
                    <option value ="1">2</option>
                    <option value ="2">3</option>
                </select>
            </li>
            <li id="menu2_d">
                按场景类型筛选
                <br/>
                <select className='m_select_d' onChange={()=>(select_change(this))}>
                    <option value ="1">2</option>
                    <option value ="2">3</option>
                </select>
            </li>
            <li id="menu3_d">
                是否成组筛选
                <br/>
                <select className='m_select_d' onChange={()=>(select_change(this))}>
                    <option value ="1">否</option>
                    <option value ="2">是</option>
                </select>
            </li>
            <li className="m_button_d"> <button id="m_btn" className="menu_button_d" onClick={()=>(w_open())}>添加数据</button> </li>
        </ul>
    </div>
    <div className="Contentbox_d">
        <ul className="con_title_d">
            <li>编号</li>
            <li>数据预览</li>
            <li>数据名称</li>
            <li>数据类型</li>
            <li>场景类型</li>
            <li>上传日期</li>
            <li>数据来源</li>
        </ul>
        <div id="con_menu1_d" style={style_select}>
            <ul className ="con_list_d" id = "con_ul1_d">
                <ul className="con_li_ul_d">
                    <li className = "con_li_li_d"> 1</li>
                    <li className = "con_li_li_d"> 1</li>
                    <li className = "con_li_li_d"> 2</li>
                    <li className = "con_li_li_d"> 2</li>
                    <li className = "con_li_li_d"> 3</li>
                    <li className = "con_li_li_d"> 3</li>
                    <li className = "con_li_li_d"> 3</li>
                </ul>
                <ul className="con_li_ul_d">
                    <li className = "con_li_li_d"> 2</li>
                    <li className = "con_li_li_d"> 2</li>
                    <li className = "con_li_li_d"> 3</li>
                    <li className = "con_li_li_d"> 3</li>
                    <li className = "con_li_li_d"> 4</li>
                    <li className = "con_li_li_d"> 4</li>
                    <li className = "con_li_li_d"> 4</li>
                </ul>
                <ul className="con_li_ul_d">
                    <li className = "con_li_li_d"> 3</li>
                    <li className = "con_li_li_d"> 2</li>
                    <li className = "con_li_li_d"> 3</li>
                    <li className = "con_li_li_d"> 3</li>
                    <li className = "con_li_li_d"> 4</li>
                    <li className = "con_li_li_d"> 4</li>
                    <li className = "con_li_li_d"> 4</li>
                </ul>
                <ul className="con_li_ul_d">
                    <li className = "con_li_li_d"> 4</li>
                    <li className = "con_li_li_d"> 2</li>
                    <li className = "con_li_li_d"> 3</li>
                    <li className = "con_li_li_d"> 3</li>
                    <li className = "con_li_li_d"> 4</li>
                    <li className = "con_li_li_d"> 4</li>
                    <li className = "con_li_li_d"> 4</li>
                </ul>
                <ul className="con_li_ul_d">
                    <li className = "con_li_li_d"> 5</li>
                    <li className = "con_li_li_d"> 2</li>
                    <li className = "con_li_li_d"> 3</li>
                    <li className = "con_li_li_d"> 3</li>
                    <li className = "con_li_li_d"> 4</li>
                    <li className = "con_li_li_d"> 4</li>
                    <li className = "con_li_li_d"> 4</li>
                </ul>
            </ul>
        </div>
    </div>
</div>
* */

//当选择完成图片之后调用
function read_img(){
    var input =  document.querySelector("input");
    //1. 拿到fileinput里面的文件, 这个file是一个file对象， file对象不能直接展示的
    var file =input.files[0];
    console.log(file);

    //2. 读取文件，成功img标签可以直接使用的格式
    //FileReader类就是专门用来读文件的
    var reader = new FileReader();

    //3. 开始读文件
    //readAsDataURL: dataurl它的本质就是图片的二进制数据， 进行base64加密后形成的一个字符串， 这个字符串可以直接作用img标签的图片资源使用

    reader.readAsDataURL(file);

    //4. 因为文件读取是一个耗时操作， 所以它在回调函数中，才能够拿到读取的结果
    reader.onload = function() {
        console.log(reader.result);
        //直接使用读取的结果
        document.querySelector("img").src = reader.result;
    }
    document.querySelector("img").src = file;
}


export default withRouter(DataResearchBody)