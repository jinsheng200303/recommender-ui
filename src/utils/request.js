import axios from 'axios'

const request = axios.create({
    baseURL: '/proxy',
    timeout: 60000
})

//请求拦截器：在发请发之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情
request.interceptors.request.use((config)=>{
    //config:配置对象，对象里面有一个属性很重要，headers请求
    return config
})
//响应拦截器
request.interceptors.response.use((res)=>{
   return res;
},(error)=>{
   return Promise.reject(new Error('faile'))
})
export default request