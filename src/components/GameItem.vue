<script lang="ts" setup>
import Card from '/@/components/UI/Card.vue'
import { Game } from '/@/lib/apis'

interface Props {
  game: Game
}
defineProps<Props>()
</script>

<template>
  <Card>
    <div class="w-40">
      <img
        class="object-contain object-center h-32 w-full"
        :src="`/api/games/${game.id}/image`"
      />
      <h3>{{ game.name }}</h3>
    </div>
  </Card>
</template>
