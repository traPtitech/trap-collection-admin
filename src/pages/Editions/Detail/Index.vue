<script lang="ts" setup>
import LibraryBooksRound from '@vicons/material/LibraryBooksRound'
import { NSpace, NModal, NDivider, NThing, NButton, NIcon } from 'naive-ui'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

import PatchEditionEditor from '/@/components/Editor/PatchEditionEditor.vue'
import PatchEditionGameEditor from '/@/components/Editor/PatchEditionGameEditor.vue'
import EditionGameResponseList from '/@/components/List/EditionGameResponseList.vue'
import EditionPageHeader from '/@/components/PageHeader/EditionPageHeader.vue'
import { useApi } from '/@/hooks/useApi'
import { apis, PatchEdition, PatchEditionGameRequest } from '/@/lib/apis'

const router = useRouter()
const editionId = computed(() => router.currentRoute.value.params['id'])

const getEdition = useApi(apis.getEdition)
const patchEdition = useApi(apis.patchEdition)
getEdition.refetch(String(editionId.value))

const getEditionGames = useApi(apis.getEditionGames)
const postEditionGame = useApi(apis.postEditionGame)
getEditionGames.refetch(String(editionId.value))

const isShowPatchEditionModal = ref(false)
const isShowAddGameModal = ref(false)

const handlePatchEdition = async (data: PatchEdition) => {
  await patchEdition.refetch(String(editionId.value), data)
  isShowPatchEditionModal.value = false
  getEdition.refetch(String(editionId.value))
}
const handleCancelEdition = () => {
  isShowPatchEditionModal.value = false
}

const handleAddGame = async (data: PatchEditionGameRequest) => {
  await postEditionGame.refetch(String(editionId.value), data)
  isShowAddGameModal.value = false
  getEditionGames.refetch(String(editionId.value))
}
const handleCancelAddGame = () => {
  isShowAddGameModal.value = false
}
</script>
<template>
  <NModal
    preset="card"
    :show="isShowPatchEditionModal"
    :style="{
      width: '600px'
    }"
    title="ゲーム情報の変更"
    @close="handleCancelEdition"
    @maskClick="handleCancelEdition"
  >
    <PatchEditionEditor
      :defaultValue="{
        name:
          getEdition.data?.value?.type === 'success'
            ? getEdition.data?.value?.data?.name
            : '',
        questionnaire:
          getEdition.data?.value?.type === 'success'
            ? getEdition.data?.value?.data?.questionnaire
            : ''
      }"
      :onCancel="handleCancelEdition"
      :onSubmit="handlePatchEdition"
    />
  </NModal>
  <NModal
    preset="card"
    :show="isShowAddGameModal"
    :style="{
      width: '600px'
    }"
    title="ゲームの追加"
    @close="handleCancelAddGame"
    @maskClick="handleCancelAddGame"
  >
    <PatchEditionGameEditor
      :defaultValue="{
        gameVersionIDs:
          getEditionGames.data.value?.type === 'success'
            ? getEditionGames.data.value.data.map(({ version: { id } }) => id)
            : []
      }"
      :onCancel="handleCancelAddGame"
      :onSubmit="handleAddGame"
    />
  </NModal>
  <NSpace class="py-10 px-12 gap-10" vertical>
    <EditionPageHeader
      :edition="
        getEdition.data.value?.type === 'success'
          ? getEdition.data.value.data
          : undefined
      "
      :onEditEdition="() => (isShowPatchEditionModal = true)"
    />
    <NDivider />
    <NThing>
      <template #header>エディションのゲーム一覧</template>
      <template #header-extra>
        <NButton @click="isShowAddGameModal = true">
          ゲームを編集
          <template #icon>
            <NIcon>
              <LibraryBooksRound />
            </NIcon>
          </template>
        </NButton>
      </template>
      <EditionGameResponseList
        :games="
          getEditionGames.data.value?.type === 'success'
            ? getEditionGames.data.value.data
            : undefined
        "
      />
    </NThing>
  </NSpace>
</template>
