import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { apis } from './lib/apis'

import { useMeStore } from './store/me'

const routes: RouteRecordRaw[] = [
  { path: '/', component: () => import('./pages/GameList.vue') },
  { path: '/:path(.*)', component: () => import('./pages/NotFound.vue') }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async () => {
  const store = useMeStore()

  if (store.isLoggedIn) {
    return
  }

  try {
    const { data: me } = await apis.getMe()
    store.setMe(me)
  } catch (e) {
    return '/oauth2/generate/code'
  }

  return
})

export default router
