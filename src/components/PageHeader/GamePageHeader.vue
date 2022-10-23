<script lang="ts" setup>
import ArrowBackRound from '@vicons/material/ArrowBackRound'
import EditRound from '@vicons/material/EditRound'
import SecurityRound from '@vicons/material/SecurityRound'
import {
  NIcon,
  NThing,
  NSpace,
  NPageHeader,
  NButton,
  NList,
  NAvatar,
  NListItem,
  NDivider
} from 'naive-ui'

import PageUrl from '/@/components/UI/PageUrl.vue'
import { Game } from '/@/lib/apis'
import { getIconSrc } from '/@/utils/getIconSrc'
import { paths } from '/@/utils/paths'

const props = defineProps<{
  game?: Game
  onEditGame?: () => void
  onEditGameRole?: () => void
}>()
</script>
<template>
  <NPageHeader @back="() => {}">
    <template #title>{{ props.game?.name }}</template>
    <template #back>
      <RouterLink class="flex" :to="paths.games.index()">
        <NIcon>
          <ArrowBackRound />
        </NIcon>
      </RouterLink>
    </template>
    <template #header>
      <PageUrl
        :first="props.game && { name: props.game.name, id: props.game.id }"
        root="games"
      />
    </template>
    <template #extra>
      <NButton @click="props.onEditGame">
        <template #icon>
          <NIcon>
            <EditRound />
          </NIcon>
        </template>
        ゲーム情報の編集
      </NButton>
    </template>
    {{ props.game?.description }}
    <NDivider />
    <NThing content-style="padding-left: 1rem">
      <template #header>権限</template>
      <template #header-extra>
        <NButton @click="props.onEditGameRole">
          <template #icon>
            <NIcon>
              <SecurityRound />
            </NIcon>
          </template>
          権限の変更
        </NButton>
      </template>
      <NList :show-divider="false">
        <NListItem>
          <NThing>
            <template #header>所有者</template>
            <NList :show-divider="false">
              <NListItem v-for="owner in props.game?.owners" :key="owner">
                <NSpace align="center">
                  <NAvatar
                    class="block mx-[1rem]"
                    size="medium"
                    :src="getIconSrc(owner)"
                  />
                  {{ owner }}
                </NSpace>
              </NListItem>
            </NList>
          </NThing>
        </NListItem>
        <NListItem>
          <NThing>
            <template #header>管理者</template>
            <NList :show-divider="false">
              <NListItem
                v-for="maintainer in props.game?.maintainers"
                :key="maintainer"
              >
                <NSpace align="center">
                  <NAvatar
                    class="block mx-[1rem]"
                    size="medium"
                    :src="getIconSrc(maintainer)"
                  />
                  {{ maintainer }}
                </NSpace>
              </NListItem>
            </NList>
          </NThing>
        </NListItem>
      </NList>
    </NThing>
  </NPageHeader>
</template>
