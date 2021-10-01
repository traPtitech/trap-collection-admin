import NotFound from './pages/NotFound.vue'
import Top from './pages/Top.vue'

export const routes = [
  { path: '/', component: Top },
  { path: '/:path(.*)', component: NotFound }
]
