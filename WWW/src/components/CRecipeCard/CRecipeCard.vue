<template>
  <div class="w-full max-w-sm">
    <RouterLink :to="{ name: 'Recipe', params: { id } }">
      <div class="w-full aspect-[3/2] overflow-hidden">
        <img
          src="https://i.wpimg.pl/1280x0/portal-abczdrowie.wpcdn.pl/imageCache/2022/09/13/jedzenie-easy-resize-com_f734.jpg"
          alt="Opis"
          class="object-cover w-full h-full rounded-md"
        />
      </div>
    </RouterLink>
    <div class="flex justify-between mt-2">
      <RouterLink :to="{ name: 'Recipe', params: { id } }">
        <div>
          <p class="text-xs text-dark-300">Obiad</p>
          <p class="text-md font-semibold">Makaron z brokułami</p>
        </div>
      </RouterLink>
      <button @click.stop="toggleHeart" class="self-start cursor-pointer">
        <img :src="isAddedToFavourite ? heart_filled : heart_outlined" />
      </button>
    </div>

    <div class="mt-1">
      <RouterLink :to="{ name: 'Recipe', params: { id } }">
        <p class="text-xs text-dark-300">Czas przygotowania: <span>1h</span></p>
        <!-- <p class="text-xs text-dark-300">Ilość składników: <span>15</span></p> -->
        <p class="text-xs text-dark-300">Liczba porcji: <span>4</span></p>
        <p class="mt-2 text-xs text-dark-300">Autor: <span>Andrzej Wójcik</span></p>
      </RouterLink>
    </div>
    <!-- <CButtonPrimary class="mt-3">Zobacz</CButtonPrimary> -->
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import heart_filled from '@/assets/icons/heart_filled.svg'
import heart_outlined from '@/assets/icons/heart_outlined.svg'

const isAddedToFavourite = ref<boolean>(false)

const id = 2

function toggleHeart() {
  isAddedToFavourite.value = !isAddedToFavourite.value
}
</script>
