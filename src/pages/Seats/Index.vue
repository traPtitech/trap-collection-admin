<script lang="ts" setup>
import AirlineSeatReclineNormalRound from '@vicons/material/AirlineSeatReclineNormalRound'
import ArrowBackRound from '@vicons/material/ArrowBackRound'
import ChairRound from '@vicons/material/ChairRound'
import DirectionsWalkRound from '@vicons/material/DirectionsWalkRound'
import SettingsRound from '@vicons/material/SettingsRound'
import {
  NIcon,
  NSpace,
  NAvatar,
  NPageHeader,
  NButton,
  NModal,
  FormInst,
  NForm,
  NFormItem,
  NInputNumber,
  DataTableColumns,
  NDataTable,
  NThing,
  NDivider,
  NCard,
  NText
} from 'naive-ui'
import { computed } from 'vue'
import { h, onBeforeUnmount, reactive, ref } from 'vue'

import PageUrl from '/@/components/UI/PageUrl.vue'
import { useApi } from '/@/hooks/useApi'
import { apis, Seat, SeatStatus } from '/@/lib/apis'
import { paths } from '/@/utils/paths'

type NewSeat = {
  num: number
}

const getSearsApi = useApi(apis.getSeats)
getSearsApi.refetch()
const data = computed(() =>
  getSearsApi.data.value?.type === 'success' ? getSearsApi.data.value.data : []
)
const intervalId = setInterval(() => {
  getSearsApi.refetch()
}, 5000)
onBeforeUnmount(() => {
  clearInterval(intervalId)
})

const postSeatApi = useApi(apis.postSeat)
const patchSeatStatusApi = useApi(apis.patchSeatStatus)

const isNewSeatModalOpen = ref(false)

const formValue = reactive<NewSeat>({
  num: 0
})

const validator = (x: number) => x >= 0 && x % 1 === 0

const formRef = ref<FormInst | null>(null)

const handleCancelSeat = () => {
  isNewSeatModalOpen.value = false
}

const handlePostSeat = () => {
  formRef.value?.validate(errors => {
    if (!errors) {
      ;(async () => {
        await postSeatApi.refetch(formValue)
        getSearsApi.refetch()
        isNewSeatModalOpen.value = false
      })()
    }
  })
}

const columns: DataTableColumns<Seat> = [
  {
    title: '席番号',
    key: 'id',
    width: 100
  },
  {
    title: '状態',
    key: 'status',
    render: row => (row.status === SeatStatus.Empty ? '空席' : '使用中'),
    width: 250
  },
  {
    title: '',
    key: 'action',
    ellipsis: true,
    render: row =>
      h(
        NSpace,
        {},
        {
          default: () => [
            h(
              NButton,
              {
                strong: true,
                tertiary: true,
                size: 'small',
                onClick: async () => {
                  await patchSeatStatusApi.refetch(row.id, {
                    status: SeatStatus.InUse
                  })
                  getSearsApi.refetch()
                },
                disabled: row.status === SeatStatus.InUse,
                type: 'error'
              },
              {
                icon: () => h(AirlineSeatReclineNormalRound),
                default: () => '使用'
              }
            ),
            h(
              NButton,
              {
                strong: true,
                tertiary: true,
                size: 'small',
                onClick: async () => {
                  await patchSeatStatusApi.refetch(row.id, {
                    status: SeatStatus.Empty
                  })
                  getSearsApi.refetch()
                },
                disabled: row.status === SeatStatus.Empty,
                type: 'success'
              },
              {
                icon: () => h(DirectionsWalkRound),
                default: () => '離席'
              }
            )
          ]
        }
      )
  }
]
</script>
<template>
  <NModal
    preset="card"
    :show="isNewSeatModalOpen"
    :style="{
      width: '600px'
    }"
    title="エディション情報の変更"
    @close="handleCancelSeat"
    @maskClick="handleCancelSeat"
  >
    <NForm ref="formRef" :model="formValue">
      <NFormItem label="発行する個数">
        <NInputNumber
          :validator="validator"
          :value="formValue.num"
          @update:value="val => (formValue.num = val ?? 0)"
        />
      </NFormItem>
      <NSpace>
        <NButton type="primary" @click="handlePostSeat">作成</NButton>
        <NButton @click="handleCancelSeat">キャンセル</NButton>
      </NSpace>
    </NForm>
  </NModal>
  <NSpace class="py-10 px-12 gap-10" vertical>
    <NPageHeader @back="() => {}">
      <template #title>座席管理</template>
      <template #extra>
        <NButton @click="() => (isNewSeatModalOpen = true)">
          <template #icon>
            <NIcon>
              <SettingsRound />
            </NIcon>
          </template>
          席数の指定
        </NButton>
      </template>
      <template #header>
        <PageUrl root="editions" />
      </template>
      <template #avatar>
        <NAvatar>
          <NIcon><ChairRound /></NIcon>
        </NAvatar>
      </template>
      <template #back>
        <RouterLink class="flex" :to="paths.index">
          <NIcon>
            <ArrowBackRound />
          </NIcon>
        </RouterLink>
      </template>
    </NPageHeader>
    <NThing>
      <template #header>空席一覧</template>
      <NSpace>
        <NCard
          v-for="seat in data.filter(
            ({ status }) => status === SeatStatus.Empty
          )"
          :key="seat.id"
          :size="'small'"
        >
          <NText
            :style="{
              fontSize: '1.6rem'
            }"
          >
            {{ seat.id }}
          </NText>
        </NCard>
      </NSpace>
    </NThing>
    <NDivider />
    <NDataTable :columns="columns" :data="data" />
  </NSpace>
</template>
