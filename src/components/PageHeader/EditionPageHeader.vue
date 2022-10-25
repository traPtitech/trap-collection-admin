<script lang="ts" setup>
import ArrowBackRound from '@vicons/material/ArrowBackRound'
import EditRound from '@vicons/material/EditRound'
import { NIcon, NThing, NPageHeader, NButton, NDivider } from 'naive-ui'

import PageUrl from '/@/components/UI/PageUrl.vue'
import { Edition } from '/@/lib/apis'
import { paths } from '/@/utils/paths'

const props = defineProps<{
  edition?: Edition
  onEditEdition?: () => void
}>()
</script>
<template>
  <NPageHeader @back="() => {}">
    <template #title>{{ props.edition?.name }}</template>
    <template #back>
      <RouterLink class="flex" :to="paths.editions.index()">
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
      />
    </template>
    <template #extra>
      <NButton @click="props.onEditEdition">
        <template #icon>
          <NIcon>
            <EditRound />
          </NIcon>
        </template>
        エディション情報の編集
      </NButton>
    </template>
    <NThing content-style="padding-left: 1rem">
      <template #header>アンケート URL</template>
      {{ props.edition?.questionnaire }}
    </NThing>
  </NPageHeader>
</template>
