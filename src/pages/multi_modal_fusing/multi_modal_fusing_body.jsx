import React, {Component} from 'react'
import { Input, Button, Image, Card, List, Tabs } from 'antd';
import MultiModalFusingReconstruction from "./multi_modal_fusing_reconstruction"
import { withRouter} from 'react-router-dom';

const { TabPane } = Tabs;

function callback(key) {
    console.log(key);
}

const MyTabs = () => (
    <Tabs defaultActiveKey="1" size="large" onChange={callback}  className="tabs" style={{fontSize: '0px'}}>
        <TabPane tab="检测" key="1">
            1
        </TabPane>
        <TabPane tab="分割" key="2">
            2
        </TabPane>
        <TabPane tab="识别" key="3">
            3
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