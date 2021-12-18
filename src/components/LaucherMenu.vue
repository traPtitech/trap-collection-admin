<script lang="ts" setup>
import { DotsHorizontalIcon, TrashIcon } from '@heroicons/vue/solid'

import Menu from '/@/components/UI/Menu/Menu.vue'
import MenuItem from '/@/components/UI/Menu/MenuItem.vue'
</script>

<template>
  <Menu as="div" display="inline-block" position="relative">
    <template v-slot:menu-button-content>
      <DotsHorizontalIcon class="h-4 text-gray-400 w-4" />
    </template>
    <div class="p-1">
      <MenuItem>
        <template v-slot:menu-item-contents>
          <div class="flex items-center">
            <TrashIcon aria-hidden="true" class="h-5 mr-2 text-teal-300 w-5" />
            動かんよ
          </div>
        </template>
      </MenuItem>
    </div>
  </Menu>
</template>
