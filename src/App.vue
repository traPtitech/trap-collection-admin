<script lang="ts" setup>
import PageHeader from '/@/components/PageHeader/PageHeader.vue'
</script>

<template>
  <main class="flex flex-col h-screen bg-true-gray-900">
    <PageHeader />
    <router-view v-slot="{ Component }">
      <div class="bg-true-gray-900 flex-1">
        <Suspense>
          <component :is="Component" />
        </Suspense>
      </div>
    </router-view>
  </main>
</template>
