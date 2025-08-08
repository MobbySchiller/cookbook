import api from '@/boot/axios'
import type { RecipeSearchResponse } from '../Recipes'

export const FavouritesService = {
  addToFavourites: async (recipeId: number): Promise<void> => {
    const response = await api.post('/favourites', { recipeId })
    return response.data
  },

  removeFromFavourites: async (recipeId: number): Promise<void> => {
    const response = await api.delete(`/favourites/${recipeId}`)
    return response.data
  },

  getFavouriteRecipes: async (): Promise<RecipeSearchResponse> => {
    const response = await api.get('/favourites')
    return response.data
  },

  getFavouriteRecipeIds: async (): Promise<number[]> => {
    const response = await api.get('/favourites/ids')
    return response.data
  },
}
