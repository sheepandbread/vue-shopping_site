// axios二次封装
import axios from 'axios';
// 进度条
import nprogress from 'nprogress';
// 引入进度条样式
import "nprogress/nprogress.css"

//创建axios实例
const requests = axios.create({
    // 配置对象
    // 基础路径
    baseURL:"/mock",
    // 代表请求超时的时间为5s
    timeout:5000,
});
// 请求拦截器
requests.interceptors.request.use((config)=>{
    nprogress.start();
    return config;
});
// 响应拦截器
requests.interceptors.response.use((res)=>{
    nprogress.done();
    return res.data;
},(error)=>{
    return Promise.reject(new Error("fail"));
});

export default requests;