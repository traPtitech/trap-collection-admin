<script lang="ts" setup>
import InfoRound from '@vicons/material/InfoRound'
import { NIcon, NButton, NDataTable, DataTableColumns } from 'naive-ui'
import { h } from 'vue'
import { useRouter } from 'vue-router'

import { EditionGameResponse } from '/@/lib/apis'
import { paths } from '/@/utils/paths'

const props = defineProps<{
  games?: EditionGameResponse[]
}>()

const router = useRouter()

const columns: DataTableColumns<EditionGameResponse> = [
  {
    title: '',
    key: 'info',
    render: raw =>
      h(
        NButton,
        {
          tertiary: true,
          onClick: () => router.push(paths.games.detail(raw.id)?.versions)
        },
        {
          icon: () =>
            h(
              NIcon,
              {},
              {
                default: () => h(InfoRound)
              }
            ),
          default: () => '詳細'
        }
      ),
    width: 120
  },
  {
    title: '名前',
    key: 'name',
    width: 250,
    ellipsis: true
  },
  {
    title: '説明',
    key: 'description',
    ellipsis: true
  },
  {
    title: 'バージョン',
    key: 'version',
    ellipsis: true,
    width: 120,
    render: raw => raw.version.name
  }
]
</script>

<template>
  <NDataTable :columns="columns" :data="props.games" scroll-x="auto" />
</template>
