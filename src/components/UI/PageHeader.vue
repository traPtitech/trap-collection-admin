<script setup lang="ts">
import Github from '@vicons/fa/Github'
import DarkModeRound from '@vicons/material/DarkModeRound'
import LightModeRound from '@vicons/material/LightModeRound'
import LogOutRound from '@vicons/material/LogOutRound'
import VideogameAssetRound from '@vicons/material/VideogameAssetRound'
import {
  NButton,
  NSpace,
  NIcon,
  NAvatar,
  DropdownOption,
  NDropdown
} from 'naive-ui'
import { Component, computed, h, Ref } from 'vue'
import { RouterLink } from 'vue-router'

import Logo from './Logo.vue'
import { useMeStore } from '/@/stores/me'
import { useThemeStore } from '/@/stores/theme'
import { getIconSrc } from '/@/utils/getIconSrc'
import { paths } from '/@/utils/paths'

const themeStore = useThemeStore()

const meStore = useMeStore()

const makeDropdownOption = (
  key: string,
  icon: Component,
  label: string,
  to?: string
): DropdownOption => ({
  label: to ? () => h(RouterLink, { to }, { default: () => label }) : label,
  key: key,
  icon: () =>
    h(NIcon, null, {
      default: () => h(icon)
    })
})

const userDropdownOptions: Ref<DropdownOption[]> = computed(() => [
  {
    label: meStore.me?.name,
    key: 'username',
    disabled: true
  },
  makeDropdownOption(
    'yourGames',
    VideogameAssetRound,
    '管理しているゲーム',
    paths.games.index(false)
  ),
  {
    type: 'divider',
    key: 'd'
  },
  makeDropdownOption('logout', LogOutRound, 'ログアウト')
])

const handleDropDownSelect = (key: string | number) => {
  if (key === 'logout') {
    meStore.logout()
  }
}
</script>
<template>
  <header class="w-full h-full px-[2rem]">
    <NSpace align="center" class="w-full h-full" justify="space-between">
      <RouterLink :to="paths.index">
        <Logo class="text-2xl" />
      </RouterLink>
      <NSpace align="center" size="large">
        <NButton
          :checked="themeStore.theme === 'dark'"
          circle
          quaternary
          size="large"
          @click="
            themeStore.setTheme(themeStore.theme === 'dark' ? 'light' : 'dark')
          "
        >
          <template #icon>
            <NIcon
              :component="
                themeStore.theme === 'dark' ? DarkModeRound : LightModeRound
              "
            />
          </template>
        </NButton>
        <a
          href="https://github.com/traPtitech/trap-collection-admin"
          rel="noopener noreferrer"
          target="_blank"
        >
          <NButton circle quaternary size="large">
            <template #icon>
              <NIcon><Github /></NIcon>
            </template>
          </NButton>
        </a>
        <NDropdown
          :options="userDropdownOptions"
          trigger="hover"
          @select="handleDropDownSelect"
        >
          <NAvatar
            class="block mx-[1rem] hover:cursor-pointer"
            size="medium"
            :src="meStore.me?.name && getIconSrc(meStore.me.name)"
          />
        </NDropdown>
      </NSpace>
    </NSpace>
  </header>
</template>
