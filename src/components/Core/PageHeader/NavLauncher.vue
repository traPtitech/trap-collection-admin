<template>
  <Menu as="div" display="inline-block" position="relative" text="left">
    <div>
      <MenuButton
        class="
          rounded-md
          font-md
          text-white
          w-full
          p-2
          py-2
          px-4
          inline-flex
          items-center
          focus:outline-none
        "
      >
        Launcher
        <ChevronDownIcon
          aria-hidden="true"
          class="h-4 -mr-1 ml-2 text-gray-400 w-4"
        />
      </MenuButton>
    </div>

    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <MenuItems
        class="
          divide-y divide-dashed
          rounded-md
          divide-light-900 divide-opacity-10
          bg-true-gray-900
          shadow-sm
          mt-2
          shadow-light-900
          ring-1 ring-light-900 ring-opacity-10
          w-56
          absolute
          transformorigin-top-right
          focus:outline-none
        "
      >
        <div class="p-1">
          <MenuItem v-slot="{ active }">
            <button
              class="
                rounded-md
                flex
                font-sm
                text-white
                w-full
                p-2
                items-center
                focus:outline-none focus:shadow-none
              "
              :class="[active && 'bg-teal-500']"
            >
              <PencilIcon
                :active="active"
                aria-hidden="true"
                class="h-5 mr-2 text-teal-300 w-5"
              />
              Edit
            </button>
          </MenuItem>
          <MenuItem v-slot="{ active }">
            <button
              class="
                rounded-md
                flex
                font-sm
                text-white
                w-full
                p-2
                items-center
                focus:outline-none focus:shadow-none
              "
              :class="[active && 'bg-teal-500']"
            >
              <DuplicateIcon
                :active="active"
                aria-hidden="true"
                class="h-5 mr-2 text-teal-300 w-5"
              />
              Duplicate
            </button>
          </MenuItem>
        </div>
        <div class="p-1">
          <MenuItem v-slot="{ active }">
            <button
              class="
                rounded-md
                flex
                font-sm
                text-white
                w-full
                p-2
                items-center
                focus:outline-none focus:shadow-none
              "
              :class="[active && 'bg-teal-500']"
            >
              <ArchiveIcon
                :active="active"
                aria-hidden="true"
                class="h-5 mr-2 text-teal-300 w-5"
              />
              Archive
            </button>
          </MenuItem>
          <MenuItem v-slot="{ active }">
            <button
              class="
                rounded-md
                flex
                font-sm
                text-white
                w-full
                p-2
                items-center
                focus:outline-none focus:shadow-none
              "
              :class="[active && 'bg-teal-500']"
            >
              <LinkIcon
                :active="active"
                aria-hidden="true"
                class="h-5 mr-2 text-teal-300 w-5"
              />
              Move
            </button>
          </MenuItem>
        </div>

        <div class="p-1">
          <MenuItem v-slot="{ active }">
            <button
              class="
                rounded-md
                flex
                font-sm
                text-white
                w-full
                p-2
                items-center
                focus:outline-none focus:shadow-none
              "
              :class="[active && 'bg-teal-500']"
            >
              <TrashIcon
                :active="active"
                aria-hidden="true"
                class="h-5 mr-2 text-teal-300 w-5"
              />
              Delete
            </button>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>

<script lang="ts" setup>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import {
  ChevronDownIcon,
  ArchiveIcon,
  DuplicateIcon,
  LinkIcon,
  PencilIcon,
  TrashIcon
} from '@heroicons/vue/solid'
</script>
