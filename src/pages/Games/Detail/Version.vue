<script lang="ts" setup>
import { NSpace, NModal } from 'naive-ui'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

import NewGameVersionEditor from '/@/components/Editor/NewGameVersionEditor.vue'
import GameVersionPageHeader from '/@/components/PageHeader/GameVersionPageHeader.vue'
import GameVersionTimeline from '/@/components/Timeline/GameVersionTimeline.vue'
import { useApi } from '/@/hooks/useApi'
import { apis, NewGameVersion } from '/@/lib/apis'
import { useGamesStore } from '/@/stores/games'

const router = useRouter()
const gameId = computed(() => router.currentRoute.value.params['id'])
const gamesStore = useGamesStore()
const game = computed(() => {
  return gamesStore.allGames?.get(String(gameId.value))
})
const getGameVersion = useApi(apis.getGameVersion)
getGameVersion.refetch(String(gameId.value))

const postGameVersion = useApi(apis.postGameVersion)

getGameVersion.refetch(String(gameId.value))

const isUploadVersionModalOpen = ref(false)
const handleCancelVersion = () => {
  isUploadVersionModalOpen.value = false
}
const handleUploadVersion = (data: NewGameVersion | null) => {
  if (data === null) return
  ;(async () => {
    await postGameVersion.refetch(String(gameId.value), data)
    isUploadVersionModalOpen.value = false
    getGameVersion.refetch(String(gameId.value))
  })()
}
</script>
<template>
  <NModal
    preset="card"
    :show="isUploadVersionModalOpen"
    :style="{
      width: '600px'
    }"
    title="動画のアップロード"
    @close="handleCancelVersion"
    @maskClick="handleCancelVersion"
  >
    <NewGameVersionEditor
      :gameId="String(gameId)"
      :onCancel="handleCancelVersion"
      :onSubmit="handleUploadVersion"
    />
  </NModal>
  <NSpace class="py-10 px-12 gap-10" vertical>
    <GameVersionPageHeader
      :game="game"
      :onAddVersion="() => (isUploadVersionModalOpen = true)"
    />
    <GameVersionTimeline
      :versions="
        getGameVersion.data.value?.type === 'success'
          ? getGameVersion.data.value.data.versions
          : undefined
      "
    />
  </NSpace>
</template>
