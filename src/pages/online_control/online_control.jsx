import React, {Component} from 'react'
import MyHeader from "../../components/header/header";

import OnlineControlBody from "./online_control_body"
import {Layout} from "antd";
const { Footer, Content } = Layout;

export default class OnlineControl extends Component{
    render(){
        return (
            <Layout>
                <div><MyHeader/></div>
                <Content><OnlineControlBody/></Content>
                <Footer style={{background:"#0e0b2b", color:"#a3a1b4", textAlign: 'center', height:"150px"}}>Magic Design ©2021 Created by Magic NJU</Footer>
            </Layout>
        )
    }
}