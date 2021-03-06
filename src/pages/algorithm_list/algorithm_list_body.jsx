import React, {Component, useContext, useState, useEffect, useRef} from 'react'
import {withRouter} from 'react-router-dom';
import "./algorithm_list_body.css"
import {Table, Tag, Space, Button, Tooltip, Image} from 'antd';
import {Upload, message, Drawer, Form, Col, Row, Input, Select, DatePicker, Popconfirm} from 'antd';
import {PlusOutlined, LoadingOutlined, InboxOutlined} from '@ant-design/icons';
import {
    reqAllAlgorithmInfo,
    reqUpdateAlgorithmInfo,
    reqDeleteAlgorithmInfo,
    reqInsertAlgorithmInfo,
    reqIfAlgorithmAvail,
    reqRebootServer
} from "../../api/index_lst"
import system_config from "../../utils/memoryUtils"
const system_servers = system_config.system_server;
const wurl = system_config.system_config;
const {Option} = Select;
const {Dragger} = Upload;

const EditableContext = React.createContext(null);

const EditableRow = ({index, ...props}) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};

const EditableCell = ({
                          title,
                          editable,
                          children,
                          dataIndex,
                          record,
                          handleSave,
                          ...restProps
                      }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    useEffect(() => {
        if (editing) {
            inputRef.current.focus();
        }
    }, [editing]);

    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({
            [dataIndex]: record[dataIndex],
        });
    };

    const save = async () => {
        try {
            const values = await form.validateFields();
            toggleEdit();
            handleSave({...record, ...values});
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };

    let childNode = children;

    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{
                    margin: 0,
                }}
                name={dataIndex}
                rules={[
                    {
                        required: true,
                        message: `${title} is required.`,
                    },
                ]}
            >
                <Input ref={inputRef} onPressEnter={save} onBlur={save}/>
            </Form.Item>
        ) : (
            <div
                className="editable-cell-value-wrap"
                style={{
                    paddingRight: 24,
                }}
                onClick={toggleEdit}
            >
                {children}
            </div>
        );
    }

    return <td {...restProps}>{childNode}</td>;
};

var isValidFile = false;

function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }

    isValidFile = isJpgOrPng;
    return isJpgOrPng;
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


