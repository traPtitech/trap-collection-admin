<script lang="ts" setup>
const props = defineProps<{
  direction?: 'horizontal' | 'vertical'
}>()
</script>

<template>
  <div v-if="props.direction === 'vertical'" class="w-px h-full bg-gray-300" />
  <div v-else class="w-full h-px bg-gray-300" />
</template>
