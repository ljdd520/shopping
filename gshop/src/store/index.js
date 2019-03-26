/*
vuex最核心的管理对象store,组装模块并导出store的地方
 */
import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
// 引入四个基本模块
import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

// 申明使用插件
Vue.use(Vuex)
// vuex-persist插件的使用
const vuexLocal = new VuexPersist({
  storage: window.localStorage
})

// 把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  plugins: [vuexLocal.plugin]
})
