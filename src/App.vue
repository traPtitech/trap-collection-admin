<script lang="ts" setup>
import 'vfonts/FiraCode.css'
import 'vfonts/Lato.css'

import Header from '/@/components/UI/Header.vue'
</script>

<template>
  <main class="flex flex-col h-screen">
    <Header />
    <router-view v-slot="{ Component }">
      <div class="flex-1">
        <Suspense>
          <component :is="Component" />
        </Suspense>
      </div>
    </router-view>
  </main>
</template>
