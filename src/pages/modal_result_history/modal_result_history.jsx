import React, {Component} from 'react'
import {Layout} from "antd";
import MyHeader from "../../components/header/header"
import MyContent from "./modal_result_history_content.jsx"

const { Header, Footer, Content } = Layout;


export default class ModalResultHistory extends Component{
    render(){
        return (
            <Layout>
                <div><MyHeader/></div>
                <Content><MyContent/></Content>
                <Footer style={{background:"#0e0b2b", color:"#a3a1b4", textAlign: 'center', height:"150px"}}>NJU Design ©2021 Created by NJU</Footer>
            </Layout>
        )
    }
}