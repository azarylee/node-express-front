import axios from 'axios'
import store from '@/store'

// create an axios instance
const service = axios.create({
    baseURL: 'http://127.0.0.1:3000/',
    timeout: 100000, // request timeout
    headers: {
      'Accept': 'application/json'
    },
    withCredentials: true
})

let pending = []; //声明一个数组用于存储每个ajax请求的取消函数和ajax标识
let cancelToken = axios.CancelToken;
let removePending = (config) => {
  for (let p in pending) {
    if (pending[p].u === config.url + '&' + config.method && pending[p].u !== '/api/whitelists' + '&' + config.method) {
      //当前请求在数组中存在时执行函数体
      pending[p].f(); //执行取消操作
      pending.splice(p, 1); //把这条记录从数组中移除
    }
  }
}

// request interceptor
// test gitlab
service.interceptors.request.use(
  config => {
    // config.headers['Content-Type'] = 'multipart/form-data'
    // console.log(config);
    removePending(config);
    //在一个ajax发送前执行一下取消操作
    config.cancelToken = new cancelToken((c) => {
      // 这里的ajax标识我是用请求地址&请求方式拼接的字符串，当然你可以选择其他的一些方式
      pending.push({
        u: config.url + '&' + config.method,
        f: c
      });
    });
    // config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
    // Do something before request is sent
    if (store.getters.token) {
      // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改 3600000
      config.headers['Admin-Token'] = getToken()
    }

    return config
    },
    error => {
        // Do something with request error
        // for debug
        console.log(error)
        if (!response.data) {
        reject(error);
        }
        Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    response => {
        console.log('response')
        console.log(response.data)
        return response;
    },
    error => {
        console.log("error:")
        console.log(error)
        console.log(error.response)
        return Promise.reject(error.response)
    }
)

export default service
