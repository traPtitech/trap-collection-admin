<script lang="ts" setup>
import { NTimeline, NTimelineItem } from 'naive-ui'

import { GameVersion } from '/@/lib/apis'

const props = defineProps<{
  versions: GameVersion[]
}>()
</script>
<template>
  <NTimeline>
    <NTimelineItem
      v-for="version in props.versions"
      :key="version.id"
      :time="
        new Date(version.createdAt).toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      "
      :title="version.name"
    >
      {{ version.description }}
    </NTimelineItem>
  </NTimeline>
</template>
