import React, {Component} from 'react'
import { Input, Button, Image, Card, List, Drawer } from 'antd';
import demo_pic from "../../assets/000002.jpg"
import "./scene_selecting_body.less"
import {reqAllSceneData} from "../../api"
import { withRouter} from 'react-router-dom';
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

    componentWillMount(){
        //this.getAllSceneInfo();
    }

    onListClick = (item) =>{
        console.log(item.title);
        this.setState({
            visible: false
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
                                dataSource={data}
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
                </div>
            </div>
        )
    }
}

export default withRouter(SceneSelectingBody)