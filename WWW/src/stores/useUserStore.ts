import { defineStore } from 'pinia'
import { ref } from 'vue'
import { AuthService } from '@/api/Auth'
import { FavouritesService } from '@/api/Favourites'
import { RecipesService } from '@/api/Recipes'

export const useUserStore = defineStore('user', () => {
  const user = ref()
  const isCurrentFetched = ref<boolean>(false)
  const favoutiteIds = ref<number[]>()
  const userRecipeIds = ref<number[]>()

  async function fetchCurrent() {
    if (isCurrentFetched.value) return
    try {
      const response = await AuthService.current()
      user.value = response
      await Promise.all([fetchUserRecipeIds(), fetchFavouriteIds()])
    } catch (err) {
      console.log(err)
    } finally {
      isCurrentFetched.value = true
    }
  }

  function isInFavourites(id: number) {
    return favoutiteIds.value?.includes(id)
  }

  async function fetchFavouriteIds() {
    try {
      favoutiteIds.value = await FavouritesService.getFavouriteRecipeIds()
    } catch (err) {
      console.log(err)
    }
  }
  async function fetchUserRecipeIds() {
    try {
      userRecipeIds.value = await RecipesService.getUserRecipeIds()
    } catch (err) {
      console.log(err)
    }
  }

  return {
    user,
    fetchCurrent,
    fetchFavouriteIds,
    isInFavourites,
  }
})
