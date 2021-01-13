/**
 * @description [store.getters] 数据
 * @author Hilary
 * @date 2019/11/09
 */
 
import { GetterTree, Getter } from 'vuex'
import { State } from './index'
 
const date: Getter<State, any> = (state: State) => {
    return state.search.date
}
 
const name: Getter<State, any> = (state, State) => {
    return state.search.name
}
 
const getters: GetterTree<State, any> = {
    date,
    name
}
 
export default getters