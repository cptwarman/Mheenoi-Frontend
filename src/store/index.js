import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    id: "",
    first_name: "",
    loader: false,
    statusCode: "",
  },

  mutations: {
    setId(state, value) {
      state.id = value
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
    getId(state) {
      return state.id
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
    syncId(context, data) {
      context.commit("setId", data)
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
