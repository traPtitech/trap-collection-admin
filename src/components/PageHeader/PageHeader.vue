<template>
  <header
    class="flex max-w-screen border-opacity-10 border-b-1 border-light-900 h-24"
  >
    <Logo />
    <nav class="flex p-5 items-center">
      <NavGame />
      <NavLauncher />
      <NavSeat />
    </nav>
  </header>
</template>

<script lang="ts" setup>
import Logo from './Logo.vue'
import NavGame from './NavGame.vue'
import NavLauncher from './NavLauncher.vue'
import NavSeat from './NavSeat.vue'
</script>
