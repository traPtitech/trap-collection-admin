<script lang="ts" setup>
import DeleteRound from '@vicons/material/DeleteRound'
import DownloadRound from '@vicons/material/DownloadRound'
import { DataTableColumns, NButton, NDataTable, NSpace } from 'naive-ui'
import { h } from 'vue'

import { GameVideo } from '/@/lib/apis'

const props = defineProps<{
  videos?: GameVideo[]
}>()

const columns: DataTableColumns<GameVideo> = [
  {
    title: 'ID',
    key: 'id',
    width: 200
  },
  {
    title: 'タイプ',
    key: 'type',
    width: 100
  },
  {
    title: '作成日時',
    key: 'createdAt',
    width: 200,
    render: row => new Date(row.createdAt).toLocaleDateString()
  },
  {
    title: '',
    key: 'action',
    width: 100,
    render: row =>
      h(
        NSpace,
        {},
        {
          default: () => [
            h(
              NButton,
              {
                strong: true,
                tertiary: true,
                size: 'small'
              },
              { icon: () => h(DownloadRound), default: () => 'ダウンロード' }
            ),
            h(
              NButton,
              {
                strong: true,
                tertiary: true,
                size: 'small',
                type: 'error'
              },
              { icon: () => h(DeleteRound), default: () => '削除' }
            )
          ]
        }
      )
  }
]
</script>
<template>
  <NDataTable :columns="columns" :data="props.videos" />
</template>
