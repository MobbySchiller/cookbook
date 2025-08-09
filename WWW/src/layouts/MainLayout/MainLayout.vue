<template>
  <MainLayoutHeader />
  <div class="min-h-(--page-height)" :class="route.meta.lightBg ? 'bg-light-50' : 'bg-white'">
    <main class="mx-auto max-w-screen-xl py-5 px-4 2xl:px-0">
      <router-view></router-view>
    </main>
  </div>
  <MainLayoutFooter />
</template>

<script setup lang="ts">
import MainLayoutHeader from './_components/MainLayoutHeader.vue'
import MainLayoutFooter from './_components/MainLayoutFooter.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
</script>
