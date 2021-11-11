import React, {Component} from 'react'
import {Layout} from "antd";
import MyHeader from "../../components/header/header"
import DataResearchBody from "./data_management_content.jsx"

const { Header, Footer, Content } = Layout;


export default class DataManagement extends Component{
    render(){
        return (
            <Layout>
                <div><MyHeader/></div>
                <Content><DataResearchBody/></Content>
                <Footer style={{background:"#0e0b2b", color:"#a3a1b4", textAlign: 'center', height:"150px"}}>Magic Design ©2021 Created by Magic NJU</Footer>
            </Layout>
        )
    }
}