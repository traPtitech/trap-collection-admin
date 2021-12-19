<script lang="ts" setup>
import { ref, reactive } from 'vue'

import { apis, VersionDetails, ProductKey, ProductKeyGen } from '/@/lib/apis'

interface Props {
  id: string
}

const props = defineProps<Props>()

const launcher = ref<VersionDetails>()
const productKeys = ref<ProductKey[]>()

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

launcher.value = (await apis.getVersion(props.id)).data
productKeys.value = (await apis.getProductKeys(props.id)).data
</script>

<template>
  <div class="p-20">
    <div v-for="(v, k) in launcher" :key="k" class="text-white">
      {{ k }}: {{ v }}
    </div>
    <div>
      <div v-for="(v, k) in productKeys" :key="k" class="text-white">
        {{ k }}: {{ v.key }}
      </div>
      <form @submit.prevent="issueNewProductKey">
        <input v-model="params.num" min="1" placeholder="name" type="number" />
        <button class="bg-teal-600">add</button>
      </form>
    </div>
  </div>
</template>
