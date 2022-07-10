import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import { apis } from './lib/apis'
import { useMeStore } from './store/me'

const routes: RouteRecordRaw[] = [
  { path: '/games', component: () => import('./pages/Games/List.vue') },
  {
    path: '/games/:id',
    component: () => import('./pages/Games/Info.vue'),
    props: true
  },
  // { path: '/launchers', component: () => import('./pages/LauncherList.vue') },
  // {
  //   path: '/launchers/:id',
  //   component: () => import('./pages/LauncherDetail.vue'),
  //   props: true
  // },
  { path: '/:path(.*)', component: () => import('./pages/NotFound.vue') }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const oauthEntrypointPath = '/api/oauth2/generate/code'

router.beforeEach(async to => {
  const store = useMeStore()

  // workaround
  if (to.path === '/callback') {
    try {
      await apis.callback(to.query['code'] as string)
      const { data } = await apis.getMe()
      store.setMe(data)
    } catch (e) {
      // console.error(e)
    }
  }

  if (store.isLoggedIn) {
    return
  }

  try {
    const { data } = await apis.getMe()
    store.setMe(data)
  } catch {
    window.location.href = oauthEntrypointPath
  }

  return
})

export default router
