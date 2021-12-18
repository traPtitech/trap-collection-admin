<script lang="ts" setup>
import { ChevronDownIcon, PlusIcon, ViewListIcon } from '@heroicons/vue/solid'

import Menu from '/@/components/UI/Menu/Menu.vue'
import MenuItem from '/@/components/UI/Menu/MenuItem.vue'
</script>

<template>
  <Menu as="div" display="inline-block" position="relative">
    <template v-slot:menu-button-content>
      Seat
      <ChevronDownIcon
        aria-hidden="true"
        class="h-4 -mr-1 ml-2 text-gray-400 w-4"
      />
    </template>
    <div class="p-1">
      <MenuItem>
        <template v-slot:menu-item-contents>
          <PlusIcon aria-hidden="true" class="h-5 mr-2 text-teal-300 w-5" />
          Add
        </template>
      </MenuItem>
    </div>
    <div class="p-1">
      <MenuItem>
        <template v-slot:menu-item-contents>
          <ViewListIcon aria-hidden="true" class="h-5 mr-2 text-teal-300 w-5" />
          List
        </template>
      </MenuItem>
    </div>
  </Menu>
</template>
