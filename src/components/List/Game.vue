<script lang="ts" setup>
import { NButton } from 'naive-ui'

import { GameInfo } from '/@/lib/apis'

const props = defineProps<{
  games?: GameInfo[]
}>()
</script>
<template>
  <div class="flex-1">
    <n-button>ボタン1</n-button>
  </div>
</template>
