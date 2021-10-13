<script lang="ts" setup>
import { defineProps, ref, reactive } from '@vue/runtime-dom'

import { apis, Game } from '/@/lib/apis'
import { useGamesStore } from '/@/store/games'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useGamesStore()
interface Props {
  id: string
}
const props = defineProps<Props>()
const game = ref<Game>()

const deleteGame = () => {
    store.deleteGame(props.id)
    router.push('/')
}
const newGameInfo = reactive(game)
const editGame = () => {
  store.updateGame(props.id, newGameInfo.value?.name ?? '', newGameInfo.value?.description ?? '')
  isEditing.value = false
}
const isEditing = ref(false)

// TODO: link to ref
const uploadImage = (e: Event) => {
  if (e.target instanceof HTMLInputElement) {
    const file = e.target.files?.[0]
    if (file && game.value?.id) {
      apis.postImage(game.value?.id, file)
      }
    }
  }
const uploadVideo = (e: Event) => {
if (e.target instanceof HTMLInputElement) {
  const file = e.target.files?.[0]
  if (file && game.value?.id) {
    apis.postVideo(game.value?.id, file)
    }
  }
}

game.value = (await apis.getGame(props.id)).data
</script>

<template>
  <div class="p-8">
    <h1 class="text-white text-4xl">{{ game?.name }}</h1>
    <video class="border border-white">
      <source :src="`/games/${$props.id}/movie`" type="video/mp4" />
    </video>
    <div v-if="!isEditing">
      <div v-for="(v, k) in game" :key="k" class="text-white">
        {{ k }}: {{ v }}
      </div>
    </div>
    <div v-else>
      <div v-for="(v, k) in game" :key="k" class="text-white">
        {{ k }}:
        <input class="text-black" :v-model="newGameInfo?.name" />
      </div>
    </div>
    <button
      v-if="!isEditing"
      class="bg-teal-600 text-white"
      @click="isEditing = true"
    >
      change
    </button>
    <button v-else class="bg-teal-600 text-white" @click="editGame">
      save
    </button>
    <button class="bg-red-700 text-white" @click="deleteGame">delete</button>
    <div class="text-white">
      Image: <input type="file" /><button
        class="bg-teal-600"
        @click="uploadImage($event)"
      >
        upload
      </button>
      <br />
      Video: <input type="file" /><button
        class="bg-teal-600"
        @click="uploadVideo($event)"
      >
        upload
      </button>
    </div>
  </div>
</template>
