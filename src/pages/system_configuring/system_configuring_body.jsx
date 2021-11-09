import React, {Component} from 'react'
import { withRouter} from 'react-router-dom';
import { Checkbox, Divider, Form, Select, Radio, Button } from 'antd';
import "./system_configuring_body.less"
const { Option } = Select;
const CheckboxGroup = Checkbox.Group;

const sensor_type_options = ["RGB", "红外光", "热成像", "深度图", "点云"];
const sensor_type_default_options = ["RGB", "红外光", "热成像", "深度图", "点云"];

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

class SceneSensingBody extends Component{
    render() {
        return (
            <div className="wrapper">
                <div className="inner_wrapper">

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
                </div>
            </div>
        )
    }
}

export default withRouter(SceneSensingBody)

/*
                    <div className="sensor_type">
                        <div className="sensor_type_title">
                            传感类型
                        </div>
                        <div className="sensor_type_content">
                            <CheckboxGroup options={sensor_type_options} value={sensor_type_default_options}  />
                        </div>
                    </div>
                    <div className="single_modal_configure">
                        <div className="single_modal_title">
                            单模态处理
                        </div>
                        <div className="single_modal_content">
                        </div>
                    </div>
                    <div className="multi_modal_configure">
                        <div className="multi_modal_title">
                            多模态融合
                        </div>
                        <div className="multi_modal_content">
                        </div>
                    </div>
                    <div className="inspection_mode">
                        <div className="inspection_mode_title">
                            巡检模式
                        </div>
                        <div className="inspection_mode_content">
                        </div>
                    </div>
                    <div className="task_type">
                        <div className="task_type_title">
                            任务类型
                        </div>
                        <div className="task_type_content">

                        </div>
                    </div>
                    */