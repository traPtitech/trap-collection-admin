<script lang="ts" setup>
import { useRouter } from 'vue-router'

import { useGamesStore } from '/@/stores/games'

const gamesStore = useGamesStore()

;(async () => {
  await gamesStore.getGames()
})()

const router = useRouter()
</script>
<template>{{ gamesStore.games ? gamesStore.games : '' }}</template>
