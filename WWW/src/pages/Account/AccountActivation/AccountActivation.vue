<template>
  <div class="flex flex-col items-center w-full max-w-[500px]">
    <div class="mb-3">Książka Kucharska</div>
    <div
      class="flex flex-col justify-center rounded-lg border border-gray-200 bg-white p-6 shadow-xs w-full"
    >
      <h1 class="text-center font-serif font-semibold mb-3">Aktywuj konto</h1>

      <p class="mb-4">Kliknij w poniższy przycisk, aby aktywować konto</p>
      <CButtonAccent class="self-center">Aktywacja</CButtonAccent>
    </div>
  </div>
</template>

<script setup lang="ts">
import CButtonAccent from '@/components/CButton/CButtonAccent.vue'
</script>
