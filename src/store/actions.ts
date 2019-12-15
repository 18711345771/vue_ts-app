import {ActionTree} from "vuex";
import jwt_decode from 'jwt-decode';
import {asyncRouterMap} from "@/router";

/**
 * 可以通过显式地提交mutation中的方法来修改state容器中的源数据
 * 可以包含异步操作（同样通过提交mutation来修改源数据（或称状态））
 *
 * Login.vue会提交token到该页面，token存在于user中，要解析token就要安装jwt-decode并且引入
 * @type {{setUser({state,commit}: {state: any; commit: any}, user: any): Promise<void>}}
 */
const actions: ActionTree<any, any> = {
    async setUser({state, commit}, user: any) {
        // commit("SET_USER",user);该句可用以下两句代替
        const decoded: any = jwt_decode(user);
        commit("SET_USER", decoded);

        //解构出来token（登陆成功后传过来并由user参数接收的值）里的key属性
        const {key} = decoded;

        //返回当前用户拥有权限的路由
        let accessRouters = filterAsyncRouter(asyncRouterMap, key);
        commit("SET_ROUTERS", accessRouters);
    }
};

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap 所有路由表
 * @param roles 当前角色
 */

function filterAsyncRouter(asyncRouterMap: Array<any>, roles: string) {
    //返回满足条件的元素
    const accessRouters = asyncRouterMap.filter(route => {
        if (hasPermission(roles, route)) {
            //对该路由的子路也进行过滤
            if (route.children && route.children.length) {
                route.children = filterAsyncRouter(route.children, roles);
            }
            return true;
        }
        return false;
    });
    return accessRouters;
}

/**
 * 判断是否有权限
 * @param roles 当前角色
 * @param route 当前路由对象
 */

function hasPermission(roles: string, route: any) {
    if (route.meta && route.meta.roles) {//如果meta.role包含角色的key值则有权限,否则无权限
        //some()方法用来判断数组是否含有满足条件的元素
        return route.meta.roles.some((role: any) => role.indexOf(roles) >= 0);
    } else {
        //如果使用到的路由没有权限的区分（即谁都可以访问的）就返回true，意为都有权限
        return true;
    }
}

export default actions;