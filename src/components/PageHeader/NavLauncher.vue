<script lang="ts" setup>
import { ChevronDownIcon, PlusIcon, ViewListIcon } from '@heroicons/vue/solid'
import { ref } from 'vue'

import Menu from '/@/components/UI/Menu/Menu.vue'
import MenuItem from '/@/components/UI/Menu/MenuItem.vue'
import Modal from '/@/components/UI/Modal.vue'

const show = ref(false)
</script>

<template>
  <Menu as="div" display="inline-block" position="relative">
    <template v-slot:menu-button-content>
      Launcher
      <ChevronDownIcon
        aria-hidden="true"
        class="h-4 -mr-1 ml-2 text-gray-400 w-4"
      />
    </template>
    <div class="p-1">
      <MenuItem>
        <template v-slot:menu-item-contents>
          <div class="flex items-center justify-center" @click="show = !show">
            <PlusIcon aria-hidden="true" class="h-5 mr-2 text-teal-300 w-5" />
            Add
          </div>
        </template>
      </MenuItem>
    </div>
    <div class="p-1">
      <MenuItem>
        <template v-slot:menu-item-contents>
          <router-link class="flex items-center" to="/launchers">
            <ViewListIcon
              aria-hidden="true"
              class="h-5 mr-2 text-teal-300 w-5"
            />
            List
          </router-link>
        </template>
      </MenuItem>
    </div>
  </Menu>
  <Modal :show="show">
    <div class="text-light-50">AAAAAAAA</div>
  </Modal>
</template>
