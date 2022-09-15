import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import { apis } from './lib/apis'
import { useMeStore } from './stores/me'
import { paths } from './utils/paths'

export const routes: RouteRecordRaw[] = [
  {
    path: paths.games.index,
    component: () => import('/@/pages/Games/Index.vue')
  },
  {
    path: paths.games.detail(':id'),
    component: () => import('/@/pages/Games/Detail.vue'),
    props: true
  },
  {
    path: paths.editions.index,
    component: () => import('/@/pages/Editions/Index.vue')
  },
  {
    path: paths.editions.detail(':id'),
    component: () => import('/@/pages/Editions/Detail.vue'),
    props: true
  },
  { path: '/:path(.*)', component: () => import('./pages/NotFound.vue') }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async to => {
  const meStore = useMeStore()

  if (to.path === paths.callback) {
    // サーバー側から callback?code=??? にリダイレクトされる
    // code をサーバーに投げて認証する
    if (typeof to.query['code'] === 'string') {
      await apis.getCallback(to.query['code'])
    }

    return { path: paths.index }
  }

  // ログアウトの処理
  if (to.path === paths.logout) {
    await apis.postLogout()

    const meStore = useMeStore()
    meStore.refetch()
  }

  // Me の情報が無かったなら refetch する
  if (meStore.me === undefined) {
    await meStore.refetch()
  }
})

export default router
