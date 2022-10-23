<script setup lang="ts">
import { NInput, NSpace, NForm, NFormItem, FormInst, NButton } from 'naive-ui'
import { reactive, ref } from 'vue'

import { PatchGame } from '/@/lib/apis'

const formRef = ref<FormInst | null>(null)

const props = defineProps<{
  defaultValue?: PatchGame
  onSubmit?: (value: PatchGame) => void
  onCancel?: () => void
}>()

const formValue: PatchGame = reactive(
  props.defaultValue ?? {
    name: '',
    description: ''
  }
)

const rules = {
  name: {
    required: true,
    message: '名前を入力してください',
    trigger: 'blur'
  },
  description: {
    required: true,
    message: '説明を入力してください',
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
    <NFormItem label="名前" name="name">
      <NInput
        :value="formValue.name"
        @update:value="
          val => {
            formValue.name = val
          }
        "
      />
    </NFormItem>
    <NFormItem label="説明" name="description">
      <NInput
        multiline
        :value="formValue.description"
        @update:value="
          val => {
            formValue.description = val
          }
        "
      />
    </NFormItem>
    <NSpace>
      <NButton type="primary" @click="handleSubmit">変更</NButton>
      <NButton @click="props.onCancel">キャンセル</NButton>
    </NSpace>
  </NForm>
</template>
