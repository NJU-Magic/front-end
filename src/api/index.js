import ajax from './ajax'
import jsonp from 'jsonp'
import {message} from 'antd'

const base_url = "http://172.27.153.186:8888";

export const reqControl = (url, keyboard) => ajax(url + "/control", {keyboard}, 'POST');
export const reqConnect2Car = (url) => ajax(url + "/connection", {}, "POST");
export const reqStartRecording = (url) => ajax(url + "/startrecording", {}, "POST");
export const reqEndRecording = (url) => ajax(url + "/endrecording", {}, "POST");