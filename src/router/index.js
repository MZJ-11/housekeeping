
import VueRouter from 'vue-router';
// import { createRouter,createWebHashHistory } from "vue-router"

const routes = [
    {
        path: '/',
        name: 'login',
        component: () => import('../components/Login')
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('../components/Register')
    },
    {
        path: '/index',
        name: 'index',
        meta: {
            isAnth: true
        },
        component: () => import('../components/Index'),
        children: [
            {
                path: 'home',
                name: 'home',
                meta: {
                    title: '首页',
                    isAnth: true
                },
                component: () => import('../components/Home')
            },
            // {
            //     path:'modinfo',
            //     name:'modinfo',
            //     meta:{
            //         title:'修改个人信息',
            //         isAnth:true
            //     },
            //     component:()=>import('../components/ModInfo')
            // },
            {
                path: 'user',
                name: 'user',
                meta: {
                    title: '用户管理',
                    isAnth: true
                },
                component: () => import('../components/user/UserManage.vue')
            },
            {
                path: 'order',
                name: 'order',
                meta: {
                    title: '订单管理',
                    isAnth: true
                },
                component: () => import('../components/order/OrderManage.vue')
            },
            {
                path: 'company',
                name: 'company',
                meta: {
                    title: '公司管理',
                    isAnth: true
                },
                component: () => import('../components/company/CompanyManage.vue')
            },
            {
                path: 'worker',
                name: 'worer',
                meta: {
                    title: '工人管理',
                    isAnth: true
                },
                component: () => import('../components/worker/WorkerManage.vue')
            },
            {
                path: 'send',
                name: 'send',
                meta: {
                    title: '用户下单',
                    isAnth: true
                },
                component: () => import('../components/send/Send.vue')
            }
        ]
    }
]

const router = new VueRouter({
    routes
})

// const router = createRouter({
//     /**
//      * createWebHashHistory 使用这个比较好
//      *      home:http://localhost:8080/#/
//      *      about:http://localhost:8080/#/about
//      * 
//      *  原理：a标签锚点连接
//      */
//     /**
//      * createWebHistory
//      *      home:http://localhost:8080/
//      *      about:http://localhost:8080/about
//      * 此种方式，需要后台配合做重定向，否则会出现404问题
//      * 
//      * 原理：H5 pushState()
//      */
//     history:createWebHashHistory(),
//     routes
// })





//解决vue路由重复导航错误
// 获取原型对象push函数
const originalPush = VueRouter.prototype.push
// 获取原型对象replace函数
const originalReplace = VueRouter.prototype.replace

// 修改原型对象中的push函数
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
// 修改原型对象中的replace函数
VueRouter.prototype.replace = function replace(location) {
    return originalReplace.call(this, location).catch(err => err)
}

// 这里其实就是设置了每个用户所拥有的侧边栏数目

router.beforeEach((to, from, next) => {
    //console.log(to,from,next)
    if (to.meta.isAnth) {
        if (sessionStorage.key(0)) {
            next()
        } else {
            alert('没有权限访问')
        }
    } else {
        next()
    }
})






export default router