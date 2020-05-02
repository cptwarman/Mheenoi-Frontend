import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    studentIdBuff: "",
    first_name: "",
    loader: false,
    statusCode: "",
  },

  mutations: {
    setStudentId(state, value) {
      state.studentIdBuff = value
    },

    setFirtName(state, value) {
      state.first_name = value
    },

    setLoader(state, value) {
      state.loader = value
    },

    setStatusCode(state, value) {
      state.statusCode = value
    }
  },

  getters: {
    getStudentId(state) {
      return state.studentIdBuff
    },

    getFirtName(state) {
      return state.first_name
    },

    getLoader(state) {
      return state.loader
    },

    getStatusCode(state) {
      return state.statusCode
    },
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
