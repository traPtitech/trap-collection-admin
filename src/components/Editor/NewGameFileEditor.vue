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
import { reactive, ref } from 'vue'

import UploadFileEditor from './UploadFileEditor.vue'
import { GameFileType } from '/@/lib/apis'

const formRef = ref<FormInst | null>(null)

const props = defineProps<{
  onSubmit?: (type: GameFileType, entryPoint: string, content: File) => void
  onCancel?: () => void
}>()

const typeValue = ref(GameFileType.Win32)
const entryPointValue = ref('')
const contentValue = ref<File | null>(null)

const typeOptions = [
  {
    label: 'Windows',
    value: GameFileType.Win32
  },
  {
    label: 'macOS',
    value: GameFileType.Darwin
  },
  {
    label: 'Java',
    value: GameFileType.Jar
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

const handleSubmit = () => {
  formRef.value?.validate(errors => {
    if (!errors && contentValue.value !== null) {
      props.onSubmit?.(
        typeValue.value,
        entryPointValue.value,
        contentValue.value
      )
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
        :onUpload="(file: File | null) => { contentValue = file }"
      />
    </NFormItem>
    <NSpace>
      <NButton type="primary" @click="handleSubmit">変更</NButton>
      <NButton @click="props.onCancel">キャンセル</NButton>
    </NSpace>
  </NForm>
</template>
