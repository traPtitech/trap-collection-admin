import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import { apis } from './lib/apis'
import { useMeStore } from './stores/me'
import { paths } from './utils/paths'

export const routes: RouteRecordRaw[] = [
  {
    path: paths.index,
    component: () => import('./pages/Index.vue')
  },
  {
    path: paths.games.index(),
    component: () => import('/@/pages/Games/Index.vue')
  },
  {
    path: paths.games.detail(':id'),
    component: () => import('/@/pages/Games/Detail.vue')
  },
  {
    path: paths.editions.index(),
    component: () => import('/@/pages/Editions/Index.vue')
  },
  {
    path: paths.editions.detail(':id'),
    component: () => import('/@/pages/Editions/Detail.vue')
  },
  { path: '/:path(.*)', component: () => import('./pages/NotFound.vue') }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async to => {
  const meStore = useMeStore()

  // サーバー側から callback?code=??? にリダイレクトされる
  // code をサーバーに投げて認証する
  if (to.path === paths.callback) {
    if (typeof to.query['code'] === 'string') {
      await apis.getCallback(to.query['code'])
    }

    const redirect = sessionStorage.getItem('redirect')
    sessionStorage.removeItem('redirect')

    redirect && (window.location.href = redirect)
    return { path: paths.index }
  }

  // Me の情報が無かったなら refetch する
  if (meStore.me === undefined) {
    await meStore.refetch()
  }
})

export default router
