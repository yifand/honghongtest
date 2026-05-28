import Vue from 'vue'
import VueI18n from 'vue-i18n'
import en from './en'
import zh from './zh'

Vue.use(VueI18n)

const savedLang = localStorage.getItem('app_lang') || 'en'

const i18n = new VueI18n({
  locale: savedLang,
  fallbackLocale: 'en',
  messages: { en, zh },
  silentTranslationWarn: true
})

export default i18n
