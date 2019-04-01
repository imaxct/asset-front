import Vue from 'vue'
import Vuex from 'vuex'
import user from './module/user'
import loading from './module/loading'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //
  },
  mutations: {
    //
  },
  actions: {
    //
  },
  modules: {
    user,
    loading
  }
})
