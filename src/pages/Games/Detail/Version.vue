<script lang="ts" setup>
import { NSpace } from 'naive-ui'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

import GameVersionPageHeader from '/@/components/PageHeader/GameVersionPageHeader.vue'
import GameVersionTimeline from '/@/components/Timeline/GameVersionTimeline.vue'
import { useApi } from '/@/hooks/useApi'
import { apis } from '/@/lib/apis'
import { useGamesStore } from '/@/stores/games'

const router = useRouter()
const gameId = computed(() => router.currentRoute.value.params['id'])
const gamesStore = useGamesStore()
const game = computed(() => {
  return gamesStore.allGames?.get(String(gameId.value))
})
const getGameVersion = useApi(apis.getGameVersion)

getGameVersion.refetch(String(gameId.value))
</script>
<template>
  <NSpace class="py-10 px-12 gap-10" vertical>
    <GameVersionPageHeader :game="game" />
    <GameVersionTimeline
      :versions="
        getGameVersion.data.value?.type === 'success'
          ? getGameVersion.data.value.data.versions
          : undefined
      "
    />
  </NSpace>
</template>
