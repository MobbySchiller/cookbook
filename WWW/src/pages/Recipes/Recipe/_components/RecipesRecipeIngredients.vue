<template>
  <div class="bg-white px-6 py-6 relative paper rounded-md">
    <h2 class="font-serif mb-2 text-xl underline">Składniki</h2>
    <ul class="ps-5 space-y-1 list-disc">
      <li
        v-for="(ingredient, index) in ingredients"
        :key="`${ingredient.name}_${ingredient.quantity}`"
        class="text-sm"
      >
        <span class="font-semibold">{{ ingredient.name }}</span> - {{ ingredient.quantity }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { RecipeIngredient } from '@/api/Recipes'
import dot from '@/assets/other/dot.svg'

defineProps<{ ingredients: RecipeIngredient[] }>()
</script>
<style>
/* .paper::after {
  content: '';
  position: absolute;
  top: 100%;
  height: 20px;
  width: 100%;
  left: 0;
  background: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/23618/rip.svg) bottom;
  background-size: 200%;
} */

/* .paper {
  margin: 2em auto;
  background: #fff;
  background-repeat: space no-repeat;
  background-position:
    center top,
    center 6px,
    center 6px;

  background-image:
    linear-gradient(90deg, #fff 12px, 0, #fbc056 15px, 0, #b6813b 20px, 0, #fff 100%),
    radial-gradient(circle closest-side, rgba(255, 255, 255, 0) 88%, #fff 100%),
    radial-gradient(circle at 22px 8px, #b6813b 40%, #fbc056 40%, #fbc056 100%);
  background-image: url("data:image/svg+xml,%3Csvg fill='none' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 21'%3E%3Cpath d='M20 0h-7v6.9a7.5 7.5 0 107 0V0z' fill='%231373A9'/%3E%3Cpath d='M13 0h3v6.9a7.5 7.5 0 002 14 7.5 7.5 0 01-9-7.4c0-2.9 1.6-5.4 4-6.6V0z' fill='%2300486B'/%3E%3C/svg%3E");
  background-size: 2em 1.3125em;
} */
</style>
