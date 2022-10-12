import { defineStore } from 'pinia'
import { ref } from 'vue'

type Theme = 'dark' | 'light'

export const useThemeStore = defineStore('theme', () => {
  const theme = ref<Theme>('light')

  // Me を取得する
  const setTheme = async (newTheme: Theme) => {
    theme.value = newTheme
  }

  return { theme, setTheme }
})
