import { createPinia } from 'pinia'
import 'virtual:windi-devtools'
import 'virtual:windi.css'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia()).use(router)
app.directive('click-outside', {
  beforeMount(el, binding) {
    el.clickOutsideEvent = function (e: Event) {
      if (!(el === e.target || el.contains(e.target))) {
        binding.value(e, el)
      }
    }
    document.body.addEventListener('click', el.clickOutsideEvent)
  },
  unmounted(el) {
    document.body.removeEventListener('click', el.clickOutsideEvent)
  }
})
app.mount('#app')
