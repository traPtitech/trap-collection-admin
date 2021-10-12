<script lang="ts" setup>
import { reactive } from 'vue'

import { useGamesStore } from '/@/store/games'

import GameItem from '/@/components/GameItem.vue'

const store = useGamesStore()
if (!store.initialized) {
  store.initialize()
}
const newGame = reactive({
  name: '',
  description: ''
})
const add = () => store.addGame(newGame)
</script>

<template>
  <div class="h-min grid p-8 gap-8 grid-cols-5">
    <div v-for="game in store.games" :key="game[1].id">
      <router-link :to="'/games/' + game[1].id">
        <GameItem :game="game[1]" />
      </router-link>
    </div>
    <input v-model="newGame.name" placeholder="name" />
    <input v-model="newGame.description" placeholder="description" />
    <button class="bg-white" @click="add">add</button>
  </div>
</template>
