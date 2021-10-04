<template>
  <Listbox v-model="selectedPerson" class="w-64">
    <div margin="t-1" position="relative">
      <ListboxButton
        class="
          rounded-lg
          cursor-default
          bg-true-gray-600
          shadow-md
          text-left
          w-full
          py-2
          pr-10
          pl-3
          ring-true-gray-900 ring-opacity-5
          truncate
          relative
          sm:text-sm
          hover:bg-true-gray-500
          focus:outline-none focus:ring-2
        "
      >
        <span class="text-white truncate">{{ selectedPerson?.name }}</span>
        <span
          class="flex pr-2 inset-y-0 right-0 items-center pointer-none absolute"
        >
          <SelectorIcon aria-hidden="true" class="h-5 text-gray-400 w-5" />
        </span>
      </ListboxButton>

      <transition
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          class="
            rounded-md
            bg-true-gray-600
            shadow-lg
            mt-1
            w-full
            max-h-60
            py-1
            pl-0
            ring-true-gray-900 ring-1 ring-opacity-5
            overflow-auto
            sm:text-sm
            focus:outline-none
          "
        >
          <ListboxOption
            v-for="person in people"
            :key="person.name"
            v-slot="{ active, selected }"
            as="template"
            :value="person"
          >
            <li
              class="
                cursor-default
                list-none
                py-2
                pr-4
                pl-10
                relative
                select-none
              "
              :class="active && 'bg-true-gray-500'"
            >
              <span
                class="text-white block truncate align-baseline"
                :class="[selected ? 'font-medium' : 'font-normal']"
                >{{ person.name }}</span
              >
              <span
                v-if="selected"
                class="
                  flex
                  pl-3
                  inset-y-0
                  left-0
                  text-teal-300
                  items-center
                  absolute
                "
              >
                <CheckIcon aria-hidden="true" class="h-5 w-5" />
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>

<script lang="ts" setup>
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions
} from '@headlessui/vue'
import { CheckIcon, SelectorIcon } from '@heroicons/vue/solid'
import { ref } from 'vue'
const people = [
  { name: 'Wade Cooper' },
  { name: 'Arlene Mccoy' },
  { name: 'Devon Webb' },
  { name: 'Tom Cook' },
  { name: 'Tanya Fox' },
  { name: 'Hellen Schmidt' }
]
const selectedPerson = ref(people[0])
</script>
