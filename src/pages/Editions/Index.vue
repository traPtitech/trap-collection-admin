<script lang="ts" setup>
import ArrowBackRound from '@vicons/material/ArrowBackRound'
import VideogameAssetRound from '@vicons/material/VideogameAssetRound'
import { NIcon, NSpace, NAvatar, NPageHeader } from 'naive-ui'
import { computed } from 'vue'

import GameInfoList from '/@/components/List/GameInfoList.vue'
import PageUrl from '/@/components/UI/PageUrl.vue'
import { useEditionsStore } from '/@/stores/editions'
import { paths } from '/@/utils/paths'

const editionsStore = useEditionsStore()

const editions = computed(() => {
  const values = editionsStore.editions?.values()
  return values ? [...values] : undefined
})
</script>
<template>
  <NSpace class="py-10 px-12 gap-10" vertical>
    <NPageHeader>
      <template #title>エディション一覧</template>
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
    <GameInfoList :editions="editions" />
  </NSpace>
</template>
