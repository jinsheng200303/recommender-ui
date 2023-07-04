import axios from 'axios'

const request = axios.create({
    baseURL: '/proxy',
    timeout: 60000
})

// request 拦截器
// 可以自请求发送前对请求做一些处理
// 比如统一加token，对请求参数统一加密
request.interceptors.request.use(config => {
    // config.headers['Content-Type'] = 'application/json;charset=utf-8';
    // config.headers['token'] = user.token;  // 设置请求头
    config.headers = {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json'
      };
       //注意使用token的时候需要引入cookie方法或者用本地localStorage等方法，推荐js-cookie
         const token = JSON.parse(window.sessionStorage.getItem('token')); //这里取token之前，你肯定需要先拿到token,存一下
         if (token) {
           //  config.params = {'token':token} //如果要求携带在参数中
           config.headers.Authorization = token; //如果要求携带在请求头中
         }
    return config
}, error => {
    return Promise.reject(error)
});

// response 拦截器
// 可以在接口响应后统一处理结果
request.interceptors.response.use(
    response => {
        let res = response.data;
        // 如果是返回的文件
        if (response.config.responseType === 'blob') {
            return res
        }
        // 兼容服务端返回的字符串数据
        if (typeof res === 'string') {
            res = res ? JSON.parse(res) : res
        }
        return res;
    },
    error => {
        console.log('err' + error) // for debug
        return Promise.reject(error)
    }
)


export default request