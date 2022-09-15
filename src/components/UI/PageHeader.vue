<script setup lang="ts">
import LogOutRound from '@vicons/material/LogOutRound'
import { NButton } from 'naive-ui'

import { paths } from '/@/utils/paths'
</script>
<template>
  <header class="w-full py-4 px-8 flex justify-between items-center">
    <router-link :to="paths.index">
      <div class="flex items-baseline flex-row gap-2">
        <h1 class="font-bold text-2xl">traP Collection</h1>
        <div class="text-base text-primary-800">admin</div>
      </div>
    </router-link>
    <router-link :to="paths.logout">
      <div class="flex flex-row items-center gap-2">
        <n-button quaternary>
          <LogOutRound class="w-5 h-5" />
          <div>ログアウト</div>
        </n-button>
      </div>
    </router-link>
  </header>
</template>
