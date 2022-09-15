<script lang="ts" setup>
import { NConfigProvider, darkTheme, lightTheme } from 'naive-ui'
import { computed, ref } from 'vue'

import Layout from '/@/components/UI/Layout.vue'

const theme = ref<'dark' | 'light'>('light')

const originalTheme = computed(() =>
  theme.value === 'dark' ? darkTheme : lightTheme
)

const lightThemeOverrides = {
  common: {
    primaryColor: '#005BAC'
  }
}

const darkThemeOverrides = {
  common: {
    primaryColor: '#62B4FF'
  }
}

const overrideTheme = computed(() =>
  theme.value === 'dark' ? darkThemeOverrides : lightThemeOverrides
)
</script>

<template>
  <n-config-provider :theme="originalTheme" :theme-overrides="overrideTheme">
    <main class="h-screen w-screen text-cool-gray-800 relative">
      <Layout>
        <router-view v-slot="{ Component }">
          <component :is="Component" />
        </router-view>
      </Layout>
    </main>
  </n-config-provider>
</template>
