<script setup lang="ts">
import {
  NInput,
  NSpace,
  NForm,
  FormInst,
  NFormItem,
  NButton,
  NTreeSelect
} from 'naive-ui'
import { reactive, ref } from 'vue'

import { useGameVersionTreeSelectProps } from '/@/hooks/useGameVersionTreeSelectProps'
import { NewEdition } from '/@/lib/apis'

const formRef = ref<FormInst | null>(null)

const props = defineProps<{
  defaultValue?: NewEdition
  onSubmit?: (value: NewEdition) => void
  onCancel?: () => void
}>()

const formValue: NewEdition = reactive(
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
    type: 'array' as const,
    trigger: 'blur'
  }
}

const handleSubmit = () => {
  formRef.value?.validate(errors => {
    if (!errors) {
      props.onSubmit?.(formValue)
    }
  })
}
</script>

<template>
  <NForm ref="formRef" :model="formValue" :rules="rules">
    <NFormItem label="名前" path="name">
      <NInput
        :value="formValue.name"
        @update:value="val => (formValue.name = val)"
      />
    </NFormItem>
    <NFormItem label="anke-to の URL" path="questionnaire">
      <NInput
        :value="formValue.questionnaire"
        @update:value="val => (formValue.questionnaire = val)"
      />
    </NFormItem>
    <NFormItem label="追加するゲーム" path="gameVersions">
      <NTreeSelect
        multiple
        :on-load="handleLoad"
        :options="options"
        :show-path="true"
        :value="formValue.gameVersions"
        @update:value="val => (formValue.gameVersions = val)"
      />
    </NFormItem>
    <NSpace>
      <NButton type="primary" @click="handleSubmit">作成</NButton>
      <NButton @click="props.onCancel">キャンセル</NButton>
    </NSpace>
  </NForm>
</template>
