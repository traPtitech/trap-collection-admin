<script lang="ts" setup>
import ArrowBackRound from '@vicons/material/ArrowBackRound'
import VideogameAssetRound from '@vicons/material/VideogameAssetRound'
import { NIcon, NSpace, NAvatar, NCheckbox, NPageHeader } from 'naive-ui'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

import GameInfoList from '/@/components/List/GameInfoList.vue'
import PageUrl from '/@/components/UI/PageUrl.vue'
import { useGamesStore } from '/@/stores/games'
import { paths } from '/@/utils/paths'

const router = useRouter()
const gamesStore = useGamesStore()

const isAll = computed(() => {
  return router.currentRoute.value.query['all'] !== 'false'
})

const games = computed(() => {
  const values = gamesStore.games?.values()
  return values ? [...values] : undefined
})
</script>
<template>
  <NSpace class="py-10 px-12 gap-10" vertical>
    <NPageHeader @back="() => {}">
      <template #title>ゲーム一覧</template>
      <template #header>
        <PageUrl root="games" />
      </template>
      <template #avatar>
        <NAvatar>
          <NIcon><VideogameAssetRound /></NIcon>
        </NAvatar>
      </template>
      <template #back>
        <RouterLink class="flex" :to="paths.index">
          <NIcon>
            <ArrowBackRound />
          </NIcon>
        </RouterLink>
      </template>
    </NPageHeader>
    <NCheckbox
      :checked="isAll"
      @update-checked="
        v => {
          router.push({
            query: {
              all: v
            }
          })
        }
      "
      >管理していないゲームも表示する</NCheckbox
    >
    <GameInfoList :games="games" />
  </NSpace>
</template>
