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
//引入内容组件
import Article from '@/views/article'
//引入素材组件
import Image from '@/views/image'
//引入发布文章组件
import Publish from '@/views/publish'

//引入auth文件，token存储相关函数
import auth from '@/utils/auth'

//初始化
const router = new VueRouter({
  routes:[
  {path: '/login', component: Login},
  {path: '/', component: Home, children: [
    {path: '/', component: Welcome},
    {path: '/article', component: Article},
    {path: '/image', component: Image},
    {path: '/publish', component: Publish}
  ]},
  {path: '*', component: NotFound}
  ]
})

//路由前置导航守卫
router.beforeEach((to, from, next) => {
  //如果不是login地址，并且没有token，则跳转到login页面
  if (to.path !== '/login' && !auth.getUser().token) return next('/login')
  //其他放行
  next()
})

//导出路由实例
export default router
