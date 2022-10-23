<script lang="ts" setup>
import InfoRound from '@vicons/material/InfoRound'
import { NIcon, NButton, NDataTable, DataTableColumns } from 'naive-ui'
import { h } from 'vue'
import { useRouter } from 'vue-router'

import { GameInfo } from '/@/lib/apis'
import { paths } from '/@/utils/paths'

const props = defineProps<{
  games?: GameInfo[]
}>()

const router = useRouter()

const columns: DataTableColumns<GameInfo> = [
  {
    title: '',
    key: 'info',
    render: raw =>
      h(
        NButton,
        {
          tertiary: true,
          onClick: () => router.push(paths.games.detail(raw.id)?.index)
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
  <NDataTable :columns="columns" :data="props.games" scroll-x="auto" />
</template>
