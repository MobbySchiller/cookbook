<template>
  <div class="bg-white mb-4 px-6 py-6 rounded-md">
    <div class="grid grid-cols-12 gap-6 md:gap-10 items-start">
      <!-- Zdjęcie -->
      <div class="col-span-12 md:col-span-4">
        <div class="aspect-[3/2] overflow-hidden rounded">
          <img :src="recipe.imageUrl" alt="Opis" class="object-cover w-full h-full" />
        </div>
      </div>

      <!-- Treść + przyciski -->
      <div class="col-span-12 md:col-span-8 flex flex-col">
        <!-- Przyciski – zawsze w jednym wierszu, wyrównane do prawej -->
        <div class="flex justify-end gap-3 mb-3">
          <RouterLink :to="{ name: 'RecipesEdit', params: { id: recipe.id } }">
            <SquarePen class="w-5 h-5 text-dark-500 mt-0.75" />
          </RouterLink>
          <button class="cursor-pointer" @click="onDelete">
            <Trash class="w-5 h-5 text-red-700" />
          </button>
          <CFavouriteButton :recipeId="recipe.id" />
        </div>

        <!-- Treść -->
        <div>
          <div class="text-2xl font-serif">{{ recipe.name }}</div>
          <div class="text-sm text-dark-300">Autor: {{ recipe.author.username }}</div>

          <div class="text-sm mt-6 space-y-2">
            <div class="flex items-center gap-2">
              <Utensils class="w-5 h-5 text-dark-500" />
              <span class="text-dark-500">{{ recipe.mealType }}</span>
            </div>

            <div class="flex items-center gap-2">
              <Clock class="w-5 h-5 text-dark-500" />
              <span class="text-dark-500">{{ recipe.prepTimeMin }} min</span>
            </div>

            <div class="flex items-center gap-2">
              <Users class="w-5 h-5 text-dark-500" />
              <span class="text-dark-500">{{ recipe.servings }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Utensils, Clock, Users, SquarePen, Trash } from 'lucide-vue-next'
import { RecipesService, type Recipe } from '@/api/Recipes'
import CFavouriteButton from '@/components/CButton/CFavouriteButton.vue'
import { useRouter } from 'vue-router'
import { useAlert } from '@/composables/useAlert'

const alert = useAlert()
const router = useRouter()

const props = defineProps<{ recipe: Recipe }>()

async function onDelete() {
  try {
    await RecipesService.delete(props.recipe.id)
    alert.show('success', 'Pomyślnie usunięto przepis')
    router.push({ name: 'Home' })
  } catch (err) {
    alert.show('danger', err.response?.data?.message || 'Błąd podczas usuwania przepisu')
  }
}
</script>
