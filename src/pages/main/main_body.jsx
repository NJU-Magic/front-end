import React, {Component} from 'react'
import {Form, Button, Image} from 'antd'
import "./main_body.less"
import {withRouter, Redirect} from "react-router-dom";
import demo_pic from "../../assets/1.png"
import git_pic from "../../assets/github.jpg"

export default withRouter(class MainBody extends Component{
    startExperience = () =>{
        //return <Redirect to='/nju/online_control'/>
        this.props.history.replace('/nju/online_control');
    };

    render(){
        return (
            <div className="body">
                <div className="title_layout">
                    <h1 className="title">
                        多模态场景感知与巡检系统
                    </h1>
                </div>
                <div className="desc_layout">
                    <h5 className="desc">
                        我们提供最先进的多模态三维场景感知技术，基于可控机器人小车采集的多模态数据，进行场景的深度估计，三维重建以及三维分割
                    </h5>
                </div>
                <div className="button_layout_outer">
                    <div className="button_layout_inner">
                        <div className="button_left">
                            <Button onClick={() => this.startExperience()} type="primary" className="button1">开始体验</Button>
                        </div>
                        <div className="button_right">
                            <Button type="primary" ghost className="button2">观看demo</Button>
                        </div>
                    </div>
                </div>

                <div className="image_layout">
                    <div className="image_layout_tmp">
                        <Image height="200px" width="1000px" src={demo_pic} className="image">

                        </Image>
                    </div>

                </div>
                <div className="image_git_layout">
                    <div className="image_git_layout_tmp">
                        <Image height="100px" width="100px" src={git_pic} className="image_git">

                        </Image>
                    </div>
                </div>
                <div className="gitdesc_layout">
                    <h5 className="gitdesc">
                        Github
                    </h5>
                </div>
            </div>

        )
    }
}
)
