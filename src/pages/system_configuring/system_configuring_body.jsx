import React, {Component} from 'react'
import { withRouter} from 'react-router-dom';
import {Checkbox, Divider, Form, Select, Radio, Button, message} from 'antd';
import "./system_configuring_body.less"
import memoryUtils from "../../utils/memoryUtils"

const { Option } = Select;
const CheckboxGroup = Checkbox.Group;

const sensor_type_options = ["RGB", "红外光", "热成像", "深度图", "点云"];
const sensor_type_default_options = ["RGB", "点云"];

const task_type_options = ["外观巡检", "几何缺陷巡检", "结构巡检", "综合巡检"];
const task_type_default_options = ["外观巡检", "几何缺陷巡检", "结构巡检", "综合巡检"];



const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};



class SystemConfiguringBody extends Component{
    state ={
        sensor_type_options_chosen: sensor_type_default_options,
        system_mode_options_chosen: 1,
        task_options_chosen:task_type_default_options,

        disable_chose_rgb_alg:false,
        disable_chose_nir_alg:false,
        disable_chose_depth_alg:false,
        disable_chose_recx_alg:false,
        disable_chose_pc_alg:false,

        able_chose_rgb_alg:true,
        able_chose_nir_alg:true,
        able_chose_depth_alg:true,
        able_chose_recx_alg:true,
        able_chose_pc_alg:true,

    };

    componentWillMount(){
        const sys_config = memoryUtils.system_config;

        this.setState({
            sensor_type_options_chosen: sys_config["sensor_type_options_chosen"],
            system_mode_options_chosen: sys_config["system_mode_options_chosen"],
            task_options_chosen: sys_config["task_options_chosen"],
        });

        this.changeSingleAlgDisabled(sys_config["sensor_type_options_chosen"]);

    }

    changeSingleAlgDisabled = (e) =>{
        this.setState({
            sensor_type_options_chosen: e,
            disable_chose_rgb_alg:true,
            disable_chose_nir_alg:true,
            disable_chose_depth_alg:true,
            disable_chose_recx_alg:true,
            disable_chose_pc_alg:true,

            able_chose_rgb_alg:false,
            able_chose_nir_alg:false,
            able_chose_depth_alg:false,
            able_chose_recx_alg:false,
            able_chose_pc_alg:false,
        });

        for (let i=0;i<e.length;i++){
            if(e[i]==="RGB"){
                this.setState({
                    disable_chose_rgb_alg:false,
                    able_chose_rgb_alg:true,
                });
            }
            if(e[i]==="红外光"){
                this.setState({
                    disable_chose_nir_alg:false,
                    able_chose_nir_alg:true,
                });
            }
            if(e[i]==="热成像"){
                this.setState({
                    disable_chose_recx_alg:false,
                    able_chose_recx_alg:true,
                });
            }
            if(e[i]==="深度图"){
                this.setState({
                    disable_chose_depth_alg:false,
                    able_chose_depth_alg:true,
                });
            }
            if(e[i]==="点云"){
                this.setState({
                    disable_chose_pc_alg:false,
                    able_chose_pc_alg:true,
                });
            }
        }
    };

    onSensorTypeOptionChanged = (e) =>{
        this.changeSingleAlgDisabled(e);

    };

    onSystemModeChange = (e) =>{
        console.log(e);
        this.setState({
            system_mode_options_chosen: e.target["value"],
        })
    };

    onTaskOptionChanged = (e) =>{
        this.setState({
            task_options_chosen: e,
        })
    };

    confirm = () =>{
        memoryUtils.system_config["sensor_type_options_chosen"] = this.state.sensor_type_options_chosen;
        message.success("修改成功！")
    };

