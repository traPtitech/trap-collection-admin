<script lang="ts" setup>
import RemoveCircleRound from '@vicons/material/RemoveCircleRound'
import SettingsBackupRestoreRound from '@vicons/material/SettingsBackupRestoreRound'
import { DataTableColumns, NButton, NDataTable, NSpace } from 'naive-ui'
import { h } from 'vue'

import { ProductKey } from '/@/lib/apis'

const props = defineProps<{
  productKeys?: ProductKey[]
  onActivate?: (key: ProductKey) => void
  onRevoke?: (key: ProductKey) => void
}>()

const columns: DataTableColumns<ProductKey> = [
  {
    title: 'ID',
    key: 'id',
    width: 200
  },
  {
    title: 'キー',
    key: 'key',
    width: 200
  },
  {
    title: 'ステータス',
    key: 'status',
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
              NButton,
              {
                strong: true,
                tertiary: true,
                size: 'small',
                onClick: () => {
                  props.onRevoke?.(row)
                },
                disabled: row.status === 'revoked',
                type: 'error'
              },
              {
                icon: () => h(RemoveCircleRound),
                default: () => '無効化'
              }
            ),
            h(
              NButton,
              {
                strong: true,
                tertiary: true,
                size: 'small',
                onClick: () => {
                  props.onActivate?.(row)
                },
                disabled: row.status === 'active',
                type: 'success'
              },
              {
                icon: () => h(SettingsBackupRestoreRound),
                default: () => '有効化'
              }
            )
          ]
        }
      )
  }
]
</script>
<template>
  <NDataTable :columns="columns" :data="props.productKeys" />
</template>
