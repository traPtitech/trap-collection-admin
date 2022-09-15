<script lang="ts" setup>
import { NLayout } from 'naive-ui'
import { NLayoutContent } from 'naive-ui'
import { NLayoutHeader } from 'naive-ui'
import { NLayoutSider } from 'naive-ui'

import PageHeader from './PageHeader.vue'
import Sidebar from './Sidebar.vue'
</script>
<template>
  <n-layout position="absolute">
    <n-layout-header bordered class="h-16">
      <PageHeader />
    </n-layout-header>
    <n-layout class="top-16" has-sider position="absolute">
      <n-layout-sider bordered>
        <Sidebar />
      </n-layout-sider>
      <n-layout-content bordered>
        <slot />
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>
