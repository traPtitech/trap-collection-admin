<script setup lang="ts">
import { NInput, NSpace, NForm, FormInst, NFormItem, NSelect } from 'naive-ui'
import { computed, Ref, ref } from 'vue'

import { useApi } from '/@/hooks/useApi'
import { apis, NewGameVersion } from '/@/lib/apis'

const props = defineProps<{
  gameId: string
  defaultValue?: NewGameVersion
  onSubmit?: (value: NewGameVersion) => void
  onCancel?: () => void
}>()

const formRef = ref<FormInst | null>(null)

const gameFilesApi = useApi(apis.getGameFiles)
gameFilesApi.refetch(props.gameId)
const gameImagesApi = useApi(apis.getGameImages)
gameImagesApi.refetch(props.gameId)
const gameVideosApi = useApi(apis.getGameVideos)
gameVideosApi.refetch(props.gameId)

const gameFilesSelectOptions = computed(() => {
  if (gameFilesApi.data?.value?.type === 'success') {
    return gameFilesApi.data?.value?.data?.map(gameFile => ({
      label: gameFile.createdAt,
      value: gameFile.id
    }))
  }
  return []
})

const gameImagesSelectOptions = computed(() => {
  if (gameImagesApi.data?.value?.type === 'success') {
    return gameImagesApi.data?.value?.data?.map(gameImage => ({
      label: gameImage.createdAt,
      value: gameImage.id
    }))
  }
  return []
})

const gameVideosSelectOptions = computed(() => {
  if (gameVideosApi.data?.value?.type === 'success') {
    return gameVideosApi.data?.value?.data?.map(gameVideo => ({
      label: gameVideo.createdAt,
      value: gameVideo.id
    }))
  }
  return []
})

const formValue: Ref<NewGameVersion> = ref(
  props.defaultValue ?? {
    name: '',
    description: '',
    imageID: '',
    videoID: ''
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
  },
  url: {
    required: false,
    trigger: 'blur'
  },
  win32: {
    required: false,
    trigger: 'blur'
  },
  darwin: {
    required: false,
    trigger: 'blur'
  },
  jar: {
    required: false,
    trigger: 'blur'
  },
  imageId: {
    required: true,
    message: '画像を選択してください',
    trigger: 'blur'
  },
  videoId: {
    required: true,
    message: '動画を選択してください',
    trigger: 'blur'
  }
}
</script>

<template>
  <NForm ref="formRef" :model="formValue" :rules="rules">
    <NFormItem label="名前" path="name">
      <NInput :value="formValue.name" />
    </NFormItem>
    <NFormItem label="説明" path="description">
      <NInput :value="formValue.description" />
    </NFormItem>
    <NFormItem label="URL" path="url">
      <NInput :value="formValue.url" />
    </NFormItem>
    <NFormItem label="Windows 用ファイル" path="win32">
      <NSelect
        multiple
        :options="gameFilesSelectOptions"
        :value="formValue.files?.win32"
      />
    </NFormItem>
    <NFormItem label="Mac 用ファイル" path="darwin">
      <NSelect
        multiple
        :options="gameFilesSelectOptions"
        :value="formValue.files?.darwin"
      />
    </NFormItem>
    <NFormItem label="Jar ファイル" path="jar">
      <NSelect
        multiple
        :options="gameFilesSelectOptions"
        :value="formValue.files?.jar"
      />
    </NFormItem>
    <NFormItem label="画像" path="imageId">
      <NSelect :options="gameImagesSelectOptions" :value="formValue.imageID" />
    </NFormItem>
    <NFormItem label="動画" path="videoId">
      <NSelect :options="gameVideosSelectOptions" :value="formValue.videoID" />
    </NFormItem>
    <NSpace>
      <NButton type="primary" @click="props.onSubmit">作成</NButton>
      <NButton @click="props.onCancel">キャンセル</NButton>
    </NSpace>
  </NForm>
</template>
