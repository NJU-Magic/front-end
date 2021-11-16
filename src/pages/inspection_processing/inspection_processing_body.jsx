import React, {Component} from 'react'
import { Input, Button, Image, Card, List, Drawer } from 'antd';
import demo_pic from "../../assets/000002.jpg"
import "./inspection_processing_body.less"
import {reqAllSceneData} from "../../api"
import { withRouter} from 'react-router-dom';
import BIMShow from '../bim_show/bim_show';

const data = [];
for (let i=0;i<5;i++){
    data.push({
        title: `检测结果 ${i}`,

        description:
            'description',
        content:
            'content',
    });
}

const box_bound = [ 
    [[ 7.2564862, 2.58093047, 1.14271696],[ 5.91997147, 0.20359417, 0.40373015]],
    // [[ 6.79370456, 2.29075436, 1.11037098], [ 5.74539475, 1.54815741, 0.59024377]],
    [[ 4.81748994, 0.66762866, 2.08040517], [ 3.20136287, 0.27808417, 0.94032501]],
    [[ 2.96077238, 4.08173836, 0.68243969], [ 1.92660207, 3.08333018, 0.31439257]],
    [[ 2.1772713, 3.18617992, 2.24384676], [ 1.69252335, 1.77498502, -0.07020686]],
    // [[ 6.79428532, 3.40834265, 1.1672088 ], [ 3.67647697, 1.47411536, 0.01029888]],
    // [[ 6.55302956, 2.30767682, 1.39968434], [ 4.14821243, 0.37198555, 0.01100161]], 
];

class InspectionProcessingBody extends Component{
    state = {
        multi_modal_result_url: "http://114.212.81.162:4100/Data/yiw/scene0025_01_vh_clean_2.labels.ply",
        inspection_result_url: "http://114.212.81.162:4100/Data/yiw/scene0025_01_vh_clean_2.labels.ply",
        
        drawer_visible:false,

    }

    onClose = () => {
        this.setState({
            drawer_visible: false
        })
    };

    showDrawer = () => {
        this.setState({
            drawer_visible: true
        })
    };

    onListClick = (item) =>{
        console.log(item.title);
        this.setState({
            drawer_visible: false,
            multi_modal_result_url: "http://114.212.81.162:4100/Data/lst_test/SenD/PC/5/model.ply",
            inspection_result_url: "http://114.212.81.162:4100/Data/lst_test/SenD/PC/5/model.ply",
        })
    };

    render() {
        return (
            <div className="inspection_processing">
                <div className="inspection_processing_select">
                    <div className="select_layer_inner">
                        <div className="select_button">
                            <Button type="primary" className="button_select" onClick={this.showDrawer}>选择检测结果</Button>
                        </div>
                        <Drawer
                            title="检测结果"
                            width={720}
                            onClose={this.onClose}
                            visible={this.state.drawer_visible}
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
                                        actions={[
                                            <a key="option"  onClick={ e=> {
                                                e.preventDefault();
                                                this.onListClick(item);
                                            }}> 选择该检测结果 </a>]}
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
                <div className="result_show">
                    <div className="result">
                        <div style={{marginBottom: "50px"}}>
                            <div style={{textAlign: "center", fontColor: "#000000", fontSize: "35px"}}>
                                多模态融合结果
                            </div>
                            <div>
                                <div><BIMShow model_url={this.state.multi_modal_result_url} height={500} width={700} div_id={"multi_modal_result"}/></div>
                            </div>
                        </div>

                        <div style={{marginLeft: "50px", marginBottom: "50px"}}>
                            <div style={{textAlign: "center", fontColor: "#000000", fontSize: "35px"}}>
                                检测结果
                            </div>
                            <div>
                                <div><BIMShow model_url={this.state.inspection_result_url} height={500} width={700} div_id={"inspection_result"} box_bound={box_bound}/></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(InspectionProcessingBody)