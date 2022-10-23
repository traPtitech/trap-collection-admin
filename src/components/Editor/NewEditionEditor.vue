<script setup lang="ts">
import {
  NInput,
  NSpace,
  NForm,
  FormInst,
  NFormItem,
  NTreeSelect
} from 'naive-ui'
import { Ref, ref } from 'vue'

import { useGameVersionTreeSelectProps } from '/@/hooks/useGameVersionTreeSelectProps'
import { NewEdition } from '/@/lib/apis'

const formRef = ref<FormInst | null>(null)

const props = defineProps<{
  defaultValue?: NewEdition
  onSubmit?: (value: NewEdition) => void
  onCancel?: () => void
}>()

const formValue: Ref<NewEdition> = ref(
  props.defaultValue ?? {
    name: '',
    gameVersions: []
  }
)

const { options, handleLoad } = useGameVersionTreeSelectProps()

const rules = {
  name: {
    required: true,
    message: '名前を入力してください',
    trigger: 'blur'
  },
  questionnaire: {
    required: false,
    trigger: 'blur'
  },
  gameVersions: {
    required: false,
    trigger: 'blur'
  }
}
</script>

<template>
  <NForm ref="formRef" :model="formValue" :rules="rules">
    <NFormItem label="名前" path="name">
      <NInput :value="formValue.name" />
    </NFormItem>
    <NFormItem label="anke-to の URL" path="questionnaire">
      <NInput :value="formValue.questionnaire" />
    </NFormItem>
    <NFormItem label="追加するゲーム" path="gameVersions">
      <NTreeSelect :on-load="handleLoad" :options="options" />
    </NFormItem>
    <NSpace>
      <NButton type="primary" @click="props.onSubmit">作成</NButton>
      <NButton @click="props.onCancel">キャンセル</NButton>
    </NSpace>
  </NForm>
</template>
