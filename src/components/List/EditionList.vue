<script lang="ts" setup>
import InfoRound from '@vicons/material/InfoRound'
import { NIcon, NButton, NDataTable, DataTableColumns } from 'naive-ui'
import { h } from 'vue'
import { useRouter } from 'vue-router'

import { Edition } from '/@/lib/apis'
import { paths } from '/@/utils/paths'

const props = defineProps<{
  editions?: Edition[]
}>()

/*
export interface Edition {
    id: string;
    name: string;
    questionnaire?: string;
    createdAt: string;
}
*/

const router = useRouter()

const columns: DataTableColumns<Edition> = [
  {
    title: '',
    key: 'info',
    render: raw =>
      h(
        NButton,
        {
          tertiary: true,
          onClick: () => router.push(paths.editions.detail(raw.id)?.index)
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
    ellipsis: true
  }
]
</script>

<template>
  <NDataTable :columns="columns" :data="props.editions" scroll-x="auto" />
</template>
