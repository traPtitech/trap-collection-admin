<script setup lang="ts">
import {
  NSpace,
  NForm,
  FormInst,
  NFormItem,
  NButton,
  NTreeSelect
} from 'naive-ui'
import { reactive, ref } from 'vue'

import { useGameVersionTreeSelectProps } from '/@/hooks/useGameVersionTreeSelectProps'
import { PatchEditionGameRequest } from '/@/lib/apis'

const formRef = ref<FormInst | null>(null)

const props = defineProps<{
  defaultValue?: PatchEditionGameRequest
  onSubmit?: (value: PatchEditionGameRequest) => void
  onCancel?: () => void
}>()

const formValue: PatchEditionGameRequest = reactive(
  props.defaultValue ?? {
    gameVersionIDs: []
  }
)

const { options, handleLoad } = useGameVersionTreeSelectProps()

const rules = {
  gameVersionIDs: {
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
    <NFormItem label="追加するゲーム" path="gameVersionIDs">
      <NTreeSelect
        multiple
        :on-load="handleLoad"
        :options="options"
        :show-path="true"
        :value="formValue.gameVersionIDs"
        @update:value="val => (formValue.gameVersionIDs = val)"
      />
    </NFormItem>
    <NSpace>
      <NButton type="primary" @click="handleSubmit">作成</NButton>
      <NButton @click="props.onCancel">キャンセル</NButton>
    </NSpace>
  </NForm>
</template>
