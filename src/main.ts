import 'virtual:windi-devtools'
import 'virtual:windi.css'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import App from './App.vue'
import { routes } from './routes'

const app = createApp(App)

const router = createRouter({
  history: createWebHistory(),
  routes
})

app.use(router).mount('#app')
