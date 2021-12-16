<script lang="ts" setup>
import { defineProps } from '@vue/runtime-dom'

import Card from '/@/components/UI/Card.vue'
import { Game } from '/@/lib/apis'

interface Props {
  game: Game
}
const props = defineProps<Props>()
</script>

<template>
  <Card>
    <img :src="`/games/${game.id}/image`" />
    <h3>{{ game.name }}</h3>
  </Card>
</template>
