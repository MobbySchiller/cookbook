import api from '@/boot/axios'
import type { RecipesSearchRequest } from './RecipesTypes'

export const RecipesService = {
  search: async (data?: RecipesSearchRequest): Promise<void> => {
    const response = await api.get('/recipes', { params: { data } })
    return response.data
  },
}
