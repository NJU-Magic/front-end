import ajax from './ajax'
import jsonp from 'jsonp'
import {message} from 'antd'

const base_url = "http://172.27.153.186:8888";

export const reqControl = (keyboard) => ajax(base_url + "/control", {keyboard}, 'POST');