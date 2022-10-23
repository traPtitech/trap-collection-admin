<script lang="ts" setup>
import ImageRound from '@vicons/material/ImageRound'
import InboxRound from '@vicons/material/InboxRound'
import TimelineRound from '@vicons/material/TimelineRound'
import VideogameAssetRound from '@vicons/material/VideogameAssetRound'
import { MenuOption, NMenu } from 'naive-ui'
import { h } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

import { paths } from '/@/utils/paths'

const getTarget = (path: string) => {
  if (path.split('/')[2] === undefined) {
    return 'index'
  }
  return path.split('/')[1]
}

const getId = (path: string) => {
  return path.split('/')[2]
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
  key: path,
  icon: () => h(icon)
})

const menuOptions = (path: string): MenuOption[] => {
  switch (getTarget(path)) {
    case 'index':
      return [
        makeMenuOption(VideogameAssetRound, 'ゲーム一覧', paths.games.index()),
        makeMenuOption(InboxRound, 'エディション一覧', paths.editions.index())
      ]
    case 'games':
      return [
        makeMenuOption(
          TimelineRound,
          'バージョン一覧',
          paths.games.detail(getId(path) ?? '').versions
        ),
        makeMenuOption(
          ImageRound,
          '画像一覧',
          paths.games.detail(getId(path) ?? '').images
        )
      ]
    case 'editions':
      return [
        makeMenuOption(VideogameAssetRound, 'ゲーム一覧', paths.games.index()),
        makeMenuOption(InboxRound, 'エディション一覧', paths.editions.index())
      ]
  }
  return []
}

const router = useRouter()
</script>
<template>
  <aside>
    <NMenu
      :collapsed-width="64"
      :indent="48"
      :options="menuOptions(router.currentRoute.value.path)"
      :value="router.currentRoute.value.path"
    />
  </aside>
</template>
