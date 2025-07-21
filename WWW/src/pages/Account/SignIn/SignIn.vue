<template>
  <div class="flex flex-col items-center px-2 w-full max-w-[400px]">
    <div class="mb-3">Książka Kucharska</div>
    <div
      class="flex flex-col justify-center rounded-lg border border-gray-200 bg-white p-6 shadow-xs w-full"
    >
      <h1 class="text-center font-serif font-semibold mb-4">Zaloguj się</h1>

      <CInput v-model="login" class="mb-3" label="Login" id="login" />
      <CInputPassword v-model="password" class="mb-5" label="Hasło" id="passoword" />
      <CButtonPrimary color="primary">Zaloguj</CButtonPrimary>
    </div>
  </div>
</template>

<script setup lang="ts">
import CInputPassword from '@/components/CInput/CInputPassword.vue'
import { ref } from 'vue'

const login = ref<string>('')
const password = ref<string>('')
</script>
