<template>
  <h2 class="col-span-12 text-2xl font-semibold font-serif mb-3">3. Wypisz kroki gotowania</h2>
  <div class="grid grid-cols-12 gap-y-6 gap-x-8 mx-auto">
    <div class="col-span-12 lg:col-span-7">
      <div
        v-for="(step, index) in model.steps"
        :key="index"
        class="bg-white rounded-xl p-5 mb-4 border border-gray-300"
      >
        <div class="flex items-start gap-4">
          <div class="text-lg font-bold w-6">{{ step.stepNumber }}.</div>
          <div class="flex-1 space-y-3">
            <CInput v-model="step.title" placeholder="Nazwa kroku (np. Przygotuj ciasto)" />
            <CTextarea
              v-model="step.description"
              placeholder="Opis (np. Wymieszaj wszystkie suche składniki...)"
            />
          </div>
          <CButtonPrimary size="sm" variant="danger" @click="deleteStep(index)"
            >Usuń</CButtonPrimary
          >
        </div>
      </div>
      <div class="text-center mt-4">
        <RecipesCreateAddNewBtn @click="addNewStep(model.steps.length + 1)"
          >+ Dodaj krok</RecipesCreateAddNewBtn
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { RecipesCreateRequest } from '@/api/Recipes'
import RecipesCreateAddNewBtn from './RecipesCreateAddNewBtn.vue'
import { watch } from 'vue'
import CTextarea from '@/components/CInput/CTextarea.vue'

const model = defineModel<RecipesCreateRequest>({ required: true })

function addNewStep(stepNo: number) {
  model.value.steps.push({ stepNumber: stepNo, title: '', description: '' })
}

function deleteStep(index: number) {
  model.value.steps.splice(index, 1)
}

watch(
  () => model.value.steps.length,
  (newVal) => {
    for (let i = 0; i < newVal; i++) {
      model.value.steps[i].stepNumber = i + 1
    }
  },
)
</script>