    render() {

        return (
            <div className="wrapper">

                <div style={{display:"flex"}}>
                    <div style={{textAlign:"right",width:"200px", marginRight:"10px"}}>
                        传感类型：
                    </div>
                    <div>
                        <Checkbox.Group className="single_option_padding" options={sensor_type_options} value={this.state.sensor_type_options_chosen} onChange={this.onSensorTypeOptionChanged}/>
                    </div>

                </div>

                <div style={{display:"flex", marginTop:"30px"}}>
                    <div style={{textAlign:"right",width:"200px", marginRight:"10px"}}>
                        单模态处理：
                    </div>
                    <div>
                        <div className="single_modal_option">
                            <div className="single_modal_inner">
                                <div className="single_modal_title">
                                    RGB
                                </div>
                                <div>
                                    <Select disabled={this.state.disable_chose_rgb_alg} checked={this.state.able_chose_rgb_alg} defaultValue="alg1" style={{ width: 120 }} >
                                        <Option value="alg1">alg1</Option>
                                        <Option value="alg2">alg2</Option>
                                        <Option value="alg3" disabled>
                                            alg3
                                        </Option>
                                        <Option value="alg4">alg4</Option>
                                    </Select>
                                </div>
                            </div>
                            <div className="single_modal_inner">
                                <div className="single_modal_title">
                                    红外光
                                </div>
                                <div>
                                    <Select disabled={this.state.disable_chose_nir_alg} checked={this.state.able_chose_nir_alg} defaultValue="alg1" style={{ width: 120 }} >
                                        <Option value="alg1">alg1</Option>
                                        <Option value="alg2">alg2</Option>
                                        <Option value="alg3" disabled>
                                            alg3
                                        </Option>
                                        <Option value="alg4">alg4</Option>
                                    </Select>
                                </div>
                            </div>
                            <div className="single_modal_inner">
                                <div className="single_modal_title">
                                    热成像
                                </div>
                                <div>
                                    <Select disabled={this.state.disable_chose_recx_alg} checked={this.state.able_chose_recx_alg} defaultValue="alg1" style={{ width: 120 }} >
                                        <Option value="alg1">alg1</Option>
                                        <Option value="alg2">alg2</Option>
                                        <Option value="alg3" disabled>
                                            alg3
                                        </Option>
                                        <Option value="alg4">alg4</Option>
                                    </Select>
                                </div>
                            </div>
                            <div className="single_modal_inner">
                                <div className="single_modal_title">
                                    深度图
                                </div>
                                <div>
                                    <Select disabled={this.state.disable_chose_depth_alg} checked={this.state.able_chose_depth_alg} defaultValue="alg1" style={{ width: 120 }} >
                                        <Option value="alg1">alg1</Option>
                                        <Option value="alg2">alg2</Option>
                                        <Option value="alg3" disabled>
                                            alg3
                                        </Option>
                                        <Option value="alg4">alg4</Option>
                                    </Select>
                                </div>
                            </div>
                            <div className="single_modal_inner">
                                <div className="single_modal_title">
                                    点云
                                </div>
                                <div>
                                    <Select disabled={this.state.disable_chose_pc_alg} checked={this.state.able_chose_pc_alg} defaultValue="alg1" style={{ width: 120 }} >
                                        <Option value="alg1">alg1</Option>
                                        <Option value="alg2">alg2</Option>
                                        <Option value="alg3" disabled>
                                            alg3
                                        </Option>
                                        <Option value="alg4">alg4</Option>
                                    </Select>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div style={{display:"flex", marginTop:"30px"}}>
                    <div style={{textAlign:"right",width:"200px", marginRight:"10px"}}>
                        多模态融合：
                    </div>
                    <div>
                        <Select  className="single_option_padding" defaultValue="alg1" style={{ width: 120 }} >
                            <Option value="alg1">alg1</Option>
                            <Option value="alg2">alg2</Option>
                            <Option value="alg3" disabled>
                                alg3
                            </Option>
                            <Option value="alg4">alg4</Option>
                        </Select>
                    </div>
                </div>

                <div style={{display:"flex", marginTop:"30px"}}>
                    <div style={{textAlign:"right",width:"200px", marginRight:"10px"}}>
                        巡检模式：
                    </div>
                    <div>
                        <Radio.Group value={this.state.system_mode_options_chosen} className="single_option_padding" onChange={this.onSystemModeChange}>
                            <Radio value={1}>在线</Radio>
                            <Radio value={2}>离线</Radio>
                        </Radio.Group>
                    </div>

                </div>

                <div style={{display:"flex", marginTop:"30px", marginBottom:"40px"}}>
                    <div style={{textAlign:"right",width:"200px", marginRight:"10px"}}>
                        任务类型：
                    </div>
                    <div>
                        <CheckboxGroup className="single_option_padding" options={task_type_options} value={this.state.task_options_chosen} onChange={this.onTaskOptionChanged}/>
                    </div>
                </div>
                <div className="button">
                    <Button onClick={this.confirm} type="primary" className="button_confirm">确认修改</Button>
                </div>
            </div>
        )
    }
}

