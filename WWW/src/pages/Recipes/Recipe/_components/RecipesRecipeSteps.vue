<template>
  <div class="bg-white px-6 py-6 relative paper rounded-md">
    <h2 class="font-serif mb-3 text-xl font-semibold">Przygotowanie</h2>
    <table class="w-full table-fixed">
      <tr v-for="(step, index) in steps" :key="`${step.title}_${step.stepNumber}`">
        <td class="w-[52px] shrink-0 pr-2 pb-5 align-top">
          <RecipesRecipeStepNo :stepNo="index + 1" />
        </td>
        <td class="pb-5 align-top">
          <div class="font-medium mb-1">{{ step.title }}</div>
          <div class="text-sm text-dark-300">{{ step.description }}</div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script setup lang="ts">
import type { RecipeStep } from '@/api/Recipes'
import RecipesRecipeStepNo from './RecipesRecipeStepNo.vue'

defineProps<{ steps: RecipeStep[] }>()
</script>
