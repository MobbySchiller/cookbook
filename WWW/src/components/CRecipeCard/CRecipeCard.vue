<template>
  <div class="w-full max-w-sm">
    <RouterLink :to="{ name: 'Recipe', params: { id: recipe.id } }">
      <div class="w-full aspect-[3/2] overflow-hidden rounded-md">
        <img
          :src="recipe.imageUrl"
          alt="Opis"
          class="object-cover w-full h-full rounded-md hover:scale-105 transition-scale duration-400"
        />
      </div>
    </RouterLink>
    <div class="flex justify-between mt-2">
      <RouterLink :to="{ name: 'Recipe', params: { id: recipe.id } }">
        <div>
          <p class="text-xs text-dark-300">{{ recipe.mealType }}</p>
          <p class="text-md font-semibold">{{ recipe.name }}</p>
        </div>
      </RouterLink>
      <CFavouriteButton :recipeId="recipe.id" />
    </div>

    <div class="mt-2">
      <RouterLink :to="{ name: 'Recipe', params: { id: recipe.id } }">
        <p class="text-xs text-dark-300 flex items-center gap-2">
          <Clock class="w-4 h-4" /> <span>{{ recipe.prepTimeMin }} min.</span>
        </p>
        <p class="text-xs text-dark-300 flex items-center gap-2 mt-1">
          <Users class="w-4 h-4" /> <span>{{ recipe.servings }}</span>
        </p>
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import heart_filled from '@/assets/icons/heart_filled.svg'
import heart_outlined from '@/assets/icons/heart_outlined.svg'
import type { Recipe } from '@/api/Recipes'
import { FavouritesService } from '@/api/Favourites'
import CFavouriteButton from '@/components/CButton/CFavouriteButton.vue'
import { useUserStore } from '@/stores/useUserStore'
import { Clock, Users } from 'lucide-vue-next'

const { user, isInFavourites, fetchFavouriteIds } = useUserStore()
const props = defineProps<{ recipe: Recipe }>()

const isAddedToFavourites = computed(() => isInFavourites(props.recipe.id))

async function toggleFavourites() {
  if (isAddedToFavourites.value) {
    await FavouritesService.removeFromFavourites(props.recipe.id)
  } else {
    await FavouritesService.addToFavourites(props.recipe.id)
  }
  await fetchFavouriteIds()
}
</script>
