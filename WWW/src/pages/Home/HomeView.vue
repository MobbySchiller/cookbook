<template>
  <form @submit.prevent="onSubmit" novalidate>
    <CSearchBar v-model="searchPhrase" v-model:mealType="selectedMealType" @onSubmit="onSubmit" />
  </form>
  <HomeMealTypeSection
    title="Śniadanie"
    :recipes="recipesBreakfast"
    :mealTypeId="RecipesMealTypes.BREAKFAST"
    :isLoading
  />
  <HomeMealTypeSection
    title="Obiad"
    :recipes="recipesDinner"
    :mealTypeId="RecipesMealTypes.DINNER"
    :isLoading
  />
  <HomeMealTypeSection
    title="Kolacja"
    :recipes="recipesSupper"
    :mealTypeId="RecipesMealTypes.SUPPER"
    :isLoading
  />
  <HomeMealTypeSection
    title="Deser"
    :recipes="recipesDessert"
    :mealTypeId="RecipesMealTypes.DESSERT"
    :isLoading
  />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RecipesMealTypes, RecipesService, type Recipe } from '@/api/Recipes'
import HomeMealTypeSection from './_components/HomeMealTypeSection.vue'
import CSearchBar from '@/components/CSearchBar/CSearchBar.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const searchPhrase = ref<string>('')
const selectedMealType = ref<number | null>(null)
const recipesBreakfast = ref<Recipe[]>([])
const recipesDinner = ref<Recipe[]>([])
const recipesSupper = ref<Recipe[]>([])
const recipesDessert = ref<Recipe[]>([])
const isLoading = ref<boolean>(false)

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

function onSubmit() {
  const query: Record<string, string | number> = {}

  if (searchPhrase.value.trim() !== '') {
    query.searchPhrase = searchPhrase.value
  }

  if (selectedMealType.value !== null) {
    query.mealTypeId = selectedMealType.value
  }

  router.push({
    name: 'RecipesSearch',
    query,
  })
}

onMounted(async () => {
  try {
    isLoading.value = true
    await Promise.all([fetchBreakfast(), fetchDinner(), fetchSupper(), fetchDessert()])
  } finally {
    isLoading.value = false
  }
})
</script>
