import React, {Component} from 'react'
import "./header.less"
import {Link, withRouter} from 'react-router-dom'
import { Image } from 'antd';
import logo from "../../assets/logo.png"
import { Menu } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';

//import "antd/lib/style/themes/default.less"
//import "antd/dist/antd.less"
//import "./mMenu.less"

class MyHeader extends Component{
    state = {
        current: 'mail',
    };

    handleClick = e => {
        console.log('click ', e);
        this.setState({ current: e.key });
    };

    returnToMainPage = () => {
        this.props.history.replace("/nju/main");
    };

    render(){
        const path = this.props.location.pathname;
        const { current } = this.state;
        return (

            <div>
                <div className="mheader">
                    <div className="mheader-left">
                        <input type="image"
                               src={logo}
                                width="220px"
                               height="60px"
                               onClick={() => this.returnToMainPage()}
                        >

                        </input>
                    </div>
                    <div className="mheader-mid">
                        222
                    </div>
                    <div className="mheader-right">
                        <Menu theme="dark" onClick={this.handleClick} selectedKeys={[path]} mode="horizontal" style={
                            {
                                backgroundColor: "#0e0b2b",
                                borderBottomColor:"#0e0b2b",
                            }
                        }>
                            <Menu.Item key="/nju/scene_selecting" >
                                <Link to="/nju/scene_selecting">
                                    场景选择
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="/nju/modal_sensing" >
                                <Link to="/nju/modal_sensing">
                                    感知获取
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="/nju/single_modal_processing">
                                <Link to="/nju/single_modal_processing">
                                    单模态处理
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="/nju/multi_modal_fusion">
                                <Link to="/nju/multi_modal_fusion">
                                    多模态融合
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="/nju/inspection_processing">
                                <Link to="/nju/inspection_processing">
                                    检测处理
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="/nju/data_managing">
                                <Link to="/nju/data_managing">
                                    数据管理
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="/nju/system_configuring">
                                <Link to="/nju/system_configuring">
                                    系统配置
                                </Link>
                            </Menu.Item>
                        </Menu>
                    </div>
                </div>
            </div>

        )
    }
}

export default withRouter(MyHeader)