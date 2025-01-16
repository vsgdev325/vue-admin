import type { App } from 'vue'
import { installRouter } from '@/router'
import { installPinia } from '@/store'
import AppVue from './App.vue'
import AppLoading from './components/common/AppLoading.vue'

async function setupApp() {
  // Загрузить глобальную загрузку статуса загрузки
  const appLoading = createApp(AppLoading)
  appLoading.mount('#appLoading')

  // Создать экземпляр Vue
  const app = createApp(AppVue)

  // Зарегистрируйте модуль Pinia
  await installPinia(app)

  // Зарегистрированный модуль Vue-router
  await installRouter(app)

  /* Инструкция модуля регистрации/Статический ресурс */
  Object.values(
    import.meta.glob<{ install: (app: App) => void }>('./modules/*.ts', {
      eager: true,
    }),
  ).map(i => app.use(i))

  // Нестандартная анимация
  appLoading.unmount()

  // Устанавливать
  app.mount('#app')
}

setupApp()
