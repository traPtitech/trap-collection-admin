<script setup lang="ts">
import { NInputNumber, NSpace, NForm, NFormItem, NButton } from 'naive-ui'
import { Ref, ref } from 'vue'

const props = defineProps<{
  defaultValue?: number
  onSubmit?: (value: number) => void
  onCancel?: () => void
}>()

const formValue: Ref<number | null> = ref(props.defaultValue ?? 0)

const handleSubmit = () => {
  props.onSubmit?.(formValue.value ?? 0)
}
// 1 以上の整数
const validator = (x: number) => x > 0 && x % 1 === 0
</script>

<template>
  <NForm>
    <NFormItem label="発行する個数">
      <NInputNumber
        :validator="validator"
        :value="formValue"
        @update:value="val => (formValue = val)"
      />
    </NFormItem>
    <NSpace>
      <NButton type="primary" @click="handleSubmit">作成</NButton>
      <NButton @click="props.onCancel">キャンセル</NButton>
    </NSpace>
  </NForm>
</template>
