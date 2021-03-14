import axios from 'axios';
import { Message } from 'element-ui';
import { getToken, setToken, removeToken } from './auth';

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 30000 // request timeout
})

// request interceptor
service.interceptors.request.use(config => {
  const token = getToken();
  if (token) {
    config.headers['token'] = token;
  }
  return config
},
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(response => {
  // console.log('response', response)
  const res = response.data
  // 请求成功
  if (res.code === 0) {
    // 保存token
    if (response.headers && response.headers.token) {
      setToken(response.headers.token);
    } else {
      // removeToken();
    }
    return res;
  } else {
    if (res.code === 2) {
      Message({
        message: '账号过期，请重新登录',
        type: 'error',
        duration: 3 * 1000
      })
      // 刷新页面
      // setTimeout(() => {
      //   window.location.reload();
      // }, 3000); 
    }
    // token 错误的
    else {
      // removeToken();
      // window.location.href = '/login';
    }
    return Promise.reject(new Error(message))
  }
},
  error => {
    console.log('err:' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
