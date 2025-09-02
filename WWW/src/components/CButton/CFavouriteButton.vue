<template>
  <button v-if="user" @click.stop="toggleFavourites" class="self-start cursor-pointer">
    <img :src="isAddedToFavourites ? heart_filled : heart_outlined" />
  </button>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import heart_filled from '@/assets/icons/heart_filled.svg'
import heart_outlined from '@/assets/icons/heart_outlined.svg'
import { FavouritesService } from '@/api/Favourites'

import { useUserStore } from '@/stores/useUserStore'

const { user, isInFavourites, fetchFavouriteIds } = useUserStore()
const props = defineProps<{ recipeId: number }>()

const isAddedToFavourites = computed(() => isInFavourites(props.recipeId))

async function toggleFavourites() {
  if (isAddedToFavourites.value) {
    await FavouritesService.removeFromFavourites(props.recipeId)
  } else {
    await FavouritesService.addToFavourites(props.recipeId)
  }
  await fetchFavouriteIds()
}
</script>
