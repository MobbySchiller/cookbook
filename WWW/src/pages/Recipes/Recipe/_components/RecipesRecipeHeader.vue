<template>
  <div class="bg-white mb-4 px-6 py-6 rounded-md">
    <div class="grid grid-cols-12 gap-6 items-start">
      <div class="col-span-12 md:col-span-4 text-sm">
        <div class="aspect-[3/2] overflow-hidden">
          <img :src="recipe.imageUrl" alt="Opis" class="object-cover w-full h-full" />
        </div>
      </div>

      <div class="col-span-12 md:col-span-8">
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { Utensils, Clock, Users } from 'lucide-vue-next'
import type { Recipe } from '@/api/Recipes'

defineProps<{ recipe: Recipe }>()
</script>
