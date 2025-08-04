<template>
  <div class="bg-white mb-4 px-6 py-6">
    <!-- <div class="text-3xl font-semibold py-5 text-center font-serif">{{ recipe?.name }}</div> -->
    <div class="grid grid-cols-12 gap-4 divide-x divide-dark-100">
      <div class="col-span-12 md:col-span-6">
        <!-- <div class="w-full aspect-[1/1] overflow-hidden ">
          <img :src="recipe.imageUrl" alt="Opis" class="object-cover w-full h-full" />
        </div> -->
        <div>{{ recipe.name }}</div>
      </div>
      <div class="col-span-12 md:col-span-6">
        <div>Rodzaj posiłku: {{ recipe.mealType }}</div>
        <div>Czas przygotowania: {{ recipe.prepTimeMin }} min</div>
        <div>Ilość porcji: {{ recipe.servings }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Recipe } from '@/api/Recipes'

defineProps<{ recipe: Recipe }>()
</script>
