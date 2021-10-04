<template>
  <main class="bg-true-gray-900">
    <PageHeader />
    <div class="flex">
      <Sidebar />
      <router-view />
    </div>
  </main>
</template>

<script lang="ts" setup>
import PageHeader from '/@/components/PageHeader/PageHeader.vue'
import Sidebar from '/@/components/Sidebar/Sidebar.vue'
</script>
