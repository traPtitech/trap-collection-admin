<script lang="ts" setup>
import { Menu, MenuButton, MenuItems } from '@headlessui/vue'
</script>

<template>
  <Menu as="div" display="inline-block" position="relative">
    <MenuButton
      class="rounded-md font-md text-white w-full p-2 py-2 px-4 inline-flex items-center focus:outline-none"
    >
      <slot name="menu-button-content"></slot>
    </MenuButton>

    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <MenuItems
        class="divide-y divide-dashed rounded-md divide-light-900 divide-opacity-10 bg-true-gray-900 shadow-sm mt-2 shadow-light-900 ring-1 ring-light-900 ring-opacity-10 w-56 absolute transformorigin-top-right focus:outline-none"
      >
        <slot></slot>
      </MenuItems>
    </transition>
  </Menu>
</template>
