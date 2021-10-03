import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import { useMeStore } from './store/me'

const routes: RouteRecordRaw[] = [
  { path: '/', component: () => import('./pages/Top.vue') },
  { path: '/:path(.*)', component: () => import('./pages/NotFound.vue') }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (_to, _from, next) => {
  const store = useMeStore()

  if (store.isLoggedIn) {
    next()
    return
  }

  await store.fetchMe()

  // workaround
  // if (store.isLoggedIn) {
  //   next()
  //   return
  // }
  // location.href = '/api/oauth2/generate/code'
})

export default router
