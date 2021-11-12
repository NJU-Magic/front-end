import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'antd/dist/antd.css'

import memoryUtils from "./utils/memoryUtils"

const defaultSystemConfig = {
    sensor_type_options_chosen: ["RGB", "点云"],
    system_mode_options_chosen: 1,
    task_options_chosen:["外观巡检", "几何缺陷巡检", "结构巡检", "综合巡检"],

    rgb_alg: "",
    nir_alg:"",
    depth_alg:"",
    pc_alg:"",
    recx_alg:"",

    fusion_alg:""
};


memoryUtils.system_config = defaultSystemConfig;


//将App组件标签渲染到index页面的div上
ReactDOM.render(<App/>,document.getElementById('root'));

