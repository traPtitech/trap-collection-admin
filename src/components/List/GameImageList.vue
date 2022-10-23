<script lang="ts" setup>
import { NImage, NImageGroup } from 'naive-ui'

import { GameImage } from '/@/lib/apis'
import { apiPaths } from '/@/utils/apiPaths'

const props = defineProps<{
  gameId?: string
  images?: GameImage[]
}>()
</script>
<template>
  <NImageGroup>
    <NImage
      v-for="image in props.images"
      :key="image.id"
      :src="apiPaths.gameImage(gameId ?? '', image.id)"
      :width="200"
    />
  </NImageGroup>
</template>
