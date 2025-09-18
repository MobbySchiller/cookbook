<template>
  <div class="px-4">
    <div class="mt-8"><RecipesCreateBasicData v-model="model as RecipesCreateRequest" /></div>

    <div class="mt-14">
      <RecipesCreateIngredients v-model="model as RecipesCreateRequest" />
    </div>
    <div class="mt-14">
      <RecipesCreateSteps v-model="model as RecipesCreateRequest" />
    </div>
    <CButtonAccent :loading class="mt-6" @click="submit">Zapisz</CButtonAccent>
  </div>
</template>

<script setup lang="ts">
import type { RecipesCreateRequest } from '@/api/Recipes'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useValidation } from '@/composables/useValidation'
import RecipesCreateBasicData from './_components/RecipesCreateBasicData.vue'
import RecipesCreateIngredients from './_components/RecipesCreateIngredients.vue'
import RecipesCreateSteps from './_components/RecipesCreateSteps.vue'
import { RecipesService } from '@/api/Recipes'
import CButtonAccent from '@/components/CButton/CButtonAccent.vue'
import { useAlert } from '@/composables/useAlert'

const alert = useAlert()
const route = useRoute()
const router = useRouter()

const id = route.params.id as string
const loading = ref<boolean>(false)

const model = ref<Partial<RecipesCreateRequest>>({
  name: '',
  description: '',
  image: null,
  ingredients: [{ name: '', quantity: undefined }],
  steps: [{ stepNumber: 1, title: '', description: '' }],
  mealTypeId: null,
})

async function submit() {
  try {
    loading.value = true
    let recipeId = id
    if (!!id) {
      await RecipesService.edit(id, model.value)
      alert.show('success', 'Pomyślnie edytowano przepis')
    } else {
      const response = await RecipesService.create(model.value)
      recipeId = response[0].recipe_id
      alert.show('success', 'Pomyślnie utworzono przepis')
    }
    setTimeout(() => router.push({ name: 'Recipe', params: { id: recipeId } }), 1200)
  } catch (err) {
    alert.show('danger', err.response.data.message)
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  if (id) {
    const response = await RecipesService.getRecipe(id as string)
    const { author, imageUrl, mealType, ...rest } = response
    model.value = rest
  }
})
</script>
