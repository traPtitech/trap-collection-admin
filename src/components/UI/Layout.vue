<script lang="ts" setup>
import { NLayout } from 'naive-ui'
import { NLayoutContent } from 'naive-ui'
import { NLayoutHeader } from 'naive-ui'
import { NLayoutSider } from 'naive-ui'

import PageHeader from './PageHeader.vue'
import Sidebar from './Sidebar.vue'
</script>
<template>
  <NLayout position="absolute">
    <NLayoutHeader bordered class="h-16">
      <PageHeader />
    </NLayoutHeader>
    <NLayout class="top-16" hasSider position="absolute">
      <NLayoutSider bordered>
        <Sidebar />
      </NLayoutSider>
      <NLayoutContent bordered>
        <slot />
      </NLayoutContent>
    </NLayout>
  </NLayout>
</template>
