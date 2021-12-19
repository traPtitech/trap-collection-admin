<script lang="ts" setup>
import { computed } from 'vue'

import { useGamesStore } from '/@/store/games'

import GameItem from '/@/components/GameItem.vue'
import Sidebar from '/@/components/Sidebar/Sidebar.vue'

const store = useGamesStore()
if (!store.initialized) {
  store.initialize()
}
const games = computed(() => Array.from(store.games.values()).reverse())
</script>

<template>
  <div class="flex h-full">
    <Sidebar />
    <div class="h-min w-full grid grid-cols-list p-8 gap-8">
      <template v-for="game in games" :key="game.id">
        <router-link :to="`/games/${game.id}`">
          <GameItem :game="game" />
        </router-link>
      </template>
    </div>
  </div>
</template>
