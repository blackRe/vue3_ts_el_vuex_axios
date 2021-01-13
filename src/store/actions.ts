/**
 * @description [store.actions] 数据
 * @author Hilary
 * @date 2019/11/09
 */
 
import { Commit, Action, ActionTree } from 'vuex';
import * as types from './mutation-types'
import { SetNewSearchState } from './modules/search';
import { State } from './index'
 
/**
 * 设置state的数据
 * @param context 
 * @param newObj 
 */
const setStateData: Action<State, any> = (context: {commit: Commit; state: State}, newObj: SetNewSearchState) => {
    console.log('===============setStateData=====================');
    console.log(context.state);
    console.log('====================================');
    context.commit(types.SET_STATE_DATA, newObj)
}
 
/**
 * 初始化state的数据
 * @param context 
 */
const initStateData: Action<State, any> = (context: { commit: Commit; state: State }) => {
    context.commit(types.INIT_STATE)
}
 
const actions: ActionTree<State, any> = {
    setStateData,
    initStateData
}
 
export default actions