import axios from 'axios'
axios.defaults.timeout = 100000

// 请求拦截器
axios.interceptors.request.use(request => {
        return request
})

// 响应拦截器
axios.interceptors.response.use(response => {
    return response
})



export default axios