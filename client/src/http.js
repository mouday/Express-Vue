import axios from 'axios';
import { Message, Loading } from 'element-ui';


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

// 请求拦截器
axios.interceptors.request.use(config => {
    // 启动动画
    startLoading();
    return config;
}, error => {
    return Promise.reject(error)
})

// 响应拦截器
axios.interceptors.response.use(response => {
    // 结束动画
    endLoading();
    return response.data;
}, error => {
    // 错误提醒
    endLoading();
    return Promise.resolve({ code: -1, msg: '加载失败' })
})

export default axios;