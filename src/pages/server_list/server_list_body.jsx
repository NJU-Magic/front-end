import React, {Component, useContext, useState, useEffect, useRef} from 'react'
import {withRouter} from 'react-router-dom';
import "./server_list_body.css"
import {Table, Tag, Space, Button, Tooltip, Image} from 'antd';
import {Upload, message, Drawer, Form, Col, Row, Input, Select, DatePicker, Popconfirm} from 'antd';
import {PlusOutlined, LoadingOutlined, InboxOutlined} from '@ant-design/icons';
import system_config from "../../utils/memoryUtils"
import {
    reqRebootServer,
    reqIfAlgorithmAvail
} from "../../api/index_lst"
const wurl = system_config.system_config;
const sys_server= system_config.system_server;



function getTooltipTag(tags) {
    if (tags.length === 2) {
        let color = tags[0] === "可用" ? 'green' : 'volcano';
        if (tags[0] === "未知") {
            return (
                <Tooltip placement="top" title={tags[1]}>
                    <LoadingOutlined/>
                </Tooltip>
            )
        }
        return (
            <Tooltip placement="top" title={tags[1]}>
                <Tag color={color} key={tags[0]}>
                    {tags[0]}
                </Tag>
            </Tooltip>
        )
    } else {
        let color = tags[0] === "可用" ? 'green' : 'volcano';
        if (tags[0] === "未知") {
            return (
                <LoadingOutlined/>
            )
        }
        return (
            <Tag color={color} key={tags[0]}>
                {tags[0]}
            </Tag>
        )
    }

}


function urlmapping(address){
    let url = "";
    if (address === "w1") {
        url = wurl.w1_url;
    } else if (address === "w2") {
        url = wurl.w2_url;
    } else if (address === "w3") {
        url = wurl.w3_url;
    } else if (address === "w4") {
        url = wurl.w4_url;
    } else if (address === "w5") {
        url = wurl.w5_url;
    } else if (address === "w6") {
        url = wurl.w6_url;
    }
    return url;
}


class ServerListBody extends Component {

    state = {
        server_list: [],
    };

    timers = [];

    clearTimers() {
        for (let i = 0; i < this.timers.length; i++) {
            clearInterval(this.timers[i].timer)
        }
    }

    timerCheckIfServerAvial = async (key) => {
        let Res = this.state.server_list;
        let res = this.state.server_list.find((item) => item.key === key);
        let state = [];

        let url = urlmapping(res.address);

        let error = await reqIfAlgorithmAvail(url, res.port);
        console.log("ticker", key, error);
        if (error.error) {
            state = ["不可用", error.error]
        } else {
            state = ["可用"];
        }

        for (let i = 0; i < Res.length; i++) {
            if (Res[i].key === key) {
                Res[i].state = state;
            }
        }

        this.setState({
            server_list: Res
        })
    };

    startCheckTimers() {
        for (let i = 0; i < this.state.server_list.length; i++) {
            let timer = setTimeout(() => this.timerCheckIfServerAvial(this.state.server_list[i].key), 1000);
            this.timers.push(
                {
                    key: this.state.server_list[i].key,
                    timer: timer
                }
            )
        }
    }

    startTimers() {
        setTimeout(() => this.startCheckTimers(), 1000);
    }

    componentWillMount = async () => {
        console.log("WillMount");
        this.clearTimers();
        this.setState({
            server_list: sys_server
        })

    };

    componentWillUpdate() {
        console.log("WillUpdate", this.state.visible);

    }

    componentDidMount() {
        console.log("DidMount");
        this.startTimers();
    }

    componentDidUpdate() {

    }


    onClose = () => {

    };

    onServerReboot = async (record) =>{
        if(record.server_name==="主控"){
            message.warn("该服务无法自动重启，请手动去后台启动");
            return
        }

        if(record.state==="可用"){
            message.warn("该服务已在运行中，无需重启");
            return
        }

        //找到该服务对应的主控
        let res = this.state.server_list.find((item) => item.server_name === "主控" && item.address===record.address);


        let url = urlmapping(record.address);
        let port = res.port;
        let req_address = url+":"+port+"/main_control";

        console.log("reboot", req_address)

        await reqRebootServer(req_address, record.filepath, record.environment);

        record.state = ["未知"];

        let all_serves = this.state.server_list.map((item) => {
            return item
        });
        for (let j = 0; j < all_serves.length; j++) {
            if (all_serves[j].key === record.key) {
                all_serves[j] = record;
            }
        }

        let timer = setTimeout(() => this.timerCheckIfServerAvial(record.key), 2000);
        this.timers.push(
            {
                key: record.key,
                timer: timer
            }
        );

        this.setState({
            server_list: all_serves
        });

    };

    render() {
        const img_fallback = "data:image/png;base64,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";

        const outer_columns = [
            {
                title: '服务名称',
                dataIndex: 'server_name',
                key: 'server_name',
            },
            {
                title: '地址',
                dataIndex: 'address',
                key: 'address',
            },
            {
                title: '端口',
                dataIndex: 'port',
                key: 'port',
            },
            {
                title: '环境名',
                dataIndex: 'environment',
                key: 'environment',
            },
            {
                title: '算法功能',
                dataIndex: 'function',
                key: 'function',
            },
            {
                title: '服务文件',
                dataIndex: 'filepath',
                key: 'filepath',
            },
            {
                title: '服务状态',
                key: 'state',
                dataIndex: 'state',
                render: tags => (
                    <>
                        {
                            getTooltipTag(tags)
                        }
                    </>
                ),
            },
            {
                title: 'Action',
                key: 'action',
                render: (_, record) => (
                        <Space size="middle">
                            <a onClick={() => this.onServerReboot(record)}>重启</a>
                        </Space>
                ),
            },
        ];
        const inner_columns = [
            {
                title: '接口名',
                dataIndex: 'api_name',
                key: 'api_name',
            },
            {
                title: '功能',
                dataIndex: 'api_function',
                key: 'api_function',
            },
        ];
        return (
            <div>
                <div style={{margin: "40px"}}>
                    <Table pagination={{pageSize: 20}} bordered={true} columns={outer_columns}
                           dataSource={this.state.server_list}
                           expandable={{
                               expandedRowRender: record => <Table pagination={{pageSize: 20}} bordered={true} columns={inner_columns}
                                                                   dataSource={record.apis}/>,
                               rowExpandable: record => record.apis.length > 0,
                           }}/>
                </div>
            </div>
        )
    }
}

export default withRouter(ServerListBody)