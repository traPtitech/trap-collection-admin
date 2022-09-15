<script lang="ts" setup>
import AppsRound from '@vicons/material/AppsRound'
import GamePadRound from '@vicons/material/GamepadRound'
import { useRouter } from 'vue-router'

import { isDecent, paths } from '/@/utils/paths'

const pages = [
  {
    title: 'Games',
    icon: GamePadRound,
    path: paths.games.index
  },
  {
    title: 'Editions',
    icon: AppsRound,
    path: paths.editions.index
  }
]

const router = useRouter()

const isActive = (page: string) =>
  isDecent(page, router.currentRoute.value.path)
</script>
<template>
  <aside class="w-60 px-1 py-2">
    <ul>
      <li v-for="page in pages" :key="page.path" class="p-1">
        <router-link
          class="px-6 py-3 block rounded-sm transition-colors"
          :class="{
            'bg-opacity-0 hover:bg-opacity-5 hover:bg-neutral-600 active:bg-opacity-10':
              !isActive(page.path),
            'text-primary-700 bg-opacity-10 bg-primary-600': isActive(page.path)
          }"
          :to="page.path"
        >
          <div class="flex flex-row items-center gap-3">
            <component :is="page.icon" class="w-5 h-5" />{{ page.title }}
          </div>
        </router-link>
      </li>
    </ul>
  </aside>
</template>
