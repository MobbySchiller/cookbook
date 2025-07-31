export interface RecipesSearchRequest {
  name?: string
  mealTypeId?: number
}

export interface RecipesCreateRequest {
  name: string
  description: string
  prepTimeMin?: number
  servings?: number
  image: File | null
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
}
