/**
 *获取用户状态的ts文件
 */
import {GetterTree} from "vuex";

/**
 * 获取衍生数据及数据链，不影响源数据
 * @type {{user(state: any): any; routers(state: any): any}}
 */
const getters: GetterTree<any, any> = {
    user(state: any): any {
        return state.user
    },
    routers(state: any): any {
        return state.routers;
    }
};

export default getters;