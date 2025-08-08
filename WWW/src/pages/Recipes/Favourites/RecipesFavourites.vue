<template>
  <h2 class="mt-10 mb-4 font-serif text-2xl">Ulubione przepisy</h2>

  <div class="flex justify-center mx-4 xl:mx-0">
    <div class="grid grid-cols-12 gap-6">
      <CRecipeCard
        v-for="recipe in recipes"
        :key="recipe.id"
        :recipe
        class="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Recipe } from '@/api/Recipes'
import CRecipeCard from '@/components/CRecipeCard/CRecipeCard.vue'
import { onMounted, ref } from 'vue'

import { FavouritesService } from '@/api/Favourites'

const recipes = ref<Recipe[]>()

async function fetchFavouritesRecipes() {
  const response = await FavouritesService.getFavouriteRecipes()
  recipes.value = response.data
}

onMounted(async () => {
  await fetchFavouritesRecipes()
})
</script>
