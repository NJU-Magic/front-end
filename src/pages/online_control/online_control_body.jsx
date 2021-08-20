import React, {Component} from 'react'
import { Input, Button, Image, Card, message } from 'antd';
import "./online_control_body.less"
import demo_pic from "../../assets/000002.jpg"
import {reqControl, reqConnect2Car, reqEndRecording, reqStartRecording, reqImuData} from '../../api'
export default class OnlineControlBody extends Component{
    state = {
        car_ip: "114.212.83.24",
        car_ip_connection: "114.212.83.24",
        req_imu:false,
        yaw:0,
        pitch:0,
        roll:0,
        connect: false,
    };

    componentDidMount(){
        document.addEventListener('keydown', this.handleKeyDown);
        //this.request_imu_data()
    };


    request_imu_data = async () =>{
        this.interval_imu_data=setInterval(async ()=>{
            try{
                if(this.state.req_imu){
                    //console.log(this.state.car_ip_connect);
                    const result = await reqImuData("http://" + this.state.car_ip_connection + ":5000");
                    this.setState({
                        yaw: result.yaw,
                        roll:result.roll,
                        pitch:result.pitch
                    });
                    //console.log(result)
                }
            }catch (e) {
                this.setState({
                    req_imu: false
                });
            }
        }, 100);

    };

    handleKeyDown = async (e) => {


        let keyboard = e.keyCode;
        if (keyboard === 87){
            keyboard = 'w';
        }else if(keyboard === 65){
            keyboard = 'a';
        }else if(keyboard === 83){
            keyboard ='s';
        }else if(keyboard === 68){
            keyboard = 'd'
        }else if(keyboard === 80){
            // stop getting imu data
            this.setState({
                req_imu: false
            });
        }
        console.log(e.keyCode);

        if(this.state.connect){
            const result = await reqControl("http://" + this.state.car_ip_connection + ":8888", keyboard);
        }

    };

    componentWillUnmount() {
        document.removeEventListener('keydown',this.handleKeyDown);
        //clearInterval(this.interval_imu_data);
    }

    inputChange(e){
        this.setState({
            car_ip:e.target.value
        })
    };

    connect_to_car = async () =>{
        const car_ip = this.state.car_ip;
        //console.log(car_ip);
        try{
            const result = await reqConnect2Car("http://" + car_ip + ":5000");
            this.setState({
                car_ip_connection:car_ip,
                req_imu: true,
                connect: true
            });
            message.success("连接成功！")
        }catch (e) {
            message.error("连接失败！")
        }finally {

        }

        //console.log(result)


    };

    start_recording = async () =>{
        await reqStartRecording("http://" + this.state.car_ip_connection + ":5000")
    };

    end_recording = async () =>{
        await reqEndRecording("http://" + this.state.car_ip_connection + ":5000")
    };

    render(){



        return (
            <div className="online_control">
                <div className="connection_layer">
                    <div className="connection_layer_inner">
                        <div className="connection_layer_input">
                            <Input onChange={(e)=>this.inputChange(e)} placeholder="172.27.142.89" className="input_ip"/>
                        </div>
                        <div className="connection_layer_button">
                            <Button onClick={() => this.connect_to_car()} type="primary" className="button_connection">连接</Button>
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
                                    <Button onClick={() => this.start_recording()} type="primary" className="button_startrecording">开始记录</Button>

                                </div>
                                <div>
                                    <Button onClick={() => this.end_recording()} type="primary" className="button_endrecording">停止记录</Button>

                                </div>
                            </div>
                            <div className="main_control_img_layout">>
                                <Image height="600px" width="800px" src={"http://"+this.state.car_ip_connection+":5000/video_feed"} className="image">
                                  
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
                                    <p>yaw: {this.state.yaw}</p>
                                    <p>pitch: {this.state.pitch}</p>
                                    <p>roll: {this.state.roll}</p>
                                </Card>
                            </div>
                            <div>
                                <Card title="深度传感" bordered={false} className="sensor_data_depth">
                                    <Image height="250px" width="350px" src={"http://"+this.state.car_ip_connection+":5000/depth_feed"}  className="image">

                                    </Image>
                                </Card>
                            </div>
                            <div>
                                <Card title="雷达传感" bordered={false} className="sensor_data_lidar">
                                    <Image height="250px" width="350px" src={"http://"+this.state.car_ip_connection+":5000/lidar_feed"}  className="image">

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
