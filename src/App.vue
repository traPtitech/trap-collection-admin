<script lang="ts" setup>
import Sidebar from './components/UI/Sidebar.vue'
import PageHeader from '/@/components/UI/PageHeader.vue'
</script>

<template>
  <main class="flex flex-col h-screen text-neutral-900">
    <PageHeader />
    <div class="flex-1 flex-row">
      <Sidebar />
      <div class="flex-1">
        <router-view v-slot="{ Component }">
          <Suspense>
            <component :is="Component" />
          </Suspense>
        </router-view>
      </div>
    </div>
  </main>
</template>
