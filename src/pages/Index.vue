<script lang="ts" setup>
import GamePadRound from '@vicons/material/GamepadRound'
import InboxRound from '@vicons/material/InboxRound'
import { NCard } from 'naive-ui'

import Logo from '../components/UI/Logo.vue'
import { paths } from '../utils/paths'
</script>
<template>
  <div class="h-full flex flex-col items-start justify-start gap-20 p-10">
    <Logo class="text-4xl" />
    <nav class="flex justify-center gap-8">
      <router-link :to="paths.games.index()">
        <NCard hoverable>
          <div class="flex gap-2">
            <GamePadRound class="w-6 h-6" />
            <div class="flex flex-col gap-4">
              <div class="text-xl font-semibold">ゲーム一覧</div>
              <div>
                <p>ゲームの編集ができます。</p>
                <p>バージョン管理やファイルの管理も行います</p>
              </div>
            </div>
          </div>
        </NCard>
      </router-link>
      <router-link :to="paths.editions.index()">
        <NCard hoverable>
          <div class="flex gap-2">
            <InboxRound class="w-6 h-6" />
            <div class="flex flex-col gap-4">
              <div class="text-xl font-semibold">エディション一覧</div>
              <div>
                <p>エディションの編集ができます</p>
                <p>プロダクトキーの発行 / 確認 / 無効化ができます</p>
              </div>
            </div>
          </div>
        </NCard>
      </router-link>
    </nav>
  </div>
</template>
