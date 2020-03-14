import Vue from 'vue'
import Vuex from 'vuex'
import jwt_decode from "jwt-decode";
import { isEmpty } from "../uitls";


Vue.use(Vuex)


// 定义属性
const state = {
  isAuthenticated: false,
  user: {},
  token: '',
}

// 计算属性
const getters = {
  isAuthenticated: state => state.isAuthenticated,
  user: state => state.user,
  token: state => state.token,
}

// 同步操作
const mutations = {
  setAuthenticated(state, isAuthenticated) {
    state.isAuthenticated = isAuthenticated
  },

  setUser(state, user) {
    state.user = user
  },

  setToken(state, token) {
    state.token = token
  },
}

// 异步操作
const actions = {
  setAuthenticated({ commit }, isAuthenticated) {
    commit("setAuthenticated", isAuthenticated)
  },

  setUser({ commit }, user) {
    commit("setUser", user)
  },

  // 设置token
  setToken({ commit }, token) {
    if (token) {
      // 解析token
      const data = jwt_decode(token);

      // 存储到vuex
      commit("setToken", token);
      commit("setAuthenticated", !isEmpty(data));
      commit("setUser", data);
    }
  },

  // 移除token
  removeToken({ commit }) {
    commit("setToken", '');
    commit("setAuthenticated", false);
    commit("setUser", {});
  }
}


export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
})
