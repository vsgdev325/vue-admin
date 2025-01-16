import { router } from '@/router'
import { fetchLogin } from '@/service'
import { local } from '@/utils'
import { useRouteStore } from './router'
import { useTabStore } from './tab'

interface AuthStatus {
  userInfo: Api.Login.Info | null
  token: string
}
export const useAuthStore = defineStore('auth-store', {
  state: (): AuthStatus => {
    return {
      userInfo: local.get('userInfo'),
      token: local.get('accessToken') || '',
    }
  },
  getters: {
    /** Входить в систему */
    isLogin(state) {
      return Boolean(state.token)
    },
  },
  actions: {
    /* Войдите в систему, чтобы выйти, сбросить информацию пользователя и т. Д. */
    async logout() {
      const route = unref(router.currentRoute)
      // Очистить локальный кеш
      this.clearAuthStorage()
      // Такие данные, как маршруты очистки, меню и другие данные
      const routeStore = useRouteStore()
      routeStore.resetRouteStore()
      // Очистить данные о барах метки
      const tabStore = useTabStore()
      tabStore.clearAllTabs()
      // Сбросить текущий репозиторий
      this.$reset()
      // Сбросить страницу входа в систему
      if (route.meta.requiresAuth) {
        router.push({
          name: 'login',
          query: {
            redirect: route.fullPath,
          },
        })
      }
    },
    clearAuthStorage() {
      local.remove('accessToken')
      local.remove('refreshToken')
      local.remove('userInfo')
    },

    /* Пользовательский вход */
    async login(userName: string, password: string) {
      try {
        const { isSuccess, data } = await fetchLogin({ userName, password })
        if (!isSuccess)
          return

        // Информация о входе в систему процесса
        await this.handleLoginInfo(data)
      }
      catch (e) {
        console.warn('[Login Error]:', e)
      }
    },

    /* Данные процесса, возвращаемые входом в систему */
    async handleLoginInfo(data: Api.Login.Info) {
      // Сохраните token и userInfo
      local.set('userInfo', data)
      local.set('accessToken', data.accessToken)
      local.set('refreshToken', data.refreshToken)
      this.token = data.accessToken
      this.userInfo = data

      // Добавить маршрут и меню
      const routeStore = useRouteStore()
      await routeStore.initAuthRoute()

      // Поверните перенаправление
      const route = unref(router.currentRoute)
      const query = route.query as { redirect: string }
      router.push({
        path: query.redirect || '/',
      })
    },
  },
})
