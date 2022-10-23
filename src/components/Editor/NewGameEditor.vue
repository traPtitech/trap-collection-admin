<script setup lang="ts">
import { NInput, NSpace, NForm, FormInst, NFormItem, NSelect } from 'naive-ui'
import { Ref, ref } from 'vue'

import { useUserSelectOptions } from '../../hooks/useUserSelectOptions'
import { NewGame } from '/@/lib/apis'

const formRef = ref<FormInst | null>(null)

const props = defineProps<{
  defaultValue?: NewGame
  onSubmit?: (value: NewGame) => void
  onCancel?: () => void
}>()

const formValue: Ref<NewGame> = ref(
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
</script>

<template>
  <NForm ref="formRef" :model="formValue" :rules="rules">
    <NFormItem label="名前" name="name">
      <NInput :value="formValue.name" />
    </NFormItem>
    <NFormItem label="説明" name="description">
      <NInput :value="formValue.description" />
    </NFormItem>
    <NFormItem label="管理者" name="maintainers">
      <NSelect
        multiple
        :options="userSelectOptions"
        :value="formValue.maintainers"
      />
    </NFormItem>
    <NFormItem label="所有者" name="owners">
      <NSelect
        multiple
        :options="userSelectOptions"
        :value="formValue.owners"
      />
    </NFormItem>
    <NSpace>
      <NButton type="primary" @click="props.onSubmit">作成</NButton>
      <NButton @click="props.onCancel">キャンセル</NButton>
    </NSpace>
  </NForm>
</template>
