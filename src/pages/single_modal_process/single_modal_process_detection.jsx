import React, {Component} from 'react'
import { Input, Button, Image, Card, List, Tabs, Drawer} from 'antd';
import { withRouter} from 'react-router-dom';
import demopic from "../../assets/000002.jpg"
import "./single_modal_process_detection.less"


const data = [];
for (let i=0;i<15;i++){
    data.push({
        title: `检测结果 ${i}`,

        description:
            '桌子',
        content:
            '99.9%',
    });
}

const database = [];
for (let i=0;i<15;i++){
    data.push({
        title: `检测结果 ${i}`,

        dataname: `数据 ${i}`,

        datatype:`点云`,
        date: "2021-10-10"
    });
}

/*
const MyDrawers = () =>(
    <Drawer
        title="BIM数据库"
        width={720}
        onClose={this.onDrawerClose}
        visible={this.state.visible}
        bodystyle={{ paddingBottom: 80 }}
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
                        <a key="option"  onClick={ e=> {
                            e.preventDefault();
                            this.onListClick(item);
                        }}> 选择该数据 </a>]}
                >
                    <div>
                        <div><img width={272} src={demopic}/></div>
                        <div>
                            <div>
                                <div>数据名称：</div>
                                <div>{item.dataname}</div>
                            </div>
                            <div>
                                <div>数据类型：</div>
                                <div>{item.datatype}</div>
                            </div>
                            <div>
                                <div>上传日期：</div>
                                <div>{item.date}</div>
                            </div>
                        </div>
                    </div>


                </List.Item>
            )}
        />
    </Drawer>
);
*/


class SingleModalProcessDetection extends Component{
    state = {
      visible: false
    };





    select_data = () =>{
        this.setState({
            visible: true
        })
    };

    _submit = () =>{

    };

    render(){
        return (
            <div>
                <div className="layout">
                    <div className="title">
                        算法输入
                    </div>
                    <div className="disp_layout">
                        <div className="disp_inner_layout">
                            <div className="button_layout">
                                <div>
                                    <Button onClick={() => this.select_data()} type="primary" className="button_selectdata">从本地选择</Button>

                                </div>
                                <div>
                                    <Button onClick={() => this.select_data()} type="primary" className="button_selectdata">从数据库中选择</Button>

                                </div>
                                <div>
                                    <Button onClick={() => this.select_data()} type="primary" className="button_selectdata">查看历史结果</Button>

                                </div>
                                <div>
                                    <Button onClick={() => this._submit()} type="primary" className="button_submit">提交</Button>

                                </div>
                            </div>
                            <div className="img_layout">>
                                <Image height="300px" width="400px" src={demopic} className="image">

                                </Image>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="b_layout">
                    <div className="b_title">
                        算法输出
                    </div>
                    <div className="output_layout">
                        <div className="b_img_layout">>
                            <Image height="300px" width="400px" src={demopic} className="image">

                            </Image>
                        </div>
                        <div>
                            <List
                                bordered
                                itemLayout="vertical"
                                pagination={{
                                    onChange: page => {
                                        console.log(page);
                                    },
                                    pageSize: 4,
                                }}
                                size="large"
                                dataSource={data}
                                className="b_list_layout"
                                renderItem={item => (
                                    <List.Item
                                        key={item.title}
                                        extra={<img width={100} src={demopic}/>}
                                    >
                                        <List.Item.Meta
                                            title={item.title}
                                            description={item.description}
                                        />
                                        {item.content}
                                    </List.Item>
                                )}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(SingleModalProcessDetection)