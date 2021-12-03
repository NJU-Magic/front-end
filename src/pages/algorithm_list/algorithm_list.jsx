import React, {Component} from 'react'
import MyHeader from "../../components/header/header";

import AlgorithmListBody from "./algorithm_list_body"
import {Layout} from "antd";
const { Footer, Content } = Layout;

export default class AlgorithmList extends Component{
    render(){
        return (
            <Layout>
                <div><MyHeader/></div>
                <Content><AlgorithmListBody/></Content>
                <Footer style={{background:"#0e0b2b", color:"#a3a1b4", textAlign: 'center', height:"150px"}}>NJU Design ©2021 Created by NJU</Footer>
            </Layout>
        )
    }
}
