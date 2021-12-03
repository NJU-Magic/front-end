import React, {Component} from 'react'
import { withRouter} from 'react-router-dom';

import { List, Card, Button } from 'antd';
const { Meta } = Card;
const data = [
    {
        title: '算法列表',
        description: "后端算法服务列表，查看算法服务详细信息、状态、以及注册你自己的算法服务",
        img_src : "https://img1.baidu.com/it/u=4084992023,212046939&fm=26&fmt=auto",
        to_page_url: "/nju/algorithm_list"
    },

];

class OtherFunctionBody extends Component {

    onCardClick =(url) =>{
        this.props.history.push(url)
    };

    render(){
        return (
            <div>
                <List
                    style={{margin:"30px"}}
                    grid={{ gutter: 16, column: 4 }}
                    dataSource={data}
                    renderItem={item => (
                        <List.Item>
                            <Card
                                hoverable
                                style={{width:200}}
                                cover={<img alt="example" src={item.img_src}/>}
                                >
                                <Meta title={item.title} description={item.description} />
                                <Button style={{marginTop:"20px", marginLeft:"40px"}} type="primary" onClick={()=> this.onCardClick(item.to_page_url)}>进入</Button>
                            </Card>
                        </List.Item>
                    )}
                />
            </div>
        )
    }
}

export default withRouter(OtherFunctionBody);