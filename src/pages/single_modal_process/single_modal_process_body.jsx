import React, {Component} from 'react'
import { Input, Button, Image, Card, List, Tabs } from 'antd';
import SingleModalProcessDetection from "./single_modal_process_detection"
import SingleModalProcessRecognition from "./single_modal_process_recognition"
import SingleModalProcessSegmentation from "./single_modal_process_segmentation"
import SingleModalProcessReconstruction from "./single_modal_process_reconstruction"
import demo_pic from "../../assets/000002.jpg"
import "./single_modal_process_body.less"
import { withRouter} from 'react-router-dom';

const { TabPane } = Tabs;

function callback(key) {
    console.log(key);
}

const MyTabs = () => (
    <Tabs defaultActiveKey="1" onChange={callback}  className="tabs">
        <TabPane tab="检测" key="1">
            <SingleModalProcessDetection/>
        </TabPane>
        <TabPane tab="分割" key="2">
            <SingleModalProcessSegmentation/>
        </TabPane>
        <TabPane tab="识别" key="3">
            <SingleModalProcessRecognition/>
        </TabPane>
        <TabPane tab="重建" key="4">
            <SingleModalProcessReconstruction/>
        </TabPane>
    </Tabs>
);

class SingleModalProcessBody extends Component{
    render() {
        return (
            <div className="wrapper">
                <MyTabs/>
            </div>
        )
    }
}

export default withRouter(SingleModalProcessBody)