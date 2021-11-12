import React, {Component} from 'react'

import {Link, withRouter} from 'react-router-dom'
import { Image, List } from 'antd';
import sample_pic from "../../assets/000002.jpg";


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

class SingleModalResDatabaseComponent extends Component{
    state = {
        current: 'mail',
    };


    render(){
        const path = this.props.location.pathname;
        const { current } = this.state;
        return (
            <div>
                <div className="Contentbox">
                    <ul className="con_title">
                        <li style={{ width:"80px"}}>编号</li>
                        <li style={{ width:"280px"}}>使用数据名称</li>
                        <li style={{ width:"280px"}}>结果预览</li>
                        <li style={{ width:"280px"}}>描述</li>
                        <li style={{ width:"200px"}}>处理日期</li>
                        <li style={{ width:"200px"}}>处理算法</li>
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
                            dataSource={data}
                            className="b_list_layout"
                            renderItem={item => (
                                <List.Item
                                >
                                    <ul className="con_li_ul">
                                        <li className = "con_li_li" style={{margin: "0 auto", position: "relative", top: "40%", width:"80px"}}> {item.number}</li>
                                        <li className = "con_li_li" style={{margin: "0 auto", position: "relative", top: "40%", width:"280px"}}> {item.input_data_name}</li>
                                        <li className = "con_li_li" style={{margin: "0 auto", position: "relative", top: "12%", width:"280px"}}> <img src={item.cover} width={200}/></li>
                                        <li className = "con_li_li" style={{margin: "0 auto", position: "relative", top: "30%", width:"280px"}}> {item.descript}</li>
                                        <li className = "con_li_li" style={{margin: "0 auto", position: "relative", top: "40%", width:"200px"}}> {item.date}</li>
                                        <li className = "con_li_li" style={{margin: "0 auto", position: "relative", top: "40%", width:"200px"}}> {item.alg_name}</li>

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