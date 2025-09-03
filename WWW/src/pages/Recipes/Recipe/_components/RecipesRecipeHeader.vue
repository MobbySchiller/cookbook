<template>
  <div class="bg-white mb-4 px-6 py-6 rounded-md">
    <div class="grid grid-cols-12 gap-10 items-start">
      <div class="col-span-12 md:col-span-4 text-sm">
        <div class="aspect-[3/2] overflow-hidden rounded">
          <img :src="recipe.imageUrl" alt="Opis" class="object-cover w-full h-full" />
        </div>
      </div>

      <div class="w-full col-span-12 md:col-span-8 flex justify-between items-start">
        <div>
          <div class="text-2xl font-serif">{{ recipe.name }}</div>
          <div class="text-sm text-dark-300">Autor: {{ recipe.author.username }}</div>
          <div class="text-sm mt-6">
            <div class="text-sm mt-4 space-y-2">
              <!-- Rodzaj posiłku -->
              <div class="flex items-center gap-2">
                <Utensils class="w-5 h-5 text-dark-500" />
                <span class="text-dark-500">{{ recipe.mealType }}</span>
              </div>

              <!-- Czas przygotowania -->
              <div class="flex items-center gap-2">
                <Clock class="w-5 h-5 text-dark-500" />
                <span class="text-dark-500">{{ recipe.prepTimeMin }} min</span>
              </div>

              <!-- Ilość porcji -->
              <div class="flex items-center gap-2">
                <Users class="w-5 h-5 text-dark-500" />
                <span class="text-dark-500">{{ recipe.servings }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="flex gap-3">
          <RouterLink class="mt-0.75" :to="{ name: 'RecipesEdit', params: { id: recipe.id } }"
            ><SquarePen class="w-5 h-5 text-dark-500"
          /></RouterLink>
          <button class="cursor-pointer" @click="onDelete">
            <Trash class="w-5 h-5 text-red-700" />
          </button>
          <CFavouriteButton :recipeId="recipe.id" />
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
    alert.show('danger', err.response.data.message)
  }
}
</script>
