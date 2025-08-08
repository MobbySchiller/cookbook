<template>
  <div class="bg-white rounded-md px-8 py-8 mx-auto max-w-[800px] shadow-sm">
    <CSearchField v-model="searchPhrase" />
    <div class="flex justify-center gap-2 mt-3">
      <teamplate v-for="item in mealTypes" :key="`${item.name}`">
        <CSearchChip
          :label="item.name"
          :isActive="item.id === selectedMealType"
          @click="handleChip(item.id)"
        />
      </teamplate>
    </div>
  </div>
</template>

<script setup lang="ts">
import CSearchField from './_components/CSearchField.vue'
import CSearchChip from './_components/CSearchChip.vue'

const searchPhrase = defineModel<string>()
const selectedMealType = defineModel<number | null>('mealType')

const emit = defineEmits(['onSubmit'])

const mealTypes = [
  { id: null, name: 'wszystko' },
  { id: 1, name: 'śniadanie' },
  { id: 2, name: 'obiad' },
  { id: 3, name: 'kolacja' },
  { id: 4, name: 'deser' },
]

function handleChip(id: number | null) {
  selectedMealType.value = id
  emit('onSubmit')
}
</script>
