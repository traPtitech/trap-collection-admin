<script lang="ts" setup>
import { defineProps, ref } from '@vue/runtime-dom'

import { apis, Game, Maintainer, Maintainers, GameVersion, NewGameVersion, NewGameURL } from '/@/lib/apis'
import { useGamesStore } from '/@/store/games'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useGamesStore()
interface Props {
  id: string
}
const props = defineProps<Props>()
const game = ref<Game>()
const maintainers = ref<Maintainer[]>()
const versions = ref<GameVersion[]>()

const deleteGame = () => {
    store.deleteGame(props.id)
    router.push('/')
}

let newGameInfo = {
  name: '',
  description: '',
}
const editGame = () => {
  store.updateGame(props.id, newGameInfo.name, newGameInfo.description)
  isEditing.value = false
}
const isEditing = ref(false)

const newMaintainers = ref<string[]>()
const addMaintainers = () => {
  if (game.value && newMaintainers.value) {
    // TODO: argument order
      const session = document.cookie
        .split('; ')
        .find(c => c.startsWith('session='))
        ?.split('=')[1]
    // TODO: type
    const m: Maintainers = {
      maintainers: newMaintainers.value,
    }
    apis.postMaintainer(game.value.id, session, m)
  }
}

// TODO: type
let newVersion: NewGameVersion = {
  name: '',
  description: ''
}
const addGameVersion= () => {
  if (game.value) {
    apis.postGameVersion(game.value.id, newVersion)
  }
}

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

// TODO: type
let newGameURL: NewGameURL = {
  url: ''
}
const setGameURL = () => {
  if (game.value) {
    apis.postURL(game.value.id, newGameURL)
  }
}
const uploadFile = (e: Event) => {
  if (e.target instanceof HTMLInputElement) {
    const file = e.target.files?.[0]
    if (file && game.value?.id) {
      apis.postFile(game.value?.id, file)
      }
  }
}

game.value = (await apis.getGame(props.id)).data
newGameInfo.name = game.value.name
// TODO: type
newGameInfo.description = game.value.description ?? ''
maintainers.value = (await apis.getMaintainer(game.value.id)).data
versions.value = (await apis.getGameVersion(game.value.id)).data
</script>

<template>
  <div class="text-white p-8">
    <h1 class="text-4xl">{{ game?.name }}</h1>
    <video class="border border-white">
      <source :src="`/games/${id}/movie`" type="video/mp4" />
    </video>
    <div v-if="!isEditing">
      <div v-for="(v, k) in game" :key="k">{{ k }}: {{ v }}</div>
    </div>
    <div v-else>
      <div v-for="(v, k) in newGameInfo" :key="k">
        {{ k }}:
        <input v-model="newGameInfo[k]" class="text-black" />
      </div>
    </div>
    <div>
      <button v-if="!isEditing" class="bg-teal-600" @click="isEditing = true">
        change
      </button>
      <button v-else class="bg-teal-600" @click="editGame">save</button>
      <button class="bg-red-700" @click="deleteGame">delete</button>
    </div>
    ---
    <div>
      <div>
        maintainers:
        <div v-for="v in maintainers" :key="v.id">{{ v.name }}</div>
      </div>
      <form @submit.prevent="addMaintainers">
        <input class="text-black" placeholder="id" :v-model="newMaintainers" />
        <button class="bg-teal-600">add</button>
      </form>
    </div>
    ---
    <div>
      <form @submit.prevent="uploadImage($event)">
        <label for="image_input">image: </label>
        <input id="image_input" type="file" />
        <button class="bg-teal-600">upload</button>
      </form>
      <form @submit.prevent="uploadVideo($event)">
        <label for="video_input">video: </label
        ><input id="vide_input" type="file" />
        <button class="bg-teal-600">upload</button>
      </form>
    </div>
    ---
    <div>
      <div v-for="v in versions" :key="v.id">{{ v }}</div>
      <form @submit.prevent="addGameVersion()">
        <input
          v-model="newVersion.name"
          class="text-black"
          pattern="^([0-9]+)\.([0-9]+)\.([0-9]+)(?:-([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?(?:\+[0-9A-Za-z-]+)?$"
          placeholder="semvar"
        />
        <input
          v-model="newVersion.description"
          class="text-black"
          placeholder="description"
        />
        <button class="bg-teal-600">add</button>
      </form>
    </div>
    ---
    <div>
      <form @submit.prevent="uploadFile($event)">
        <label for="file_input">zip: </label>
        <input id="file_input" type="file" />
        <button class="bg-teal-600">upload</button>
      </form>
      <form @submit.prevent="setGameURL()">
        <input
          v-model="newGameURL.url"
          class="text-black"
          placeholder="description"
        />
        <button class="bg-teal-600">upload</button>
      </form>
    </div>
  </div>
</template>
