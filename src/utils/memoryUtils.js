/*
用来在内存中保存一些数据的工具模块
 */

export default {
    system_config:{
        w1_url: "http://114.212.82.175",
        w2_url: "http://114.212.81.252",
        w3_url: "http://114.212.81.162",
        w4_url: "http://114.212.86.58",
        w5_url: "http://114.212.87.31",
        w6_url: "http://114.212.87.191"
    },//保存当前系统配置

    system_server:[
        {
            key: 0,
            server_name: "主控",
            address: "w1",
            port: "4003",
            environment: "NJUMagic",
            function: "启动后台服务",
            filepath: "/home/magic/NJU-Magic/back-end/Server/main_control.py",
            state: ["未知"],
            apis:[]
        },
        {
            key: 1,
            server_name: "主控",
            address: "w2",
            port: "4003",
            environment: "NJUMagic",
            function: "启动后台服务",
            filepath: "/home/magic/NJU-Magic/back-end/Server/main_control.py",
            state: ["未知"],
            apis:[]
        },
        {
            key: 2,
            server_name: "主控",
            address: "w3",
            port: "4003",
            environment: "NJUMagic",
            function: "启动后台服务",
            filepath: "/home/magic/NJU-Magic/back-end/Server/main_control.py",
            state: ["未知"],
            apis:[]
        },
        {
            key: 3,
            server_name: "主控",
            address: "w4",
            port: "4003",
            environment: "base",
            function: "启动后台服务",
            filepath: "/home/magic/temp/Server/main_control.py",
            state: ["未知"],
            apis:[]
        },
        {
            key: 4,
            server_name: "主控",
            address: "w5",
            port: "4003",
            environment: "lst",
            function: "启动后台服务",
            filepath: "/home/magic/lst/main_control.py",
            state: ["未知"],
            apis:[]
        },
        {
            key: 5,
            server_name: "主控",
            address: "w6",
            port: "4003",
            environment: "NJUMagic",
            function: "启动后台服务",
            filepath: "/home/magic/NJU-Magic/back-end/Server/main_control.py",
            state: ["未知"],
            apis:[]
        },
        {
            key: 6,
            server_name: "算法管理服务",
            address: "w3",
            port: "4310",
            environment: "NJUMagic",
            function: "管理算法的增删改查",
            filepath: "/home/magic/NJU-Magic/back-end/Server/algorithm_management_server.py",
            state: ["未知"],
            apis:[
                {
                    api_name: "req_all_algorithm_info",
                    api_function: "查询所有算法信息"
                },
                {
                    api_name: "req_insert_algorithm_info",
                    api_function: "插入算法信息"
                },
                {
                    api_name: "req_delete_algorithm_info",
                    api_function: "删除算法信息"
                },
                {
                    api_name:"req_update_algorithm_info",
                    api_function:"更新算法信息"
                }
            ]
        },
        {
            key: 7,
            server_name: "数据管理服务",
            address: "w6",
            port: "4001",
            environment: "NJUMagic",
            function: "管理各种数据，原始数据、结果数据等",
            filepath: "/home/magic/NJU-Magic/back-end/Server/data_upload_server.py",
            state: ["未知"],
            apis:[
                {
                    api_name: "uploadimgs",
                    api_function: "管理算法封面的上传和存储"
                },
                {
                    api_name: "clearimgs",
                    api_function: "删除文件夹中不在数据库中记录的算法封面图片"
                },
            ]
        },
        {
            key: 8,
            server_name: "Data",
            address: "w6",
            port: "4000",
            environment: "NJUMagic",
            function: "将后端数据放在局域网供前端访问",
            filepath: "/home/magic/NJU-Magic/back-end/Data.py",
            state: ["未知"],
            apis:[]
        },
		{
            key: 9,
            server_name: "algorithmCall",
            address: "w3",
            port: "4200",
            environment: "NJUMagic",
            function: "前端使用该api调用后端算法",
            filepath: "/home/magic/NJU-Magic/back-end/algorithm_call_wy.py",
            state: ["未知"],
            apis:[
				{
                    api_name: "algorithmCall",
                    api_function: "算法调用"
                },
			]
        },
	{
            key: 10,
            server_name: "dataManagement",
            address: "w6",
            port: "4301",
            environment: "NJUMagic",
            function: "管理数据并连接数据库",
            filepath: "/home/magic/NJU-Magic/back-end/data_management_request.py",
            state: ["未知"],
            apis:[
				{
                    api_name: "getModalData",
                    api_function: "从模态数据库获取数据"
                },
				{
                    api_name: "getSingleModalAlgData",
                    api_function: "从单模态算法结果数据库获取数据"
                },
				{
                    api_name: "getMultiModalData",
                    api_function: "从多模态算法结果数据库获取数据"
                },
				{
                    api_name: "getInspectionData",
                    api_function: "从巡检结果数据库获取数据"
                },
				{
                    api_name: "getBIMScene",
                    api_function: "从BIM数据库获取数据"
                },
			]
        },
    ]
}