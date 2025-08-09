<template>
  <div class="px-4">
    <div class="mt-8"><RecipesCreateBasicData v-model="model" /></div>

    <div class="mt-8">
      <RecipesCreateIngredients v-model="model" />
    </div>
    <div class="mt-8">
      <RecipesCreateSteps v-model="model" />
    </div>
    <button @click="submit">Submit</button>
  </div>
</template>

<script setup lang="ts">
import type { RecipesCreateRequest } from '@/api/Recipes'
import { ref } from 'vue'
import { useValidation } from '@/composables/useValidation'
import RecipesCreateBasicData from './_components/RecipesCreateBasicData.vue'
import RecipesCreateIngredients from './_components/RecipesCreateIngredients.vue'
import RecipesCreateSteps from './_components/RecipesCreateSteps.vue'
import { RecipesService } from '@/api/Recipes'

const { required } = useValidation()

const model = ref<RecipesCreateRequest>({
  name: '',
  description: '',
  prepTimeMin: 0,
  servings: 0,
  image: null,
  ingredients: [{ name: '', quantity: undefined }],
  steps: [{ stepNumber: 1, title: '', description: '' }],
  mealTypeId: null,
})

async function submit() {
  await RecipesService.create(model.value)
}
</script>
