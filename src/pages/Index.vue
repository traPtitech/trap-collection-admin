<script lang="ts" setup>
import GamePadRound from '@vicons/material/GamepadRound'
import InboxRound from '@vicons/material/InboxRound'
import { NButton } from 'naive-ui'
import { NCard } from 'naive-ui'

import Logo from '../components/UI/Logo.vue'
import { paths } from '../utils/paths'
</script>
<template>
  <div class="h-full flex flex-col items-center justify-center gap-20">
    <Logo class="text-4xl" />
    <nav class="flex justify-center gap-8">
      <router-link :to="paths.games.index">
        <n-card hoverable>
          <div class="flex gap-2">
            <GamePadRound class="w-6 h-6" />
            <div class="flex flex-col gap-4">
              <div class="text-xl">ゲーム一覧</div>
              <div>
                <p>ゲームの編集ができます。</p>
                <p>バージョン管理やファイルの管理も行います</p>
              </div>
            </div>
          </div>
        </n-card>
      </router-link>
      <router-link :to="paths.editions.index">
        <n-card hoverable>
          <div class="flex gap-2">
            <InboxRound class="w-6 h-6" />
            <div class="flex flex-col gap-4">
              <div class="text-xl">エディション一覧</div>
              <div>
                <p>エディションの編集ができます</p>
                <p>プロダクトキーの発行 / 確認 / 無効化ができます</p>
              </div>
            </div>
          </div>
        </n-card>
      </router-link>
    </nav>
  </div>
</template>
