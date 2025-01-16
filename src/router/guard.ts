import type { Router } from 'vue-router'
import { useAppStore, useRouteStore, useTabStore } from '@/store'
import { local } from '@/utils'

const title = import.meta.env.VITE_APP_NAME

export function setupRouterGuard(router: Router) {
  const appStore = useAppStore()
  const routeStore = useRouteStore()
  const tabStore = useTabStore()

  router.beforeEach(async (to, from, next) => {
    // Определите, является ли это внешней ссылкой, если она напрямую открывается веб -страница и перехватывает прыжок
    if (to.meta.href) {
      window.open(to.meta.href)
      return false
    }
    // начинать loadingBar
    appStore.showProgress && window.$loadingBar?.start()

    // Судить, есть ли TOKEN, Авторизоваться
    const isLogin = Boolean(local.get('accessToken'))
    if (!isLogin) {
      if (to.name === 'login')
        next()

      if (to.name !== 'login') {
        const redirect = to.name === '404' ? undefined : to.fullPath
        next({ path: '/login', query: { redirect } })
      }
      return false
    }

    // Определите, инициализируется ли маршрут
    if (!routeStore.isInitAuthRoute) {
      await routeStore.initAuthRoute()
      // Динамическая маршрутизация, загруженная обратно в корневой маршрут
      if (to.name === '404') {
      // В ожидании правильной маршрутизации вернитесь к предыдущему маршруту, в противном случае 404
        next({
          path: to.fullPath,
          replace: true,
          query: to.query,
          hash: to.hash,
        })
        return false
      }
    }

    // Определить, является ли текущая страница login, Положение на домашней странице
    if (to.name === 'login') {
      next({ path: '/' })
      return false
    }

    next()
  })
  router.beforeResolve((to) => {
    // Установите выделение меню
    routeStore.setActiveMenu(to.meta.activeMenu ?? to.fullPath)
    // добавить в tabs
    tabStore.addTab(to)
    // Установите тег выделения;
    tabStore.setCurrentTab(to.fullPath as string)
  })

  router.afterEach((to) => {
    // Измените названия веб -страницы
    document.title = `${to.meta.title} - ${title}`
    // Заканчивать loadingBar
    appStore.showProgress && window.$loadingBar?.finish()
  })
}
