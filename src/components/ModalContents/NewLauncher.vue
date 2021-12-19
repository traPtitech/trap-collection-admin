<script lang="ts" setup>
import { reactive } from 'vue'

import { useLaunchersStore } from '/@/store/launchers'

const store = useLaunchersStore()
if (!store.initialized) {
  store.initialize()
}

const newVersion = reactive({
  name: ''
})
const addVersion = () => store.addVersion(newVersion)
</script>

<template>
  <form @submit.prevent="addVersion">
    <input v-model="newVersion.name" placeholder="name" />
    <button class="bg-teal-600">add</button>
  </form>
</template>
