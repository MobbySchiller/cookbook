import api from '@/boot/axios'
import type {
  Recipe,
  RecipesCreateRequest,
  RecipeSearchResponse,
  RecipesSearchRequest,
} from './RecipesTypes'

export const RecipesService = {
  search: async (data?: RecipesSearchRequest): Promise<RecipeSearchResponse> => {
    const response = await api.get('/recipes', { params: data })
    return response.data
  },
  create: async (data: RecipesCreateRequest): Promise<void> => {
    const formData = new FormData()

    formData.append('name', data.name)
    formData.append('description', data.description)
    formData.append('prepTimeMin', data.prepTimeMin.toString())
    formData.append('mealTypeId', data.mealTypeId.toString())
    formData.append('servings', data.servings.toString())
    formData.append('ingredients', JSON.stringify(data.ingredients))
    formData.append('steps', JSON.stringify(data.steps))

    if (data.image) {
      formData.append('image', data.image)
    }

    const response = await api.post('/recipes', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },
  getRecipe: async (id: string): Promise<Recipe> => {
    const response = await api.get(`/recipes/${id}`)
    return response.data
  },
}
