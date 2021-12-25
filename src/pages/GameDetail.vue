<script lang="ts" setup>
import { ref } from 'vue'

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

// TODO: preview
const newImage = ref()
const updateImage= (e : Event) => {
  if (e.target instanceof HTMLInputElement) {
    newImage.value = e.target.files?.[0]
  }
}
const uploadImage = () => {
    if (game.value?.id && newImage.value) {
      apis.postImage(game.value.id, newImage.value)
      }
  }

// TODO: preview
const newVideo = ref()
const updateVideo= (e : Event) => {
  if (e.target instanceof HTMLInputElement) {
    newVideo.value = e.target.files?.[0]
  }
}
const uploadVideo = () => {
    if (game.value?.id && newVideo.value) {
      apis.postVideo(game.value.id, newVideo.value)
    }
  }

const newFile = ref()
let entryPoint = ''
const updateFile= (e : Event) => {
  if (e.target instanceof HTMLInputElement) {
    newFile.value = e.target.files?.[0]
  }
}
const uploadFile = () => {
  if (game.value?.id && newFile.value) {
      apis.postFile(game.value.id, entryPoint, newFile.value)
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
    <video class="border border-white" controls>
      <source :src="`/api/games/${id}/video`" type="video/mp4" />
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
      <form @submit.prevent="uploadImage">
        <label for="image_input">image: </label>
        <input id="image_input" type="file" @change="updateImage($event)" />
        <button class="bg-teal-600">upload</button>
      </form>
      <form @submit.prevent="uploadVideo">
        <label for="video_input">video: </label>
        <input id="vide_input" type="file" @change="updateVideo($event)" />
        <button class="bg-teal-600">upload</button>
      </form>
    </div>
    ---
    <div>
      <div v-for="v in versions" :key="v.id">
        {{ v.name }}: {{ v.description }}
      </div>
      <form @submit.prevent="addGameVersion">
        <input
          v-model="newVersion.name"
          class="text-black"
          pattern="^v([0-9]+)\.([0-9]+)\.([0-9]+)(?:-([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?(?:\+[0-9A-Za-z-]+)?$"
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
      <form @submit.prevent="uploadFile">
        <label for="file_input">zip: </label>
        <input id="file_input" type="file" @change="updateFile($event)" />
        <br />
        <label for="entrypoint_input">entrypoint: </label>
        <input
          id="entrypoint_input"
          v-model="entryPoint"
          class="text-black"
          placeholder="entrypoint"
        />
        <button class="bg-teal-600">upload</button>
      </form>
      <form @submit.prevent="setGameURL">
        <label for="url_input">url: </label>
        <input
          id="url_input"
          v-model="newGameURL.url"
          class="text-black"
          placeholder="game url"
        />
        <button class="bg-teal-600">upload</button>
      </form>
    </div>
  </div>
</template>
