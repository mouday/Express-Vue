import axios from 'axios';
import { Message, Loading } from 'element-ui';
import router from '@/router'
import store from "@/store"

let loading;

// 启动
function startLoading() {
    loading = Loading.service({
        lock: true,
        text: "拼命加载中...",
        background: "rgb(0,0,0,0.7)"
    });
}

// 关闭
function endLoading() {
    loading.close();
}

// create an axios instance
const service = axios.create({
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 5000 // request timeout
})

// 请求拦截器
service.interceptors.request.use(config => {
    // 启动动画
    startLoading();
    const token = localStorage.token;

    if (token) {
        // 设置请求头
        config.headers.Authorization = "Bearer " + token;
    }

    return config;
}, error => {
    return Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(response => {
    // 结束动画
    endLoading();
    return response.data;
}, error => {
    // 错误提醒
    endLoading();
    const { status } = error.response;

    // token过期，会返回401，清除token
    if (status == 401) {
        localStorage.removeItem("token")
        store.dispatch("removeToken")

        Message.error("登录过期，请重新登录")
        router.push({ name: "Login" })
    }

    return Promise.resolve({ code: -1, msg: '加载失败', data: null })
})

export default service;