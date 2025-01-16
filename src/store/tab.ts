import type { RouteLocationNormalized } from 'vue-router'
import { router } from '@/router'

interface TabState {
  pinTabs: RouteLocationNormalized[]
  tabs: RouteLocationNormalized[]
  currentTabPath: string
}
export const useTabStore = defineStore('tab-store', {
  state: (): TabState => {
    return {
      pinTabs: [],
      tabs: [],
      currentTabPath: '',
    }
  },
  getters: {
    allTabs: state => [...state.pinTabs, ...state.tabs],
  },
  actions: {
    addTab(route: RouteLocationNormalized) {
      // Определите, не добавляется ли он в соответствии с meta, его можно использовать для страницы ошибки, страницы входа в систему и т. Д.
      if (route.meta.withoutTab)
        return

      // Если имя тега уже существует, оно не будет добавлено
      if (this.hasExistTab(route.fullPath as string))
        return

      // в соответствии с meta.pinTab Передать в разные группы
      if (route.meta.pinTab)
        this.pinTabs.push(route)
      else
        this.tabs.push(route)
    },
    async closeTab(fullPath: string) {
      const tabsLength = this.tabs.length
      // Если динамическая метка превышает единицу, метка будет прыгать
      if (this.tabs.length > 1) {
        // Получите индекс метки закрытия
        const index = this.getTabIndex(fullPath)
        const isLast = index + 1 === tabsLength
        // Если это текущая страница, которая закрыта, перемещение маршрутизации на последнюю метку исходной метки
        if (this.currentTabPath === fullPath && !isLast) {
          // Прыгать к последнему лейблу
          router.push(this.tabs[index + 1].fullPath)
        }
        else if (this.currentTabPath === fullPath && isLast) {
          // Это последний, просто прыгай с первого
          router.push(this.tabs[index - 1].fullPath)
        }
      }
      // Удалить этикетку
      this.tabs = this.tabs.filter((item) => {
        return item.fullPath !== fullPath
      })
      // Если он очищен после удаления, перейдите на домашнюю страницу по умолчанию
      if (tabsLength - 1 === 0)
        router.push('/')
    },

    closeOtherTabs(fullPath: string) {
      const index = this.getTabIndex(fullPath)
      this.tabs = this.tabs.filter((item, i) => i === index)
    },
    closeLeftTabs(fullPath: string) {
      const index = this.getTabIndex(fullPath)
      this.tabs = this.tabs.filter((item, i) => i >= index)
    },
    closeRightTabs(fullPath: string) {
      const index = this.getTabIndex(fullPath)
      this.tabs = this.tabs.filter((item, i) => i <= index)
    },
    clearAllTabs() {
      this.tabs.length = 0
      this.pinTabs.length = 0
    },
    closeAllTabs() {
      this.tabs.length = 0
      router.push('/')
    },

    hasExistTab(fullPath: string) {
      const _tabs = [...this.tabs, ...this.pinTabs]
      return _tabs.some((item) => {
        return item.fullPath === fullPath
      })
    },
    /* Установите в настоящее время активированный этикет */
    setCurrentTab(fullPath: string) {
      this.currentTabPath = fullPath
    },
    getTabIndex(fullPath: string) {
      return this.tabs.findIndex((item) => {
        return item.fullPath === fullPath
      })
    },
    modifyTab(fullPath: string, modifyFn: (route: RouteLocationNormalized) => void) {
      const index = this.getTabIndex(fullPath)
      modifyFn(this.tabs[index])
    },
  },
  persist: {
    storage: sessionStorage,
  },
})
