import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    studentIdBuff: "",
    first_name: "",
  },
  mutations: {
    setStudentId(state, value) {
      state.studentIdBuff = value
    },
    setFirtName(state, value) {
      state.first_name = value
    }
  },
  getters: {
    getStudentId(state) {
      return state.studentIdBuff
    },

    getFirtName(state) {
      return state.first_name
    }
  },

  actions: {
    syncStudentId(context, data) {
      context.commit("setStudentId", data)
    },

    syncfirstName(context, data) {
      context.commit("setFirtName", data)
    }
  },

  modules: {

  },
  plugins: [createPersistedState({
    storage: window.sessionStorage,
  })],
})
