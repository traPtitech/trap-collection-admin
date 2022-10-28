<script setup lang="ts">
import {
  NInput,
  NSpace,
  NForm,
  FormInst,
  NFormItem,
  NSelect,
  NButton
} from 'naive-ui'
import { reactive, ref } from 'vue'

import { useUserSelectOptions } from '../../hooks/useUserSelectOptions'
import { NewGame } from '/@/lib/apis'

const formRef = ref<FormInst | null>(null)

const props = defineProps<{
  defaultValue?: NewGame
  onSubmit?: (value: NewGame) => void
  onCancel?: () => void
}>()

const formValue: NewGame = reactive(
  props.defaultValue ?? {
    name: '',
    description: ''
  }
)

const userSelectOptions = useUserSelectOptions()

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
  },
  maintainers: {
    required: false,
    trigger: 'blur'
  },
  owners: {
    required: false,
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
        @update:value="
          val => {
            formValue.name = val
          }
        "
      />
    </NFormItem>
    <NFormItem label="説明" path="description">
      <NInput
        :value="formValue.description"
        type="textarea"
        @update:value="
          val => {
            formValue.description = val
          }
        "
      />
    </NFormItem>
    <NFormItem label="管理者" path="maintainers">
      <NSelect
        filterable
        multiple
        :options="userSelectOptions"
        tag
        :value="formValue.maintainers"
        @update:value="
          val => {
            formValue.maintainers = val
          }
        "
      />
    </NFormItem>
    <NFormItem label="所有者" path="owners">
      <NSelect
        filterable
        multiple
        :options="userSelectOptions"
        tag
        :value="formValue.owners"
        @update:value="
          val => {
            formValue.owners = val
          }
        "
      />
    </NFormItem>
    <NSpace>
      <NButton type="primary" @click="handleSubmit">作成</NButton>
      <NButton @click="props.onCancel">キャンセル</NButton>
    </NSpace>
  </NForm>
</template>
