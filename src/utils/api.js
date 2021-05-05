import axios from "axios";
import {Toast} from "vant";
import store from "@/store";

// 响应拦截器
axios.interceptors.response
    .use(response => {
        if (response.status && response.status === 200 && response.data.errorCode !== 0) {
            Toast(response.data.errorMsg)
            if (response.data.errorCode === -1001) {
                store.commit('clearUserInfo');
            }
            return;
        }
        if (response.data.errorMsg) {
            Toast(response.data.errorMsg)
        }
        return response.data.data;
    }, error => {
        if (error.response.status === 404) {
            Toast('请求的资源不存在！');
        } else {
            if (error.response.data.errorMsg) {
                Toast(error.response.data.errorMsg);
            } else {
                Toast('未知错误！');
            }
        }
        return error.response;
    })

let base = '';

export const postKeyValueRequest = (url, params) => {
    return axios({
        method: 'post',
        url: `${base}${url}`,
        data: params,
        transformRequest: [function (data) {
            // 数据默认会以json格式传递，需要转成key-value
            let ret = '';
            for (let i in data) {
                ret += encodeURIComponent(i) + '=' + encodeURIComponent(data[i]) + '&'
            }
            return ret;
        }],
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
}

export const postRequest = (url, params) => {
    return axios({
        method: 'post',
        url: `${base}${url}`,
        data: params
    })
}

export const putRequest = (url, params) => {
    return axios({
        method: 'put',
        url: `${base}${url}`,
        data: params
    })
}

export const getRequest = (url, params) => {
    return axios({
        method: 'get',
        url: `${base}${url}`,
        data: params
    })
}

export const deleteRequest = (url, params) => {
    return axios({
        method: 'delete',
        url: `${base}${url}`,
        data: params
    })
}