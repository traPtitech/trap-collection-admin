<script lang="ts" setup>
import { NSpace, NModal } from 'naive-ui'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

import PatchGameEditor from '/@/components/Editor/PatchGameEditor.vue'
import PatchGameRoleEditor from '/@/components/Editor/PatchGameRoleEditor.vue'
import GamePageHeader from '/@/components/PageHeader/GamePageHeader.vue'
import { useApi } from '/@/hooks/useApi'
import { apis, GameRoleRequest, PatchGame } from '/@/lib/apis'

const router = useRouter()
const gameId = computed(() => router.currentRoute.value.params['id'])
const getGame = useApi(apis.getGame)
const patchGame = useApi(apis.patchGame)
const patchGameRole = useApi(apis.patchGameRole)

getGame.refetch(String(gameId.value))

const isShowPatchGameModal = ref(false)
const isShowPatchGameRoleModal = ref(false)

const handlePatchGameRole = async (data: GameRoleRequest) => {
  await patchGameRole.refetch(String(gameId.value), data)
  isShowPatchGameRoleModal.value = false
  getGame.refetch(String(gameId.value))
}
const handleCancelGameRole = () => {
  isShowPatchGameRoleModal.value = false
}

const handlePatchGame = async (data: PatchGame) => {
  await patchGame.refetch(String(gameId.value), data)
  isShowPatchGameModal.value = false
  getGame.refetch(String(gameId.value))
}
const handleCancelGame = () => {
  isShowPatchGameModal.value = false
}
</script>
<template>
  <NModal
    preset="card"
    :show="isShowPatchGameRoleModal"
    :style="{
      width: '600px'
    }"
    title="権限の変更"
    @close="handleCancelGameRole"
    @maskClick="handleCancelGameRole"
  >
    <PatchGameRoleEditor
      :onCancel="handleCancelGameRole"
      :onSubmit="handlePatchGameRole"
    />
  </NModal>
  <NModal
    preset="card"
    :show="isShowPatchGameModal"
    :style="{
      width: '600px'
    }"
    title="ゲーム情報の変更"
    @close="handleCancelGame"
    @maskClick="handleCancelGame"
  >
    <PatchGameEditor
      :defaultValue="{
        name:
          getGame.data?.value?.type === 'success'
            ? getGame.data?.value?.data?.name
            : '',
        description:
          getGame.data?.value?.type === 'success'
            ? getGame.data?.value?.data?.description
            : ''
      }"
      :onCancel="handleCancelGame"
      :onSubmit="handlePatchGame"
    />
  </NModal>
  <NSpace class="py-10 px-12 gap-10" vertical>
    <GamePageHeader
      :game="
        getGame.data.value?.type === 'success'
          ? getGame.data.value.data
          : undefined
      "
      :onEditGame="() => (isShowPatchGameModal = true)"
      :onEditGameRole="() => (isShowPatchGameRoleModal = true)"
    />
  </NSpace>
</template>
