<template>
  <MainLayoutHeader />
  <main class="mx-auto max-w-screen-xl">
    <router-view></router-view>
  </main>
</template>

<script setup lang="ts">
import MainLayoutHeader from './_components/MainLayoutHeader.vue'
</script>
