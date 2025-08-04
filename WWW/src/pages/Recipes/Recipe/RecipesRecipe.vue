<template>
  <div class="pt-4">
    <RecipesRecipeHeader :recipe />
  </div>
  <!-- <div class="grid grid-cols-12 md:bg-light rounded-md">
    <div class="col-span-12 md:col-span-6 order-last md:order-first bg-light rounded-md">
      {{ recipe?.name }}
    </div>
    <div class="col-span-12 md:col-span-6">
      <img
        :src="recipe?.imageUrl"
        :alt="`Zdjęcie potrawy ${recipe?.name}`"
        class="object-cover aspect-[3/2] rounded-md mx-auto md:mx-0 md:ml-auto"
      />
    </div>
  </div> -->
  <div class="grid grid-cols-12 gap-4">
    <div class="col-span-12 md:col-span-6 lg:col-span-5 xl:col-span-4">
      <RecipesRecipeIngredients :ingredients="recipe?.ingredients" />
    </div>
    <div class="col-span-12 md:col-span-6 lg:col-span-7 xl:col-span-8">
      <RecipesRecipeSteps :steps="recipe?.steps" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { RecipesService, type Recipe } from '@/api/Recipes'
import RecipesRecipeSteps from './_components/RecipesRecipeSteps.vue'
import RecipesRecipeIngredients from './_components/RecipesRecipeIngredients.vue'
import RecipesRecipeHeader from './_components/RecipesRecipeHeader.vue'

const route = useRoute()

const id = route.params.id

const recipe = ref<Recipe>()

onMounted(async () => {
  recipe.value = await RecipesService.getRecipe(id as string)
})
</script>
