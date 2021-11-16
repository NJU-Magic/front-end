import React, {Component} from 'react'
import {Input, Button, Image, Card, List, Tabs, Drawer, message} from 'antd';
import {withRouter} from 'react-router-dom';
import demopic from "../../assets/000002.jpg"
import BIMShow from "../bim_show/bim_show"
import {reqAllSensorData} from "../../api";

function video_load(url, querySe) {
    let player = document.querySelector(querySe);
    console.log(url);
    player.src = url;
    player.play()
}

class MultiModalFusingReconstruction extends Component {

    state = {
        input_image_url: "",
        output_image_model_url: "",

        input_model_url: "",
        output_model_url: "",

        drawer_visible:false,

        sensor_datalist: [],
        tmpdatalist: []
    };

    onClose = () => {
        this.setState({
            drawer_visible: false
        })
    };

    rgbDataSelection = async () =>{
        await this.getAllSensorData();
        let all_data = this.state.tmpdatalist;
        let show_data = [];

        for (let i = 0; i < all_data.length; i++) {
            if (all_data[i].data_type === "图像" || all_data[i].data_type === "视频") {
                show_data.push(all_data[i])
            }
        }

        this.setState({
            drawer_visible: true,
            sensor_datalist: show_data
        })
    };

    pcDataSelection = async () =>{
        await this.getAllSensorData();
        let all_data = this.state.tmpdatalist;
        let show_data = [];

        for (let i = 0; i < all_data.length; i++) {
            if (all_data[i].data_type === "点云") {
                show_data.push(all_data[i])
            }
        }

        this.setState({
            drawer_visible: true,
            sensor_datalist: show_data
        })
    };

    getAllSensorData = async () => {
        let res = await reqAllSensorData();
        res = res.res;
        let all_data = [];
        for (let i = 0; i < res.length; i++) {

            const sdata = {
                number: `${i}`,

                cover: "http://" + res[i].net_path + ":" + res[i].port + res[i].cover_path,
                descript:
                res[i].description,
                date: res[i].upload_date,
                data_type: res[i].data_type,

                data_url: "http://" + res[i].net_path + ":" + res[i].port + res[i].data_path,

                model_path: "http://" + res[i].net_path + ":" + res[i].port + res[i].model_path,
                mtl_path: res[i].mtl_path ? null : "http://" + res[i].net_path + ":" + res[i].port + res[i].mtl_path,
                mtl_png_path: res[i].mtl_png_path ? null : "http://" + res[i].net_path + ":" + res[i].port + res[i].mtl_png_path
            };
            all_data.push(sdata);
        }

        this.setState({
            tmpdatalist: all_data
        })
    };

    onDataListClick = (item) =>{
        if (item.data_type !== "图像") {
            message.warning("目前只支持加载图片");
        } else {
            this.setState({
                input_image_url: item.data_url,
                drawer_visible: false
            })
        }
        console.log(this.state);
    };

    showComponent = (item) => {
        const data_type = item.data_type;

        if (data_type === "视频") {
            console.log("here");
            return (
                <video height="200" width="270" controls="controls" muted id='v_left'
                       onClick={() => (video_load(item.data_url, "#v_left"))}>
                    <source src={item.data_url} type="video/mp4"/>
                </video>
            )
        }
        if (data_type === "图像") {
            return (
                <img src={item.data_url} width={270}/>
            )
        }
        if (data_type === "点云") {
            return (
                <img src={item.cover} width={270}/>
            )
        }
    };

