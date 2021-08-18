import React, {Component} from 'react'
import {Layout} from "antd";
import MyHeader from "../../components/header/header"
import MyContent from "./content.jsx"

const { Header, Footer, Content } = Layout;


export default class Detailed extends Component{
    render(){
        return (
            <Layout>
                <div><MyHeader/></div>
                <Content><MyContent/></Content>
                <Footer style={{background:"#0e0b2b", color:"#a3a1b4", textAlign: 'center', height:"150px"}}>Magic Design ©2021 Created by Magic NJU</Footer>
            </Layout>
        )
    }
}