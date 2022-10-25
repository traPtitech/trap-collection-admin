<script lang="ts" setup>
import AddRound from '@vicons/material/AddRound'
import ArrowBackRound from '@vicons/material/ArrowBackRound'
import { NIcon, NPageHeader, NButton } from 'naive-ui'

import PageUrl from '/@/components/UI/PageUrl.vue'
import { Edition } from '/@/lib/apis'
import { paths } from '/@/utils/paths'

const props = defineProps<{
  edition?: Edition
  onAddProductKey?: () => void
}>()
</script>
<template>
  <NPageHeader @back="() => {}">
    <template #title>プロダクトキー一覧</template>
    <template #back>
      <RouterLink
        class="flex"
        :to="paths.editions.detail(edition?.id ?? '').index"
      >
        <NIcon>
          <ArrowBackRound />
        </NIcon>
      </RouterLink>
    </template>
    <template #header>
      <PageUrl
        :first="
          props.edition && { name: props.edition.name, id: props.edition.id }
        "
        root="editions"
        section="productKey"
      />
    </template>
    <template #extra>
      <NButton @click="props.onAddProductKey">
        <template #icon>
          <NIcon>
            <AddRound />
          </NIcon>
        </template>
        プロダクトキーの追加
      </NButton>
    </template>
  </NPageHeader>
</template>
