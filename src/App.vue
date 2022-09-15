<script lang="ts" setup>
import Layout from '/@/components/UI/Layout.vue'
</script>

<template>
  <main class="flex flex-col h-screen text-neutral-900">
    <Layout>
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </Layout>
  </main>
</template>
