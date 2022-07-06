<template>
  <n-button>
    {{ label }}
  </n-button>
</template>

<script lang="ts" setup>
import { NButton } from 'naive-ui'

type Props = {
  label: string
}

defineProps<Props>()
</script>
