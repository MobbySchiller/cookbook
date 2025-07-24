<template>
  <div>test2</div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { RecipesService } from '@/api/Recipes'

onMounted(async () => {
  await RecipesService.search()
})
</script>
