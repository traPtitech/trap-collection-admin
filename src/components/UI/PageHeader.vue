<script setup lang="ts">
import LogOutRound from '@vicons/material/LogOutRound'
import { NButton } from 'naive-ui'

import Logo from './Logo.vue'
import { paths } from '/@/utils/paths'
</script>
<template>
  <header class="w-full h-full py-4 px-8 flex justify-between items-center">
    <router-link :to="paths.index">
      <Logo class="text-xl" />
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
