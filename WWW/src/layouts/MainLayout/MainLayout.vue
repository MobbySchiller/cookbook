<template>
  <MainLayoutHeader />
  <div class="min-h-(--page-height)" :class="route.meta.lightBg ? 'bg-light' : 'bg-white'">
    <main class="mx-auto max-w-screen-xl">
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup lang="ts">
import MainLayoutHeader from './_components/MainLayoutHeader.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
</script>
