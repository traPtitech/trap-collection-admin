<script lang="ts" setup>
import { NResult, NButton } from 'naive-ui'
import { useRouter } from 'vue-router'

import { paths } from '../utils/paths'

const router = useRouter()
</script>
<template>
  <div class="h-full flex items-center justify-center">
    <NResult
      :description="`ページ ${router.currentRoute.value.path} は見つかりませんでした`"
      status="warning"
      title="404 Not Found"
    >
      <template #footer>
        <RouterLink :to="paths.index">
          <NButton>トップページへ</NButton>
        </RouterLink>
      </template>
    </NResult>
  </div>
</template>
