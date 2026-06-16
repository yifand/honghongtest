import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/styles/global.scss'
import * as filters from '@/common/js/filters'
import _ from 'lodash'
import MarkdownItVue from 'markdown-it-vue'
// 必须引入内置样式
import 'markdown-it-vue/dist/markdown-it-vue.css'
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
Vue.use(ElementUI)
Vue.use(MarkdownItVue)
Vue.prototype._ = _

Vue.config.productionTip = false
  
// Sync i18n locale with store on app start
i18n.locale = store.state.lang

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
