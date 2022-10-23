<script lang="ts" setup>
import AddRound from '@vicons/material/AddRound'
import ArrowBackRound from '@vicons/material/ArrowBackRound'
import { NIcon, NPageHeader, NButton } from 'naive-ui'

import PageUrl from '/@/components/UI/PageUrl.vue'
import { GameInfo } from '/@/lib/apis'
import { paths } from '/@/utils/paths'

const props = defineProps<{
  game?: GameInfo
  onAddVideo?: () => void
}>()
</script>
<template>
  <NPageHeader @back="() => {}">
    <template #title>動画一覧</template>
    <template #back>
      <RouterLink class="flex" :to="paths.games.detail(game?.id ?? '').index">
        <NIcon>
          <ArrowBackRound />
        </NIcon>
      </RouterLink>
    </template>
    <template #header>
      <PageUrl
        :first="props.game && { name: props.game.name, id: props.game.id }"
        root="games"
        section="videos"
      />
    </template>
    <template #extra>
      <NButton @click="props.onAddVideo">
        <template #icon>
          <NIcon>
            <AddRound />
          </NIcon>
        </template>
        動画の追加
      </NButton>
    </template>
  </NPageHeader>
</template>
