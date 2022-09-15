import { createPinia } from 'pinia'
import 'vfonts/FiraCode.css'
import 'vfonts/Roboto.css'
import 'virtual:windi-devtools'
import 'virtual:windi.css'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia()).use(router)

const meta = document.createElement('meta')
meta.name = 'naive-ui-style'
document.head.appendChild(meta)

app.mount('#app')
