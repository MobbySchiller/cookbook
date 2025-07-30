<template>
  <h2 class="col-span-12 text-2xl font-semibold font-serif mb-3">2. Podaj składniki</h2>
  <div class="grid grid-cols-12 gap-y-6 gap-x-8 mx-auto">
    <div class="col-span-12 lg:col-span-6">
      <table class="w-full text-sm border-collapse">
        <thead>
          <tr>
            <th class="py-2 text-left">#</th>
            <th class="py-2 text-left">Nazwa składnika</th>
            <th class="py-2 pl-4 text-left">Ilość</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(ingredient, index) in model.ingredients" :key="index">
            <td class="text-lg font-bold w-6">{{ index + 1 }}.</td>
            <td class="py-2">
              <CInput v-model="ingredient.name" placeholder="np. Mąka pszenna" />
            </td>
            <td class="py-2 pl-4">
              <CInput v-model="ingredient.quantity" placeholder="np. 200g" />
            </td>
            <td class="py-2 pl-4 text-right">
              <CButtonPrimary size="sm" variant="danger" @click="deleteIngredient(index)"
                >Usuń</CButtonPrimary
              >
            </td>
          </tr>
          <tr>
            <td></td>
            <td colspan="3" class="pt-4 text-center">
              <RecipesCreateAddNewBtn @click="addNewIngredient"
                >+ Dodaj składnik</RecipesCreateAddNewBtn
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { RecipesCreateRequest } from '@/api/Recipes'
import { useValidation } from '@/composables/useValidation'
import RecipesCreateAddNewBtn from './RecipesCreateAddNewBtn.vue'

const { required } = useValidation()

const model = defineModel<RecipesCreateRequest>({ required: true })

function addNewIngredient() {
  model.value.ingredients.push({ name: '', quantity: undefined })
}

function deleteIngredient(index: number) {
  model.value.ingredients.splice(index, 1)
}
</script>
