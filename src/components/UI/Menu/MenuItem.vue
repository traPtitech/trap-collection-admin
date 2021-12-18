<script lang="ts" setup>
import { MenuItem } from '@headlessui/vue'
</script>

<template>
  <MenuItem v-slot="{ active }">
    <button
      class="rounded-md flex font-sm text-white w-full p-2 items-center focus:outline-none focus:shadow-none"
      :class="[active && 'bg-teal-500']"
    >
      <slot name="menu-item-contents"></slot>
    </button>
  </MenuItem>
</template>
