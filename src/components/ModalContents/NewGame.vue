<script lang="ts" setup>
import { reactive } from 'vue'

import { useGamesStore } from '/@/store/games'

const store = useGamesStore()
if (!store.initialized) {
  store.initialize()
}

const newGame = reactive({
  name: '',
  description: ''
})
const addGame = () => store.addGame(newGame)
</script>

<template>
  <form @submit.prevent="addGame">
    <input v-model="newGame.name" placeholder="name" />
    <input v-model="newGame.description" placeholder="description" />
    <button class="bg-teal-600">add</button>
  </form>
</template>
