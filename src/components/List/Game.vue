<script lang="ts" setup>
import InfoRound from '@vicons/material/InfoRound'
import { NIcon, NTable, NButton } from 'naive-ui'

import { GameInfo } from '/@/lib/apis'

const props = defineProps<{
  games?: GameInfo[]
}>()
</script>
<template>
  <NTable>
    <thead>
      <tr>
        <th></th>
        <th>id</th>
        <th>name</th>
        <th>createdAt</th>
        <th>description</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="game in props.games" :key="game.id">
        <th>
          <NButton tertiary>
            <template #icon>
              <NIcon>
                <InfoRound />
              </NIcon>
            </template>
            詳細
          </NButton>
        </th>
        <th>{{ game.id }}</th>
        <th>{{ game.name }}</th>
        <th>{{ game.createdAt }}</th>
        <th>{{ game.description }}</th>
      </tr>
    </tbody>
  </NTable>
</template>
