<template>
  <MainRecipeCard />
  <h2 class="mt-10 mb-4 text-center font-serif text-2xl">Przepisy</h2>
  <div class="flex justify-center mx-4 xl:mx-0">
    <div class="grid grid-cols-12 gap-6">
      <CRecipeCard class="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3" />
      <CRecipeCard class="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3" />
      <CRecipeCard class="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3" />
      <CRecipeCard class="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3" />
      <CRecipeCard class="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3" />
      <CRecipeCard class="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3" />
      <CRecipeCard class="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3" />
      <CRecipeCard class="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3" />
    </div>
  </div>
  <div class="flex justify-center mt-8">
    <RouterLink :to="{ name: 'RecipesSearch' }">
      <CButtonPrimary>Wyszukaj innych przepisów</CButtonPrimary>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { RecipesService } from '@/api/Recipes'
import MainRecipeCard from './_components/MainRecipeCard.vue'
import CRecipeCard from '@/components/CRecipeCard/CRecipeCard.vue'
import CButtonPrimary from '@/components/CButton/CButtonPrimary.vue'
import { RouterLink } from 'vue-router'

onMounted(async () => {
  await RecipesService.search()
})
</script>
