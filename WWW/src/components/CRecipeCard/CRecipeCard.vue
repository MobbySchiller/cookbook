<template>
  <div class="w-full max-w-sm">
    <RouterLink :to="{ name: 'Recipe', params: { id } }">
      <div class="w-full aspect-[3/2] overflow-hidden">
        <img :src="recipe.imageUrl" alt="Opis" class="object-cover w-full h-full rounded-md" />
      </div>
    </RouterLink>
    <div class="flex justify-between mt-2">
      <RouterLink :to="{ name: 'Recipe', params: { id } }">
        <div>
          <p class="text-xs text-dark-300">{{ recipe.mealType }}</p>
          <p class="text-md font-semibold">{{ recipe.name }}</p>
        </div>
      </RouterLink>
      <button @click.stop="toggleHeart" class="self-start cursor-pointer">
        <img :src="isAddedToFavourite ? heart_filled : heart_outlined" />
      </button>
    </div>

    <div class="mt-1">
      <RouterLink :to="{ name: 'Recipe', params: { id } }">
        <p class="text-xs text-dark-300">
          Czas przygotowania: <span>{{ recipe.prepTimeMin }} min.</span>
        </p>
        <p class="text-xs text-dark-300">
          Liczba porcji: <span>{{ recipe.servings }}</span>
        </p>
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import heart_filled from '@/assets/icons/heart_filled.svg'
import heart_outlined from '@/assets/icons/heart_outlined.svg'
import type { Recipe } from '@/api/Recipes'

const isAddedToFavourite = ref<boolean>(false)

defineProps<{ recipe: Recipe }>()

const id = 2

function toggleHeart() {
  isAddedToFavourite.value = !isAddedToFavourite.value
}
</script>
