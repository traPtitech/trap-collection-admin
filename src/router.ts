import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import { apis } from './lib/apis'
import { useEditionsStore } from './stores/editions'
import { useGamesStore } from './stores/games'
import { useMeStore } from './stores/me'
import { useUsersStore } from './stores/users'
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
    path: paths.games.detail(':id').index,
    component: () => import('/@/pages/Games/Detail/Index.vue')
  },
  {
    path: paths.games.detail(':id').versions,
    component: () => import('./pages/Games/Detail/Version.vue')
  },
  {
    path: paths.games.detail(':id').images,
    component: () => import('./pages/Games/Detail/Image.vue')
  },
  {
    path: paths.games.detail(':id').videos,
    component: () => import('./pages/Games/Detail/Video.vue')
  },
  {
    path: paths.games.detail(':id').files,
    component: () => import('./pages/Games/Detail/File.vue')
  },
  {
    path: paths.editions.index(),
    component: () => import('/@/pages/Editions/Index.vue')
  },
  {
    path: paths.editions.detail(':id').index,
    component: () => import('/@/pages/Editions/Detail/Index.vue')
  },
  {
    path: paths.editions.detail(':id').productKeys,
    component: () => import('/@/pages/Editions/Detail/ProductKey.vue')
  },
  {
    path: paths.seats.index(),
    component: () => import('/@/pages/Seats/Index.vue')
  },
  { path: '/:path(.*)', component: () => import('./pages/NotFound.vue') }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async to => {
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

  const meStore = useMeStore()
  await meStore.getMe()

  const gameStore = useGamesStore()
  await gameStore.getGames()

  const editionStore = useEditionsStore()
  await editionStore.getEditions()

  const usersStore = useUsersStore()
  await usersStore.getUsers()
})

export default router
