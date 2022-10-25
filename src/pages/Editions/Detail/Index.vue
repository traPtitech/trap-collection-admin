<script lang="ts" setup>
import { NSpace, NModal } from 'naive-ui'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

import PatchEditionEditor from '/@/components/Editor/PatchEditionEditor.vue'
import EditionPageHeader from '/@/components/PageHeader/EditionPageHeader.vue'
import { useApi } from '/@/hooks/useApi'
import { apis, PatchEdition } from '/@/lib/apis'

const router = useRouter()
const editionId = computed(() => router.currentRoute.value.params['id'])
const getEdition = useApi(apis.getEdition)
const patchEdition = useApi(apis.patchEdition)

getEdition.refetch(String(editionId.value))

const isShowPatchEditionModal = ref(false)

const handlePatchEdition = async (data: PatchEdition) => {
  await patchEdition.refetch(String(editionId.value), data)
  isShowPatchEditionModal.value = false
  getEdition.refetch(String(editionId.value))
}
const handleCancelEdition = () => {
  isShowPatchEditionModal.value = false
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
  <NSpace class="py-10 px-12 gap-10" vertical>
    <EditionPageHeader
      :edition="
        getEdition.data.value?.type === 'success'
          ? getEdition.data.value.data
          : undefined
      "
      :onEditEdition="() => (isShowPatchEditionModal = true)"
    />
  </NSpace>
</template>
