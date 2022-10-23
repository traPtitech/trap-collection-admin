<script lang="ts" setup>
import { NSpace, NModal } from 'naive-ui'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

import UploadImageEditor from '../../../components/Editor/UploadFileEditor.vue'
import GameImageList from '/@/components/List/GameImageList.vue'
import GameImagePageHeader from '/@/components/PageHeader/GameImagePageHeader.vue'
import { useApi } from '/@/hooks/useApi'
import { apis } from '/@/lib/apis'
import { useGamesStore } from '/@/stores/games'

const router = useRouter()
const gameId = computed(() => router.currentRoute.value.params['id'])
const gamesStore = useGamesStore()
const game = computed(() => {
  return gamesStore.allGames?.get(String(gameId.value))
})
const getGameImages = useApi(apis.getGameImages)
const postGameImage = useApi(apis.postGameImage)

getGameImages.refetch(String(gameId.value))

const isUploadImageModalOpen = ref(false)
const handleCancelImage = () => {
  isUploadImageModalOpen.value = false
}
const handleUploadImage = (data: File | null) => {
  if (data === null) return
  ;(async () => {
    await postGameImage.refetch(String(gameId.value), data)
    isUploadImageModalOpen.value = false
    getGameImages.refetch(String(gameId.value))
  })()
}
</script>
<template>
  <NModal
    preset="card"
    :show="isUploadImageModalOpen"
    :style="{
      width: '600px'
    }"
    title="画像のアップロード"
    @close="handleCancelImage"
    @maskClick="handleCancelImage"
  >
    <UploadImageEditor :onUpload="handleUploadImage" />
  </NModal>
  <NSpace class="py-10 px-12 gap-10" vertical>
    <GameImagePageHeader
      :game="game"
      :onAddImage="() => (isUploadImageModalOpen = true)"
    />
    <GameImageList
      :gameId="String(gameId)"
      :images="
        getGameImages.data.value?.type === 'success'
          ? getGameImages.data.value.data
          : undefined
      "
    />
  </NSpace>
</template>
