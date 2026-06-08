import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const savedLang = localStorage.getItem('app_lang') || 'en'
const savedToken = localStorage.getItem('token') || ''

export default new Vuex.Store({
  state: {
    lang: savedLang,
    isLoggedIn: !!savedToken,
    token: savedToken,
    role:0,
    authoritys:'',
    userName:''
  },
  mutations: {
    SET_LANG(state, lang) {
      state.lang = lang
      localStorage.setItem('app_lang', lang)
    },
    SET_LOGIN(state, status) {
      state.isLoggedIn = status
    },
    SET_ROLE(state, role) {
      state.role = role
    },
    SET_USERNAME(state, userName) {
      state.userName = userName
    },
    SET_AUTHORITYS(state, authoritys){
      state.authoritys =authoritys
    },
    SET_TOKEN(state, token) {
      state.token = token
      state.isLoggedIn = !!token
      if (token) {
        localStorage.setItem('token', token)
      } else {
        localStorage.removeItem('token')
      }
    }
  },
  actions: {
    toggleLang({ commit, state }) {
      const newLang = state.lang === 'en' ? 'zh' : 'en'
      commit('SET_LANG', newLang)
    },
    login({ commit }, token) {
      commit('SET_TOKEN', token)
    },
    logout({ commit }) {
      commit('SET_TOKEN', '')
      commit('SET_LOGIN', false)
      commit('SET_ROLE', 0)
      commit('SET_AUTHORITYS', '')
      commit('SET_USERNAME', '')

    }
  }
})
