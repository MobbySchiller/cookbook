export interface RecipesSearchRequest {
  name?: string
  mealTypeId?: number
  page?: number
  limit?: number
}

export interface RecipesCreateRequest {
  name: string
  description: string
  prepTimeMin: number | null
  servings: number | null
  image?: File | null
  ingredients: RecipeIngredient[]
  steps: RecipeStep[]
  mealTypeId: number | null
}

export interface RecipeIngredient {
  name: string
  quantity?: number
}

export interface RecipeStep {
  stepNumber: number
  title: string
  description: string
}

export interface Recipe {
  id: number
  name: string
  description: string
  prepTimeMin: number
  servings: number
  imageUrl?: string
  ingredients: RecipeIngredient[]
  steps: RecipeStep[]
  mealType: string
  mealTypeId: number
  author: { username: string }
}

export interface RecipePagination {
  currentPage: number
  limit: number
  totalItems: number
  totalPages: number
}

export interface RecipeSearchResponse {
  data: Recipe[]
  pagination: RecipePagination
}

export enum RecipesMealTypes {
  BREAKFAST = 1,
  DINNER,
  SUPPER,
  DESSERT,
}
