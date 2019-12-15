import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../views/Layout/Index.vue'

//引入日期:2019-11-28
import jwt_decode from 'jwt-decode'

Vue.use(Router)


/**
 * 创建自定义的路由以供外部访问
 * @type {any[]}
 */

/**
 * 2019-11-19
 * show:true     如果hidden为true则在左侧菜单栏展示，否则不显示‘
 * name:'router-name'      路由名称，必须填写
 * meta{
 *  title:'title'   对应路由在左侧菜单栏的标题名称
 *  icon:'icon-class'    对应路由在左侧菜单栏的图标样式，样式使用fontawesome图标库
 * }
 * @type {({path: string; name: string; component: Layout; redirect: string; children: {path: string; name: string; component: () => Promise<any>|any}[]} | {path: string; name: string; component: Layout; redirect: string; children: ({path: string; name: string; component: () => Promise<any>|any} | {path: string; name: string; component: () => Promise<any>|any} | {path: string; name: string; component: () => Promise<any>|any})[]} | {path: string; name: string; component: Layout; redirect: string; children: {path: string; name: string; component: () => Promise<any>|any}[]} | {path: string; component: Layout; redirect: string; children: {path: string; name: string; component: () => Promise<any>|any}[]} | {path: string; name: string; component: () => Promise<any>|any} | {path: string; redirect: string} | {path: string; name: string; component: () => Promise<any>|any} | {path: string; name: string; component: () => Promise<any>|any})[]}
 */

export const asyncRouterMap = [
    {
        path: '/',
        name: 'dashboard',
        component: Layout,
        //以下一个属性是后面加入的
        show: true,//表示该组件显示出来
        redirect: '/home',
        children: [
            {
                path: '/home',
                name: 'home',
                //以下一个属性是后面加入的
                meta: {
                    title: "首页",
                    icon: "fa fa-home"
                },
                component: () => import ('@/views/Home.vue')
            }
        ]
    },
    {
        path: '/dataManage',
        name: 'dataManage',
        component: Layout,
        //以下两个属性是后面加入的
        show: true,//表示该组件显示出来
        meta: {
            title: "数据管理",
            icon: "fa fa-database"
        },
        redirect: '/tableData',
        children: [
            {
                path: '/tableData',
                name: 'tableData',
                //以下一条属性是后面加的
                meta: {
                    title: "表格管理",
                    icon: "fa fa-table"
                },
                component: () => import ('@/views/DataManage/TableData.vue')
            },
            {
                path: '/chartsData',
                name: 'chartsData',
                //以下一条属性是后面加的
                meta: {
                    title: "图表管理",
                    icon: "fa fa-bar-chart"
                },
                component: () => import ('@/views/DataManage/ChartsData.vue')
            },
            {
                path: '/formData',
                name: 'formData',
                //以下一条属性是后面加的
                meta: {
                    title: "表单管理",
                    icon: "fa fa-file-text",
                    roles: ["admin", "editor"]
                },
                component: () => import ('@/views/DataManage/FormData.vue')
            }
        ]
    },
    {
        path: '/userManage',
        name: 'userManage',
        component: Layout,
        //以下一条属性是后面加的
        show: true,
        redirect: '/accountData',
        children: [
            {
                path: '/accountData',
                name: 'accountData',
                //以下一条属性是后面加的
                meta: {
                    title: '账户管理',
                    icon: 'fa  fa-user-plus',
                    roles: ["admin"]
                },
                component: () => import ('@/views/UserManage/AccountData.vue')
            }
        ]
    },
    /**
     * 由于要进行权限控制，所以在管理员进入管理中心进行路由的时候不加载其他页面而是直接进入，所以不应该存在于子路由中
     */
    {
        path: '/user',
        component: Layout,
        //以下一条属性是后面加的
        show: false,
        redirect: '/userInfo',
        children: [
            {
                path: '/userInfo',
                name: 'userInfo',
                //以下一条属性是后面加的
                meta: {
                    title: '个人中心'
                },
                component: () => import ('@/views/UserManage/UserInfo.vue')
            }
        ]
    },
    {
        path: '/404',
        name: '404',
        //以下两条属性是后面加的
        show: false,
        meta: {
            title: '404'
        },
        component: () => import("@/views/404.vue")
    },
    {
        path: "*",
        //以下一条属性是后面加的
        show: false,
        redirect: '/404'
    },
    {
        path: '/login',
        name: 'login',
        //以下两条属性是后面加的
        show: false,
        meta: {
            title: '系统登录'
        },
        component: () => import("@/views/Login/Login.vue")
    },
    {
        path: '/password',
        name: 'password',
        //以下两条属性是后面加的
        show: false,
        meta: {
            title: '找回密码'
        },
        component: () => import("@/views/Login/Password.vue")
    }
]

const router: any = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
    //  将以下内容替换为asyncRouterMap路由数组
    // routes:[
    //     {
    //         path:'/',
    //         name:'layout',
    //         component:Layout
    //     },
    //     {
    //         path:'/login',
    //         name:'login',
    //         component:()=>import("@/views/Login/Login.vue")
    //     },
    //     {
    //         path:'/password',
    //         name:'password',
    //         component:()=>import("@/views/Login/Password.vue")
    //     }
    // ]
    routes: asyncRouterMap
});
router.beforeEach((to: any, from: any, next: any) => {
    const isLogin = localStorage.tsToken ? true : false;
    if (to.path == "/login" || to.path == "/password") {
        next();
    } else {
        // isLogin?next():next("/login");
        /**
         * 以上注释时间2019-11-28
         * 更改为以下内容：
         */
        if (isLogin) {
            const decoded: any = jwt_decode(localStorage.tsToken);
            const {key} = decoded;
            if (hasPermission(to, key)) {
                next();
            } else {
                next("/404");
            }
        } else {
            next("/login");
        }
    }
})

function hasPermission(routes: any, roles: string) {
    if (routes.meta && routes.meta.roles) {
        return routes.meta.roles.some((route: any) => route.indexOf(roles) >= 0);
    } else {
        return true;
    }
}

export default router;

