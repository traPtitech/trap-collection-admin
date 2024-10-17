<script setup lang="ts">
import {
  NInput,
  NSpace,
  NForm,
  FormInst,
  NFormItem,
  NSelect,
  NButton,
  FormRules
} from 'naive-ui'
import { computed, reactive, ref } from 'vue'

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

const formValue: NewGameVersion = reactive(
  props.defaultValue ?? {
    name: '',
    description: '',
    files: {},
    imageID: '',
    videoID: ''
  }
)

const validateVersion = (): boolean => {
  // https://pkg.go.dev/golang.org/x/mod/semver#pkg-overview
  // vMAJOR[.MINOR[.PATCH[-PRERELEASE][+BUILD]]]
  return formValue.name.match(
    /^v(0|([1-9][0-9]*))(\.(0|([1-9][0-9]*))(\.(0|([1-9][0-9]*))(-(\w|\.|-)+)?(\+(\w|\.|-)+)?)?)?$/gm
  )
    ? true
    : false
}

const rules: FormRules = {
  name: [
    {
      required: true,
      message: 'バージョン名を入力してください',
      trigger: 'blur'
    },
    {
      validator: validateVersion,
      trigger: ['input', 'blur'],
      message:
        'バージョン名が正しくありません。v*.*.*のような形式で入力してください。'
    }
  ],
  description: {
    required: true,
    message: '説明を入力してください',
    trigger: 'blur'
  },
  url: {
    required: false,
    trigger: 'blur'
  },
  files: {
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
    }
  },
  imageID: {
    required: true,
    message: '画像を選択してください',
    trigger: 'blur'
  },
  videoID: {
    required: true,
    message: '動画を選択してください',
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
    <NFormItem label="バージョン名" path="name">
      <NInput
        :placeholder="'v0.0.0'"
        :value="formValue.name"
        @update:value="val => (formValue.name = val)"
      />
    </NFormItem>
    <NFormItem label="説明" path="description">
      <NInput
        type="textarea"
        :value="formValue.description"
        @update:value="val => (formValue.description = val)"
      />
    </NFormItem>
    <NFormItem label="URL" path="url">
      <NInput
        :value="formValue.url"
        @update:value="val => (formValue.url = val)"
      />
    </NFormItem>
    <NFormItem label="Windows 用ファイル" path="files.win32">
      <NSelect
        clearable
        :options="gameFilesSelectOptions"
        :value="formValue.files?.win32"
        @update:value="
          val => {
            formValue.files && (formValue.files.win32 = val)
          }
        "
      />
    </NFormItem>
    <NFormItem label="Mac 用ファイル" path="files.darwin">
      <NSelect
        clearable
        :options="gameFilesSelectOptions"
        :value="formValue.files?.darwin"
        @update:value="
          val => {
            formValue.files && (formValue.files.darwin = val)
          }
        "
      />
    </NFormItem>
    <NFormItem label="Jar ファイル" path="files.jar">
      <NSelect
        clearable
        :options="gameFilesSelectOptions"
        :value="formValue.files?.jar"
        @update:value="
          val => {
            formValue.files && (formValue.files.jar = val)
          }
        "
      />
    </NFormItem>
    <NFormItem label="画像" path="imageID">
      <NSelect
        :options="gameImagesSelectOptions"
        :value="formValue.imageID"
        @update:value="val => (formValue.imageID = val)"
      />
    </NFormItem>
    <NFormItem label="動画" path="videoID">
      <NSelect
        :options="gameVideosSelectOptions"
        :value="formValue.videoID"
        @update:value="val => (formValue.videoID = val)"
      />
    </NFormItem>
    <NSpace>
      <NButton type="primary" @click="handleSubmit">作成</NButton>
      <NButton @click="props.onCancel">キャンセル</NButton>
    </NSpace>
  </NForm>
</template>
