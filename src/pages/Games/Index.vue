<script lang="ts" setup>
import AddRound from '@vicons/material/AddRound'
import ArrowBackRound from '@vicons/material/ArrowBackRound'
import VideogameAssetRound from '@vicons/material/VideogameAssetRound'
import {
  NIcon,
  NSpace,
  NAvatar,
  NCheckbox,
  NPageHeader,
  NButton,
  NModal
} from 'naive-ui'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

import NewGameEditor from '/@/components/Editor/NewGameEditor.vue'
import GameInfoList from '/@/components/List/GameInfoList.vue'
import PageUrl from '/@/components/UI/PageUrl.vue'
import { NewGame } from '/@/lib/apis'
import { useGamesStore } from '/@/stores/games'
import { paths } from '/@/utils/paths'

const router = useRouter()
const gamesStore = useGamesStore()

const isAll = computed(() => {
  return router.currentRoute.value.query['all'] !== 'false'
})

const games = computed(() => {
  const values = isAll.value
    ? gamesStore.allGames?.values()
    : gamesStore.games?.values()
  return values ? [...values] : undefined
})

const isNewGameModalOpen = ref(false)

const handleCancelGame = () => {
  isNewGameModalOpen.value = false
}

const handlePostGame = (newGame: NewGame) => {
  ;(async () => {
    await gamesStore.postGame(newGame)
    isNewGameModalOpen.value = false
  })()
}
</script>
<template>
  <NModal
    preset="card"
    :show="isNewGameModalOpen"
    :style="{
      width: '600px'
    }"
    title="ゲーム情報の変更"
    @close="handleCancelGame"
    @maskClick="handleCancelGame"
  >
    <NewGameEditor :onCancel="handleCancelGame" :onSubmit="handlePostGame" />
  </NModal>
  <NSpace class="py-10 px-12 gap-10" vertical>
    <NPageHeader @back="() => {}">
      <template #title>ゲーム一覧</template>
      <template #extra>
        <NButton @click="() => (isNewGameModalOpen = true)">
          <template #icon>
            <NIcon>
              <AddRound />
            </NIcon>
          </template>
          ゲームの追加
        </NButton>
      </template>
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
      :checked="!isAll"
      @update-checked="
        v => {
          router.push({
            query: {
              all: v ? 'false' : 'true'
            }
          })
        }
      "
      >管理しているゲームのみ表示する</NCheckbox
    >
    <GameInfoList :games="games" />
  </NSpace>
</template>
