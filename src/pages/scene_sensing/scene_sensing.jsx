import React, {Component} from 'react'
import MyHeader from "../../components/header/header";
import SceneSensingBody from "./scene_sensing_body";
import {Layout} from "antd";

const { Footer, Content } = Layout;
export default class SceneSensing extends Component{
    render(){
        return (
            <Layout>
                <div><MyHeader/></div>
                <Content><SceneSensingBody/></Content>
                <Footer style={{background:"#0e0b2b", color:"#a3a1b4", textAlign: 'center', height:"150px"}}>Magic Design ©2021 Created by Magic NJU</Footer>
            </Layout>
        )
    }
}