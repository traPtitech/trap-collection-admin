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
    class="flex flex-col min-h-screen border-r-1 border-opacity-10 border-light-900 w-72"
  >
    <Listbox class="mx-auto mt-5" :items="store.versions" />
  </aside>
</template>
