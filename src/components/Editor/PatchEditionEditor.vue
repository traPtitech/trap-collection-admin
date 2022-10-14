<script setup lang="ts">
import { NInput, NSpace, NForm, FormInst, NFormItem } from 'naive-ui'
import { Ref, ref } from 'vue'

import { PatchEdition } from '/@/lib/apis'

const formRef = ref<FormInst | null>(null)

const props = defineProps<{
  defaultValue?: PatchEdition
  onSubmit: (value: PatchEdition) => void
  onCancel: () => void
}>()

const formValue: Ref<PatchEdition> = ref(
  props.defaultValue ?? {
    name: '',
    questionnaire: ''
  }
)

const rules = {
  name: {
    required: true,
    message: '名前を入力してください',
    trigger: 'blur'
  },
  questionnaire: {
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
    <NFormItem label="anke-to の URL" name="questionnaire">
      <NInput :value="formValue.questionnaire" />
    </NFormItem>
    <NSpace>
      <NButton type="primary" @click="props.onSubmit">作成</NButton>
      <NButton @click="props.onCancel">キャンセル</NButton>
    </NSpace>
  </NForm>
</template>
