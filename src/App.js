/*
应用的根组件
简单组件用函数
复杂组件用类
简单复杂区别在于有没有状态
 */
import React, {Component} from 'react'
import {BrowserRouter, Route, Switch,Redirect} from 'react-router-dom'
import MainPage from "./pages/main/main";
import OnlineControl from "./pages/online_control/online_control"
import SceneSensing from "./pages/scene_sensing/scene_sensing";
import Detailed from "./pages/detailed/detailed";

export default class App extends Component{
    render() {
        return (
            <BrowserRouter basename=''>
                <Switch>
                    <Route path='/nju/main' component={MainPage}/>
                    <Route path='/nju/online_control' component={OnlineControl}/>
                    <Route path='/nju/scene_sensing' component={SceneSensing}/>
                    <Route path='/nju/detailed' component={Detailed}/>
                    <Redirect to='/nju/main'/>
                </Switch>
            </BrowserRouter>
        )
    }
}
