import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    studentIdBuff: "",
  },
  mutations: {
    setStudentId(state, value) {
      state.studentIdBuff = value
    }
  },
  getters: {
    getStudentId(state) {
      return state.studentIdBuff
    }
  },

  actions: {
    syncStudentId(context, data) {
      context.commit("setStudentId", data)
    }
  },

  modules: {

  },
  plugins: [createPersistedState({
    storage: window.sessionStorage,
  })],
})
