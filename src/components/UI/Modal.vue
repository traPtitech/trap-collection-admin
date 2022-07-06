<script lang="ts" setup>
interface Props {
  show: boolean
}
defineProps<Props>()
</script>

<template>
  <transition
    enter-active-class="transition duration-100 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition duration-100 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-show="show"
      class="rounded transform top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute"
    >
      <slot></slot>
    </div>
  </transition>
</template>
