//引入router
import VueRouter from 'vue-router'
//注册vue框架
import Vue from 'vue'
Vue.use(VueRouter)

//引入登录组件
import Login from '@/views/login'
//引入首页组件
import Home from '@/views/home'
//引入欢迎组件
import Welcome from '@/views/welcome'
//引入notfound组件
import NotFound from '@/views/notfound'

//初始化
const router = new VueRouter({
  routes:[
  {path: '/login', component: Login},
  {path: '/', component: Home, children: [{path: '/', component: Welcome}]},
  {path: '*', component: NotFound}
  ]
})

//导出路由实例
export default router
