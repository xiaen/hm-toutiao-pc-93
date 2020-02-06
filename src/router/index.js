//引入router
import VueRouter from 'vue-router'
//注册vue框架
import Vue from 'vue'
Vue.use(VueRouter)

//引入组件
import login from '../views/login.vue'

//初始化
const router = new VueRouter({
  routes:[
  {path:'/', component:login}
  ]
})

//导出路由实例
export default router
