//导入全局的组件
import MyBread from '@/components/my-bread'

//自定义插件
export default {
  install(Vue) {
    Vue.component(MyBread.name, MyBread)
  }
}
