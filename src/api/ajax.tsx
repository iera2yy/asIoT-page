/**
 * 发送ajax异步请求的函数模块
 * @param url
 * @param data
 * @param type
 * @returns Promise
 */
import axios from 'axios'
import qs from 'querystring'

export const ajax = (url: string, data={}, type="GET"): any => {
    return type === "GET" ? axios.get(url, { params: data }) : axios.post(url, qs.stringify(data))
}