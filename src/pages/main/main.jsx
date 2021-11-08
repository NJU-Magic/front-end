import React, {Component} from 'react'
import {Layout} from "antd";
import MainBody from "./main_body"
import MyHeader from "../../components/header/header"
const { Header, Footer, Content } = Layout;

export default class MainPage extends Component{
    render(){
        return (
            <Layout>
                <div><MyHeader/></div>
                <Content><MainBody/></Content>
                <Footer style={{background:"#0e0b2b", color:"#a3a1b4", textAlign: 'center', height:"150px"}}>NJU Design ©2021 Created by NJU</Footer>
            </Layout>
        )
    }
}