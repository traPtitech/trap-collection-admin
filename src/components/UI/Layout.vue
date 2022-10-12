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
    <NLayoutHeader bordered class="h-[4rem]">
      <PageHeader />
    </NLayoutHeader>
    <NLayout class="top-[4rem]" hasSider position="absolute">
      <NLayoutSider
        bordered
        collapse-mode="width"
        :collapsed-width="64"
        show-trigger="arrow-circle"
      >
        <Sidebar />
      </NLayoutSider>
      <NLayoutContent bordered>
        <slot />
      </NLayoutContent>
    </NLayout>
  </NLayout>
</template>
