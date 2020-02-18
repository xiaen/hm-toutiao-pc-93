//导入全局的组件
import MyBread from '@/components/my-bread'
import Mychannel from '@/components/my-channel'
import MyImage from '@/components/my-image'

//自定义插件
export default {
  install(Vue) {
    Vue.component(MyBread.name, MyBread)
    Vue.component(Mychannel.name, Mychannel)
    Vue.component(MyImage.name, MyImage)
  }
}
