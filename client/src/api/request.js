import axios from 'axios'

const request = axios.create(
    {
        baseURL: 'http://localhost:3001',
        timeout: 5000
    }
)

// 请求拦截
request.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export default request
