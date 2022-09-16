<script lang="ts" setup>
import {
  NConfigProvider,
  darkTheme,
  lightTheme,
  NNotificationProvider
} from 'naive-ui'
import { computed } from 'vue'

import { useThemeStore } from './stores/theme'
import Layout from '/@/components/UI/Layout.vue'

const themeStore = useThemeStore()

const originalTheme = computed(() =>
  themeStore.theme === 'dark' ? darkTheme : lightTheme
)

const lightThemeOverrides = {
  common: {
    primaryColor: '#005BAC',
    primaryColorHover: '#2673B8',
    primaryColorPressed: '#003667'
  }
}

const darkThemeOverrides = {
  common: {
    primaryColor: '#428FD5',
    primaryColorHover: '#5AA7E1',
    primaryColorPressed: '#2A6AA1'
  }
}

const overrideTheme = computed(() =>
  themeStore.theme === 'dark' ? darkThemeOverrides : lightThemeOverrides
)
</script>

<template>
  <NConfigProvider :theme="originalTheme" :theme-overrides="overrideTheme">
    <NNotificationProvider>
      <main class="h-screen w-screen text-cool-gray-800">
        <Layout>
          <router-view v-slot="{ Component }">
            <component :is="Component" />
          </router-view>
        </Layout>
      </main>
    </NNotificationProvider>
  </NConfigProvider>
</template>
