<script setup lang="ts">
import { NSpace, NForm, FormInst, NFormItem, NSelect, NButton } from 'naive-ui'
import { reactive, ref } from 'vue'

import { useUserSelectOptions } from '../../hooks/useUserSelectOptions'
import { GameRoleRequest, GameRoleType } from '/@/lib/apis'

const formRef = ref<FormInst | null>(null)

const props = defineProps<{
  defaultValue?: GameRoleRequest
  onSubmit?: (value: GameRoleRequest) => void
  onCancel?: () => void
}>()

const formValue = reactive(
  props.defaultValue ?? {
    id: '',
    type: GameRoleType.Owner
  }
)

const userSelectOptions = useUserSelectOptions()

const typeOptions = [
  {
    label: '所有者',
    value: GameRoleType.Owner
  },
  {
    label: '管理者',
    value: GameRoleType.Maintainer
  }
]

const rules = {
  id: {
    required: true,
    message: '対象のユーザーを選択してください',
    trigger: 'blur'
  },
  type: {
    required: true,
    message: '付与する権限を選択してください',
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
    <NFormItem label="ユーザー" path="id">
      <NSelect
        filterable
        :options="userSelectOptions"
        tag
        :value="formValue.id"
        @update:value="val => (formValue.id = val)"
      />
    </NFormItem>
    <NFormItem label="権限" path="type">
      <NSelect
        filterable
        :options="typeOptions"
        tag
        :value="formValue.type"
        @update:value="val => (formValue.type = val)"
      />
    </NFormItem>
    <NSpace>
      <NButton type="primary" @click="handleSubmit">変更</NButton>
      <NButton @click="props.onCancel">キャンセル</NButton>
    </NSpace>
  </NForm>
</template>