export default withRouter(SystemConfiguringBody)

/*
<Form
                        {...formItemLayout}

                    >
                        <Form.Item
                            label="传感类型"
                            name="sensor_type"
                        >
                            <CheckboxGroup className="single_option_padding" options={sensor_type_options} value={sensor_type_default_options}/>
                        </Form.Item>
                        <Form.Item
                            name="single_modal_process"
                            label="单模态处理"
                        >
                            <div className="single_modal_option">
                                <div className="single_modal_inner">
                                    <div className="single_modal_title">
                                        RGB
                                    </div>
                                    <div>
                                        <Select defaultValue="alg1" style={{ width: 120 }} >
                                            <Option value="alg1">alg1</Option>
                                            <Option value="alg2">alg2</Option>
                                            <Option value="alg3" disabled>
                                                alg3
                                            </Option>
                                            <Option value="alg4">alg4</Option>
                                        </Select>
                                    </div>
                                </div>
                                <div className="single_modal_inner">
                                    <div className="single_modal_title">
                                        红外光
                                    </div>
                                    <div>
                                        <Select defaultValue="alg1" style={{ width: 120 }} >
                                            <Option value="alg1">alg1</Option>
                                            <Option value="alg2">alg2</Option>
                                            <Option value="alg3" disabled>
                                                alg3
                                            </Option>
                                            <Option value="alg4">alg4</Option>
                                        </Select>
                                    </div>
                                </div>
                                <div className="single_modal_inner">
                                    <div className="single_modal_title">
                                        热成像
                                    </div>
                                    <div>
                                        <Select defaultValue="alg1" style={{ width: 120 }} >
                                            <Option value="alg1">alg1</Option>
                                            <Option value="alg2">alg2</Option>
                                            <Option value="alg3" disabled>
                                                alg3
                                            </Option>
                                            <Option value="alg4">alg4</Option>
                                        </Select>
                                    </div>
                                </div>
                                <div className="single_modal_inner">
                                    <div className="single_modal_title">
                                        深度图
                                    </div>
                                    <div>
                                        <Select defaultValue="alg1" style={{ width: 120 }} >
                                            <Option value="alg1">alg1</Option>
                                            <Option value="alg2">alg2</Option>
                                            <Option value="alg3" disabled>
                                                alg3
                                            </Option>
                                            <Option value="alg4">alg4</Option>
                                        </Select>
                                    </div>
                                </div>
                                <div className="single_modal_inner">
                                    <div className="single_modal_title">
                                        点云
                                    </div>
                                    <div>
                                        <Select defaultValue="alg1" style={{ width: 120 }} >
                                            <Option value="alg1">alg1</Option>
                                            <Option value="alg2">alg2</Option>
                                            <Option value="alg3" disabled>
                                                alg3
                                            </Option>
                                            <Option value="alg4">alg4</Option>
                                        </Select>
                                    </div>
                                </div>
                            </div>


                        </Form.Item>
                        <Form.Item
                            name="multi_modal_fusion"
                            label="多模态融合"
                        >
                            <Select className="single_option_padding" defaultValue="alg1" style={{ width: 120 }} >
                                <Option value="alg1">alg1</Option>
                                <Option value="alg2">alg2</Option>
                                <Option value="alg3" disabled>
                                    alg3
                                </Option>
                                <Option value="alg4">alg4</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="inspection_type"
                            label="巡检模式"
                        >
                            <Radio.Group value={1} className="single_option_padding">
                                <Radio value={1}>在线</Radio>
                                <Radio value={2}>离线</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item
                            name="task_type"
                            label="任务类型"
                        >
                            <CheckboxGroup className="single_option_padding" options={task_type_options} value={task_type_default_options}/>
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 16, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                确定
                            </Button>
                        </Form.Item>
                    </Form>
*/
