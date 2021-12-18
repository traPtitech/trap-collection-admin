<script lang="ts" setup>
import LaucherMenu from './LaucherMenu.vue'
import { Version } from '/@/lib/apis'

interface Props {
  version: Version
}
const props = defineProps<Props>()
</script>

<template>
  <router-link
    class="flex text-white w-full justify-between items-center"
    :to="`/launchers/${version.id}`"
  >
    {{ version.name }}
    <LaucherMenu />
  </router-link>
</template>
