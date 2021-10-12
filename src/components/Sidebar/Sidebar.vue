<template>
  <aside
    class="flex min-h-screen border-r-1 border-opacity-10 border-light-900 w-72"
  >
    <Listbox class="mx-auto mt-5" :items="games" />
  </aside>
</template>

<script lang="ts" setup>
import Listbox from '/@/components/UI/Listbox.vue'

const games = [
  { name: 'game1' },
  { name: 'game2' },
  { name: 'game3' },
  { name: 'game4' }
]
</script>
