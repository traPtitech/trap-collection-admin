import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import { apis } from './lib/apis'
import { useMeStore } from './stores/me'

export const routes: RouteRecordRaw[] = [
  { path: '/games', component: () => import('./pages/Games/List.vue') },
  {
    path: '/games/:id',
    component: () => import('./pages/Games/Info.vue'),
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

  if (to.path === '/callback' && typeof to.query['code'] === 'string') {
    // サーバー側から callback?code=??? にリダイレクトされる
    // code をサーバーに投げて認証する
    await apis.getCallback(to.query['code'])
  }

  // ページ遷移するたびに認証する
  await meStore.refetch()

  return
})

export default router
