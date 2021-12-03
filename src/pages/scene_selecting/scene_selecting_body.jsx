import React, {Component} from 'react'
import { Input, Button, Image, Card, List, Drawer } from 'antd';
import demo_pic from "../../assets/000002.jpg"
import "./scene_selecting_body.less"
import {reqAllSceneData} from "../../api"
import { withRouter} from 'react-router-dom';
import BIMShow from '../bim_show/bim_show';
import {reqBIMSence} from "../../api";
const { Meta } = Card;


const data = [];
for (let i=0;i<5;i++){
    data.push({
        title: `BIM模型 ${i}`,

        description:
            '隧道BIM模型',
        content:
            'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    });
}

class SceneSelectingBody extends Component{
    state = {
        visible: false,
        allScene_toshow : [],
        model_url : "http://114.212.81.162:4100/Data/lst_test/SenD/PC/5/model.ply",
        mtl_url : null,
        datalist: null,
    };

    onClose = () => {
        this.setState({
            visible: false
        })
    };

    showDrawer = () => {
        this.setState({
            visible: true
        })
    };

    getAllSceneInfo = async () => {
        let res = await reqBIMSence();
        console.log(1);
        res = res.res;
        console.log(res);
        let all_data = [];
        for (let i = 0; i < res.length; i++) {
            const sdata = {
                title: res[i].Name,
                description: res[i].Data_Type,
                content: res[i].Date,
                model_url: "http://" + res[i].net_path + ":" + res[i].port + res[i].Data_Location,
                mtl_url: null,

                };
            all_data.push(sdata);
        }

        console.log(all_data);

        this.setState({
            datalist: all_data
        })
    };

    componentWillMount(){
        this.getAllSceneInfo();
    }

    onListClick = (item) =>{
        console.log(item.title);
        this.setState({
            visible: false,
            model_url: item.model_url,
            // model_url: "http://114.212.81.162:4100/Data/lst_test/SenD/PC/4/model.ply",
            mtl_url: null,
        })
    };



    render(){
        return (
            <div className="scene_selecting">
                <div className="scene_selecting_select">
                    <div className="select_layer_inner">
                        <div className="select_bim_button">
                            <Button type="primary" className="button_select" onClick={this.showDrawer}>选择BIM模型</Button>
                        </div>
                        <Drawer
                            title="BIM数据库"
                            width={720}
                            onClose={this.onClose}
                            visible={this.state.visible}
                            bodystyle={{ paddingBottom: 80 }}
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
                                dataSource={this.state.datalist}
                                className="datalist"
                                renderItem={item => (
                                    <List.Item
                                        key={item.title}
                                        extra={<img width={272} src={demo_pic}/>}
                                        actions={[
                                            <a key="option"  onClick={ e=> {
                                                e.preventDefault();
                                                this.onListClick(item);
                                            }}> 选择该模型 </a>]}
                                    >
                                        <List.Item.Meta

                                            title={item.title}
                                            description={item.description}
                                        />
                                        {item.content}
                                    </List.Item>
                                )}
                            />
                        </Drawer>
                    </div>

                </div>
                <div className="datalist_layout">
                    <BIMShow div_id="scene_selecting" model_url={this.state.model_url} mtl_url={this.state.mtl_url} width={2200} height={1200}/>
                </div>
            </div>
        )
    }
}

export default withRouter(SceneSelectingBody)