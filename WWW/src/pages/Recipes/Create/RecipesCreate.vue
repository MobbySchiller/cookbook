<template>
  <div class="grid grid-cols-12 gap-4 max-w-2xl mx-auto px-4">
    <!-- <div class="col-span-12"> -->
    <CInput
      v-model="model.name"
      ref="nameRef"
      class="col-span-12"
      label="Nazwa potrawy"
      id="name"
      type="text"
      :rules="[required]"
    />
    <!-- </div> -->
    <!-- <CInput
      v-model="model.description"
      ref="descriptionRef"
      class="mb-3"
      label="Opis"
      id="description"
      type="textarea"
      :rules="[required]"
    /> -->
    <CInput
      v-model="model.prepTimeMin"
      ref="prepTimeMinRef"
      class="col-span-12 sm:col-span-6"
      label="Czas przygotowania [min]"
      id="prepTimeMin"
      type="number"
      :rules="[required]"
    />
    <CInput
      v-model="model.servings"
      ref="servingsRef"
      class="col-span-12 sm:col-span-6"
      label="Ilość porcji"
      id="servings"
      type="number"
      :rules="[required]"
    />
    <CDropzone v-model="model.image" class="col-span-12" />
    <table class="w-full col-span-12">
      <tbody>
        <tr>
          <td colspan="2" class="font-semibold">Nazwa składnika</td>
          <td class="pl-4 font-semibold">Ilość</td>
          <td></td>
        </tr>
        <tr v-for="(ingredient, index) in model.ingredients">
          <td>{{ index + 1 }}.</td>
          <td class="pl-4 pt-3"><CInput v-model="ingredient.name" /></td>
          <td class="pl-4 pt-3"><CInput v-model="ingredient.quantity" /></td>
          <td class="pl-4 pt-3">
            <CButtonPrimary @click="deleteIngredient(index)">usuń</CButtonPrimary>
          </td>
        </tr>
        <tr>
          <td></td>
          <td colspan="2" class="pl-4 pt-3">
            <RecipesCreateAddNewBtn @click="addNewIngredient"
              >Dodaj kolejny składnik</RecipesCreateAddNewBtn
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import type { RecipesCreateRequest } from '@/api/Recipes'
import { ref } from 'vue'
import { useValidation } from '@/composables/useValidation'
import CDropzone from '@/components/CDropzone/CDropzone.vue'
import RecipesCreateAddNewBtn from './_components/RecipesCreateAddNewBtn.vue'

const { required } = useValidation()

const model = ref<RecipesCreateRequest>({
  name: '',
  description: '',
  prepTimeMin: 0,
  servings: 0,
  image: null,
  ingredients: [{ name: '', quantity: undefined }],
  steps: [{ stepNumber: 1, title: '', description: '' }],
})

function addNewIngredient() {
  model.value.ingredients.push({ name: '', quantity: undefined })
}

function deleteIngredient(index: number) {
  model.value.ingredients.splice(index, 1)
}
</script>
