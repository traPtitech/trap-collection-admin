import colors from 'windicss/colors'
import { defineConfig } from 'windicss/helpers'
import aspectRatio from 'windicss/plugin/aspect-ratio'
import forms from 'windicss/plugin/forms'
import lineClamp from 'windicss/plugin/line-clamp'
import typography from 'windicss/plugin/typography'

export default defineConfig({
  important: true,
  darkMode: 'media',
  plugins: [aspectRatio, forms, lineClamp, typography()],
  theme: {
    extend: {
      fontFamily: {
        sans: ['v-sans', 'system-ui'],
        mono: ['v-mono', 'monospace']
      },
      gridTemplateColumns: {
        list: 'repeat(auto-fill, minmax(12rem, 1fr))'
      }
    }
  }
})
