import Vue from 'vue'
import App from './App.vue'
//引入路由
import router from '@/router'
// 引入element-ui 样式
import { Button, MessageBox } from 'element-ui'
Vue.component(Button.name, Button)
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
//三级联动组件 -- 全局组件
import TypeNav from '@/components/TypeNav'
Vue.component(TypeNav.name, TypeNav)
//轮播图
import Carousel from '@/components/Carousel'
Vue.component(Carousel.name, Carousel)
//分页器
import Pagination from '@/components/Pagination'
Vue.component(Pagination.name, Pagination)
//引入mock数据
import '@/mock/mockServe'
// 引入swiper样式
import 'swiper/css/swiper.css'
//统一接口api文件里面全部请求函数
import * as API from '@/api'
// 引入仓库
import store from '@/store'
//引入插件（图片懒加载）
import VueLazyload from 'vue-lazyload'
import bcat from '@/assets/1.gif' //暴露图片
Vue.use(VueLazyload, {
  //懒加载默认图片
  loading: bcat,
})
//引入自定义插件
import myPlugins from '@/plugins/myPlugins'
Vue.use(myPlugins, {
  name: 'upper'
});
//引入校验插件
import "@/plugins/validate"


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  // 全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
  router,
  store,
}).$mount('#app')
