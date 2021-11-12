import React, {Component} from 'react'
import {Input, Button, Image, Card, List, Tabs, Drawer} from 'antd';
import {withRouter} from 'react-router-dom';
import demopic from "../../assets/000002.jpg"
import "./single_modal_process_detection.less"
import BIMShow from "../bim_show/bim_show"


const database = [];
for (let i = 0; i < 15; i++) {
    database.push({
        title: `检测结果 ${i}`,

        dataname: `数据 ${i}`,

        datatype: `点云`,
        date: "2021-10-10"
    });
}



class SingleModalProcessReconstruction extends Component {
    state = {
        visible_data_drawer: false,
        visible_res_drawer: false,
        image_gallery_lists: []
    };


    select_data = () => {
        this.setState({
            visible_data_drawer: true
        })
    };

    _submit = () => {

    };


    onDataListClick = (item) => {
        console.log(item);
    };

    onClose = () => {
        this.setState({
            visible_res_drawer: false,
            visible_data_drawer: false
        })
    };


    get2DLayout = (title) => {
        return (
            <div>
                <div className="title">
                    {title}
                </div>
                <div className="layout_outer2D">
                    <div className="layout">
                        <div className="l_title">
                            算法输入
                        </div>
                        <div className="disp_layout">
                            <div className="disp_inner_layout">
                                <div className="button_layout">
                                    <div>
                                        <Button onClick={() => this.select_data()} type="primary"
                                                className="button_selectdata">从本地选择</Button>

                                    </div>
                                    <div>
                                        <Button onClick={() => this.select_data()} type="primary"
                                                className="button_selectdata">从数据库中选择</Button>

                                    </div>
                                    <div>
                                        <Button onClick={() => this.select_data()} type="primary"
                                                className="button_selectdata">查看历史结果</Button>

                                    </div>
                                    <div>
                                        <Button onClick={() => this._submit()} type="primary"
                                                className="button_submit">提交</Button>

                                    </div>
                                </div>
                                <div className="img_layout">>
                                    <Image width="400px" height="400px" src={demopic} className="image">

                                    </Image>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="b_layout">
                        <div className="b_title">
                            算法输出
                        </div>

                        <div className="b_img_layout">>
                            <div style={{paddingLeft: "15px", paddingRight: "15px"}}>
                                <BIMShow bim_url={this.state.bim_url} width={650} height={410}/>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        )
    };

    get3DLayout = (title) => {
        return (
            <div>
                <div className="title">
                    {title}
                </div>
                <div className="layout_outer3D">
                    <div className="layout3D">
                        <div className="l_title3D">
                            算法输入
                        </div>
                        <div className="disp_layout3D">
                            <div className="disp_inner_layout3D">
                                <div className="button_layout3D">
                                    <div>
                                        <Button onClick={() => this.select_data()} type="primary"
                                                className="button_selectdata3D">从本地选择</Button>

                                    </div>
                                    <div>
                                        <Button onClick={() => this.select_data()} type="primary"
                                                className="button_selectdata3D">从数据库中选择</Button>

                                    </div>
                                    <div>
                                        <Button onClick={() => this.select_data()} type="primary"
                                                className="button_selectdata3D">查看历史结果</Button>

                                    </div>
                                    <div>
                                        <Button onClick={() => this._submit()} type="primary"
                                                className="button_submit3D">提交</Button>

                                    </div>
                                </div>
                                <div>
                                    <div style={{paddingLeft: "15px", paddingRight: "15px", marginTop:"20px"}}>
                                        <BIMShow bim_url={this.state.bim_url} width={650} height={410}/>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="b_layout3D">
                        <div className="b_title3D">
                            算法输出
                        </div>
                        <div className="output_layout3D">
                            <div style={{paddingLeft: "15px", paddingRight: "15px"}}>
                                <BIMShow bim_url={this.state.bim_url} width={650} height={410}/>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    };

    getTotalLayout = (sensor_config) => {
        var layout = [];
        if (sensor_config["rgb"] === true) {
            layout.push(<div key={1}>{this.get2DLayout("rgb")}</div>)
        }
        if (sensor_config["depth"] === true) {
            layout.push(<div key={2}>{this.get2DLayout("深度图")}</div>)
        }
        if (sensor_config["nir"] === true) {
            layout.push(<div key={3}>{this.get2DLayout("红外")}</div>)
        }
        if (sensor_config["recx"] === true) {
            layout.push(<div key={4}>{this.get2DLayout("热成像")}</div>)
        }
        if (sensor_config["pc"] === true) {
            layout.push(<div>{this.get3DLayout("点云")}</div>)
        }
        return layout;
    };

    componentWillMount() {
        const sensor_config = {
            "rgb": true,
            "depth": false,
            "nir": true,
            "recx": true,
            "pc": true
        };
        this.mainLayout = this.getTotalLayout(sensor_config);
    }

    render() {
        const mainLayout = this.mainLayout;
        return (

            <div>
                {mainLayout}

                <Drawer
                    title="单模态数据库"
                    width={720}
                    onClose={this.onClose}
                    visible={this.state.visible_data_drawer}
                    bodystyle={{paddingBottom: 80}}
                    extra={
                        <space>
                            <Button onClick={this.onClose}> 取消 </Button>
                            <Button onClick={this.onClose} type="primary"> 确定 </Button>
                        </space>
                    }
                >
                    <List
                        bordered
                        itemLayout="vertical"
                        size="large"
                        dataSource={database}
                        className="datalist"
                        renderItem={item => (
                            <List.Item
                                key={item.title}
                                actions={[
                                    <a key="option" onClick={e => {
                                        e.preventDefault();
                                        this.onDataListClick(item);
                                    }}> 选择该数据 </a>]}
                            >
                                <div style={{display: "flex"}}>
                                    <div>
                                        <img width={272} src={demopic}/></div>
                                    <div>
                                        <div style={{display: "flex", marginLeft: "20px", fontSize: "20px"}}>
                                            <div>数据名称：</div>
                                            <div>{item.dataname}</div>
                                        </div>
                                        <div style={{display: "flex", marginLeft: "20px", fontSize: "20px"}}>
                                            <div>数据类型：</div>
                                            <div>{item.datatype}</div>
                                        </div>
                                        <div style={{display: "flex", marginLeft: "20px", fontSize: "20px"}}>
                                            <div>上传日期：</div>
                                            <div>{item.date}</div>
                                        </div>
                                    </div>
                                </div>


                            </List.Item>
                        )}
                    />
                </Drawer>
            </div>
        )
    }
}

export default withRouter(SingleModalProcessReconstruction)