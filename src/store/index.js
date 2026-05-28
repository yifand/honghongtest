import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const savedLang = localStorage.getItem('app_lang') || 'en'

export default new Vuex.Store({
  state: {
    lang: savedLang,
    isLoggedIn: false
  },
  mutations: {
    SET_LANG(state, lang) {
      state.lang = lang
      localStorage.setItem('app_lang', lang)
    },
    SET_LOGIN(state, status) {
      state.isLoggedIn = status
    }
  },
  actions: {
    toggleLang({ commit, state }) {
      const newLang = state.lang === 'en' ? 'zh' : 'en'
      commit('SET_LANG', newLang)
    },
    login({ commit }) {
      commit('SET_LOGIN', true)
    },
    logout({ commit }) {
      commit('SET_LOGIN', false)
    }
  }
})