    render() {
        const img_fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg0Aj8i0JO4OzsrPv69Wv+hi2qPHr0qNvf39+iI97soRIh4f3z58/u7du3SXX7Xt7Z2enevHmzfQe+oSN2apSAPj09TSrb+XKI/f379+08+A0cNRE2ANkupk+ACNPvkSPcAAEibACyXUyfABGm3yNHuAECRNgAZLuYPgEirKlHu7u7XdyytGwHAd8jjNyng4OD7vnz51dbPT8/7z58+NB9+/bt6jU/TI+AGWHEnrx48eJ/EsSmHzx40L18+fLyzxF3ZVMjEyDCiEDjMYZZS5wiPXnyZFbJaxMhQIQRGzHvWR7XCyOCXsOmiDAi1HmPMMQjDpbpEiDCiL358eNHurW/5SnWdIBbXiDCiA38/Pnzrce2YyZ4//59F3ePLNMl4PbpiL2J0L979+7yDtHDhw8vtzzvdGnEXdvUigSIsCLAWavHp/+qM0BcXMd/q25n1vF57TYBp0a3mUzilePj4+7k5KSLb6gt6ydAhPUzXnoPR0dHl79WGTNCfBnn1uvSCJdegQhLI1vvCk+fPu2ePXt2tZOYEV6/fn31dz+shwAR1sP1cqvLntbEN9MxA9xcYjsxS1jWR4AIa2Ibzx0tc44fYX/16lV6NDFLXH+YL32jwiACRBiEbf5KcXoTIsQSpzXx4N28Ja4BQoK7rgXiydbHjx/P25TaQAJEGAguWy0+2Q8PD6/Ki4R8EVl+bzBOnZY95fq9rj9zAkTI2SxdidBHqG9+skdw43borCXO/ZcJdraPWdv22uIEiLA4q7nvvCug8WTqzQveOH26fodo7g6uFe/a17W3+nFBAkRYENRdb1vkkz1CH9cPsVy/jrhr27PqMYvENYNlHAIesRiBYwRy0V+8iXP8+/fvX11Mr7L7ECueb/r48eMqm7FuI2BGWDEG8cm+7G3NEOfmdcTQw4h9/55lhm7DekRYKQPZF2ArbXTAyu4kDYB2YxUzwg0gi/41ztHnfQG26HbGel/crVrm7tNY+/1btkOEAZ2M05r4FB7r9GbAIdxaZYrHdOsgJ/wCEQY0J74TmOKnbxxT9n3FgGGWWsVdowHtjt9Nnvf7yQM2aZU/TIAIAxrw6dOnAWtZZcoEnBpNuTuObWMEiLAx1HY0ZQJEmHJ3HNvGCBBhY6jtaMoEiJB0Z29vL6ls58vxPcO8/zfrdo5qvKO+d3Fx8Wu8zf1dW4p/cPzLly/dtv9Ts/EbcvGAHhHyfBIhZ6NSiIBTo0LNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiEC/wGgKKC4YMA4TAAAAABJRU5ErkJggg=="
        return (
            <div>
                <div style={{display: "flex"}}>
                    <div>
                        <div style={{textAlign: "center", fontColor: "#000000", fontSize: "35px"}}>单模态处理</div>
                        <div style={{backgroundColor: "#e4e2e9"}}>
                            <div style={{textAlign: "center", fontColor: "#000000", fontSize: "30px"}}>RGB</div>
                            <div style={{display: "flex", padding: "30px"}}>
                                <div>
                                    <div style={{textAlign: "center", fontColor: "#000000", fontSize: "20px"}}>输入</div>
                                    <div style={{margin: "10px"}}>
                                        <Button style={{margin: "0 auto"}} onClick={this.rgbDataSelection}>选择数据</Button>
                                    </div>
                                    <div><Image style={{objectFit:"contain"}} fallback={img_fallback} src={this.state.input_image_url===""?"error":this.state.input_image_url}  height={200} width={300}/></div>
                                </div>
                                <div style={{marginLeft: "30px"}}>
                                    <div style={{textAlign: "center", fontColor: "#000000", fontSize: "20px"}}>输出</div>
                                    <div style={{marginTop: "40px"}}><BIMShow height={200} width={300} div_id={"single_modal_output"} model_url={"http://114.212.81.162:4100/Data/yiw/normalized_model.obj"}/></div>
                                </div>
                            </div>

                        </div>
                        <div style={{backgroundColor: "#e4e2e9", marginTop: "50px"}}>
                            <div style={{textAlign: "center", fontColor: "#000000", fontSize: "30px"}}>点云</div>
                            <div style={{display: "flex", padding: "30px"}}>
                                <div>
                                    <div style={{textAlign: "center", fontColor: "#000000", fontSize: "20px"}}>输入</div>
                                    <div style={{margin: "10px"}}><Button onClick={this.pcDataSelection}>选择数据</Button></div>
                                    <div><BIMShow height={200} width={300} div_id={"pointcloud_input"} model_url={"http://114.212.81.162:4100/Data/yiw/sparse.pcd"}/></div>
                                </div>
                                <div style={{marginLeft: "30px"}}>
                                    <div style={{textAlign: "center", fontColor: "#000000", fontSize: "20px"}}>输出</div>
                                    <div style={{marginTop: "51px"}}><BIMShow height={200} width={300} div_id={"pointcloud_output"} model_url={"http://114.212.81.162:4100/Data/yiw/normalized_model.obj"}/></div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div style={{marginLeft: "50px"}}>
                        <div style={{textAlign: "center", fontColor: "#000000", fontSize: "35px"}}>
                            融合结果
                        </div>
                        <div>
                            <div><BIMShow height={500} width={700} div_id={"fusing_result"} model_url={"http://114.212.81.162:4100/Data/yiw/normalized_model.obj"}/></div>
                        </div>
                    </div>
                </div>
                <Drawer
                    title="单模态数据库"
                    width={720}
                    onClose={this.onClose}
                    visible={this.state.drawer_visible}
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
                        dataSource={this.state.sensor_datalist}
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
                                        {this.showComponent(item)}
                                    </div>
                                    <div>
                                        <div style={{display: "flex", marginLeft: "20px", fontSize: "20px"}}>
                                            <div>数据名称：</div>
                                            <div>{item.descript}</div>
                                        </div>
                                        <div style={{display: "flex", marginLeft: "20px", fontSize: "20px"}}>
                                            <div>数据类型：</div>
                                            <div>{item.data_type}</div>
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

export default withRouter(MultiModalFusingReconstruction)