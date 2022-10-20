<script lang="ts" setup>
import ArrowBackRound from '@vicons/material/ArrowBackRound'
import VideogameAssetRound from '@vicons/material/VideogameAssetRound'
import { NIcon, NSpace, NAvatar, NPageHeader } from 'naive-ui'

import PageUrl from '/@/components/UI/PageUrl.vue'
import { paths } from '/@/utils/paths'
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
  </NSpace>
</template>
