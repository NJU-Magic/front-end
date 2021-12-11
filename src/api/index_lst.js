import ajax from './ajax'
import system_config from "../utils/memoryUtils"

const w = system_config.system_config;

export const reqAllAlgorithmInfo = () => ajax(w.w3_url+":4310/req_all_algorithm_info",{},"POST");
export const reqUpdateAlgorithmInfo = (data) => ajax(w.w3_url+":4310/req_update_algorithm_info",{data},"POST");


export const reqIfAlgorithmAvail = (wurl, port) => ajax(wurl+":"+port+"/avail",{},"POST","throw");

export const reqInsertAlgorithmInfo = (data) => ajax(w.w3_url+":4310/req_insert_algorithm_info",{data},"POST");
export const reqDeleteAlgorithmInfo = (alg_id) => ajax(w.w3_url+":4310/req_delete_algorithm_info",{alg_id},"POST");

export const reqRebootServer = (url, filepath, env) => ajax(url, {server_file_path:filepath, environment:env}, "POST");