<template>
  <CAlert />
  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import CAlert from '@/components/CAlert/CAlert.vue'
</script>
