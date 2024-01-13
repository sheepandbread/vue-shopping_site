// axios二次封装
import axios from 'axios';
// 进度条
import nprogress from 'nprogress';
// 引入进度条样式
import "nprogress/nprogress.css"
// 引入store
import store from '@/store';

//创建axios实例
const requests = axios.create({
    // 配置对象
    // 基础路径
    baseURL:"/api",
    // 代表请求超时的时间为5s
    timeout:5000,
});
// 请求拦截器
requests.interceptors.request.use((config)=>{
    if(store.state.detail.uuid_token){
        // 请求头添加一个字段(userTempId)
        config.headers.userTempId = store.state.detail.uuid_token;
    }
    //需要携带token给服务器
    if (store.state.user.token) {
        //给请求头加数据
        config.headers.token = store.state.user.token
    }
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