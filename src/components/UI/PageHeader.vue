<script setup lang="ts">
import DarkModeRound from '@vicons/material/DarkModeRound'
import GamePadRound from '@vicons/material/GamepadRound'
import LightModeRound from '@vicons/material/LightModeRound'
import LogOutRound from '@vicons/material/LogOutRound'
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
  icon: Component,
  to: string,
  label: string
): DropdownOption => ({
  label: () => h(RouterLink, { to }, { default: () => label }),
  key: to,
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
    GamePadRound,
    paths.games.index(false),
    '管理しているゲーム'
  ),
  makeDropdownOption(LogOutRound, paths.logout, 'ログアウト')
])
</script>
<template>
  <header class="w-full h-full px-10">
    <NSpace align="center" class="w-full h-full" justify="space-between">
      <router-link :to="paths.index">
        <Logo class="text-xl" />
      </router-link>
      <NSpace align="center" size="large">
        <NButton
          :checked="themeStore.theme === 'dark'"
          circle
          quaternary
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
        <NDropdown :options="userDropdownOptions" trigger="hover">
          <NAvatar
            class="block hover:cursor-pointer"
            size="medium"
            :src="meStore.me?.name && getIconSrc(meStore.me.name)"
          />
        </NDropdown>
      </NSpace>
    </NSpace>
  </header>
</template>
