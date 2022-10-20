<script setup lang="ts">
import { NInput, NSpace, NForm, FormInst, NFormItem } from 'naive-ui'
import { Ref, ref } from 'vue'

import { PatchGame } from '/@/lib/apis'

const formRef = ref<FormInst | null>(null)

const props = defineProps<{
  defaultValue?: PatchGame
  onSubmit: (value: PatchGame) => void
  onCancel: () => void
}>()

const formValue: Ref<PatchGame> = ref(
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
</script>

<template>
  <NForm ref="formRef" :model="formValue" :rules="rules">
    <NFormItem label="名前" name="name">
      <NInput :value="formValue.name" />
    </NFormItem>
    <NFormItem label="説明" name="description">
      <NInput :value="formValue.description" />
    </NFormItem>
    <NSpace>
      <NButton type="primary" @click="props.onSubmit">作成</NButton>
      <NButton @click="props.onCancel">キャンセル</NButton>
    </NSpace>
  </NForm>
</template>
