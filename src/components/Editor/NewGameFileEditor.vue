<script setup lang="ts">
import {
  NSpace,
  NForm,
  FormInst,
  NFormItem,
  NSelect,
  NButton,
  NInput,
  FormItemRule
} from 'naive-ui'
import { nextTick, reactive, ref } from 'vue'

import UploadFileEditor from './UploadFileEditor.vue'

const formRef = ref<FormInst | null>(null)

const props = defineProps<{
  onSubmit?: (
    type: 'win32' | 'darwin' | 'jar',
    entryPoint: string,
    content: File
  ) => Promise<void>
  onCancel?: () => void
}>()

const typeValue = ref<'win32' | 'darwin' | 'jar'>('win32')
const entryPointValue = ref('')
const contentValue = ref<File | null>(null)
const submitProcessing = ref(false)

const typeOptions = [
  {
    label: 'Windows',
    value: 'win32'
  },
  {
    label: 'macOS',
    value: 'darwin'
  },
  {
    label: 'Java',
    value: 'jar'
  }
]

const rules = {
  typeValue: {
    required: true,
    message: 'ファイルの種類を選択してください',
    trigger: 'blur'
  },
  entryPointValue: {
    required: true,
    message: 'エントリーポイントを入力してください',
    trigger: 'blur'
  },
  contentValue: {
    validator: (_: FormItemRule, value: File | null) => {
      if (value === null) {
        return new Error('File is required')
      }
      return true
    },
    message: 'ファイルをアップロードしてください',
    trigger: 'blur'
  }
}

const model = reactive({
  typeValue,
  entryPointValue,
  contentValue
})

const handleSubmit = async () => {
  submitProcessing.value = true
  await nextTick()
  await formRef.value?.validate(async errors => {
    if (!errors && contentValue.value !== null) {
      await props.onSubmit?.(
        typeValue.value,
        entryPointValue.value,
        contentValue.value
      )
      submitProcessing.value = false
    }
  })
}
</script>

<template>
  <NForm ref="formRef" :model="model" :rules="rules">
    <NFormItem label="ファイルの種類" path="typeValue">
      <NSelect
        :options="typeOptions"
        :value="typeValue"
        @update:value="
          val => {
            typeValue = val
          }
        "
      />
    </NFormItem>
    <NFormItem label="エントリーポイント" path="entryPointValue">
      <NInput
        :value="entryPointValue"
        @update:value="
          val => {
            entryPointValue = val
          }
        "
      />
    </NFormItem>
    <NFormItem label="zip ファイル" path="contentValue">
      <UploadFileEditor
        accept=".zip"
        :onUpload="(file: File | null) => { contentValue = file }"
      />
    </NFormItem>
    <NSpace>
      <NButton :loading="submitProcessing" type="primary" @click="handleSubmit">
        アップロード</NButton
      >
      <NButton @click="props.onCancel">キャンセル</NButton>
    </NSpace>
  </NForm>
</template>
