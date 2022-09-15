import vueRouter from 'storybook-vue3-router'
import 'vfonts/FiraCode.css'
import 'vfonts/Roboto.css'
import 'virtual:windi.css'

import { routes } from '/@/router'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  }
}

export const decorators = [
  vueRouter(routes),
  Story => ({
    components: { Story },
    template: '<div class="text-neutral-900"><story /></div>'
  })
]
