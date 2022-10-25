<script lang="ts" setup>
import AddRound from '@vicons/material/AddRound'
import ArrowBackRound from '@vicons/material/ArrowBackRound'
import VideogameAssetRound from '@vicons/material/VideogameAssetRound'
import { NIcon, NSpace, NAvatar, NPageHeader, NButton, NModal } from 'naive-ui'
import { computed, ref } from 'vue'

import NewEditionEditor from '/@/components/Editor/NewEditionEditor.vue'
import EditionList from '/@/components/List/EditionList.vue'
import PageUrl from '/@/components/UI/PageUrl.vue'
import { NewEdition } from '/@/lib/apis'
import { useEditionsStore } from '/@/stores/editions'
import { paths } from '/@/utils/paths'

const editionsStore = useEditionsStore()

const editions = computed(() => {
  const values = editionsStore.editions?.values()
  return values ? [...values] : undefined
})

const isNewEditionModalOpen = ref(false)

const handleCancelEdition = () => {
  isNewEditionModalOpen.value = false
}

const handlePostEdition = (newEdition: NewEdition) => {
  ;(async () => {
    await editionsStore.postEdition(newEdition)
    isNewEditionModalOpen.value = false
  })()
}
</script>
<template>
  <NModal
    preset="card"
    :show="isNewEditionModalOpen"
    :style="{
      width: '600px'
    }"
    title="エディション情報の変更"
    @close="handleCancelEdition"
    @maskClick="handleCancelEdition"
  >
    <NewEditionEditor
      :onCancel="handleCancelEdition"
      :onSubmit="handlePostEdition"
    />
  </NModal>
  <NSpace class="py-10 px-12 gap-10" vertical>
    <NPageHeader @back="() => {}">
      <template #title>エディション一覧</template>
      <template #extra>
        <NButton @click="() => (isNewEditionModalOpen = true)">
          <template #icon>
            <NIcon>
              <AddRound />
            </NIcon>
          </template>
          エディションの追加
        </NButton>
      </template>
      <template #header>
        <PageUrl root="editions" />
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
    <EditionList :editions="editions" />
  </NSpace>
</template>
