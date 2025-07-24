<template>
  <div class="flex flex-col items-center w-full max-w-[500px]">
    <div class="mb-3">Książka Kucharska</div>
    <div
      class="flex flex-col justify-center rounded-lg border border-gray-200 bg-white p-6 shadow-xs w-full"
    >
      <h1 class="text-center font-serif font-semibold mb-3">Konto aktywowane</h1>

      <p class="mb-4">Twoje konto zostało aktywowane, przejdź na ekran logowania.</p>
      <RouterLink :to="{ name: 'SignIn' }" class="self-center"
        ><CButtonPrimary>Ekran logowania</CButtonPrimary></RouterLink
      >
    </div>
  </div>
</template>

<script setup lang="ts"></script>
