<script lang="ts" setup>
import { NBreadcrumb, NBreadcrumbItem } from 'naive-ui'
import { defineProps } from 'vue'

import { paths } from '/@/utils/paths'

const props = defineProps<{
  root: 'games' | 'editions'
  first?: {
    name: string
    id: string
  }
  section?: 'versions' | 'images'
}>()

const getRootText = (root: string) => {
  switch (root) {
    case 'games':
      return 'ゲーム一覧'
    case 'editions':
      return 'エディション一覧'
  }
}

const getSectionTest = (section: string) => {
  switch (section) {
    case 'versions':
      return 'バージョン一覧'
    case 'images':
      return '画像一覧'
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
    <NBreadcrumbItem v-if="props.first">
      <RouterLink :to="paths[props.root].detail(props.first.id).index">
        {{ props.first.name }}
      </RouterLink>
    </NBreadcrumbItem>
    <NBreadcrumbItem v-if="props.section">
      {{ getSectionTest(props.section) }}
    </NBreadcrumbItem>
  </NBreadcrumb>
</template>
