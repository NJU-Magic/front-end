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
import SingleModalProcess from "./pages/single_modal_process/single_modal_process"
import DataMangement from "./pages/data_management/data_management"
import SceneSelecting from "./pages/scene_selecting/scene_selecting"
import SystemConfiguring from "./pages/system_configuring/system_configuring"
import ModalResultHistory from "./pages/modal_result_history/modal_result_history"
import MultiModalFusing from "./pages/multi_modal_fusing/multi_modal_fusing"
import InspectionProcessing from "./pages/inspection_processing/inspection_processing"
import OtherFunction from './pages/other_function/other_function'
import AlgorithmList from "./pages/algorithm_list/algorithm_list"
import ServerList from "./pages/server_list/server_list"
export default class App extends Component{
    render() {
        return (
            <BrowserRouter basename=''>
                <Switch>
                    <Route path='/nju/main' component={MainPage}/>
                    <Route path='/nju/scene_selecting' component={SceneSelecting}/>
                    <Route path='/nju/modal_sensing' component={OnlineControl}/>
                    <Route path='/nju/single_modal_processing' component={SingleModalProcess}/>
                    <Route path='/nju/multi_modal_fusion' component={MultiModalFusing}/>
                    <Route path='/nju/inspection_processing' component={InspectionProcessing}/>
                    <Route path='/nju/data_managing' component={DataMangement}/>
                    <Route path='/nju/system_configuring' component={SystemConfiguring}/>

                    <Route path='/nju/modal_results_history' component={ModalResultHistory}/>
                    <Route path='/nju/other_function' component={OtherFunction}/>
                    <Route path='/nju/algorithm_list' component={AlgorithmList}/>
                    <Route path='/nju/server_list' component={ServerList}/>
                    <Redirect to='/nju/main'/>
                </Switch>
            </BrowserRouter>
        )
    }
}
