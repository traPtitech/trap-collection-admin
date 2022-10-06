<script lang="ts" setup>
import InfoRound from '@vicons/material/InfoRound'
import { NIcon, NButton, NDataTable } from 'naive-ui'
import { TableColumns } from 'naive-ui/es/data-table/src/interface'
import { h } from 'vue'

import { GameInfo } from '/@/lib/apis'

const props = defineProps<{
  games?: GameInfo[]
}>()

const columns: TableColumns<GameInfo> = [
  {
    title: '',
    key: 'info',
    render: () =>
      h(
        NButton,
        {
          tertiary: true
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
    title: 'id',
    key: 'id',
    width: 320
  },
  {
    title: 'name',
    key: 'name',
    width: 250,
    ellipsis: true
  },
  {
    title: 'createdAt',
    key: 'createdAt',
    width: 220
  },
  {
    title: 'descripstion',
    key: 'description',
    ellipsis: true
  }
]
</script>

<template>
  <NDataTable :columns="columns" :data="props.games" />
</template>
