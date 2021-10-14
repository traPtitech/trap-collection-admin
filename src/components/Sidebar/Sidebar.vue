<script lang="ts" setup>
import { useLauncherStore } from '/@/store/launcher'

import Listbox from '/@/components/UI/Listbox.vue'
import { NewVersion } from '/@/lib/apis'

const store = useLauncherStore()
if (!store.initialized) {
  store.initialize()
}

let version: NewVersion = {
  name: ''
}
const addNewVersion = () => {
  store.addVersion(version)
}
</script>

<template>
  <aside
    class="flex flex-col min-h-screen border-r-1 border-opacity-10 border-light-900 w-72"
  >
    <Listbox class="mx-auto mt-5" :items="store.versions" />
    <!-- temporary -->
    <form class="text=white" @submit.prevent="addNewVersion">
      <input v-model="version.name" placeholder="name" />
      <button class="bg-teal-600">add</button>
    </form>
  </aside>
</template>
