<script setup lang="ts">
import LogOutRound from '@vicons/material/LogOutRound'
import { NButton } from 'naive-ui'
import { NText } from 'naive-ui'

import { paths } from '/@/utils/paths'
</script>
<template>
  <header class="w-full h-full py-4 px-8 flex justify-between items-center">
    <router-link :to="paths.index">
      <div class="flex items-baseline flex-row gap-1">
        <h1 class="text-xl">traP Collection -</h1>
        <NText class="text-xl" type="primary">ADMIN</NText>
      </div>
    </router-link>
    <router-link :to="paths.logout">
      <n-button quaternary type="error">
        <template #icon>
          <LogOutRound class="w-5 h-5" />
        </template>
        <div>ログアウト</div>
      </n-button>
    </router-link>
  </header>
</template>
