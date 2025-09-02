<template>
  <form @submit.prevent="onSubmit" novalidate>
    <CSearchBar v-model="searchPhrase" v-model:mealType="selectedMealType" />
  </form>
  <h2 class="mt-8 mb-3 font-serif text-2xl">
    {{ searchedRecipes.length ? 'Wyniki wyszukiwania' : `Nie znaleziono przepisów` }}
  </h2>
  <div class="flex justify-center xl:mx-0">
    <div class="grid grid-cols-12 gap-6">
      <CRecipeCard
        v-for="recipe in searchedRecipes"
        :key="recipe.id"
        :recipe
        class="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { RecipesService, type Recipe } from '@/api/Recipes'
import CRecipeCard from '@/components/CRecipeCard/CRecipeCard.vue'
import CSearchBar from '@/components/CSearchBar/CSearchBar.vue'
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const searchPhrase = ref<string>('')
const selectedMealType = ref<number | undefined>(undefined)
const searchedRecipes = ref<Recipe[]>([])

function setQueryParams(searchPhrase: string, mealTypeId: number | undefined) {
  if (searchPhrase) {
    router.replace({ name: 'RecipesSearch', query: { searchPhrase, mealTypeId } })
  } else {
    router.replace({ name: 'RecipesSearch', query: { mealTypeId } })
  }
}

async function onSubmit() {
  await searchRecipes(searchPhrase.value, selectedMealType.value)
}

async function searchRecipes(searchPhrase: string, mealTypeId: number | undefined) {
  const response = await RecipesService.search({ name: searchPhrase, mealTypeId })
  searchedRecipes.value = response.data
  setQueryParams(searchPhrase, mealTypeId)
}

onMounted(async () => {
  searchPhrase.value = route.query.searchPhrase as string
  selectedMealType.value = route.query.mealTypeId ? Number(route.query.mealTypeId) : undefined

  await searchRecipes(searchPhrase.value, selectedMealType.value)
})
</script>
