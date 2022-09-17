<script lang="ts" setup>
import ArrowBackRound from '@vicons/material/ArrowBackRound'
import VideogameAssetRound from '@vicons/material/VideogameAssetRound'
import { NIcon, NSpace, NAvatar, NCheckbox, NPageHeader } from 'naive-ui'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

import PageUrl from '/@/components/UI/PageUrl.vue'
import { useGamesStore } from '/@/stores/games'
import { paths } from '/@/utils/paths'

const gamesStore = useGamesStore()

;(async () => {
  await gamesStore.getGames()
})()

const router = useRouter()

const isAll = computed(() => {
  return router.currentRoute.value.query['all'] !== 'false'
})
</script>
<template>
  <NSpace class="py-10 px-12 gap-10" vertical>
    <NPageHeader @back="() => {}">
      <template #title>ゲーム一覧</template>
      <template #header><PageUrl root="games" /></template>
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
  </NSpace>
</template>
