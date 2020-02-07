import Vue from 'vue'
import App from './App.vue'

//导入axios
import axios from 'axios'

//导入路由
//import router from './router/index.js'
import router from '@/router'

//导入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//使用element-ui
Vue.use(ElementUI)

//挂载$http  对象就是axios
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
