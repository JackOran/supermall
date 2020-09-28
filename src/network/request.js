import axios from 'axios'

export function request(config) {

  //创建实例对象
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:8000/api/z8',
    timeout: 5000,
  })

  //拦截数据

  //请求拦截
  instance.interceptors.request.use(config => {
    return config
  }, err => {
    return Promise.reject(err)
  })

  //响应拦截
  instance.interceptors.response.use(res => {
    return res
  }, err => {
    return Promise.reject(err)
  })


  //发送真实的网络请求
  return instance(config)
}
