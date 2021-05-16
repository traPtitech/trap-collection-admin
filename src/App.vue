<template>
  <main bg="true-gray-900">
    <PageHeader />
    <div>
      <router-view />
      <Sidebar />
    </div>
  </main>
</template>

<script lang="ts" setup>
import { default as PageHeader } from '/@/components/Core/PageHeader/PageHeader.vue'
import { default as Sidebar } from '/@/components/Core/Sidebar/Sidebar.vue'
</script>
