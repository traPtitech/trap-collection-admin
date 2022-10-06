<script lang="ts" setup>
import InfoRound from '@vicons/material/InfoRound'
import { NIcon, NTable, NButton, NDataTable } from 'naive-ui'
import { GameInfo } from '/@/lib/apis'

const props = defineProps<{
  games?: GameInfo[]
}>()

const columns = [
  {
    title: '',
    key: 'info'
  },
  {
    title: 'id',
    key: 'id'
  },
  {
    title: 'name',
    key: 'name'
  },
  {
    title: 'createdAt',
    key: 'createdAt'
  },
  {
    title: 'descripstion',
    key: 'description'
  }
]
</script>

<template>
  <NDataTable
  :columns="columns"
    :data="props.games"
    />
</template>
