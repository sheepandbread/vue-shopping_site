import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '@/store'

//使用插件
Vue.use(VueRouter)
//备份VueRouter原型对象的push
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace
// 重写push|replace
//第一个参数location，告诉push往哪儿跳
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => { }, () => { })
    }
}
//配置路由
let router = new VueRouter({
    routes, scrollBehavior(to, from, savedPosition) {
        // y=0 表示跳转后，滚动条在最顶部
        return { y: 0 }
    }
})
//全局守卫：前置守卫
router.beforeEach(async (to, from, next) => {
    //token
    let token = store.state.user.token;
    //用户信息
    let name = store.state.user.userInfo.name;
    if (token) {
        //用户已经登录,不允许跳转login页面
        if (to.path == '/login') {
            next('/home')
        } else {
            if (name) {
                next();
            } else {
                try {
                    //没有用户信息，派发action获取用户信息在首页展示
                    await store.dispatch('getUserInfo');
                    next();
                } catch (error) {
                    //token失效
                    //清除token
                    await store.dispatch('userLogout');
                    next('/login')
                }
            }
        }
    } else {
        //未登录：不能去交易相关、支付相关、个人中心
        let toPath = to.path;
        if (toPath.indexOf('/trade')!=-1 || toPath.indexOf('/pay')!=-1 || toPath.indexOf('/center')!=-1) {
            next('/login?redirect='+toPath);
        }else{
            next();
        }
    }
})

export default router;