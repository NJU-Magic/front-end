import React, {Component} from 'react'
import "./header.less"
import {Link, withRouter} from 'react-router-dom'
import { Image } from 'antd';
import logo from "../../assets/magic.png"
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
                            <Menu.Item key="/nju/online_control" >
                                <Link to="/nju/online_control">
                                    在线控制
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="/nju/scene_sensing">
                                <Link to="/nju/scene_sensing">
                                    场景感知
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