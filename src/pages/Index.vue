<script lang="ts" setup>
import InboxRound from '@vicons/material/InboxRound'
import VideogameAssetRound from '@vicons/material/VideogameAssetRound'
import { NCard, NH1, NIcon, NAvatar, NThing, NSpace } from 'naive-ui'

import Logo from '../components/UI/Logo.vue'
import { paths } from '../utils/paths'
</script>
<template>
  <NSpace class="py-10 px-12" vertical>
    <NH1><Logo class="text-4xl" /></NH1>
    <NSpace>
      <RouterLink :to="paths.games.index()">
        <NCard hoverable size="large">
          <NThing content-indented>
            <template #avatar>
              <NAvatar>
                <NIcon><VideogameAssetRound /></NIcon>
              </NAvatar>
            </template>
            <template #header>ゲーム一覧</template>
            <template #description>
              ゲームの編集およびバージョンやファイルの管理を行います。
            </template>
          </NThing>
        </NCard>
      </RouterLink>
      <RouterLink :to="paths.editions.index()">
        <NCard hoverable size="large">
          <NThing content-indented>
            <template #avatar>
              <NAvatar>
                <NIcon><InboxRound /></NIcon>
              </NAvatar>
            </template>
            <template #header>エディション一覧</template>
            <template #description>
              エディションの編集およびロダクトキーの発行できます。
            </template>
          </NThing>
        </NCard>
      </RouterLink>
    </NSpace>
  </NSpace>
</template>
