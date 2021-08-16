import React, {Component} from 'react'
import { Input, Button, Image, Card, List } from 'antd';
import demo_pic from "../../assets/000002.jpg"
import "./scene_sensing_body.less"
import {reqAllSceneData} from "../../api"
import { withRouter} from 'react-router-dom';
const { Meta } = Card;
const data = [];
for (let i=0;i<16;i++){
    data.push({
        title: "Scene_0010",
        description: "2021-06-24"
    })
}

class SceneSensingBody extends Component{
    state = {
      allScene_toshow : [],
    };

    getAllSceneInfo = async () =>{
        const sceneinfo = await reqAllSceneData();
        this.setState({allScene_toshow: sceneinfo.res});
    };

    componentWillMount(){
        this.getAllSceneInfo();
    }

    onCardClick = (item) => {
        var path ={
            pathname: "/nju/detailed",
            state:item,
        };
        this.props.history.push(path)
    };

    render(){
        return (
            <div className="scene_sensing">
                <div className="search_layer">
                    <div className="search_layer_inner">
                        <div className="search_layer_input">
                            <Input placeholder="查询" className="input_search"/>
                        </div>
                        <div className="search_layer_button">
                            <Button type="primary" className="button_search">搜索</Button>
                        </div>
                    </div>
                </div>
                <div className="datalist_layout">
                        <List
                            grid={{ gutter: 16, column: 5 }}
                            dataSource={this.state.allScene_toshow}
                            className="datalist"
                            renderItem={item => (
                                <List.Item className="listitem">
                                        <Card
                                            hoverable
                                            style={{ width: 240 }}
                                            cover={<img alt="example" src={demo_pic} />
                                                }
                                            className="card"
                                            actions={[
                                                <a key="option"  onClick={ e=> {
                                                    e.preventDefault();
                                                    this.onCardClick(item);
                                                }}> 查看 </a>
                                        ]}

                                        >
                                            <Meta title={item.title} description={item.description} />
                                        </Card>
                                </List.Item>
                            )}
                        />
                </div>
            </div>
        )
    }
}

export default withRouter(SceneSensingBody)