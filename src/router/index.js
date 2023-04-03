
import VueRouter from 'vue-router';

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
            //     path:'admin',
            //     name:'admin',
            //     meta:{
            //         title:'管理员管理',
            //         isAnth:true
            //     },
            //     component:()=>import('../components/admin/AdminManage.vue')
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
                path: 'package',
                name: 'package',
                meta: {
                    title: '快递管理',
                    isAnth: true
                },
                component: () => import('../components/package/PackageManage.vue')
            },
            {
                path: 'station',
                name: 'station',
                meta: {
                    title: '网点管理',
                    isAnth: true
                },
                component: () => import('../components/station/StationManage.vue')
            },
            {
                path: 'postman',
                name: 'postman',
                meta: {
                    title: '快递员管理',
                    isAnth: true
                },
                component: () => import('../components/postman/PostmanManage.vue')
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