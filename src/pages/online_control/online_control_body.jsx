import React, {Component} from 'react'
import { Input, Button, Image, Card } from 'antd';
import "./online_control_body.less"
import demo_pic from "../../assets/000002.jpg"
export default class OnlineControlBody extends Component{
    render(){
        return (
            <div className="online_control">
                <div className="connection_layer">
                    <div className="connection_layer_inner">
                        <div className="connection_layer_input">
                            <Input placeholder="输入机器人ip" className="input_ip"/>
                        </div>
                        <div className="connection_layer_button">
                            <Button type="primary" className="button_connection">连接</Button>
                        </div>
                    </div>
                </div>
                <div className="cmd_output_layout">
                    <h5 className="cmd_output">
                        连接到192.168.113.2:10005...
                        连接成功！
                        小车控制提示:
                        w:前进
                        s:后退
                         a:左转
                        d:右转
                    </h5>
                </div>
                <div className="main_control_layout">
                    <div className="main_control_title">
                        主控显示
                    </div>
                    <div className="main_control_disp_layout">
                        <div className="main_control_disp_inner_layout">
                            <div className="main_control_button_layout">
                                <div>
                                    <Button type="primary" className="button_startrecording">开始记录</Button>

                                </div>
                                <div>
                                    <Button type="primary" className="button_endrecording">停止记录</Button>

                                </div>
                            </div>
                            <div className="main_control_img_layout">>
                                <Image height="600px" width="800px" src={demo_pic} className="image">

                                </Image>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="sensor_data_layout">
                    <div className="sensor_data_title">
                        传感数据
                    </div>
                    <div className="sensor_data_disp_layout">
                        <div className="sensor_data_disp_inner_layout">
                            <div>
                                <Card title="相机传感" bordered={false} className="sensor_data_camera">
                                    <p>Card content</p>
                                    <p>Card content</p>
                                    <p>Card content</p>
                                </Card>
                            </div>
                            <div>
                                <Card title="深度传感" bordered={false} className="sensor_data_depth">
                                    <Image height="250px" width="350px" src={demo_pic} className="image">

                                    </Image>
                                </Card>
                            </div>
                            <div>
                                <Card title="雷达传感" bordered={false} className="sensor_data_lidar">
                                    <Image height="250px" width="350px" src={demo_pic} className="image">

                                    </Image>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}