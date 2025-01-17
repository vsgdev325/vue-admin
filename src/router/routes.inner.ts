import type { RouteRecordRaw } from 'vue-router'
import { $t } from '@/utils'

/* Некоторые фиксированные маршруты на странице, странице ошибок и т. Д. */
export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'root',
    redirect: '/appRoot',
    children: [
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'), // Обратите внимание, что вам нужно принести здесь суффиксы файла .vue
    meta: {
      title: $t('router.inner.login'),
      withoutTab: true,
    },
  },
  {
    path: '/403',
    name: '403',
    component: () => import('@/views/error/403/index.vue'),
    meta: {
      title: $t('router.inner.403'),
      withoutTab: true,
    },
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/error/404/index.vue'),
    meta: {
      title: $t('router.inner.404'),
      icon: 'icon-park-outline:ghost',
      withoutTab: true,
    },
  },
  {
    path: '/500',
    name: '500',
    component: () => import('@/views/error/500/index.vue'),
    meta: {
      title: $t('router.inner.500'),
      icon: 'icon-park-outline:close-wifi',
      withoutTab: true,
    },
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/error/404/index.vue'),
    name: '404',
    meta: {
      title: $t('router.inner.404'),
      icon: 'icon-park-outline:ghost',
      withoutTab: true,
    },
  },

]
