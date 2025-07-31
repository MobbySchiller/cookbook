import api from '@/boot/axios'
import type { CookbookDictionaryItem } from '../Cookbook'

export const MealTypesService = {
  get: async (): Promise<CookbookDictionaryItem[]> => {
    const response = await api.get('/meal-types')
    return response.data
  },
}
