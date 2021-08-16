import ajax from './ajax'
import jsonp from 'jsonp'
import {message} from 'antd'

const base_url = "http://172.27.153.186:8888";
const w3_url = "http://114.212.81.162:4000";
const w3_url_test = "http://114.212.81.162:4001";
export const reqControl = (url, keyboard) => ajax(url + "/control", {keyboard}, 'POST');
export const reqConnect2Car = (url) => ajax(url + "/connection", {}, "POST");
export const reqStartRecording = (url) => ajax(w3_url + "/startrecording", {url}, "POST");
export const reqEndRecording = (url) => ajax(w3_url + "/endrecording", {url}, "POST");
export const reqImuData = (url) => ajax(url + "/imu", {}, "POST");
export const reqAllSceneData = () => ajax(w3_url_test + "/getallsceneinfo", {}, "POSE");
export const reqSceneDatabyID = (sceneId) => ajax(w3_url_test + "/getsceneinfobyid", {sceneId}, "POST");