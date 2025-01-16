import type { App } from 'vue'
import { local } from '@/utils'
import { createI18n } from 'vue-i18n'
import enUS from '../../locales/en_US.json'
import zhCN from '../../locales/zh_CN.json'
import ruRU from '../../locales/ru_RU.json'

const { VITE_DEFAULT_LANG } = import.meta.env

export const i18n = createI18n({
  legacy: false,
  locale: local.get('lang') || VITE_DEFAULT_LANG, // Отображение языка по умолчанию
  fallbackLocale: VITE_DEFAULT_LANG,
  messages: {
    zhCN,
    enUS,
    ruRU,
  },
  // Отсутствие международных ключей предупреждениеие международных ключей предупреждение
  // missingWarn: false,

  // Недостаток предупреждения о содержании отказа
  fallbackWarn: false,
})

export function install(app: App) {
  app.use(i18n)
}
