// import Vue from 'vue'
// import Vuex from 'vuex'

// Vue.use(Vuex)
// const moduleUser = {
//   state: {
// 	  userObj:'1',
// 	  conut:1
// 	},
//   mutations: { 
// 	  increment (state) {
// 	        // 变更状态
// 	        state.count++
// 	     }
//   },
//   actions: {  },
//   getters: {  }
// }
// const moduleB = {
//   state: {  },
//   mutations: {  },
//   actions: {  },
//   getters: {  }
// }
// export default new Vuex.Store({
//   state: {
// 	  /*
// 	  存储状态；
// 	  驱动应用的数据源*/
// 	  conut:0
//   },
//   mutations: {
// 	  /*更改 Vuex 的 store 中的状态的唯一方法是提交 mutation ；
// 		mutation必须是同步的，如果要异步需要使用action ；
// 		它会接受 state 作为第一个参数 ，提交载荷作为第二个参数。
// 		（提交荷载在大多数情况下应该是一个对象）,提交荷载也可以省略
// 	  */
// 	 increment(state, payload) {
// 	             state.count += payload.step || 1;
// 	         }
//   },
//   actions: {
// 	  /*有异步返回回来数据需要存储的时候用 actions ；
// 		Action 类似于 mutation，不同在于：
// 		Action 提交的是 mutation，而不是直接变更状态。
// 		Action 可以包含任意异步操作。
// 	  */
// 	 increment(context, param) {
// 	             context.state.count += param.step;
// 	             context.commit('increment', context.state.count)//提交改变后的state.count值
// 	         },
// 	         incrementStep({state, commit, rootState}) {
// 	             if (rootState.count < 100) {
// 	                 store.dispatch('increment', {//调用increment()方法
// 	                     step: 10
// 	                 })
// 	             }
// 	         }
	 
//   },
//   modules: {
// 	 /* 使用单一状态树，导致应用的所有状态集中到一个很大的对象。
// 	 但是，当应用变得很大时，store 对象会变得臃肿不堪。
// 	  为了解决以上问题，Vuex 允许我们将 store 分割到模块（module）。
// 	  每个模块拥有自己的 state、mutation、action、getters、
// 	  甚至是嵌套子模块——从上至下进行类似的分割：
// 		如下两个变量，可以进行多个vuex的拆封*/
// 	   moduleUser,
// 	   // moduleB
//   },
//   getters: {
// 	  /*即从store的state中派生出的状态。
// 		getters接收state作为其第一个参数，
// 		接受其他 getters 作为第二个参数，如不需要，
// 		第二个参数可以省略如下例子：
// 	*/
//           // 单个参数
//           // countDouble: function(state){
//           //     return state.count * 2
//           // },
//           // // 两个参数
//           // countDoubleAndDouble: function(state, getters) {
//           //     return getters.countDouble * 2
//           // }
// 		  count(state): User {
// 		          return state.count
// 		      }
//       }
// })

import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import actions from './actions'
import getters from './getters'
import search, {State as SearchState} from './modules/search';
 
Vue.use(Vuex)
 
export default new Vuex.Store({
  getters,
  actions,
  modules: {
    search
  },
  // 将数据存储于localStorage中，保证刷新数据不消失
  // plugins: [createPersistedState()]
})
 
// 统一模块的state数据
// export interface State {
//   search: SearchState
// }