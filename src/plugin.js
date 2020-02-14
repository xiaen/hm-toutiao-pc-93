//导入全局的组件
import MyBread from '@/components/my-bread'
import Mychannel from '@/components/my-channel'

//自定义插件
export default {
  install(Vue) {
    Vue.component(MyBread.name, MyBread)
    Vue.component(Mychannel.name, Mychannel)
  }
}
