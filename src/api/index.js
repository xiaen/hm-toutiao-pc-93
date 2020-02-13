//axios配置

//引入axios
import axios from 'axios'

//引入token相关函数
import auth from '@/utils/auth'

//引入router路由
import router from '@/router'

//引入json-bigint
import JSONBIGINT from 'json-bigint'

//设置axios基准地址
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'

//在请求响应前，修改数据，参数data是响应数据
axios.defaults.transformResponse = [(data) => {
  //data有可能不是json格式，如果转换，会报错
  try {
    //使用json-bigint转换json数据
    return JSONBIGINT.parse(data)
  } catch(e) {
    //如果转换失败，直接返回data
    return data
  }
}]

//设置axios请求拦截器，监听每一次请求
axios.interceptors.request.use(config => {
  //拦截成功，设置请求头
  const user = auth.getUser()
  if (user.token) config.headers.Authorization = `Bearer ${user.token}`
  return config
}, error => {
  return Promise.reject(error)
})

//设置axios响应拦截器，监听每一次响应
axios.interceptors.response.use(response => {
  return response
}, error => {
  //响应出错，跳转到登录页面
  if (error.response && error.response.status === 401) router.push('/login')
  return Promise.reject(error)
})

//导出
export default axios
