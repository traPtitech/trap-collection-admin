<script lang="ts" setup>
import { ref, reactive } from 'vue'

import { apis, VersionDetails, ProductKey, ProductKeyGen } from '/@/lib/apis'

interface Props {
  id: string
}

const props = defineProps<Props>()

const launcher = ref<VersionDetails>()
const productKeys = ref<ProductKey[]>()

// TODO: sync with store
const params = reactive<ProductKeyGen>({
  num: 1,
  version: props.id
})
const issueNewProductKey = async () => {
  const keys = (await apis.postKeyGenerate(params)).data
  if (keys) {
    productKeys.value = keys
  }
}

// TODO: sync with store
const addedGameId = ref<string>()
const addGames = () => {
  if (addedGameId.value) {
    apis.postGameToVersion(props.id, { gameIDs: [addedGameId.value]})
  }
}

// TODO: id dose not exist in type ProductKey
const revokeProductKey = async (keyId: string) => {
  await apis.deleteProductKey(keyId)
  productKeys.value = productKeys.value?.filter(k => k.id !== keyId)
}

launcher.value = (await apis.getVersion(props.id)).data
productKeys.value = (await apis.getProductKeys(props.id)).data
</script>

<template>
  <div class="text-white p-20">
    <div v-for="(v, k) in launcher" :key="k">{{ k }}: {{ v }}</div>
    ---
    <div>
      <form @submit.prevent="addGames">
        <input v-model="addedGameId" class="text-black" placeholder="game id" />
        <button class="bg-teal-600">Add</button>
      </form>
    </div>
    ---
    <div>
      <div v-for="(v, k) in productKeys" :key="k">
        {{ k }}: {{ v.key }}
        <button class="bg-red-700" @click="revokeProductKey(v.id)">
          revoke
        </button>
      </div>
      <form @submit.prevent="issueNewProductKey">
        <input
          v-model="params.num"
          class="text-black"
          min="1"
          placeholder="name"
          type="number"
        />
        <button class="bg-teal-600">add</button>
      </form>
    </div>
  </div>
</template>
