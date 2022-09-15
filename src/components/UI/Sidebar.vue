<script lang="ts" setup>
import AppsRound from '@vicons/material/AppsRound'
import GamePadRound from '@vicons/material/GamepadRound'
import { MenuOption } from 'naive-ui'
import { NMenu } from 'naive-ui'
import { h } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

import { paths } from '/@/utils/paths'

const getPathRoot = (path: string) => {
  return path.split('/')[1]
}

const makeMenuOption = (
  icon: typeof GamePadRound,
  title: string,
  path: string
) => ({
  label: () =>
    h(
      RouterLink,
      {
        to: path
      },
      { default: () => title }
    ),
  key: getPathRoot(path),
  icon: () => h(icon)
})

const menuOptions: MenuOption[] = [
  makeMenuOption(GamePadRound, 'ゲーム一覧', paths.games.index),
  makeMenuOption(AppsRound, 'エディション一覧', paths.editions.index)
]

const router = useRouter()
</script>
<template>
  <aside>
    <NMenu
      class="w-full"
      :options="menuOptions"
      :value="getPathRoot(router.currentRoute.value.path)"
    />
  </aside>
</template>
