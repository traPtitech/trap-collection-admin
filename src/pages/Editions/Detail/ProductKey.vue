<script lang="ts" setup>
import { NSpace, NModal } from 'naive-ui'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

import NewProductKeyEditor from '/@/components/Editor/NewProductKeyEditor.vue'
import ProductKeyList from '/@/components/List/ProductKeyList.vue'
import ProductKeyPageHeader from '/@/components/PageHeader/ProductKeyPageHeader.vue'
import { useApi } from '/@/hooks/useApi'
import { apis, ProductKey } from '/@/lib/apis'
import { useEditionsStore } from '/@/stores/editions'

const router = useRouter()
const editionId = computed(() => router.currentRoute.value.params['id'])
const editionsStore = useEditionsStore()
const edition = computed(() => {
  return editionsStore.editions?.get(String(editionId.value))
})
const getProductKeys = useApi(apis.getProductKeys)
const postProductKey = useApi(apis.postProductKey)

const activateProductKeys = useApi(apis.postActivateProductKey)
const revokeProductKeys = useApi(apis.postRevokeProductKey)

getProductKeys.refetch(String(editionId.value))

const isUploadProductKeyModalOpen = ref(false)
const handleCancelProductKey = () => {
  isUploadProductKeyModalOpen.value = false
}
const handleUploadProductKey = (data: number | null) => {
  if (data === null) return
  ;(async () => {
    await postProductKey.refetch(String(editionId.value), data)
    isUploadProductKeyModalOpen.value = false
    getProductKeys.refetch(String(editionId.value))
  })()
}

const handleActivateProductKey = (productKey: ProductKey) => {
  ;(async () => {
    await activateProductKeys.refetch(String(editionId.value), productKey.id)
    getProductKeys.refetch(String(editionId.value))
  })()
}

const handleRevokeProductKey = (productKey: ProductKey) => {
  ;(async () => {
    await revokeProductKeys.refetch(String(editionId.value), productKey.id)
    getProductKeys.refetch(String(editionId.value))
  })()
}
</script>
<template>
  <NModal
    preset="card"
    :show="isUploadProductKeyModalOpen"
    :style="{
      width: '600px'
    }"
    title="プロダクトキーの発行"
    @close="handleCancelProductKey"
    @maskClick="handleCancelProductKey"
  >
    <NewProductKeyEditor
      :onCancel="handleCancelProductKey"
      :onSubmit="handleUploadProductKey"
    />
  </NModal>
  <NSpace class="py-10 px-12 gap-10" vertical>
    <ProductKeyPageHeader
      :edition="edition"
      :onAddProductKey="
        () => {
          isUploadProductKeyModalOpen = true
        }
      "
    />
    <ProductKeyList
      :onActivate="handleActivateProductKey"
      :onRevoke="handleRevokeProductKey"
      :productKeys="
        getProductKeys.data.value?.type === 'success'
          ? getProductKeys.data.value.data
          : undefined
      "
    />
  </NSpace>
</template>
