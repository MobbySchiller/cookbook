<template>
  <h2 class="mt-8 mb-4 font-serif text-2xl">{{ title }}</h2>

  <div class="flex justify-center xl:mx-0">
    <div class="grid grid-cols-12 gap-6">
      <CRecipeCard
        v-for="recipe in recipes"
        :key="recipe.id"
        :recipe
        class="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3"
      />
    </div>
  </div>
  <div class="mt-2 text-center">
    <router-link
      :to="{ name: 'RecipesSearch', query: { mealTypeId } }"
      class="text-right text-sm text-accent hover:text-accent-700"
      >zobacz więcej</router-link
    >
  </div>
</template>

<script setup lang="ts">
import type { Recipe, RecipesMealTypes } from '@/api/Recipes'
import CRecipeCard from '@/components/CRecipeCard/CRecipeCard.vue'

defineProps<{ title: string; recipes: Recipe[]; mealTypeId: RecipesMealTypes }>()
</script>
