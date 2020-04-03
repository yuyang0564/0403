import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    "SET_USER"({user},payload) {
      user = payload
    }
  },
  actions: {
    setUser({commit},data) {
      commit("SET_USER",data)
    }
  },
  modules: {
  }
})
