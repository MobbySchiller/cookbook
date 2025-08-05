<template>
  <div class="my-2">
    <HomeMealTypeSection
      title="Śniadanie"
      :recipes="recipesBreakfast"
      :mealTypeId="RecipesMealTypes.BREAKFAST"
    />
    <HomeMealTypeSection
      title="Obiad"
      :recipes="recipesDinner"
      :mealTypeId="RecipesMealTypes.DINNER"
    />
    <HomeMealTypeSection
      title="Kolacja"
      :recipes="recipesSupper"
      :mealTypeId="RecipesMealTypes.SUPPER"
    />
    <HomeMealTypeSection
      title="Deser"
      :recipes="recipesDessert"
      :mealTypeId="RecipesMealTypes.DESSERT"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RecipesMealTypes, RecipesService, type Recipe } from '@/api/Recipes'
import MainRecipeCard from './_components/MainRecipeCard.vue'
import CRecipeCard from '@/components/CRecipeCard/CRecipeCard.vue'
import CButtonPrimary from '@/components/CButton/CButtonPrimary.vue'
import { RouterLink } from 'vue-router'
import HomeMealTypeSection from './_components/HomeMealTypeSection.vue'

const recipes = ref<Recipe[]>([])

const recipesBreakfast = ref<Recipe[]>([])
const recipesDinner = ref<Recipe[]>([])
const recipesSupper = ref<Recipe[]>([])
const recipesDessert = ref<Recipe[]>([])

async function fetchBreakfast() {
  const response = await RecipesService.search({ mealTypeId: RecipesMealTypes.BREAKFAST, limit: 4 })
  recipesBreakfast.value = response.data
}
async function fetchDinner() {
  const response = await RecipesService.search({ mealTypeId: RecipesMealTypes.DINNER, limit: 4 })
  recipesDinner.value = response.data
}
async function fetchSupper() {
  const response = await RecipesService.search({ mealTypeId: RecipesMealTypes.SUPPER, limit: 4 })
  recipesSupper.value = response.data
}
async function fetchDessert() {
  const response = await RecipesService.search({ mealTypeId: RecipesMealTypes.DESSERT, limit: 4 })
  recipesDessert.value = response.data
}

onMounted(async () => {
  await Promise.all([fetchBreakfast(), fetchDinner(), fetchSupper(), fetchDessert()])
})
</script>
