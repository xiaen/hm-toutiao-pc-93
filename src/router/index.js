//引入router
import VueRouter from 'vue-router'
//注册vue框架
import Vue from 'vue'
Vue.use(VueRouter)

//引入登录组件
import Login from '@/views/login/index.vue'

//初始化
const router = new VueRouter({
  routes:[
  {path:'/login', component:Login}
  ]
})

//导出路由实例
export default router
