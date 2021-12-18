<script lang="ts" setup>
import { computed } from 'vue'

import { useLaunchersStore } from '/@/store/launchers'

import LauncherItem from '/@/components/LauncherItem.vue'

const store = useLaunchersStore()
if (!store.initialized) {
  store.initialize()
}
const versions = computed(() => Array.from(store.versions.values()))
</script>

<template>
  <div class="p-20">
    <template v-for="v in versions" :key="v.id">
      <LauncherItem :version="v" />
    </template>
  </div>
</template>
