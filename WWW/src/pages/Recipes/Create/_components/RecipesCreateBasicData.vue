<template>
  <h2 class="text-2xl font-semibold font-serif mb-3">1. Uzupełnij dane podstawowe</h2>
  <div class="grid grid-cols-12 gap-y-4 gap-x-10 mx-auto">
    <div class="grid grid-cols-12 gap-4 col-span-12 lg:col-span-7">
      <CInput
        v-model="model.name"
        ref="nameRef"
        class="col-span-12"
        label="Nazwa potrawy"
        id="name"
        type="text"
        :rules="[required]"
      />
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
    </div>
    <CDropzone v-model="model.image" class="col-span-12 lg:col-span-5 mt-6" />
  </div>
</template>

<script setup lang="ts">
import type { RecipesCreateRequest } from '@/api/Recipes'
import { useValidation } from '@/composables/useValidation'
import CDropzone from '@/components/CDropzone/CDropzone.vue'

const { required } = useValidation()

const model = defineModel<RecipesCreateRequest>({ required: true })
</script>
