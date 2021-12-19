<script lang="ts" setup>
import Card from '/@/components/UI/Card.vue'
import { Game } from '/@/lib/apis'

interface Props {
  game: Game
}
const props = defineProps<Props>()
</script>

<template>
  <Card>
    <div class="w-40">
      <img class="w-full" :src="`/api/games/${game.id}/image`" />
      <h3>{{ game.name }}</h3>
    </div>
  </Card>
</template>
