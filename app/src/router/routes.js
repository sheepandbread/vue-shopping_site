// 引入路由组建
// import Home from '@/pages/Home'
// import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'

//测试页
import Test from '@/pages/Test'

// 引入二级路由
import MyOrder from '@/pages/Center/myOrder'
import GroupOrder from '@/pages/Center/groupOrder'

/*
当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。
如果我们能把不同路由对应的组件分割成不同的代码块，
然后当路由被访问的时候才加载对应组件，这样就更加高效了。
*/
export default [
    {
        path: "/home",
        component: () => import('@/pages/Home'),
        meta: { show: true }
    }, {
        path: "/login",
        component: Login,
        meta: { show: false }
    }, {
        path: "/register",
        component: Register,
        meta: { show: false }
    }, {
        name: 'search',
        path: "/search/:keyword?",
        component: () => import('@/pages/Search'),
        meta: { show: true },
        props: ($route) => ({ keyword: $route.params.keyword, k: $route.query.k })
    }, {
        path: "/detail/:skuid?",
        component: Detail,
        meta: { show: false }
    },
    {
        path: "/addcartsuccess",
        name: "addcartsuccess",
        component: AddCartSuccess,
        meta: { show: true }
    },
    {
        path: "/shopcart",
        name: "shopcart",
        component: ShopCart,
        meta: { show: true }
    },
    {
        path: "/trade",
        component: Trade,
        meta: { show: true },
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            // 去交易界面，必须从购物车来
            if (from.path == '/shopcart') {
                next()
            } else {
                next(false) //中断当前导航，重置到from
            }
        }
    }, {
        path: "/pay",
        component: Pay,
        meta: { show: true },
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            if (from.path == '/trade') {
                next();
            } else {
                next(false);
            }
        }
    }, {
        path: "/paysuccess",
        component: PaySuccess,
        meta: { show: true }
    }, {
        path: "/center",
        component: Center,
        meta: { show: true },
        //二级路由组件
        children: [
            {
                path: "myorder",
                component: MyOrder,
            },
            {
                path: "grouporder",
                component: GroupOrder,
            },
            {
                path: "/center",
                redirect: "/center/myorder"
            }
        ]
    },{
        path: "/test",
        component: Test,
        meta: { show: true }
    },
    //重定向
    {
        path: "*",
        redirect: "/home"
    }
]