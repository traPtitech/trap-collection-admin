<template>
  <main class="bg-true-gray-900">
    <PageHeader />
    <div>
      <router-view />
      <Sidebar />
    </div>
  </main>
</template>

<script lang="ts" setup>
import PageHeader from '/@/components/PageHeader/PageHeader.vue'
import Sidebar from '/@/components/Sidebar/Sidebar.vue'
</script>
