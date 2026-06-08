import Vue from 'vue'
import VueI18n from 'vue-i18n'
import ElementLocale from 'element-ui/lib/locale'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import en from './en'
import zh from './zh'

Vue.use(VueI18n)

const savedLang = localStorage.getItem('app_lang') || 'en'

const i18n = new VueI18n({
  locale: savedLang,
  fallbackLocale: 'en',
  messages: {
    en: { ...en, ...enLocale },
    zh: { ...zh, ...zhLocale }
  },
  silentTranslationWarn: true
})

ElementLocale.i18n((key, value) => i18n.t(key, value))

export default i18n
