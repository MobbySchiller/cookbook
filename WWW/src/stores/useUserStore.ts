import { defineStore } from 'pinia'
import { ref } from 'vue'
import { AuthService, type User } from '@/api/Auth'
import { FavouritesService } from '@/api/Favourites'
import { RecipesService } from '@/api/Recipes'

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>()
  const isCurrentFetched = ref<boolean>(false)
  const favoutiteIds = ref<number[]>()
  const userRecipeIds = ref<number[]>()

  async function fetchCurrent() {
    if (isCurrentFetched.value) return
    try {
      const response = await AuthService.current()
      user.value = response
      isCurrentFetched.value = true
      await Promise.all([fetchUserRecipeIds(), fetchFavouriteIds()])
    } catch (err) {
      console.log(err)
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
  async function logout() {
    try {
      await AuthService.logout()
      user.value = null
      isCurrentFetched.value = false
    } catch (err) {
      console.log(err)
    }
  }

  return {
    user,
    fetchCurrent,
    fetchFavouriteIds,
    isInFavourites,
    logout,
  }
})
