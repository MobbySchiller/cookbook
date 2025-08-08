<template>
  <form @submit.prevent="onSubmit">
    <CSearchBar v-model="searchPhrase" v-model:mealType="selectedMealType" @onSubmit="onSubmit" />
  </form>
  <div>test123</div>
</template>

<script setup lang="ts">
import CSearchBar from '@/components/CSearchBar/CSearchBar.vue'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const searchPhrase = ref<string>('')
const selectedMealType = ref<number | null>(null)

function onSubmit() {
  console.log('test')
}

onMounted(() => {
  searchPhrase.value = route.query.searchPhrase as string
  selectedMealType.value = Number(route.query.mealTypeId)
})
</script>
