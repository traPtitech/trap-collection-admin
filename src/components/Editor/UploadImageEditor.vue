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
  onUpload?: (file: File) => void
}>()

const uploadRef = ref<UploadInst | null>(null)

const beforeUpload = async ({ file }: { file: UploadFileInfo }) => {
  file.file && props.onUpload?.(file.file)
  return false
}
</script>

<template>
  <NUpload ref="uploadRef" directory-dnd @beforeUpload="beforeUpload">
    <NUploadDragger>
      <NIcon size="48">
        <ArchiveRound />
      </NIcon>
    </NUploadDragger>
  </NUpload>
</template>
