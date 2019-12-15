/**
 *与getters相似，不过是获取了衍生数据
 */
import {MutationTree} from "vuex";

/**
 * 可直接修改（显式地修改）state容器数据并保存
 * @type {{SET_USER(state: any, user: any): void; SET_ROUTERS(state: any, routers: any): void}}
 */
const mutations: MutationTree<any> = {
    SET_USER(state: any, user: any): void {
        state.user = user;
    },
    SET_ROUTERS(state: any, routers: any): void {
        state.routers = routers;
    }
};

export default mutations;