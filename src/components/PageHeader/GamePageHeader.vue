<script lang="ts" setup>
import ArrowBackRound from '@vicons/material/ArrowBackRound'
import EditRound from '@vicons/material/EditRound'
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
  game: Game
}>()
</script>
<template>
  <NPageHeader @back="() => {}">
    <template #title>{{ props.game.name }}</template>
    <template #subtitle>
      {{ props.game.id }}
    </template>
    <template #header>
      <PageUrl :name="props.game.name" root="games" />
    </template>
    <template #back>
      <RouterLink class="flex" :to="paths.games.index()">
        <NIcon>
          <ArrowBackRound />
        </NIcon>
      </RouterLink>
    </template>
    <template #extra>
      <NButton>
        <template #icon>
          <NIcon>
            <EditRound />
          </NIcon>
        </template>
        編集
      </NButton>
    </template>
    {{ props.game.description }}
    <NDivider />
    <NThing>
      <template #header>所有者</template>
      <template #header-extra>
        <NButton>
          <template #icon>
            <NIcon>
              <EditRound />
            </NIcon>
          </template>
          編集
        </NButton>
      </template>
      <NList :show-divider="false">
        <NListItem v-for="owner in props.game.owners" :key="owner">
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
    <NDivider />
    <NThing>
      <template #header>管理者</template>
      <template #header-extra>
        <NButton>
          <template #icon>
            <NIcon>
              <EditRound />
            </NIcon>
          </template>
          編集
        </NButton>
      </template>
      <NList :show-divider="false">
        <NListItem
          v-for="maintainer in props.game.maintainers"
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
  </NPageHeader>
</template>