function getTooltipTag(tags) {
    if (tags.length === 2) {
        let color = tags[0] === "??????" ? 'green' : 'volcano';
        if (tags[0] === "??????") {
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
        let color = tags[0] === "??????" ? 'green' : 'volcano';
        if (tags[0] === "??????") {
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

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}


const data = [
    {
        key: 0,
        name: 'URA',
        people: '?????????',
        address: 'w4',
        state: ['??????', "?????????"],
        port: "4000",
        interface: "Vgnet",
        environment: "vgnet-sr",
        function: "???????????????????????????????????????????????????"
    },

];


class AlgorithmListBody extends Component {
    formRef = React.createRef();
    state = {
        visible: false,
        loading: false,
        previewVisible: false,
        previewImage: '',
        previewTitle: '',
        fileList: [],
        img_url: "",

        input_field_data: [],
        output_field_data: [],

        input_field_count: 0,
        output_field_count: 0,

        form_field_init: {},

        outer_table_data: [],
        all_algotithm_infos: [],
        revise_item_info: null
    };

    isReviseVisible = false;
    hasEntered = false;
    hasReviseEntered = false;
    timers = [];

    clearTimers() {
        for (let i = 0; i < this.timers.length; i++) {
            clearInterval(this.timers[i].timer)
        }
    }

    timerCheckIfAlgoAvial = async (key) => {
        let Res = this.state.outer_table_data;
        let res = this.state.outer_table_data.find((item) => item.key === key);
        let state = [];

        let url = "";
        if (res.address === "w1") {
            url = wurl.w1_url;
        } else if (res.address === "w2") {
            url = wurl.w2_url;
        } else if (res.address === "w3") {
            url = wurl.w3_url;
        } else if (res.address === "w4") {
            url = wurl.w4_url;
        } else if (res.address === "w5") {
            url = wurl.w5_url;
        } else if (res.address === "w6") {
            url = wurl.w6_url;
        }
        let error = await reqIfAlgorithmAvail(url, res.port);
        console.log("ticker", key, error)
        if (error.error) {
            state = ["?????????", error.error]
        } else {
            state = ["??????"];
        }

        for (let i = 0; i < Res.length; i++) {
            if (Res[i].key === key) {
                Res[i].state = state;
            }
        }

        this.setState({
            outer_table_data: Res
        })
    };

    startCheckTimers() {
        for (let i = 0; i < this.state.outer_table_data.length; i++) {
            let timer = setTimeout(() => this.timerCheckIfAlgoAvial(this.state.outer_table_data[i].key), 1000);
            this.timers.push(
                {
                    key: this.state.outer_table_data[i].key,
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
        let Res = await reqAllAlgorithmInfo();
        let all_algorithm = [];
        let all_algorithm_to_show = [];
        Res = Res.res;

        for (let i = 0; i < Res.length; i++) {
            let res = Res[i];
            all_algorithm.push({
                key: i,
                method_id: res.method_id,
                cover_url: res.url,
                method_source: res.method_source,
                method_name: res.method_name,
                method_address: res.method_address,
                method_port: res.method_port,
                method_people: res.method_people,
                method_environment: res.method_environment,
                method_interface: res.method_interface,
                method_location: res.method_location,
                method_function: res.method_function,
                input_field_data: res.input_field_data,
                output_field_data: res.output_field_data
            });


            all_algorithm_to_show.push({
                key: i,
                id: res.method_id,
                name: res.method_name,
                people: res.method_people,
                address: res.method_address,
                state: ["??????"],
                port: res.method_port,
                interface: res.method_interface,
                environment: res.method_environment,
                function: res.method_function,
            });
        }

        this.setState({
            outer_table_data: all_algorithm_to_show,
            all_algotithm_infos: all_algorithm
        });

    };

    componentWillUpdate() {
        console.log("WillUpdate", this.state.visible);

    }

    componentDidMount() {
        console.log("DidMount");
        this.startTimers();
    }

    componentDidUpdate() {
        let all_item_info = this.state.revise_item_info;
        console.log("DidUpdate", this.state.visible, this.isReviseVisible, all_item_info);
        if (this.state.visible && this.isReviseVisible) {
            //??????????????????????????????????????????????????????
            if (!this.hasReviseEntered) {
                this.formRef.current.setFieldsValue({
                    method_source: all_item_info.method_source,
                    method_name: all_item_info.method_name,
                    method_address: all_item_info.method_address,
                    method_port: all_item_info.method_port,
                    method_people: all_item_info.method_people,
                    method_environment: all_item_info.method_environment,
                    method_interface: all_item_info.method_interface,
                    method_location: all_item_info.method_location,
                    method_function: all_item_info.method_function
                });
                this.hasReviseEntered = true;
            }


        } else if (this.state.visible && !this.isReviseVisible) {
            //?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
            if (!this.hasEntered) {
                this.formRef.current.setFieldsValue({
                    method_source: "",
                    method_name: "",
                    method_address: "",
                    method_port: "",
                    method_people: "",
                    method_environment: "",
                    method_interface: "",
                    method_location: "",
                    method_function: ""
                });
                this.hasEntered = true;
            }

        }
        //this.startTimers();
    }

    showDrawer = () => {
        this.setState({
            visible: true,
        });
        this.isReviseVisible = false;
    };

    onClose = () => {
        this.setState({
            visible: false,
            img_url: "",
            input_field_data: [],
            output_field_data: [],
            fileList: []
        });
        this.hasEntered = false;
        this.hasReviseEntered = false;
    };

    onFormSubmit = async (values) => {
        if (this.isReviseVisible) {
            //revise!!!
            let Data = {
                key: this.state.revise_item_info.key,
                method_id: this.state.revise_item_info.method_id,
                cover_url: this.state.img_url,
                method_source: values.method_source,
                method_name: values.method_name,
                method_address: values.method_address,
                method_port: values.method_port,
                method_people: values.method_people,
                method_environment: values.method_environment,
                method_interface: values.method_interface,
                method_location: values.method_location,
                method_function: values.method_function,
                input_field_data: this.state.input_field_data,
                output_field_data: this.state.output_field_data
            };

            let res = await reqUpdateAlgorithmInfo(Data);

            let data = Data;

            let all_alg_info = this.state.all_algotithm_infos.map((item) => {
                return item
            });
            for (let j = 0; j < all_alg_info.length; j++) {
                if (all_alg_info[j].key === data.key) {
                    all_alg_info[j] = data;
                }
            }
            let all_alg_info_to_show = this.state.outer_table_data.map((item) => {
                return item
            });

            for (let j = 0; j < all_alg_info_to_show.length; j++) {
                if (all_alg_info_to_show[j].key === data.key) {
                    all_alg_info_to_show[j] = {
                        key: data.key,
                        id: data.method_id,
                        name: data.method_name,
                        people: data.method_people,
                        address: data.method_address,
                        state: ["??????"],
                        port: data.method_port,
                        interface: data.method_interface,
                        environment: data.method_environment,
                        function: data.method_function
                    };
                }
            }

            let timer = setTimeout(() => this.timerCheckIfAlgoAvial(data.key), 2000);
            this.timers.push(
                {
                    key: data.key,
                    timer: timer
                }
            );

            this.setState({
                visible: false,
                all_algotithm_infos: all_alg_info,
                outer_table_data: all_alg_info_to_show,
                img_url: "",
                input_field_data: [],
                output_field_data: [],
                fileList: []
            });
            this.hasReviseEntered = false;
            this.hasEntered = false;

            message.success("???????????????")
        } else {
            // new edit!!!!
            let Data = {
                key: null,
                method_id: null,
                cover_url: this.state.img_url,
                method_source: values.method_source,
                method_name: values.method_name,
                method_address: values.method_address,
                method_port: values.method_port,
                method_people: values.method_people,
                method_environment: values.method_environment,
                method_interface: values.method_interface,
                method_location: values.method_location,
                method_function: values.method_function,
                input_field_data: this.state.input_field_data,
                output_field_data: this.state.output_field_data
            };

            let res = await reqInsertAlgorithmInfo(Data);

            let data = Data;
            data.key = this.state.all_algotithm_infos.length;
            data.method_id = res.res;

            let all_alg_info = this.state.all_algotithm_infos.map((item) => {
                return item
            });
            all_alg_info.push(data);

            let all_alg_info_to_show = this.state.outer_table_data.map((item) => {
                return item
            });
            all_alg_info_to_show.push({
                key: data.key,
                id: data.method_id,
                name: data.method_name,
                people: data.method_people,
                address: data.method_address,
                state: ["??????"],
                port: data.method_port,
                interface: data.method_interface,
                environment: data.method_environment,
                function: data.method_function
            });

            let timer = setTimeout(() => this.timerCheckIfAlgoAvial(data.key), 2000);
            this.timers.push(
                {
                    key: data.key,
                    timer: timer
                }
            );

            this.setState({
                visible: false,
                all_algotithm_infos: all_alg_info,
                outer_table_data: all_alg_info_to_show,
                img_url: "",
                input_field_data: [],
                output_field_data: [],
                fileList: []
            });
            this.hasEntered = false;
            this.hasReviseEntered = false;

            message.success("???????????????")
        }
    };

    onOuterReviseClick = (key) => {
        let all_item_info = this.state.all_algotithm_infos.find((item) => item.key === key);
        this.isReviseVisible = true;
        this.hasEntered = true;
        /**/
        console.log("onRevise", all_item_info);
        this.setState({
            visible: true,
            img_url: all_item_info.cover_url,

            input_field_data: all_item_info.input_field_data,
            output_field_data: all_item_info.output_field_data,

            revise_item_info: all_item_info,
            input_field_count: all_item_info.input_field_data ? 0 : all_item_info.input_field_data.length,
            output_field_count: all_item_info.output_field_data ? 0 : all_item_info.output_field_data.length,
        })

    };

    onOuterDelete = async (key) => {
        /*
                let all_item_info = this.state.all_algotithm_infos.find((item) => item.key === key);
                await reqDeleteAlgorithmInfo(all_item_info.method_id);
                let all_alg_info = this.state.all_algotithm_infos;
                let all_alg_info_to_show = this.state.outer_table_data;

                all_alg_info = all_alg_info.filter((item) => item.key !== key);
                all_alg_info_to_show = all_alg_info_to_show.filter((item) => item.key !== key);
                console.log("DeleteOuter", all_alg_info_to_show, all_alg_info);

                this.setState({
                    all_algotithm_infos: all_alg_info,
                    outer_table_data: all_alg_info_to_show
                });

                message.success("????????????");
        */
        message.warning("?????????????????????");
    };

    onOuterRebootClick = async (record) =>{
        if(record.state==="??????"){
            message.warn("???????????????????????????????????????");
            return
        }

        let res = system_servers.find((item) => item.server_name === "??????" && item.address===record.address);


        let url = urlmapping(record.address);
        let port = res.port;
        let req_address = url+":"+port+"/main_control";



        let detail = this.state.all_algotithm_infos.find((item) => item.key===record.key);
        // console.log("reboot", system_servers, record, detail);

        //await reqRebootServer(req_address, detail.method_location, record.environment);

        let all_alg_info_to_show = this.state.outer_table_data.map((item) => {
            return item
        });

        //???????????????????????????????????????????????????????????????????????????????????????
        let filepath = record.address+":"+detail.method_location;

        for (let j = 0; j < all_alg_info_to_show.length; j++) {
            let _detail = this.state.all_algotithm_infos.find((item) => item.key===all_alg_info_to_show[j].key);
            let _filepath = all_alg_info_to_show[j].address+":"+_detail.method_location;
            console.log("reboot", _filepath, filepath);
            if(filepath===_filepath){
                all_alg_info_to_show[j].state = ["??????"];
                let timer = setTimeout(() => this.timerCheckIfAlgoAvial(all_alg_info_to_show[j].key), 2000);
                this.timers.push(
                    {
                        key: all_alg_info_to_show[j].key,
                        timer: timer
                    }
                );
            }
        }

        this.setState({
            outer_table_data: all_alg_info_to_show
        });
    };

    handlePreview = async file => {
        console.log(file.url, file.preview);
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
            previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        });
    };

    handleChange = (fileList) => {
        let filelist = [...fileList.fileList];

        filelist = filelist.slice(-1);

        filelist = filelist.map(file => {
            if (file.response) {
                file.url = file.response.obj.paths[0]
            }
            return file
        });

        if (filelist.length === 0) {
            this.setState({
                fileList: filelist,
                img_url: ""
            })
        } else if (filelist.length > 0 && isValidFile) {
            this.setState({
                fileList: filelist,
                img_url: filelist[0].url
            })
        }

    };

    handleInputFieldTableDelete = (key) => {
        const dataSource = [...this.state.input_field_data];
        this.setState({
            input_field_data: dataSource.filter((item) => item.key !== key),
        });
    };
    handleInputFieldTableAdd = () => {
        const {input_field_count, input_field_data} = this.state;
        const newData = {
            key: input_field_count,
            field_name: "1",
            field_desc: "1"
        };
        this.setState({
            input_field_data: [...input_field_data, newData],
            input_field_count: input_field_count + 1,
        });
    };
    handleInputFieldSave = (row) => {
        const newData = [...this.state.input_field_data];
        const index = newData.findIndex((item) => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {...item, ...row});
        this.setState({
            input_field_data: newData,
        });
    };

    handleOutputFieldTableDelete = (key) => {
        const dataSource = [...this.state.output_field_data];
        this.setState({
            output_field_data: dataSource.filter((item) => item.key !== key),
        });
    };
    handleOutputFieldTableAdd = () => {
        const {output_field_count, output_field_data} = this.state;
        const newData = {
            key: output_field_count,
            field_name: "1",
            field_desc: "1"
        };
        this.setState({
            output_field_data: [...output_field_data, newData],
            output_field_count: output_field_count + 1,
        });
    };
    handleOutputFieldSave = (row) => {
        const newData = [...this.state.output_field_data];
        const index = newData.findIndex((item) => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {...item, ...row});
        this.setState({
            output_field_data: newData,
        });
    };

    render() {
        const img_fallback = "data:image/png;base64,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";
        const uploadButton = (
            <Button>
                <div style={{display: "flex"}}>
                    <div>
                        <InboxOutlined/>
                    </div>
                    <div style={{fontSize: "15px", marginLeft: "10px"}}>??????????????????</div>
                    <div style={{fontSize: "10px", color: "#7b7b7b", paddingTop: "4px", marginLeft: "10px"}}>
                        ???????????????????????????????????????????????????
                    </div>
                </div>
            </Button>
        );
        let input_field_columns = [
            {
                title: '????????????',
                dataIndex: 'field_name',
                editable: true,
            },
            {
                title: '??????',
                dataIndex: 'field_desc',
                editable: true,
            },
            {
                title: '??????',
                dataIndex: 'action',
                render: (_, record) =>
                    this.state.input_field_data.length >= 1 ? (
                        <Popconfirm title="?????????????" onConfirm={() => this.handleInputFieldTableDelete(record.key)}>
                            <a>??????</a>
                        </Popconfirm>
                    ) : null,
            },
        ];
        let output_field_columns = [
            {
                title: '????????????',
                dataIndex: 'field_name',
                editable: true,
            },
            {
                title: '??????',
                dataIndex: 'field_desc',
                editable: true,
            },
            {
                title: '??????',
                dataIndex: 'action',
                render: (_, record) =>
                    this.state.output_field_data.length >= 1 ? (
                        <Popconfirm title="?????????????" onConfirm={() => this.handleOutputFieldTableDelete(record.key)}>
                            <a>??????</a>
                        </Popconfirm>
                    ) : null,
            },
        ];
        const outer_columns = [
            {
                title: '?????????',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '?????????',
                dataIndex: 'people',
                key: 'people',
            },
            {
                title: '??????',
                dataIndex: 'address',
                key: 'address',
            },
            {
                title: '??????',
                dataIndex: 'port',
                key: 'port',
            },
            {
                title: '?????????',
                dataIndex: 'interface',
                key: 'interface',
            },
            {
                title: '?????????',
                dataIndex: 'environment',
                key: 'environment',
            },
            {
                title: '????????????',
                dataIndex: 'function',
                key: 'function',
            },
            {
                title: '????????????',
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
                        <Popconfirm title="?????????????" onConfirm={() => this.onOuterDelete(record.key)}>
                            <a>??????</a>
                        </Popconfirm>
                        <a onClick={() => this.onOuterReviseClick(record.key)}>??????</a>
                        <a onClick={() => this.onOuterRebootClick(record)}>??????</a>
                    </Space>
                ),
            },
        ];
        const components = {
            body: {
                row: EditableRow,
                cell: EditableCell,
            },
        };
        input_field_columns = input_field_columns.map((col) => {
            if (!col.editable) {
                return col;
            }

            return {
                ...col,
                onCell: (record) => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: this.handleInputFieldSave,
                }),
            };
        });
        output_field_columns = output_field_columns.map((col) => {
            if (!col.editable) {
                return col;
            }

            return {
                ...col,
                onCell: (record) => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: this.handleOutputFieldSave,
                }),
            };
        });
        return (

            <div>
                <div style={{margin: "40px"}}>
                    <Button
                        onClick={this.showDrawer}
                        type="primary"
                        style={{
                            marginBottom: 16,
                        }}
                    >
                        ???????????????
                    </Button>
                    <Table pagination={{pageSize: 20}} bordered={true} columns={outer_columns}
                           dataSource={this.state.outer_table_data}/>
                </div>
                <Drawer
                    title="?????????????????????"
                    width={720}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    bodyStyle={{paddingBottom: 80}}
                    extra={
                        <Space>
                            <Button onClick={this.onClose}>Cancel</Button>
                            <Button onClick={this.onClose} type="primary">
                                Submit
                            </Button>
                        </Space>
                    }
                >
                    <div>
                        <Upload
                            fileList={this.state.fileList}
                            onChange={this.handleChange}
                            action="http://114.212.87.191:4001/uploadimgs"
                            onPreview={this.handlePreview}
                            beforeUpload={beforeUpload}

                        >
                            {uploadButton}
                        </Upload>
                        <Image style={{objectFit: "contain"}} fallback={img_fallback}
                               src={this.state.input_image_url === "" ? "error" : this.state.img_url} height={350}
                               width={650}/>

                    </div>
                    <Form layout="vertical" ref={this.formRef} onFinish={this.onFormSubmit}>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    name="method_source"
                                    label="????????????"
                                >
                                    <Input placeholder="???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????"/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={8}>
                                <Form.Item
                                    name="method_name"
                                    label="?????????"
                                    rules={[{required: true, message: '??????????????????'}]}
                                >
                                    <Input placeholder="???????????????"/>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    name="method_address"
                                    label="??????"
                                    rules={[{required: true, message: '???????????????????????????'}]}
                                >
                                    <Select className="single_option_padding" defaultValue="w6" style={{width: '100%'}}>
                                        <Option value="w1">w1</Option>
                                        <Option value="w2">w2</Option>
                                        <Option value="w3">w3</Option>
                                        <Option value="w4">w4</Option>
                                        <Option value="w5">w5</Option>
                                        <Option value="w6">w6</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    name="method_port"
                                    label="??????"
                                    rules={[{required: true, message: '???????????????????????????'}]}
                                >
                                    <Input
                                        style={{width: '100%'}}
                                        placeholder="??????????????????"
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={8}>
                                <Form.Item
                                    name="method_people"
                                    label="?????????"
                                    rules={[{required: true, message: '????????????????????????????????????'}]}
                                >
                                    <Input
                                        style={{width: '100%'}}
                                        placeholder="???????????????"
                                    />
                                </Form.Item>
                            </Col>

                            <Col span={8}>
                                <Form.Item
                                    name="method_environment"
                                    label="?????????"
                                    rules={[{required: true, message: '?????????????????????????????????'}]}
                                >
                                    <Input
                                        style={{width: '100%'}}
                                        placeholder="?????????????????????"
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    name="method_interface"
                                    label="?????????"
                                    rules={[{required: true, message: '????????????????????????'}]}
                                >
                                    <Input
                                        style={{width: '100%'}}
                                        placeholder="???????????????"
                                    />
                                </Form.Item>
                            </Col>

                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    name="method_location"
                                    label="????????????????????????"
                                    rules={[{required: true, message: '????????????????????????????????????'}]}
                                >
                                    <Input placeholder="?????????????????????Server????????????py?????????????????????"/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    name="method_function"
                                    label="??????????????????"
                                >
                                    <Input placeholder="??????????????????"/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    name="input_field"
                                    label="????????????"

                                >
                                    <Table
                                        components={components}
                                        rowClassName={() => 'editable-row'}
                                        title={() => <Button type={"primary"}
                                                             onClick={() => this.handleInputFieldTableAdd()}>????????????</Button>}
                                        bordered={true}
                                        columns={input_field_columns}
                                        dataSource={this.state.input_field_data}/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    name="input_field"
                                    label="????????????"
                                >
                                    <Table
                                        components={components}
                                        rowClassName={() => 'editable-row'}
                                        title={() => <Button type={"primary"}
                                                             onClick={() => this.handleOutputFieldTableAdd()}>????????????</Button>}
                                        bordered={true}
                                        columns={output_field_columns}
                                        dataSource={this.state.output_field_data}/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={18}/>
                            <Col span={6}>
                                <div style={{display: "flex"}}>
                                    <Button type="primary" htmlType="submit"> ??????</Button>
                                    <Button type="primary" style={{marginLeft: "30px"}}
                                            onClick={() => this.onClose()}> ??????</Button>
                                </div>
                            </Col>
                        </Row>
                    </Form>
                </Drawer>
            </div>
        )
    }
}

export default withRouter(AlgorithmListBody)