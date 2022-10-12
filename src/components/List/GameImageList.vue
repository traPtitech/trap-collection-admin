<script lang="ts" setup>
import { NGrid, NImage } from 'naive-ui'

import { GameImage } from '/@/lib/apis'
import { apiPaths } from '/@/utils/apiPaths'

const props = defineProps<{
  gameId?: string
  images?: GameImage[]
}>()
</script>
<template>
  <NGrid cols="1 s:2 m:3 l:4 xl:5 2xl:6" responsive="screen" :x-gap="12">
    <NImage
      v-for="image in props.images"
      :key="image.id"
      :src="apiPaths.gameImage(gameId ?? '', image.id)"
    />
  </NGrid>
</template>
