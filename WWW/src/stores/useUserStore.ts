import { defineStore } from 'pinia'
import { ref } from 'vue'
import { AuthService } from '@/api/Auth'
import { FavouritesService } from '@/api/Favourites'

export const useUserStore = defineStore('user', () => {
  const user = ref()
  const isCurrentFetched = ref<boolean>(false)
  const favoutiteIds = ref<number[]>()

  async function fetchCurrent() {
    if (isCurrentFetched.value) return
    try {
      const response = await AuthService.current()
      user.value = response
      await fetchFavouriteIds()
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

  return {
    user,
    fetchCurrent,
    fetchFavouriteIds,
    isInFavourites,
  }
})
