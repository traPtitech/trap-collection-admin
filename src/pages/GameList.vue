<script lang="ts" setup>
import { reactive, computed } from 'vue'

import { useGamesStore } from '/@/store/games'

import GameItem from '/@/components/GameItem.vue'
import Sidebar from '/@/components/Sidebar/Sidebar.vue'

const store = useGamesStore()
if (!store.initialized) {
  store.initialize()
}
const games = computed(() => Array.from(store.games.values()).reverse())

const newGame = reactive({
  name: '',
  description: ''
})
const add = () => store.addGame(newGame)
</script>

<template>
  <div class="flex">
    <Sidebar />
    <div class="h-min grid p-8 gap-8 grid-cols-5">
      <div v-for="game in games" :key="game.id">
        <router-link :to="'/games/' + game.id">
          <GameItem :game="game" />
        </router-link>
      </div>
      <form @submit.prevent="add">
        <input v-model="newGame.name" placeholder="name" />
        <input v-model="newGame.description" placeholder="description" />
        <button class="bg-teal-600">add</button>
      </form>
    </div>
  </div>
</template>
