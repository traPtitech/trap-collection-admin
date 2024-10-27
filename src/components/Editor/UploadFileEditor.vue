<script setup lang="ts">
import ArchiveRound from '@vicons/material/ArchiveRound'
import {
  NUpload,
  NUploadDragger,
  UploadFileInfo,
  UploadInst,
  NIcon
} from 'naive-ui'
import { ref } from 'vue'

const props = defineProps<{
  onUpload?: (file: File | null) => void
}>()

const uploadRef = ref<UploadInst | null>(null)

const onBeforeUpload = ({ file }: { file: UploadFileInfo }) => {
  file.file && props.onUpload?.(file.file)
  return undefined
}
const onRemove = async () => {
  props.onUpload?.(null)
  return true
}
</script>

<template>
  <NUpload
    ref="uploadRef"
    accept=".zip"
    directory-dnd
    :max="1"
    :multiple="false"
    @before-upload="onBeforeUpload"
    @remove="onRemove"
  >
    <NUploadDragger>
      <NIcon size="48">
        <ArchiveRound />
      </NIcon>
    </NUploadDragger>
  </NUpload>
</template>
