import Vue from 'vue'
// 引入vuex
import Vuex from 'vuex'
// 使用vuex插件
Vue.use(Vuex)

import home from './home'
import search from './search'
import detail from './detail'
import shopcart from './shopcart'
import user from './user'
import trade from './trade'
import test from './test'

// 创建store并导出store
export default new Vuex.Store({
    // Vuex仓库模块开发存储数据
    modules:{
        home,
        search,
        detail,
        shopcart,
        user,
        trade,
        test
    }
})
