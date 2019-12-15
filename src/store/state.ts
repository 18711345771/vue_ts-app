/**
 * 管理源数据的容器
 * @type {{user: null; routers: ({path: string; name: string; component: Layout; show: boolean; redirect: string; children: {path: string; name: string; meta: {title: string; icon: string}; component: () => Promise<any>|any}[]} | {path: string; name: string; component: Layout; show: boolean; meta: {title: string; icon: string}; redirect: string; children: ({path: string; name: string; meta: {title: string; icon: string}; component: () => Promise<any>|any} | {path: string; name: string; meta: {title: string; icon: string}; component: () => Promise<any>|any} | {path: string; name: string; meta: {title: string; icon: string}; component: () => Promise<any>|any})[]} | {path: string; name: string; component: Layout; show: boolean; redirect: string; children: {path: string; name: string; meta: {title: string; icon: string}; component: () => Promise<any>|any}[]} | {path: string; component: Layout; hidden: boolean; redirect: string; children: {path: string; name: string; meta: {title: string}; component: () => Promise<any>|any}[]} | {path: string; name: string; show: boolean; meta: {title: string}; component: () => Promise<any>|any} | {path: string; show: boolean; redirect: string} | {path: string; name: string; show: boolean; meta: {title: string}; component: () => Promise<any>|any} | {path: string; name: string; show: boolean; meta: {title: string}; component: () => Promise<any>|any})[]}}
 */
const state: any = {
    user: null,
    /**
     * 2019-11-18
     * 以下引入routers
     */
    // routers:asyncRouterMap
    /**
     * 上一条注释时间：2019-11-28
     * 更改为下一条语句
     */
    routers: []
};

export default state;