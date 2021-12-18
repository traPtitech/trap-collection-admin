<script lang="ts" setup>
import { ref } from 'vue'

import { apis, VersionDetails } from '/@/lib/apis'

interface Props {
  id: string
}

const props = defineProps<Props>()

const launcher = ref<VersionDetails>()
launcher.value = (await apis.getVersion(props.id)).data
</script>

<template>
  <div class="p-20">
    <div v-for="(v, k) in launcher" :key="k" class="text-white">
      {{ k }}: {{ v }}
    </div>
  </div>
</template>
