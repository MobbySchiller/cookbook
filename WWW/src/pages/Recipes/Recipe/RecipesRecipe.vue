<template>
  <div>id przepisu: {{ id }}</div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

const id = route.params.id
</script>
