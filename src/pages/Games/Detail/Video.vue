<script lang="ts" setup>
import { NSpace, NModal } from 'naive-ui'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

import UploadImageEditor from '../../../components/Editor/UploadFileEditor.vue'
import GameVideoList from '/@/components/List/GameVideoList.vue'
import GameVideoPageHeader from '/@/components/PageHeader/GameVideoPageHeader.vue'
import { useApi } from '/@/hooks/useApi'
import { apis } from '/@/lib/apis'
import { useGamesStore } from '/@/stores/games'

const router = useRouter()
const gameId = computed(() => router.currentRoute.value.params['id'])
const gamesStore = useGamesStore()
const game = computed(() => {
  return gamesStore.allGames?.get(String(gameId.value))
})
const getGameVideos = useApi(apis.getGameVideos)
const postGameVideo = useApi(apis.postGameVideo)

getGameVideos.refetch(String(gameId.value))

const isUploadVideoModalOpen = ref(false)
const handleCancelVideo = () => {
  isUploadVideoModalOpen.value = false
}
const handleUploadVideo = (data: File | null) => {
  if (data === null) return
  ;(async () => {
    await postGameVideo.refetch(String(gameId.value), data)
    isUploadVideoModalOpen.value = false
    getGameVideos.refetch(String(gameId.value))
  })()
}
</script>
<template>
  <NModal
    preset="card"
    :show="isUploadVideoModalOpen"
    :style="{
      width: '600px'
    }"
    title="動画のアップロード"
    @close="handleCancelVideo"
    @maskClick="handleCancelVideo"
  >
    <UploadImageEditor :onUpload="handleUploadVideo" />
  </NModal>
  <NSpace class="py-10 px-12 gap-10" vertical>
    <GameVideoPageHeader
      :game="game"
      :onAddVideo="() => (isUploadVideoModalOpen = true)"
    />
    <GameVideoList
      :gameId="String(gameId)"
      :videos="
        getGameVideos.data.value?.type === 'success'
          ? getGameVideos.data.value.data
          : undefined
      "
    />
  </NSpace>
</template>
