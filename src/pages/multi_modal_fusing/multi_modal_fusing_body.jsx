import React, {Component} from 'react'
import { Input, Button, Image, Card, List, Tabs } from 'antd';
import MultiModalFusingReconstruction from "./multi_modal_fusing_reconstruction"
import MultiModalFusingDetection from "./multi_modal_fusing_detection"
import MultiModalFusingSegmentation from "./multi_modal_fusing_segmentation"
import MultiModalFusingRecognition from "./multi_modal_fusing_recognition"
import { withRouter} from 'react-router-dom';

const { TabPane } = Tabs;

function callback(key) {
    console.log(key);
}

const MyTabs = () => (
    <Tabs defaultActiveKey="1" size="large" onChange={callback}  className="tabs" style={{fontSize: '0px'}}>
        <TabPane tab="检测" key="1">
            <MultiModalFusingDetection/>
        </TabPane>
        <TabPane tab="分割" key="2">
            <MultiModalFusingSegmentation/>
        </TabPane>
        <TabPane tab="识别" key="3">
            <MultiModalFusingRecognition/>
        </TabPane>
        <TabPane tab="重建" key="4">
            <MultiModalFusingReconstruction/>
        </TabPane>
    </Tabs>
);

class MultiModalFusingBody extends Component{
    render() {
        return (
            <div className="wrapper">
                <MyTabs/>
            </div>
        )
    }
}

export default withRouter(MultiModalFusingBody)