<script lang="ts" setup>
import { NSpace, NModal } from 'naive-ui'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

import NewGameFileEditor from '/@/components/Editor/NewGameFileEditor.vue'
import GameFileList from '/@/components/List/GameFileList.vue'
import GameFilePageHeader from '/@/components/PageHeader/GameFilePageHeader.vue'
import { useApi } from '/@/hooks/useApi'
import { apis } from '/@/lib/apis'
import { useGamesStore } from '/@/stores/games'

const router = useRouter()
const gameId = computed(() => router.currentRoute.value.params['id'])
const gamesStore = useGamesStore()
const game = computed(() => {
  return gamesStore.allGames?.get(String(gameId.value))
})
const getGameFiles = useApi(apis.getGameFiles)
const postGameFile = useApi(apis.postGameFile)

getGameFiles.refetch(String(gameId.value))

const isUploadFileModalOpen = ref(false)
const handleCancelFile = () => {
  isUploadFileModalOpen.value = false
}
const handleUploadFile = (type: string, entryPoint: string, content: File) => {
  ;(async () => {
    const res = await postGameFile.refetch(
      String(gameId.value),
      type,
      entryPoint,
      content
    )
    if (res && res.type === 'error') {
      res.error.response?.status === 400
        ? alert(
            `ファイルのアップロードに失敗しました。入力を確認してください。
メッセージ: ${res.error.response.data.message}` //TODO: ちゃんとしたアラートの何かを出す
          )
        : alert('エラーが発生しました')
      return
    }
    isUploadFileModalOpen.value = false
    getGameFiles.refetch(String(gameId.value))
  })()
}
</script>
<template>
  <NModal
    preset="card"
    :show="isUploadFileModalOpen"
    :style="{
      width: '600px'
    }"
    title="ファイルのアップロード"
    @close="handleCancelFile"
    @maskClick="handleCancelFile"
  >
    <NewGameFileEditor
      :onCancel="handleCancelFile"
      :onSubmit="handleUploadFile"
    />
  </NModal>
  <NSpace class="py-10 px-12 gap-10" vertical>
    <GameFilePageHeader
      :game="game"
      :onAddFile="() => (isUploadFileModalOpen = true)"
    />
    <GameFileList
      :files="
        getGameFiles.data.value?.type === 'success'
          ? getGameFiles.data.value.data
          : undefined
      "
      :gameId="String(gameId)"
    />
  </NSpace>
</template>
