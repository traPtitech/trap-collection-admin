<script lang="ts" setup>
import PageHeader from './PageHeader.vue'
import Separator from './Separator.vue'
import Sidebar from './Sidebar.vue'
</script>
<template>
  <div class="flex flex-col h-full w-full">
    <PageHeader />
    <Separator />
    <div class="flex-grow flex flex-row w-full">
      <div class="h-full"></div>
      <Sidebar />
      <Separator direction="vertical" />
      <Suspense>
        <slot />
      </Suspense>
    </div>
  </div>
</template>
