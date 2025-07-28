<template>
  <div class="grid grid-cols-12 gap-6 bg-light lg:bg-white">
    <img
      src="https://i.wpimg.pl/1280x0/portal-abczdrowie.wpcdn.pl/imageCache/2022/09/13/jedzenie-easy-resize-com_f734.jpg"
      class="col-span-12 sm:col-span-6 sm:rounded-md"
    />
    <div class="col-span-12 sm:col-span-6 px-8 pb-4">
      <div class="flex justify-between sm:mt-4 md:mt-6 lg:mt-8">
        <div>
          <p class="text-sm md:text-md sm:mb-2 md:mb-3 text-dark-300">Obiad</p>
          <p class="text-lg md:text-3xl font-semibold">Makaron z brokułami</p>
        </div>
        <button @click="toggleHeart" class="self-start cursor-pointer">
          <img :src="isAddedToFavourite ? heart_filled : heart_outlined" />
        </button>
      </div>
      <div class="mt-2 sm:mt-4">
        <p class="text-sm md:text-md text-dark-300">Czas przygotowania: <span>1h</span></p>
        <p class="text-sm md:text-md text-dark-300">Ilość składników: <span>15</span></p>
      </div>
      <CButtonPrimary class="mt-3 sm:mt-6 md:mt-10">Zobacz</CButtonPrimary>
    </div>
  </div>
</template>

<script scoped lang="ts">
import heart_filled from '@/assets/icons/heart_filled.svg'
import heart_outlined from '@/assets/icons/heart_outlined.svg'
import { ref } from 'vue'

const isAddedToFavourite = ref<boolean>(false)

function toggleHeart() {
  isAddedToFavourite.value = !isAddedToFavourite.value
}
</script>
