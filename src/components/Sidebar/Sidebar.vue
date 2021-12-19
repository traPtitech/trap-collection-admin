<script lang="ts" setup>
import { useLaunchersStore } from '../../store/launchers'
import Listbox from '/@/components/UI/Listbox.vue'

const store = useLaunchersStore()
if (!store.initialized) {
  store.initialize()
}
</script>

<template>
  <aside
    class="h-full border-r-1 border-opacity-10 border-light-900 py-4 px-2 w-72"
  >
    <Listbox :items="store.versions" />
  </aside>
</template>
