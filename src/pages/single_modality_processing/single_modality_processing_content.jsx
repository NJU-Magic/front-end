import React, {Component} from 'react'
import "./single_modality_processing_content.css"
import {Link, withRouter} from 'react-router-dom'
import sample_pic from "../../assets/000002.jpg"

const style_select={
    display:'block'
}

const style_unselect={
    display:'none'
};

class SingleModalityProcessingBody extends Component{
    state = {
        num1: 3,
    };

    render(){
        const { current } = this.state;
        return (
            <div>
                <div id="Tab">
                    <div className="Menubox">
                        <ul>
                            <li id="menu1" onMouseOver="setTab('menu',1,2)" className="select" onClick={()=>(menu_turn(1, 4) )}>基于图像的三维重建</li>
                            <li id="menu2" onMouseOver="setTab('menu',2,2)" className="unselect" onClick={()=>(menu_turn(2, 4))}>基于图像的检测识别</li>
                            <li id="menu3" onMouseOver="setTab('menu',2,3)" className="unselect" onClick={()=>(menu_turn(3, 4))}>基于点云的场景解析</li>
                            <li id="menu4" onMouseOver="setTab('menu',2,4)" className="unselect" onClick={()=>(menu_turn(4, 4))}>基于深度图的场景补全</li>
                            <li className="m_button"> <button id="m_btn" className="menu_button" >新建处理</button> </li>
                        </ul>
                    </div>
                    <div className="Contentbox">
                       <ul className="con_title">
                            <li>编号</li>
                            <li>结果预览</li>
                            <li>描述</li>
                            <li>处理日期</li>
                            <li>算法名称</li>
                            <li>处理状态</li>
                        </ul>
                        <div id="con_menu1" style={style_select}>
                            <ul className ="con_list" id = "con_ul1">
                                <ul className="con_li_ul">
                                    <li className = "con_li_li"> 1</li>
                                    <li className = "con_li_li"> 1</li>
                                    <li className = "con_li_li"> 2</li>
                                    <li className = "con_li_li"> 2</li>
                                    <li className = "con_li_li"> 3</li>
                                    <li className = "con_li_li"> 3</li>
                                </ul>
                                <ul className="con_li_ul">
                                    <li className = "con_li_li"> 2</li>
                                    <li className = "con_li_li"> 2</li>
                                    <li className = "con_li_li"> 3</li>
                                    <li className = "con_li_li"> 3</li>
                                    <li className = "con_li_li"> 4</li>
                                    <li className = "con_li_li"> 4</li>
                                </ul>
                                <ul className="con_li_ul">
                                    <li className = "con_li_li"> 3</li>
                                    <li className = "con_li_li"> 3</li>
                                    <li className = "con_li_li"> 4</li>
                                    <li className = "con_li_li"> 4</li>
                                    <li className = "con_li_li"> 5</li>
                                    <li className = "con_li_li"> 5</li>
                                </ul>
                            </ul>
                        </div>
                        <div id="con_menu2" style={style_unselect}>
                            <ul className ="con_list" id = "con_ul2">
                                <ul className="con_li_ul">
                                    <li className = "con_li_li"> 1</li>
                                    <li className = "con_li_li"> 1</li>
                                    <li className = "con_li_li"> 2</li>
                                    <li className = "con_li_li"> 2</li>
                                    <li className = "con_li_li"> 3</li>
                                    <li className = "con_li_li"> 3</li>
                                </ul>
                                <ul className="con_li_ul">
                                    <li className = "con_li_li"> 2</li>
                                    <li className = "con_li_li"> 2</li>
                                    <li className = "con_li_li"> 3</li>
                                    <li className = "con_li_li"> 3</li>
                                    <li className = "con_li_li"> 4</li>
                                    <li className = "con_li_li"> 4</li>
                                </ul>
                            </ul>
                        </div>
                        <div id="con_menu3" style={style_unselect}>
                            <ul className ="con_list" id = "con_ul3">
                                <ul className="con_li_ul">
                                    <li className = "con_li_li"> 1</li>
                                    <li className = "con_li_li"> 1</li>
                                    <li className = "con_li_li"> 2</li>
                                    <li className = "con_li_li"> 2</li>
                                    <li className = "con_li_li"> 3</li>
                                    <li className = "con_li_li"> 3</li>
                                </ul>
                                <ul className="con_li_ul">
                                    <li className = "con_li_li"> 2</li>
                                    <li className = "con_li_li"> 2</li>
                                    <li className = "con_li_li"> 3</li>
                                    <li className = "con_li_li"> 3</li>
                                    <li className = "con_li_li"> 4</li>
                                    <li className = "con_li_li"> 4</li>
                                </ul>
                                <ul className="con_li_ul">
                                    <li className = "con_li_li"> 3</li>
                                    <li className = "con_li_li"> 3</li>
                                    <li className = "con_li_li"> 4</li>
                                    <li className = "con_li_li"> 4</li>
                                    <li className = "con_li_li"> 5</li>
                                    <li className = "con_li_li"> 5</li>
                                </ul>
                                <ul className="con_li_ul">
                                    <li className = "con_li_li"> 4</li>
                                    <li className = "con_li_li"> 3</li>
                                    <li className = "con_li_li"> 4</li>
                                    <li className = "con_li_li"> 4</li>
                                    <li className = "con_li_li"> 5</li>
                                    <li className = "con_li_li"> 5</li>
                                </ul>
                            </ul>
                        </div>
                        <div id="con_menu4" style={style_unselect}>
                            <ul className ="con_list" id = "con_ul4">
                                <ul className="con_li_ul">
                                    <li className = "con_li_li"> 1</li>
                                    <li className = "con_li_li"> 1</li>
                                    <li className = "con_li_li"> 2</li>
                                    <li className = "con_li_li"> 2</li>
                                    <li className = "con_li_li"> 3</li>
                                    <li className = "con_li_li"> 3</li>
                                </ul>
                                <ul className="con_li_ul">
                                    <li className = "con_li_li"> 2</li>
                                    <li className = "con_li_li"> 2</li>
                                    <li className = "con_li_li"> 3</li>
                                    <li className = "con_li_li"> 3</li>
                                    <li className = "con_li_li"> 4</li>
                                    <li className = "con_li_li"> 4</li>
                                </ul>
                            </ul>
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

export default withRouter(SingleModalityProcessingBody)