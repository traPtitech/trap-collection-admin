<script lang="ts" setup>
import InboxRound from '@vicons/material/InboxRound'
import VideogameAssetRound from '@vicons/material/VideogameAssetRound'
import { MenuOption, NMenu } from 'naive-ui'
import { h } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

import { paths } from '/@/utils/paths'

const getPathRoot = (path: string) => {
  return path.split('/')[1]
}

const makeMenuOption = (
  icon: typeof VideogameAssetRound,
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
  makeMenuOption(VideogameAssetRound, 'ゲーム一覧', paths.games.index()),
  makeMenuOption(InboxRound, 'エディション一覧', paths.editions.index())
]

const router = useRouter()
</script>
<template>
  <aside>
    <NMenu
      :collapsed-width="64"
      :indent="48"
      :options="menuOptions"
      :value="getPathRoot(router.currentRoute.value.path)"
    />
  </aside>
</template>
