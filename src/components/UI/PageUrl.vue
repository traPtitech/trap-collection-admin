<script lang="ts" setup>
import { NBreadcrumb, NBreadcrumbItem } from 'naive-ui'
import { defineProps } from 'vue'

import { paths } from '/@/utils/paths'

const props = defineProps<{
  root: 'games' | 'editions'
  name?: string
}>()

const getRootText = (root: string) => {
  switch (root) {
    case 'games':
      return 'ゲーム一覧'
    case 'editions':
      return 'エディション一覧'
  }
}
</script>
<template>
  <NBreadcrumb>
    <NBreadcrumbItem>
      <RouterLink :to="paths.index">ホーム</RouterLink></NBreadcrumbItem
    >
    <NBreadcrumbItem>
      <RouterLink :to="paths[props.root].index()">
        {{ getRootText(props.root) }}
      </RouterLink>
    </NBreadcrumbItem>
    <NBreadcrumbItem v-if="props.name">
      {{ props.name }}
    </NBreadcrumbItem>
  </NBreadcrumb>
</template>
