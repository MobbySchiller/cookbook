<template>
  <div class="relative">
    <img
      :src="circle"
      aria-hidden="true"
      alt=""
      class="w-[42px] h-[42px] shrink-0 object-contain"
    />
    <div class="absolute inset-x-[8px] inset-y-[10px] font-hand text-xl w-[24px] text-right">
      {{ stepNo }}.
    </div>
  </div>
</template>

<script setup lang="ts">
import circle from '@/assets/other/circle.svg'

defineProps<{ stepNo: number }>()
</script>
