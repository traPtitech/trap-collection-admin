<script lang="ts" setup>
import DownloadRound from '@vicons/material/DownloadRound'
import { DataTableColumns, NButton, NDataTable, NSpace } from 'naive-ui'
import { h } from 'vue'

import { GameVideo } from '/@/lib/apis'
import { apiPaths } from '/@/utils/apiPaths'

const props = defineProps<{
  gameId?: string
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
    key: 'mime',
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
    width: 80,
    render: row =>
      h(
        NSpace,
        {},
        {
          default: () => [
            h(
              'a',
              {
                href: apiPaths.gameVideo(props.gameId ?? '', row.id)
              },
              {
                default: () => [
                  h(
                    NButton,
                    {
                      strong: true,
                      tertiary: true,
                      size: 'small',
                      onClick: () => {
                        return
                      }
                    },
                    {
                      icon: () => h(DownloadRound),
                      default: () => 'ダウンロード'
                    }
                  )
                ]
              }
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
