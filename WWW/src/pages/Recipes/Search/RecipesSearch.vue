<template>
  <form @submit.prevent="onSubmit" novalidate>
    <CSearchBar v-model="searchPhrase" v-model:mealType="selectedMealType" />
  </form>

  <h2 v-if="!isLoading" class="mt-8 mb-3 font-serif text-2xl">
    {{ searchedRecipes.length ? 'Wyniki wyszukiwania' : 'Nie znaleziono przepisów' }}
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

  <div v-if="isLoading" class="flex justify-center my-6">
    <CLoader />
  </div>
  <div ref="loadMoreTrigger" class="h-8"></div>
</template>

<script setup lang="ts">
import { RecipesService, type Recipe } from '@/api/Recipes'
import CLoader from '@/components/CLoader/CLoader.vue'
import CRecipeCard from '@/components/CRecipeCard/CRecipeCard.vue'
import CSearchBar from '@/components/CSearchBar/CSearchBar.vue'
import { onMounted, ref, watch, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAlert } from '@/composables/useAlert'

const alert = useAlert()
const route = useRoute()
const router = useRouter()

const searchPhrase = ref<string>('')
const selectedMealType = ref<number | undefined>(undefined)
const searchedRecipes = ref<Recipe[]>([])
const page = ref<number>(1)
const limit = 12
const totalPages = ref<number>(1)
const isLoading = ref(true)

const loadMoreTrigger = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

function setQueryParams(searchPhrase: string, mealTypeId: number | undefined) {
  const query: Record<string, string | number> = {}
  if (searchPhrase) query.searchPhrase = searchPhrase
  if (mealTypeId !== undefined) query.mealTypeId = mealTypeId

  router.replace({ name: 'RecipesSearch', query })
}

async function onSubmit() {
  page.value = 1
  searchedRecipes.value = []
  await searchRecipes(searchPhrase.value, selectedMealType.value)
}

async function searchRecipes(searchPhrase: string, mealTypeId: number | undefined) {
  try {
    isLoading.value = true
    const response = await RecipesService.search({
      name: searchPhrase,
      mealTypeId,
      limit,
      page: page.value,
    })

    if (page.value === 1) {
      searchedRecipes.value = response.data
    } else {
      searchedRecipes.value.push(...response.data)
    }

    totalPages.value = response.pagination.totalPages
    setQueryParams(searchPhrase, mealTypeId)
  } catch (err) {
    alert.show('danger', err.response.data.message)
  } finally {
    isLoading.value = false
  }
}

function setupIntersectionObserver() {
  if (observer) observer.disconnect()
  observer = new IntersectionObserver(async (entries) => {
    const [entry] = entries
    if (entry.isIntersecting && page.value < totalPages.value) {
      page.value++
      await searchRecipes(searchPhrase.value, selectedMealType.value)
    }
  })
  if (loadMoreTrigger.value) observer.observe(loadMoreTrigger.value)
}

onMounted(async () => {
  searchPhrase.value = route.query.searchPhrase as string
  selectedMealType.value = route.query.mealTypeId ? Number(route.query.mealTypeId) : undefined

  await searchRecipes(searchPhrase.value, selectedMealType.value)
  setupIntersectionObserver()
})

onUnmounted(() => {
  if (observer) observer.disconnect()
})
</script>
