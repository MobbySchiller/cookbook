<template>
  <div class="w-full max-w-sm">
    <div class="w-full aspect-[3/2] overflow-hidden rounded-md">
      <!-- <img
        :src="recipe.imageUrl"
        alt="Opis"
        class="object-cover w-full h-full rounded-md hover:scale-105 transition-scale duration-400"
      /> -->
    </div>

    <div class="flex justify-between mt-2">
      <div>
        <p class="text-xs text-dark-300"></p>
        <p class="text-md font-semibold"></p>
      </div>
    </div>

    <div class="mt-1">
      <p class="text-xs text-dark-300">Czas przygotowania: <span>min.</span></p>
      <p class="text-xs text-dark-300">Liczba porcji: <span></span></p>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
