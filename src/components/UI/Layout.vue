<script lang="ts" setup>
import PageHeader from './PageHeader.vue'
import Sidebar from './Sidebar.vue'
</script>
<template>
  <n-layout>
    <n-layout-header>
      <page-header />
    </n-layout-header>
    <n-layout-sider p="4">
      <sidebar />
    </n-layout-sider>
    <n-layout-content content-style="padding: 24px;">
      <slot></slot>
    </n-layout-content>
  </n-layout>
</template>
