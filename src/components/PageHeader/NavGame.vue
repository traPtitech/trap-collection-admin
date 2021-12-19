<script lang="ts" setup>
import { ChevronDownIcon, PlusIcon, ViewListIcon } from '@heroicons/vue/solid'
import { ref } from 'vue'

import NewGame from '/@/components/ModalContents/NewGame.vue'
import Menu from '/@/components/UI/Menu/Menu.vue'
import MenuItem from '/@/components/UI/Menu/MenuItem.vue'
import Modal from '/@/components/UI/Modal.vue'

// TODO: provided by Modal Component
const show = ref(false)
let flag = false
const toggleAddGameModal = () => {
  show.value = !show.value
}
const hideAddGameModal = () => {
  // to prevent the modal from closing triggered by the first click event
  if (flag) {
    show.value = false
    flag = false
  } else if (show.value) {
    flag = true
  }
}
</script>

<template>
  <Menu as="div" display="inline-block" position="relative">
    <template v-slot:menu-button-content>
      Game
      <ChevronDownIcon
        aria-hidden="true"
        class="h-4 -mr-1 ml-2 text-gray-400 w-4"
      />
    </template>
    <div class="p-1">
      <MenuItem @click="toggleAddGameModal()">
        <template v-slot:menu-item-contents>
          <div class="flex items-center justify-center">
            <PlusIcon aria-hidden="true" class="h-5 mr-2 text-teal-300 w-5" />
            Add
          </div>
        </template>
      </MenuItem>
    </div>
    <div class="p-1">
      <router-link to="/">
        <MenuItem>
          <template v-slot:menu-item-contents>
            <ViewListIcon
              aria-hidden="true"
              class="h-5 mr-2 text-teal-300 w-5"
            />
            List
          </template>
        </MenuItem></router-link
      >
    </div>
  </Menu>
  <Modal v-click-outside="hideAddGameModal" :show="show">
    <NewGame />
  </Modal>
</template>
